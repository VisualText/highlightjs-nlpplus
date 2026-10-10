/*! `nlpplus-dict` grammar built and tested with Highlight.js 11.12.0 */

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
      // the headword runs up to the first attribute name
      {
        scope: 'title',
        match: /^[^\s#=/][^=\n]*?(?=\s+[\w-]+\s*=)/
      },
      // a headword with no attributes
      {
        scope: 'title',
        match: /^[^\s#=/][^=\n]*$/
      },
      {
        scope: 'attr',
        match: /[\w-]+(?=\s*=)/
      },
      ...VALUES
    ]
  };
}

module.exports = nlpplusDict;
