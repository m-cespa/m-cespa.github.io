// build.js
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node build.js <markdown-file>");
  process.exit(1);
}

const inputFile = args[0];
const outputFile = inputFile.replace(/\.md$/, '.html');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// read Markdown
let markdown = fs.readFileSync(inputFile, 'utf8');

// replace $$...$$ blocks with a placeholder to protect latex
const mathBlocks = [];
markdown = markdown.replace(/\$\$([\s\S]+?)\$\$/g, (match, content) => {
  mathBlocks.push(content);
  return `@@MATHBLOCK${mathBlocks.length - 1}@@`;
});

// convert remaining Markdown to HTML
let html = md.render(markdown);

// restore math blocks without wrapping in <p>
html = html.replace(/<p>@@MATHBLOCK(\d+)@@<\/p>/g, (match, index) => {
    return `<div class="math-block">$$${mathBlocks[index]}$$</div>`;
  });
  

// wrap in container
const finalHtml = `<div class="preparsed-md">\n${html}\n</div>`;

// save pre-rendered HTML
fs.writeFileSync(outputFile, finalHtml);
console.log('Markdown pre-rendered successfully to HTML:', outputFile);
