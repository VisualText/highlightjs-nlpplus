/*! `nlpplus-dict` grammar built and tested with Highlight.js 11.12.0 */

var hljsNlpplusDict = (function () {
  'use strict';

  /*
  Language: NLP++ Dictionary
  Description: NLP++ dictionaries (.dict): a headword, one or more words, followed by the attribute=value pairs the tokenizer attaches to matching text.
  Author: David de Hilster <dehilster@gmail.com>
  Website: https://visualtext.org/nlp/
  Category: config
  */

  function nlpplusDict(hljs) {
    // A value is a quoted string, a number, a bare word, or a [list, "of", values].
    const VALUES = [
      {
        scope: 'string',
        begin: '"',
        end: '"',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        scope: 'number',
        match: /(?<=[=[,]\s*)-?\d+(?:\.\d+)?(?=[\s,\]]|$)/
      },
      {
        scope: 'string',
        match: /(?<=[=[,]\s*)[^\s"[\],=]+/
      },
      {
        scope: 'punctuation',
        match: /[[\],]/
      }
    ];

    return {
      name: 'NLP++ Dictionary',
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        // The headword: words separated by spaces, up to the first attribute
        // name. Words and spaces never overlap, so there is no backtracking.
        {
          scope: 'title',
          match: /^[^\s#/=][^\s=]*(?:[ \t]+(?![\w-]+[ \t]*=)[^\s=]+)*/
        },
        {
          scope: 'attr',
          match: /[\w-]+(?=\s*=)/
        },
        ...VALUES
      ]
    };
  }

  return nlpplusDict;

})();
hljs.registerLanguage("nlpplus-dict", hljsNlpplusDict);
