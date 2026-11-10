/*! `nlpplus` grammar built and tested with Highlight.js 11.12.0 */

'use strict';

/*
Language: NLP++
Description: NLP++, a programming language for natural language processing. An analyzer is a sequence of passes; each pass matches pattern rules against a parse tree and runs code when a rule fires.
Author: David de Hilster <dehilster@gmail.com>
Website: https://visualtext.org/nlp/
Category: misc
*/

function nlpplus(hljs) {
  const regex = hljs.regex;

  // Engine built-in functions: the engine's own name table (nlpFuncs[] in
  // nlp-engine lite/funcs.h). Highlighted only when called, because the same
  // words (next, single, str, ...) also appear as literal text in @RULES.
  const BUILTINS = [
    'DICTphraselookup', 'LJ', 'abs', 'addarg', 'addattr', 'addcnode',
    'addconcept', 'addconval', 'addnode', 'addnumval', 'addstmt', 'addstrs',
    'addstrval', 'addsval', 'addword', 'adoptconcepts', 'arraylength',
    'arrayreverse', 'arrayslice', 'arraysort', 'arrayunique', 'attrchange',
    'attrexists', 'attrname', 'attrtype', 'attrvals', 'attrwithval',
    'batchstart', 'callanalyzer', 'callconcept', 'cap', 'cbuf', 'ceiling',
    'closefile', 'conceptname', 'conceptpath', 'conval', 'cout', 'coutreset',
    'dballocstmt', 'dbbindcol', 'dbclose', 'dbexec', 'dbexecstmt', 'dbfetch',
    'dbfreestmt', 'dbopen', 'deaccent', 'debug', 'dejunk', 'deletefile',
    'dictfindword', 'dictfirst', 'dictgetword', 'dictnext', 'direxists',
    'dirlist', 'down', 'eltnode', 'excise', 'exitpass', 'exittopopup',
    'factorial', 'fail', 'fileexists', 'fileout', 'filesize', 'findana',
    'findattr', 'findattrs', 'findconcept', 'findhierconcept', 'findnode',
    'findphrase', 'findroot', 'findvals', 'findwordpath', 'firstnode',
    'floor', 'flt', 'fltval', 'fncallstart', 'fprintgvar', 'fprintnvar',
    'fprintvar', 'fprintxvar', 'gdump', 'getconcept', 'getconval',
    'getfltval', 'getnumval', 'getpopupdata', 'getstrval', 'getsval', 'ginc',
    'gp', 'group', 'gtolower', 'guniq', 'hitconf', 'inc', 'inheritval',
    'inputrange', 'inputrangetofile', 'interactive', 'isarray', 'iscon',
    'isfloat', 'isnum', 'ispn', 'isstr', 'jsonparse', 'jsonwrite',
    'kbdumptree', 'lasteltnode', 'lastnode', 'length', 'lengthr',
    'levenshtein', 'lextagger', 'listadd', 'listnode', 'lj', 'loaddict',
    'loadkbb', 'log', 'logten', 'look', 'lookup', 'lowercase', 'makeconcept',
    'makeliteral', 'makeparentconcept', 'makephrase', 'makestmt', 'merge',
    'merger', 'mkdir', 'mod', 'movecleft', 'moveconcept', 'movecright',
    'movesem', 'ndump', 'next', 'nextattr', 'nextval', 'ninc', 'nodeconcept',
    'nodeowner', 'noop', 'num', 'numrange', 'numval', 'openfile', 'or',
    'pathconcept', 'percentstr', 'permuten', 'phraselength', 'phraseraw',
    'phrasetext', 'pncopyvars', 'pndeletechilds', 'pndown', 'pninsert',
    'pnmakevar', 'pnmove', 'pnname', 'pnnext', 'pnprev', 'pnpush',
    'pnpushval', 'pnremoveval', 'pnrename', 'pnreplaceval', 'pnroot',
    'pnrpushval', 'pnsetfired', 'pnsingletdown', 'pntype', 'pnup', 'pnvar',
    'pnvarnames', 'pnvartype', 'pow', 'pranchor', 'prchild', 'preaction',
    'prev', 'print', 'printr', 'printvar', 'prlit', 'prrange', 'prtree',
    'prunephrases', 'prxtree', 'push', 'randomint', 'readfile', 'readlines',
    'refind', 'regexp', 'regexpi', 'rematch', 'renameattr', 'renamechild',
    'renameconcept', 'renamenode', 'replaceval', 'resolveurl', 'resubst',
    'returnstmt', 'rfaaction', 'rfaactions', 'rfaarg', 'rfaargtolist',
    'rfacode', 'rfaelement', 'rfaelt', 'rfaexpr', 'rfalist', 'rfalitelt',
    'rfalittoaction', 'rfalittopair', 'rfaname', 'rfanodes', 'rfanonlit',
    'rfanonlitelt', 'rfanum', 'rfaop', 'rfapair', 'rfapairs', 'rfapostunary',
    'rfapres', 'rfarange', 'rfarecurse', 'rfarecurses', 'rfaregion',
    'rfaregions', 'rfarule', 'rfarulelts', 'rfarulemark', 'rfarules',
    'rfarulesfile', 'rfaselect', 'rfastr', 'rfasugg', 'rfaunary', 'rfavar',
    'rfaxvar', 'rfbarg', 'rfbdecl', 'rfbdecls', 'rightjustifynum', 'rmattr',
    'rmattrs', 'rmattrval', 'rmchars', 'rmchild', 'rmchildren', 'rmconcept',
    'rmcphrase', 'rmnode', 'rmphrase', 'rmval', 'rmvals', 'rmword', 'round',
    'sdump', 'setbase', 'setlookahead', 'setunsealed', 'single', 'singler',
    'singlex', 'singlezap', 'sortattrs', 'sortchilds', 'sortconsbyattr',
    'sorthier', 'sortphrase', 'sortvals', 'spellcandidates', 'spellcorrect',
    'spellword', 'splice', 'split', 'sqlstr', 'sqrt', 'startout', 'stem',
    'stopout', 'str', 'strchar', 'strchr', 'strchrcount', 'strclean',
    'strcontains', 'strcontainsnocase', 'strendswith', 'strequal',
    'strequalnocase', 'strescape', 'strgreaterthan', 'strhaspunct',
    'strindexof', 'strisalpha', 'striscaps', 'strisdigit', 'strislower',
    'strisupper', 'strjoin', 'strlastindexof', 'strlength', 'strlessthan',
    'strnotequal', 'strnotequalnocase', 'strpiece', 'strrchr',
    'strspellcandidate', 'strspellcompare', 'strstartswith', 'strsubst',
    'strtolower', 'strtotitle', 'strtoupper', 'strtrim', 'strunescape',
    'struniquechars', 'strval', 'strwrap', 'succeed', 'suffix', 'system',
    'take', 'today', 'topdir', 'truncate', 'unknown', 'unpackdirs', 'up',
    'uppercase', 'urlbase', 'urltofile', 'var', 'vareq', 'varfn',
    'varfnarray', 'vargt', 'varinlist', 'varlt', 'varne', 'varstrs', 'varz',
    'wnhypnymstoconcept', 'wninit', 'wnsensestoconcept', 'wordindex',
    'wordpath', 'writekb', 'xaddlen', 'xaddnvar', 'xdump', 'xinc', 'xmlstr',
    'xrename'
  ];

  // Region markers structure every pass: @RULES holds the pattern rules,
  // @POST/@PRE/@CHECK the code attached to them, @CODE and @DECL plain code.
  // The closing form is @@RULES, @@CODE, ...; a bare @@ ends one rule.
  const REGION = {
    scope: 'meta',
    match: /@@?(?:CHECK|CODE|DECL|MULTI|NODES|PATH|POST|POSTCODE|PRE|RECURSE|RULES|SELECT)\b|@@/
  };

  // Special node names that match classes of text: _xWILD, _xALPHA, ...
  const NODE_CONSTANT = {
    scope: 'variable.constant',
    match: /\b_(?:xALPHA|xANY|xBLANK|xCAP|xCAPLET|xCTRL|xEMOJI|xEND|xEOF|xLET|xNIL|xNUM|xPUNCT|xSTART|xVAR|xWHITE|xWILD|ROOT)\b/
  };

  // Every other leading-underscore name is a parse-tree node (_noun, _money).
  const NODE = {
    scope: 'type',
    match: /\b_[A-Za-z]\w*/
  };

  // A literal character in a rule is backslash-escaped: \. \, \- \(
  const LITERAL_CHAR = {
    scope: 'char.escape',
    match: /\\./
  };

  // N("x"), S("x"), X("x"), G("x"), L("x") reach node, semantic, context,
  // global and local variables.
  const ACCESSOR = {
    scope: 'variable.language',
    match: /\b[NSXGL](?=\s*\()/
  };

  const BUILTIN_CALL = {
    scope: 'built_in',
    match: regex.concat(/\b/, regex.either(...BUILTINS), /(?=\s*\()/)
  };

  // Function names are case-sensitive in the engine (AddWord is not the
  // built-in addword), but the statements if/else/while/return are not, so the
  // grammar is case-sensitive and the keywords spell out both cases.
  const anyCase = (word) => word.replace(/[a-z]/g, (c) => `[${c}${c.toUpperCase()}]`);
  const STATEMENTS = [ 'if', 'else', 'while', 'return' ].map(anyCase).join('|');

  const KEYWORD = {
    scope: 'keyword',
    match: new RegExp(`\\b(?:${STATEMENTS})\\b`)
  };

  // Any other call. The statements are excluded so `if (` and `while (` stay
  // keywords.
  const FUNCTION_CALL = {
    scope: 'title.function.invoke',
    match: new RegExp(`\\b(?!(?:${STATEMENTS})\\b)[A-Za-z]\\w*(?=\\s*\\()`)
  };

  const COMMENTS = [
    hljs.HASH_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE
  ];

  const VALUES = [
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE
  ];

  // [...] after a rule element holds its modifiers: [opt], [s], [min=2 match=(...)].
  const ELEMENT_MODIFIERS = {
    begin: /\[/,
    end: /\]/,
    keywords: {
      // The keys the engine accepts (nlp-engine lite/ielt.cpp).
      attr: [
        'attr', 'attrs', 'base', 'cap', 'da', 'dcc', 'deacc', 'deaccent', 'debug',
        'dejunk', 'dj', 'except', 'excepts', 'fail', 'fails', 'gp', 'group', 'layer',
        'layers', 'length', 'lengthr', 'look', 'lookahead', 'lowercase', 'match',
        'matches', 'max', 'min', 'nest', 'numrange', 'o', 'one', 'opt', 'option',
        'optional', 'pass', 'passes', 'plus', 'recurse', 'regexp', 'regexpi', 'ren',
        'rename', 's', 'singlet', 'star', 't', 'tree', 'trig', 'trigger', 'unknown',
        'unsealed', 'uppercase', 'var', 'vareq', 'vargt', 'varlt', 'varne', 'varz',
        'xs', 'xsinglet', 'xt', 'xtree'
      ]
    },
    contains: [
      ...COMMENTS,
      ...VALUES,
      LITERAL_CHAR,
      NODE_CONSTANT,
      NODE,
      ACCESSOR,
      BUILTIN_CALL,
      FUNCTION_CALL,
      'self'
    ]
  };

  return {
    name: 'NLP++',
    aliases: [ 'nlp' ],
    contains: [
      ...COMMENTS,
      REGION,
      KEYWORD,
      {
        scope: 'operator',
        match: /<-/
      },
      ELEMENT_MODIFIERS,
      LITERAL_CHAR,
      ...VALUES,
      NODE_CONSTANT,
      NODE,
      ACCESSOR,
      BUILTIN_CALL,
      FUNCTION_CALL
    ]
  };
}

module.exports = nlpplus;
