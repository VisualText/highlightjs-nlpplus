/*! `nlpplus-tree` grammar built and tested with Highlight.js 11.12.0 */

/*
Language: NLP++ Parse Tree
Description: NLP++ parse trees (.tree) as the engine writes them: indented nodes with their offsets, type, flags and variables in brackets, and the pass headers between snapshots.
Author: David de Hilster <dehilster@gmail.com>
Website: https://visualtext.org/nlp/
Category: config
*/

function nlpplusTree(hljs) {
  // [start,end,ostart,oend,pass,rule,type,flags..., ("name" value) ...]
  const RECORD = {
    begin: /\[/,
    end: /\]$/,
    keywords: {
      type: [ 'null', 'node', 'alpha', 'num', 'punct', 'white', 'ctrl', 'emoji' ],
      keyword: [ 'b', 'un', 'sem', 'fired', 'blt' ]
    },
    contains: [
      // ("name" value): the variable's name, then its value(s)
      {
        scope: 'attr',
        match: /(?<=\(\s*)"(?:\\.|[^"\\\n])*"/
      },
      {
        scope: 'string',
        match: /"(?:\\.|[^"\\\n])*"/
      },
      {
        scope: 'number',
        match: /\b\d+\b/
      }
    ]
  };

  return {
    name: 'NLP++ Parse Tree',
    contains: [
      {
        scope: 'comment',
        match: /^\*+[ \t]*$/
      },
      // pass headers between the per-pass snapshots
      {
        scope: 'section',
        match: /^[ \t]*PASS[ \t]+\d+[ \t]+\(.*?\)/
      },
      {
        scope: 'section',
        match: /^[A-Z][A-Z ]* TREE:[ \t]*$/
      },
      // a node built by a rule, then a leaf token
      {
        scope: 'type',
        match: /(?<=^[ \t]*)_\w+(?=[ \t]+\[)/
      },
      {
        scope: 'symbol',
        match: /(?<=^[ \t]*)\S+(?=[ \t]+\[)/
      },
      RECORD
    ]
  };
}

export { nlpplusTree as default };
