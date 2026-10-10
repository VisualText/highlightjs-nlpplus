import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const hljsVersion = require('highlight.js/package.json').version;

// NLP++ pass files, and the analyzer's supporting formats.
export const LANGUAGES = [
  { id: 'nlpplus', global: 'hljsNlpplus' },
  { id: 'nlpplus-dict', global: 'hljsNlpplusDict' },
  { id: 'nlpplus-kbb', global: 'hljsNlpplusKbb' },
  { id: 'nlpplus-seq', global: 'hljsNlpplusSeq' },
  { id: 'nlpplus-tree', global: 'hljsNlpplusTree' }
];

export default LANGUAGES.map(({ id, global }) => {
  const banner = `/*! \`${id}\` grammar built and tested with Highlight.js ${hljsVersion} */\n`;
  return {
    input: `src/languages/${id}.js`,
    output: [
      {
        file: `dist/${id}.es.js`,
        format: 'es',
        banner
      },
      {
        file: `dist/${id}.cjs`,
        format: 'cjs',
        exports: 'default',
        banner
      },
      {
        file: `dist/${id}.js`,
        format: 'iife',
        name: global,
        banner,
        footer: `hljs.registerLanguage("${id}", ${global});`
      }
    ]
  };
});
