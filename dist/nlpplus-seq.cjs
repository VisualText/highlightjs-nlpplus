/*! `nlpplus-seq` grammar built and tested with Highlight.js 11.12.0 */

'use strict';

/*
Language: NLP++ Analyzer Sequence
Description: NLP++ analyzer sequences (analyzer.seq): one pass per line, the pass type, the pass file or nil, and a comment. A leading slash makes a pass inactive; two slashes start a comment.
Author: David de Hilster <dehilster@gmail.com>
Website: https://visualtext.org/nlp/
Category: config
*/

function nlpplusSeq(hljs) {
  // Pass types the engine's sequence reader accepts; "pat" is read as "nlp".
  const PASS_TYPES = [
    'chartok', 'cmltok', 'cmltokenize', 'dicttok', 'dicttokz', 'end',
    'folder', 'gen', 'genhash', 'hash', 'intern', 'line', 'lines', 'nintern',
    'nlp', 'pat', 'python', 'rec', 'stub', 'tok', 'token', 'tokenize'
  ];
  const PASS_TYPE = hljs.regex.either(...PASS_TYPES);

  return {
    name: 'NLP++ Analyzer Sequence',
    case_insensitive: true,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // a lone slash at the start of a line switches the pass off, and two
      // start a comment
      {
        scope: 'comment',
        match: /^\/(?!\*).*$/
      },
      {
        scope: 'keyword',
        match: hljs.regex.concat(/^/, PASS_TYPE, /\b/)
      },
      // the pass file, or nil for passes that have none
      {
        scope: 'literal',
        match: hljs.regex.concat('(?<=^', PASS_TYPE, '\\s+)nil\\b')
      },
      {
        scope: 'title.function',
        match: hljs.regex.concat('(?<=^', PASS_TYPE, '\\s+)[^\\s#]+')
      }
    ]
  };
}

module.exports = nlpplusSeq;
