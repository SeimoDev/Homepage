import { marked } from 'marked';
import { Parser } from 'htmlparser2';

const hidden = new Set(['script', 'style', 'noscript', 'svg', 'math', 'picture', 'video', 'audio', 'iframe', 'object']);
const nonProse = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'ul', 'ol', 'dl', 'table']);
const blocks = new Set(['p', 'div', 'section', 'article', 'blockquote', 'details', 'summary', 'hr', ...nonProse]);

function extractText(markdown, firstParagraph) {
  if (typeof markdown !== 'string' || !markdown.trim()) return '';
  const paragraphs = [];
  const stack = [];
  let text = '';
  let hasProse = false;
  const flush = () => {
    const normalized = text.replace(/[\u200B\uFEFF]/g, '').replace(/\s+/g, ' ').trim();
    if (/[\p{L}\p{N}]/u.test(normalized) && (!firstParagraph || hasProse)) paragraphs.push(normalized);
    text = '';
    hasProse = false;
  };
  const ignored = () => stack.some((name) => hidden.has(name) || (firstParagraph && nonProse.has(name)));
  const parser = new Parser({
    onopentag(name) {
      if (blocks.has(name) && !ignored()) flush();
      stack.push(name);
      if (name === 'br' && !ignored()) text += ' ';
    },
    ontext(value) {
      if (!ignored()) {
        text += value;
        // Language selectors and documentation links above the introduction
        // are navigation, not the first paragraph of project prose.
        if (!stack.includes('a') && /[\p{L}\p{N}]/u.test(value)) hasProse = true;
      }
    },
    onclosetag(name) {
      if (blocks.has(name) && !ignored()) flush();
      stack.pop();
    },
  }, { decodeEntities: true });
  parser.end(marked.parse(markdown, { async: false, gfm: true }));
  flush();
  return firstParagraph ? paragraphs[0] || '' : paragraphs.join(' ');
}

export const plainDescription = (description) => extractText(description, false);
export const firstReadmeParagraph = (readme) => extractText(readme, true);
