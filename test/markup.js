import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';
import 'should';
import hljs from 'highlight.js/lib/core';
import nlpplus from '../dist/nlpplus.es.js';
import nlpplusDict from '../dist/nlpplus-dict.es.js';
import nlpplusKbb from '../dist/nlpplus-kbb.es.js';
import nlpplusSeq from '../dist/nlpplus-seq.es.js';
import nlpplusTree from '../dist/nlpplus-tree.es.js';

const languages = {
  'nlpplus': nlpplus,
  'nlpplus-dict': nlpplusDict,
  'nlpplus-kbb': nlpplusKbb,
  'nlpplus-seq': nlpplusSeq,
  'nlpplus-tree': nlpplusTree
};
for (const [id, lang] of Object.entries(languages)) hljs.registerLanguage(id, lang);

const here = path.dirname(fileURLToPath(import.meta.url));

for (const id of Object.keys(languages)) {
  describe(id, () => {
    const expects = globSync(`markup/${id}/*.expect.txt`, { cwd: here, absolute: true });
    it('has markup tests', () => {
      expects.length.should.be.above(0);
    });
    expects.forEach((filename) => {
      const name = path.basename(filename, '.expect.txt');
      const skipped = name.endsWith('.skip');
      const run = skipped ? it.skip : it;
      run(`should markup ${name}`, () => {
        const source = fs.readFileSync(filename.replace(/\.expect/, ''), 'utf8');
        const expected = fs.readFileSync(filename, 'utf8');
        hljs.highlight(source, { language: id }).value.trim()
          .should.equal(expected.trim());
      });
    });
  });
}
