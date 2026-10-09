/*
Language: NLP++
Description: NLP++, a programming language for natural language processing. An analyzer is a sequence of passes; each pass matches pattern rules against a parse tree and runs code when a rule fires.
Author: David de Hilster <dehilster@gmail.com>
Website: https://visualtext.org/nlp/
Category: misc
*/

export default function(hljs) {
  const regex = hljs.regex;

  // Engine built-in functions, from the VisualText extension's language
  // data. Highlighted only when called, because the same words (next, single,
  // str, ...) also appear as literal text in @RULES. That list also carries the
  // statements if/else/while/return, which have help pages of their own; here
  // they are keywords, so they are left out of this list.
  const BUILTINS = [
    'abs', 'addarg', 'addattr', 'addcnode', 'addconcept', 'addconval',
    'addnode', 'addnumval', 'addstmt', 'addstrs', 'addstrval', 'addsval',
    'addword', 'arraylength', 'attrchange', 'attrexists', 'attrname',
    'attrtype', 'attrvals', 'attrwithval', 'batchstart', 'cap', 'cbuf',
    'ceiling', 'closefile', 'conceptname', 'conceptpath', 'conval', 'cout',
    'coutreset', 'dballocstmt', 'dbbindcol', 'dbclose', 'dbexec',
    'dbexecstmt', 'dbfetch', 'dbfreestmt', 'dbopen', 'deaccent', 'debug',
    'dictfindword', 'dictfirst', 'dictgetword', 'dictnext', 'down', 'eltnode',
    'excise', 'exitpass', 'exittopopup', 'factorial', 'fail', 'fileout',
    'findana', 'findattr', 'findattrs', 'findconcept', 'findhierconcept',
    'findnode', 'findphrase', 'findroot', 'findvals', 'findwordpath',
    'firstnode', 'floor', 'flt', 'fltval', 'fncallstart', 'fprintgvar',
    'fprintnvar', 'fprintxvar', 'fprintvar', 'gdump', 'getconcept',
    'getconval', 'getnumval', 'getpopupdata', 'getstrval', 'getsval', 'ginc',
    'gp', 'group', 'gtolower', 'guniq', 'hitconf', 'inc', 'inheritval',
    'inputrange', 'inputrangetofile', 'interactive', 'kbdumptree',
    'lasteltnode', 'lastnode', 'length', 'lengthr', 'levenshtein',
    'lextagger', 'listadd', 'listnode', 'LJ', 'lj', 'log', 'logten', 'lookup',
    'lowercase', 'makeconcept', 'makeparentconcept', 'makephrase', 'makestmt',
    'merge', 'merger', 'mkdir', 'mod', 'movecleft', 'movecright', 'movesem',
    'ndump', 'next', 'nextattr', 'nextval', 'ninc', 'nodeconcept',
    'nodeowner', 'noop', 'num', 'numrange', 'numval', 'openfile', 'or',
    'pathconcept', 'percentstr', 'permuten', 'phraselength', 'phraseraw',
    'phrasetext', 'pncopyvars', 'pndown', 'pninsert', 'pnmakevar', 'pnname',
    'pnnext', 'pnprev', 'pnreplaceval', 'pnroot', 'pnsingletdown', 'pnup',
    'pnvar', 'pnvarnames', 'pow', 'pranchor', 'prchild', 'preaction',
    'printvar', 'pndeletechilds', 'pnrename', 'prev', 'print', 'printr',
    'prlit', 'prrange', 'prtree', 'prunephrases', 'prxtree', 'randomint',
    'regexp', 'regexpi', 'renameattr', 'renamechild', 'renameconcept',
    'renamenode', 'replaceval', 'resolveurl', 'returnstmt', 'rfaaction',
    'rfaactions', 'rfaarg', 'rfaargtolist', 'rfacode', 'rfaelement', 'rfaelt',
    'rfaexpr', 'rfalist', 'rfalitelt', 'rfalittoaction', 'rfalittopair',
    'rfaname', 'rfanodes', 'rfanonlit', 'rfanonlitelt', 'rfanum', 'rfaop',
    'rfapair', 'rfapairs', 'rfapostunary', 'rfapres', 'rfarange',
    'rfarecurse', 'rfarecurses', 'rfaregion', 'rfaregions', 'rfarule',
    'rfarulelts', 'rfarulemark', 'rfarules', 'rfarulesfile', 'rfaselect',
    'rfastr', 'rfasugg', 'rfaunary', 'rfavar', 'rfbarg', 'rfbdecl',
    'rfbdecls', 'rightjustifynum', 'rmattr', 'rmattrs', 'rmattrval',
    'rmchild', 'rmchildren', 'rmconcept', 'rmcphrase', 'rmnode', 'rmphrase',
    'rmval', 'rmvals', 'rmword', 'round', 'sdump', 'setbase', 'setlookahead',
    'setunsealed', 'single', 'singler', 'singlex', 'singlezap',
    'sortconsbyattr', 'sortchilds', 'sorthier', 'sortphrase', 'sortvals',
    'spellcandidates', 'spellcorrect', 'spellword', 'splice', 'split',
    'sqlstr', 'sqrt', 'startout', 'stem', 'stopout', 'str', 'strchar',
    'strchr', 'strchrcount', 'strclean', 'strcontains', 'strcontainsnocase',
    'strendswith', 'strequal', 'strequalnocase', 'strescape', 'strunescape',
    'strgreaterthan', 'strisalpha', 'strisdigit', 'strislower', 'strisupper',
    'strlength', 'strlessthan', 'strnotequal', 'strnotequalnocase',
    'strpiece', 'strrchr', 'strspellcandidate', 'strspellcompare',
    'strstartswith', 'strsubst', 'strtolower', 'strtotitle', 'strtoupper',
    'strtrim', 'strval', 'strwrap', 'succeed', 'suffix', 'system', 'take',
    'today', 'topdir', 'truncate', 'unknown', 'unpackdirs', 'up', 'uppercase',
    'urlbase', 'urltofile', 'var', 'vareq', 'varfn', 'varfnarray',
    'varinlist', 'varne', 'varstrs', 'varz', 'wninit', 'wnsensestoconcept',
    'wnhypnymstoconcept', 'whilestmt', 'wordindex', 'wordpath', 'writekb',
    'xaddlen', 'xaddnvar', 'xdump', 'xinc', 'xmlstr', 'xrename'
  ];

  // Region markers structure every pass: @RULES holds the pattern rules,
  // @POST/@PRE/@CHECK the code attached to them, @CODE and @DECL plain code.
  // The closing form is @@RULES, @@CODE, ...; a bare @@ ends one rule.
  const REGION = {
    scope: 'meta',
    match: /@@?(?:CHECK|CODE|DECL|GROUP|MULTI|NODES|PATH|POST|PRE|RECURSE|RULES|SELECT)\b|@@/
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

  // Any other call. The statements are excluded so `if (` and `while (` stay
  // keywords.
  const FUNCTION_CALL = {
    scope: 'title.function.invoke',
    match: /\b(?!(?:if|else|while|return)\b)[A-Za-z]\w*(?=\s*\()/
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
      attr: [
        'attr', 'attrs', 'base', 'da', 'deacc', 'deaccent', 'except', 'excepts', 'fail',
        'fails', 'gp', 'group', 'layer', 'layers', 'look', 'lookahead', 'match',
        'matches', 'max', 'min', 'nest', 'o', 'one', 'opt', 'option', 'optional',
        'pass', 'passes', 'plus', 'recurse', 'ren', 'rename', 's', 'singlet',
        'star', 't', 'tree', 'trig', 'trigger', 'unsealed'
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
    case_insensitive: true,
    keywords: {
      keyword: [ 'if', 'else', 'while', 'return' ]
    },
    contains: [
      ...COMMENTS,
      REGION,
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
