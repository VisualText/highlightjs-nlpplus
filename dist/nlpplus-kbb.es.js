/*! `nlpplus-kbb` grammar built and tested with Highlight.js 11.12.0 */

/*
Language: NLP++ Knowledge Base
Description: NLP++ knowledge bases (.kbb): an indented hierarchy of concepts, each optionally followed by a colon and comma-separated attribute=value pairs.
Author: David de Hilster <dehilster@gmail.com>
Website: https://visualtext.org/nlp/
Category: config
*/

function nlpplusKbb(hljs) {
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
      // the reader stores a value as a number only when it is all digits;
      // -5 and 1.5 are strings
      scope: 'number',
      match: /(?<=[=[,]\s*)\d+(?=[\s,\]]|$)/
    },
    {
      scope: 'string',
      match: /(?<=[=[,]\s*)[^\s"[\],=]+/
    },
    {
      scope: 'punctuation',
      match: /[[\],:]/
    }
  ];

  return {
    name: 'NLP++ Knowledge Base',
    aliases: [ 'kbb' ],
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // A top-level concept, at the start of the line. Indentation is the
      // hierarchy: anything indented is a concept below another.
      {
        scope: 'section',
        // a # ends the name: the rest of the line is a comment
        match: /^[^\s#:/](?:[^:#\n]*[^\s:#])?/
      },
      {
        scope: 'title.class',
        match: /(?<=^[ \t]+)[^\s#:/](?:[^:#\n]*[^\s:#])?/
      },
      {
        scope: 'attr',
        match: /[\w-]+(?=\s*=)/
      },
      ...VALUES
    ]
  };
}

export { nlpplusKbb as default };
