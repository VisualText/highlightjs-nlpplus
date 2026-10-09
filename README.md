# highlightjs-nlpplus

[NLP++](https://visualtext.org/nlp/) language grammar for [highlight.js](https://highlightjs.org/).

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

## Usage

### In a web page

Load the grammar after highlight.js. The CDN build registers itself.

```html
<script src="/path/to/highlight.min.js"></script>
<script src="/path/to/nlpplus.min.js"></script>
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

The minified CDN files (`dist/nlpplus.min.js`, `dist/nlpplus.es.min.js`) are built with the
highlight.js compiler. Put this repo in a highlight.js checkout's `extra/` folder and run
`node tools/build.js -t cdn` there. Commit everything in `dist/`.

The list of built-in functions comes from the language data in the
[VisualText extension for VS Code](https://github.com/VisualText/vscode-nlp).

## Related

- [VisualText](https://visualtext.org) – the NLP++ IDE, a VS Code extension
- [NLP engine](https://github.com/VisualText/nlp-engine)
- [nlpplus-tmbundle](https://github.com/VisualText/nlpplus-tmbundle) – TextMate grammars for NLP++

## License

MIT. See [LICENSE](LICENSE).
