#!/usr/bin/env node
/**
 * build.js – scans this repo for program folders and writes programs.js,
 * which index.html reads to draw the showcase.
 *
 *   node build.js            build once
 *   node build.js --watch    rebuild whenever a file changes
 *
 * A "program" is any top-level folder that contains an index.html.
 * (Program-1, Program-11, Lab-Extra, anything.) No config needed.
 *
 * Optional: put a program.json in a folder to override what is detected:
 *   { "title": "...", "description": "...", "category": "React",
 *     "tags": ["React", "State"], "learn": ["...", "..."] }
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'programs.js');
const SKIP_DIRS = new Set(['.git', '.github', 'node_modules', 'assets', 'dist']);
const TEXT_EXT = new Set(['.html', '.htm', '.css', '.js', '.jsx', '.json', '.md', '.txt', '.svg', '.ts']);
const MAX_EMBED = 24 * 1024; // keep programs.js light; big files are truncated

const LANG = { '.html': 'html', '.htm': 'html', '.css': 'css', '.js': 'js', '.jsx': 'js', '.json': 'json', '.md': 'md', '.svg': 'html', '.ts': 'js', '.txt': 'txt' };

const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return null; }
}

function strip(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&copy;/g, '©').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

function pick(html, re) {
  const m = html.match(re);
  return m ? strip(m[1]) : '';
}

function detect(folderFiles) {
  const all = folderFiles.map(f => f.raw).join('\n');
  const html = folderFiles.filter(f => f.ext === '.html').map(f => f.raw).join('\n');
  const has = re => re.test(all);
  const tags = [];
  const add = t => tags.includes(t) || tags.push(t);

  if (has(/<(header|nav|section|article|aside|footer|main)\b/i)) add('Semantic HTML');
  if (has(/<table/i)) add('Tables');
  if (has(/<form/i)) add('Forms');
  if (has(/display\s*:\s*grid|grid-template/i) || has(/\bgrid-cols-/)) add('CSS Grid');
  if (has(/display\s*:\s*flex/i) || has(/\bflex\b[^"']*["']/)) add('Flexbox');
  if (has(/cdn\.tailwindcss\.com|tailwindcss/i)) add('Tailwind');
  if (has(/react(\.development|\.production)?(\.min)?\.js|ReactDOM|React\./)) add('React');
  if (has(/useState/)) add('State');
  if (has(/\bfetch\s*\(/)) add('Fetch API');
  if (has(/addEventListener|onclick=|onsubmit=|document\.(getElementById|querySelector)/)) add('DOM events');
  if (has(/<script(?![^>]*src=)[^>]*>[\s\S]*?\S[\s\S]*?<\/script>/i) || folderFiles.some(f => f.ext === '.js')) add('JavaScript');
  if (has(/@media/)) add('Responsive');
  if (folderFiles.some(f => f.ext === '.css')) add('External CSS');
  void html;
  return tags;
}

function categorise(tags) {
  if (tags.includes('React')) return 'React';
  if (tags.includes('Tailwind')) return 'Tailwind';
  if (tags.includes('JavaScript') || tags.includes('Fetch API') || tags.includes('DOM events')) return 'JavaScript';
  if (tags.includes('CSS Grid') || tags.includes('Flexbox') || tags.includes('External CSS')) return 'CSS';
  return 'HTML';
}

function collectFiles(dir) {
  const out = [];
  (function walk(d, rel) {
    for (const name of fs.readdirSync(d).sort(natural)) {
      if (name.startsWith('.')) continue;
      const full = path.join(d, name);
      const r = rel ? rel + '/' + name : name;
      const st = fs.statSync(full);
      if (st.isDirectory()) { if (!SKIP_DIRS.has(name)) walk(full, r); continue; }
      const ext = path.extname(name).toLowerCase();
      const entry = { name: r, ext, size: st.size, mtime: st.mtimeMs, text: TEXT_EXT.has(ext), raw: '' };
      if (entry.text && name !== 'program.json') {
        entry.raw = fs.readFileSync(full, 'utf8').replace(/\r\n/g, '\n');
      }
      out.push(entry);
    }
  })(dir, '');
  return out;
}

function build() {
  const dirs = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.') && !SKIP_DIRS.has(d.name))
    .map(d => d.name)
    .filter(n => fs.existsSync(path.join(ROOT, n, 'index.html')))
    .sort(natural);

  const programs = dirs.map(id => {
    const dir = path.join(ROOT, id);
    const meta = readJSON(path.join(dir, 'program.json')) || {};
    const files = collectFiles(dir).filter(f => f.name !== 'program.json');
    const entryFile = files.find(f => f.name === 'index.html');
    const html = entryFile.raw;

    const tags = meta.tags || detect(files.filter(f => f.text));
    const numMatch = id.match(/(\d+)\s*$/);

    const title = meta.title
      || pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i)
      || pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)
      || pick(html, /<h2[^>]*>([\s\S]*?)<\/h2>/i)
      || id.replace(/[-_]+/g, ' ');

    const description = meta.description
      || pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
      || (tags.length ? 'A lab program using ' + tags.slice(0, 3).join(', ') + '.' : 'A frontend lab program.');

    const loc = files.filter(f => f.text && f.ext !== '.json').reduce((n, f) => n + f.raw.split('\n').length, 0);

    return {
      id,
      num: numMatch ? Number(numMatch[1]) : null,
      path: id + '/index.html',
      title,
      description,
      category: meta.category || categorise(tags),
      tags,
      learn: meta.learn || [],
      loc,
      updated: Math.max(...files.map(f => f.mtime)),
      files: files.map(f => {
        const big = f.raw.length > MAX_EMBED;
        return {
          name: f.name,
          size: f.size,
          lang: LANG[f.ext] || null,
          content: f.text ? (big ? f.raw.slice(0, MAX_EMBED) : f.raw) : null,
          truncated: big || undefined,
        };
      }),
    };
  });

  const payload = {
    generated: new Date().toISOString(),
    repo: 'vegapunk-hub/FD-Lab-Programs',
    programs,
  };

  const next = '/* Generated by build.js – do not edit by hand. */\nwindow.LAB = ' + JSON.stringify(payload) + ';\n';
  // Only write when content (apart from the timestamp) changed, so CI does not commit noise.
  let prev = '';
  try { prev = fs.readFileSync(OUT, 'utf8'); } catch {}
  const strip = s => s.replace(/"generated":"[^"]*"/, '');
  if (strip(prev) !== strip(next)) {
    fs.writeFileSync(OUT, next);
    console.log(`programs.js updated: ${programs.length} programs (${dirs.join(', ')})`);
  } else {
    console.log(`programs.js already up to date: ${programs.length} programs`);
  }
}

build();

if (process.argv.includes('--watch')) {
  console.log('Watching for changes… (Ctrl+C to stop)');
  let t;
  fs.watch(ROOT, { recursive: true }, (_e, file) => {
    if (!file || file === 'programs.js' || file.startsWith('.git')) return;
    clearTimeout(t);
    t = setTimeout(build, 250);
  });
}
