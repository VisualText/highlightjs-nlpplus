import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const hljsVersion = require('highlight.js/package.json').version;
const banner = `/*! \`nlpplus\` grammar built and tested with Highlight.js ${hljsVersion} */\n`;

export default {
  input: 'src/languages/nlpplus.js',
  output: [
    {
      file: 'dist/nlpplus.es.js',
      format: 'es',
      banner
    },
    {
      file: 'dist/nlpplus.cjs',
      format: 'cjs',
      exports: 'default',
      banner
    },
    {
      file: 'dist/nlpplus.js',
      format: 'iife',
      name: 'hljsNlpplus',
      banner,
      footer: 'hljs.registerLanguage("nlpplus", hljsNlpplus);'
    }
  ]
};
