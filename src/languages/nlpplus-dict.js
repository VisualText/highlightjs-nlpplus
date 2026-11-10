/*
Language: NLP++ Dictionary
Description: NLP++ dictionaries (.dict): a headword, one or more words, followed by the attribute=value pairs the tokenizer attaches to matching text.
Author: David de Hilster <dehilster@gmail.com>
Website: https://visualtext.org/nlp/
Category: config
*/

export default function(hljs) {
  // A value is a quoted string, a number or a bare word. The reader has no list
  // syntax: [a,b] is one string, brackets and commas included.
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
      match: /(?<==\s*)\d+(?=\s|$)/
    },
    {
      scope: 'string',
      match: /(?<==\s*)[^\s"=]+/
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
        match: /^[^\s#/=][^\s=#]*(?:[ \t]+(?![\w-]+[ \t]*=)[^\s=#]+)*/
      },
      {
        scope: 'attr',
        match: /[\w-]+(?=\s*=)/
      },
      ...VALUES
    ]
  };
}
