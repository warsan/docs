/* eslint-disable */
/*
Это версия языка Handlebars, которая была представлена в highlight.js в

https://github.com/highlightjs/highlight.js/pull/2344

В настоящее время он добавлен к вехе 10.1 highlight.js и может быть устаревшим, когда используется эта версия.

Language: Handlebars
Requires: xml.js
Author: Robin Ward <robin.ward@gmail.com>
Description: Matcher для рулей, а также дополнений EmberJS.
Website: https://handlebarsjs.com
Category: template
*/
export default function(hljs) {
  var BUILT_INS = {
    "builtin-name":
      "action bindattr collection component concat debugger " +
      "each each-in get hash if in input link-to loc log lookup " +
      "mut outlet partial query-params render template textarea unbound " +
      "unless view with yield"
  };

  var LITERALS = {
    literal: "true false undefined null"
  };

  // как определено в https://handlebarsjs.com/guide/expressions.html#literal-segments 
  // это регулярное выражение сегменты литерал, как ' abc ' или [ abc ],
  // а также помощники и пути, как a/b, ./abc/cde, и abc.bcd
  var IDENFIFIER_REGEX = /(".*?"|'.*?'|\[.*?\]|[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+|\.|\/)+/;

  // идентификатор, за которым следует знак равенства (без знака равенства)
  var HASH_PARAM_REGEX = /(".*?"|'.*?'|\[.*?\]|[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+)(?==)/;

  var HELPER_NAME_OR_PATH_EXPRESSION = {
    begin: IDENFIFIER_REGEX,
    lexemes: /[\w.\/]+/
  };

  var HELPER_PARAMETER = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: LITERALS
  });

  var SUB_EXPRESSION = {
    illegal: /\}\}/,
    begin: /\(/,
    end: /\)/
    // "contains" добавляется ниже, когда определены все необходимые подрежимы
  };

  var HASH = {
    // fka "назначение-атрибута", параметры формы 'ключ=значение'
    className: "attr",
    illegal: /\}\}/,
    begin: HASH_PARAM_REGEX,
    relevance: 0,
    starts: {
      begin: /=/,
      end: /=/,
      starts: {
        contains: [hljs.NUMBER_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, HELPER_PARAMETER, SUB_EXPRESSION]
      }
    }
  };

  var BLOCK_PARAMS = {
    // параметры формы '{{#with x as | y |}}...{{/with}}'
    begin: /as\s+\|/,
    keywords: { keyword: "as" },
    end: /\|/,
    contains: [
      { // определить подрежим, чтобы предотвратить выделение параметра блока с именем "as"
        begin: /\w+/,
        keywords: ""
      }
    ]
  };

  var HELPER_PARAMETERS = {
    contains: [
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      BLOCK_PARAMS,
      HASH,
      HELPER_PARAMETER,
      SUB_EXPRESSION
    ],
    returnEnd: true
    // свойство "end" определяется через наследование при использовании режима.
    // Если зависит от окружающего режима, но "ndsWithParent" здесь не работает
    // (т.е. включает в себя конечный маркёр окружающего режима)
  };

  var SUB_EXPRESSION_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    className: "name",
    keywords: BUILT_INS,
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /\)/
    })
  });

  SUB_EXPRESSION.contains = [SUB_EXPRESSION_CONTENTS];

  var OPENING_BLOCK_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: BUILT_INS,
    className: "name",
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /}}/
    })
  });

  var CLOSING_BLOCK_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: BUILT_INS,
    className: "name"
  });

  var BASIC_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    className: "name",
    keywords: BUILT_INS,
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /}}/
    })
  });

  var ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH = { begin: /\\\{\{/, skip: true };
  var PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH = { begin: /\\\\(?=\{\{)/, skip: true };

  return {
    name: "Handlebars",
    aliases: ["hbs", "html.hbs", "html.handlebars", "htmlbars"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH,
      PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH,
      hljs.COMMENT(/\{\{!--/, /--\}\}/),
      hljs.COMMENT(/\{\{!/, /\}\}/),
      {
        // открываем необработанный блок "{{{{raw}}}} контент не оценивается {{{{/ raw}}}}}"
        className: "template-tag",
        begin: /\{\{\{\{(?!\/)/,
        end: /\}\}\}\}/,
        contains: [OPENING_BLOCK_MUSTACHE_CONTENTS],
        starts: { end: /\{\{\{\{\//, returnEnd: true, subLanguage: "xml" }
      },
      {
        // закрыть необработанный блок
        className: "template-tag",
        begin: /\{\{\{\{\//,
        end: /\}\}\}\}/,
        contains: [CLOSING_BLOCK_MUSTACHE_CONTENTS]
      },
      {
        // инструкция открытого блока
        className: "template-tag",
        begin: /\{\{#/,
        end: /\}\}/,
        contains: [OPENING_BLOCK_MUSTACHE_CONTENTS]
      },
      {
        className: "template-tag",
        begin: /\{\{(?=else\}\})/,
        end: /\}\}/,
        keywords: "else"
      },
      {
        // оператор закрытия блока
        className: "template-tag",
        begin: /\{\{\//,
        end: /\}\}/,
        contains: [CLOSING_BLOCK_MUSTACHE_CONTENTS]
      },
      {
        // переменная шаблона или вспомогательный вызов, который НЕ экранирован html
        className: "template-variable",
        begin: /\{\{\{/,
        end: /\}\}\}/,
        contains: [BASIC_MUSTACHE_CONTENTS]
      },
      {
        // переменная шаблона или вспомогательный вызов с экранированием html
        className: "template-variable",
        begin: /\{\{/,
        end: /\}\}/,
        contains: [BASIC_MUSTACHE_CONTENTS]
      }
    ]
  };
}
