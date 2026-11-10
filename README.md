# highlightjs-nlpplus

[NLP++](https://visualtext.org/nlp/) language grammars for [highlight.js](https://highlightjs.org/): pass files,
and the dictionaries, knowledge bases, analyzer sequences and parse trees that go with them.

NLP++ is a programming language for natural language processing. An analyzer is a sequence of
passes; each pass matches pattern rules against a parse tree and runs code when a rule fires.

The grammar highlights:

- region markers (`@RULES`, `@POST`, `@CODE`, `@DECL`, ... and their closing `@@` forms)
- rule rewrites (`_money <- ... @@`) and the modifiers on rule elements (`[opt]`, `[min=2 match=(...)]`)
- node names (`_noun`) and the special node constants (`_xWILD`, `_xALPHA`, `_xCAP`, ...)
- backslash-escaped literal characters in rules (`\.`, `\,`)
- the variable accessors `N()`, `S()`, `X()`, `G()` and `L()`
- calls to the engine's built-in functions and to user functions
- `#` and `/* */` comments, strings and numbers

The language id is `nlpplus`, with the alias `nlp`.

### The analyzer's other files

| Language id | Files | Highlights |
|---|---|---|
| `nlpplus-dict` | `.dict` dictionaries | headwords, attribute names, quoted and bare values, numbers |
| `nlpplus-kbb` (alias `kbb`) | `.kbb` knowledge bases | top-level and nested concepts, attributes, quoted values, `[lists]` |
| `nlpplus-seq` | `analyzer.seq` | pass types, pass files, `nil`, inactive (`/`) passes, comments |
| `nlpplus-tree` | `.tree` parse trees | built nodes and leaf tokens, offsets, node types, flags, variables, pass headers |

Each is a separate file (`dist/nlpplus-dict.min.js`, ...) and a separate import
(`highlightjs-nlpplus/dict`, `/kbb`, `/seq`, `/tree`), so a page loads only what it shows.

## Usage

### In a web page

Load the grammar after highlight.js. The CDN build registers itself.

```html
<script src="/path/to/highlight.min.js"></script>
<script src="/path/to/nlpplus.min.js"></script>
<!-- and any of the other formats the page shows -->
<script src="/path/to/nlpplus-kbb.min.js"></script>
<script>hljs.highlightAll();</script>
```

From a CDN:

```html
<script src="https://unpkg.com/highlightjs-nlpplus/dist/nlpplus.min.js"></script>
```

Then mark NLP++ code blocks:

```html
<pre><code class="language-nlpplus">@RULES
_money <- _money _number _currency [opt] @@
</code></pre>
```

### With Node or a bundler

```javascript
import hljs from 'highlight.js';
import nlpplus from 'highlightjs-nlpplus';

hljs.registerLanguage('nlpplus', nlpplus);
hljs.highlightAll();
```

The other formats import the same way:

```javascript
import nlpplusKbb from 'highlightjs-nlpplus/kbb';
hljs.registerLanguage('nlpplus-kbb', nlpplusKbb);
```

CommonJS:

```javascript
const hljs = require('highlight.js');
hljs.registerLanguage('nlpplus', require('highlightjs-nlpplus'));
```

## Develop

```bash
npm install
npm test        # builds dist/ and runs the markup tests in test/markup/nlpplus
```

The minified CDN files (`dist/*.min.js`, `dist/*.es.min.js`) are built with the
highlight.js compiler, and the `extra-build` CI check fails if the committed ones differ
from what it builds. Clone this repo, `src/` included, into a highlight.js checkout's
`extra/` folder and run `node tools/build.js -t cdn` there. Commit everything in `dist/`.

Check the names of the files it writes. If the build finds no `src/languages/` folder, it
falls back to `main` in `package.json` and writes `dist/nlpplus.cjs.min.js`, which registers
the language as `nlpplus.cjs`. Delete those files. When the `extra-build` check fails, its
log ends with the exact `git diff` it expected. Save that diff from
`gh run view <run> --log-failed` and `git apply` it to get the same files.

The list of built-in functions is the engine's own name table: `nlpFuncs[]` in
[nlp-engine `lite/funcs.h`](https://github.com/VisualText/nlp-engine/blob/master/lite/funcs.h).
Built-in names are matched with exact case, as the engine does.

## Related

- [VisualText](https://visualtext.org) – the NLP++ IDE, a VS Code extension
- [NLP engine](https://github.com/VisualText/nlp-engine)
- [nlpplus-tmbundle](https://github.com/VisualText/nlpplus-tmbundle) – TextMate grammars for NLP++

## License

MIT. See [LICENSE](LICENSE).
