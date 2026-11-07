import test from 'node:test';
import assert from 'node:assert/strict';
import { plainDescription, firstReadmeParagraph } from './project-description.mjs';

test('repository descriptions retain text while removing Markdown, images, and HTML', () => {
  assert.equal(plainDescription('**轻量** <em>CMS</em>，支持 [Markdown](https://example.com/docs) &amp; `SQLite`。 ![logo](logo.png)'),
    '轻量 CMS，支持 Markdown & SQLite。');
});

test('README extraction skips the title and badges and keeps only the first prose paragraph', () => {
  const readme = `# Project

[![Build](https://example.com/build.svg)](https://example.com/build)
![Screenshot](screenshot.png)

一个 **轻量的项目**，通过 [插件](https://example.com/plugins) 扩展。
支持跨平台运行。

这是第二段，不应进入卡片。
`;
  assert.equal(firstReadmeParagraph(readme), '一个 轻量的项目，通过 插件 扩展。 支持跨平台运行。');
});

test('HTML README introductions preserve visible text and decode entities', () => {
  const readme = `<div align="center">
<img alt="Not the introduction" src="logo.svg" />
<h1>Project title</h1>
<p>A <strong>small</strong> tool &amp; a simple API.<br>Works offline.</p>
<p>Second paragraph.</p>
</div>`;
  assert.equal(firstReadmeParagraph(readme), 'A small tool & a simple API. Works offline.');
});

test('code, lists, tables, comments, and non-visible content are not project introductions', () => {
  const readme = `Project
====

<!-- internal note -->

\`\`\`sh
echo not the introduction
\`\`\`

- Navigation item
- Another item

| Build | Status |
| ----- | ------ |
| CI | Passing |

<script>not visible</script>

The actual introduction.
`;
  assert.equal(firstReadmeParagraph(readme), 'The actual introduction.');
});

test('reference links keep their labels without their URL targets', () => {
  assert.equal(firstReadmeParagraph('Use [the editor][editor] with ~~old~~ **new** tools.\n\n[editor]: https://example.com/editor'),
    'Use the editor with old new tools.');
});

test('nested link and image syntax is handled without leftover Markdown', () => {
  assert.equal(firstReadmeParagraph('Start with [**the `API`**](https://example.com/api_(v2)) and ![a logo](image_(small).png) continue.'),
    'Start with the API and continue.');
});

test('HTML blocks without paragraph tags can still provide the first introduction', () => {
  assert.equal(firstReadmeParagraph('<div>A small <b>utility</b> for everyone.</div>\n\nLater paragraph.'),
    'A small utility for everyone.');
});

test('inline hidden content does not split or truncate the surrounding paragraph', () => {
  assert.equal(firstReadmeParagraph('<p>A tool <svg><title>icon</title></svg>that works.</p>'), 'A tool that works.');
});

test('empty or image-only READMEs do not invent an introduction', () => {
  for (const readme of [null, '', '# Title\n\n![Logo](logo.png)', '<p><img src="badge.svg" alt="badge" /></p>']) {
    assert.equal(firstReadmeParagraph(readme), '');
  }
});

test('README language and documentation navigation does not replace the project introduction', () => {
  const readme = '# WacOS\r\n\r\n[中文文档 / Chinese documentation](README.zh-CN.md)\r\n\r\nWacOS brings window management to Windows.\r\n\r\nAnother paragraph.';
  assert.equal(firstReadmeParagraph(readme), 'WacOS brings window management to Windows.');
});
