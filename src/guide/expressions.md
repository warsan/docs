# Выражения

::: v-pre

Выражения Handlebars - это основная единица шаблона Handlebars. Вы можете использовать их отдельно в `{{mustache}}`, передать их помощнику Handlebars или использовать их как значения в аргументах хэша.

:::

## Основное использование

Выражения Handlebars - это некоторое содержимое, заключенное в двойные фигурные скобки `{{}}`. В приведенном ниже шаблоне `firstname` - это переменная, заключенная в двойные фигурные скобки, которая называется выражением.

<ExamplePart examplePage="/examples/simple-expressions.md" show="template" />

Если к шаблону применяется указанный ниже объект ввода

<ExamplePart examplePage="/examples/simple-expressions.md" show="input" />

Выражения компилируются для получения вывода следующим образом:

<ExamplePart examplePage="/examples/simple-expressions.md" show="output" />

## Выражения пути

Выражения Handlebars также могут быть путями, разделенными точками.

<ExamplePart examplePage="/examples/path-expressions-dot.md" show="template" />

Это выражение ищет свойство `person` во входном объекте и, в свою очередь, ищет свойства `firstname` и `lastname` внутри объекта `person`.

Передайте указанный ниже объект ввода в шаблон <ExamplePart examplePage="/examples/path-expressions-dot.md" show="input" />

Вывод будет создан следующим образом: <ExamplePart examplePage="/examples/path-expressions-dot.md" show="output" />

Handlebars также поддерживает устаревший синтаксис `/`, поэтому вы можете написать вышеуказанный шаблон как:

<ExamplePart examplePage="/examples/path-expressions-slash.md" show="template" />

## Изменение контекста

Некоторые помощники, такие как `#with` и `#each`, позволяют вам погрузиться во вложенные объекты. Когда вы включаете сегменты `../` в свой путь, Handlebars вернутся обратно в родительский контекст.

<ExamplePart examplePage="/examples/path-expressions-dot-dot" show="template" />

Несмотря на то, что имя печатается в контексте комментария, оно все равно может вернуться к основному контексту (корневому объекту), чтобы получить префикс.

::: v-pre

::: warning

Точное значение, которое будет разрешено `../`, зависит от помощника, вызывающего блок. Использование `../` необходимо только при изменении контекста. Потомки помощников, таких как `{{#each}}`, потребуют использования `../`, в то время как дочерние элементы таких помощников, как `{{#if}}` нет.

```handlebars
{{permalink}}
{{#each comments}}
  {{../permalink}}

  {{#if title}}
    {{../permalink}}
  {{/if}}
{{/each}}
```

В этом примере все вышеперечисленное ссылается на одно и то же значение префикса, даже если они расположены в разных блоках.
Это новое поведение в Handlebars 4; [примечания к выпуску](https://github.com/wycats/handlebars.js/blob/master/release-notes.md) обсуждают предыдущее поведение, а также план миграции. Handlebars также позволяет разрешать конфликты имен между помощниками и полями данных с помощью этой ссылки:

:::

## Буквальные сегменты

Идентификаторы могут быть любым символом Юникода, за исключением следующих:

_Whitespace_ `!` `"` `#` `%` `&` `'` `(` `)` `*` `+` `,` `.` `/` `;` `<` `=` `>` `@` `[` `\` `]` `^` `` ` `` `{` `|` `}` `~`

Кроме того, слова `true`, `false`, `null` и `undefined` разрешены только в первой части выражения пути.

Для ссылки на свойство, которое не является допустимым идентификатором, вы можете использовать нотацию сегментно-буквального обозначения, `[`. Вы не можете включать закрывающий `]` в литерал пути, но все остальные символы разрешены.

Строки в стиле JavaScript, `"` и `'`, также могут использоваться вместо пар `[`.

<ExamplePart examplePage="/examples/literal-segments.md" show="template" />

## HTML-экранирование

::: v-pre

В Handlebars значения, возвращаемые `{{expression}}`, экранируются HTML-escaped.
Скажем, если выражение содержит `&`, то возвращаемый HTML-выход генерируется как `&amp;`. Если вы не хотите, чтобы Handlebars экранировал значение, используйте "тройной тайник", `{{{`:

:::

В приведенном ниже шаблоне вы можете узнать, как создать экранированный и необработанный вывод HTML.

<ExamplePart examplePage="/examples/html-escaping.md" show="template" />

Передайте специальные символы в шаблон

<ExamplePart examplePage="/examples/html-escaping.md" show="input" />

::: v-pre

Выражения, заключенные в "triple-stash" (`{{{`), производят необработанный вывод. В противном случае создается вывод с экранированием HTML, как показано ниже.

:::

<ExamplePart examplePage="/examples/html-escaping.md" show="output" />

## Помощники

Помощники могут использоваться для реализации функций, которые не являются частью самого языка Handlebars.

Помощник может быть зарегистрирован во время выполнения через `Handlebars.registerHelper`, например, для того, чтобы переводить все символы строки в верхний регистр.

<ExamplePart examplePage="/examples/helper-simple.md" show="preparationScript" />

Вызов помощника Handlebars - это простой идентификатор, за которым следует ноль или более параметров (разделенных пробелом). Каждый параметр представляет собой выражение Handlebars, которое оценивается точно так же, как описано выше в разделе «Основы использования»:

<ExamplePart examplePage="/examples/helper-simple.md" show="template" />

В этом случае `loud` - это имя помощника, а `lastname` - это параметр для помощника. В шаблоне свойство ввода `lastname` будет заглавными:

<Flex>
<ExamplePart examplePage="/examples/helper-simple.md" show="input" />
<ExamplePart examplePage="/examples/helper-simple.md" show="output" />
</Flex>

### Предотвращение HTML-экранирования возвращаемых значений помощника

Когда ваш помощник возвращает экземпляр `Handlebars.Safestring`, возвращаемое значение не экранируется, даже если помощник вызывается с помощью `{{` вместо `{{{`. Вы должны позаботиться о том, чтобы все параметры были правильно экранированы с помощью `Handlebars.escapeExpression`.

<ExamplePart examplePage="/examples/helper-safestring.md" show="preparationScript" />

### Помощники с несколькими параметрами

Давайте посмотрим еще один пример помощников с двумя параметрами

<ExamplePart examplePage="/examples/helper-multiple-parameters.md" show="template" />

В этом случае Handlebars передаст помощнику ссылки два параметра: String `See Website` и значение `people.url` из предоставленного ниже входного объекта `people`.

<ExamplePart examplePage="/examples/helper-multiple-parameters.md" show="input" />

Вспомогательная функция `link` используется для создания гиперссылки, как описано в сценарии.

<ExamplePart examplePage="/examples/helper-multiple-parameters.md" show="preparationScript" />

Мы получим вывод, используя входные параметры

<ExamplePart examplePage="/examples/helper-multiple-parameters.md" show="output" />

В приведенном выше примере вы можете использовать тот же помощник с динамическим текстом на основе значения `people.text`:

<Flex>
<ExamplePart examplePage="/examples/helper-dynamic-parameters.md" show="template" />
<ExamplePart examplePage="/examples/helper-dynamic-parameters.md" show="input" />
</Flex>

### Буквальные аргументы

Вызовы вспомогательных функций также могут иметь буквальные значения, передаваемые им в качестве аргументов параметров или хеш-аргументов.  
Поддерживаемые литералы включают числа, строки, `true`, `false`, `null` и `undefined`:

<Flex>
<ExamplePart examplePage="/examples/helper-literals" show="template" />
</Flex>

### Помощники с аргументами Hash

Handlebars предоставляет помощникам дополнительные метаданные, такие как аргументы хэша, в качестве последнего параметра.

<ExamplePart examplePage="/examples/helper-hash-arguments.md" show="template" />

В этом шаблоне последний параметр `href=people.url class="people"` - это хэш-аргументы, отправленные помощнику.

Ключи в аргументах хэша должны быть простыми идентификаторами, а значения - выражениями Handlebars. Это означает, что значения могут быть простыми идентификаторами, путями или строками.

Если мы передадим в шаблон указанные ниже данные, значение `person.url` можно будет получить из объекта `person`.

<ExamplePart examplePage="/examples/helper-hash-arguments.md" show="input" />

Как описано во вспомогательном скрипте ниже, хеш-аргументы могут быть получены из последнего параметра `options` для дальнейшей обработки внутри помощника.

<ExamplePart examplePage="/examples/helper-hash-arguments.md" show="preparationScript" />

Вывод вышеуказанного помощника создается, как показано ниже

<ExamplePart examplePage="/examples/helper-hash-arguments.md" show="output" />

Handlebars также предлагает механизм для вызова помощника с блоком шаблона. Затем помощники блоков могут вызывать этот блок ноль или более раз в любом контексте, который они выбирают.

!button[Узнать больше: Блок-помощники](block-helpers.html)

### Устранение неоднозначности вызовов помощников и поиск свойств

Если помощник зарегистрирован под тем же именем, что и свойство входного объекта, помощник имеет приоритет над свойством input. Если вы хотите вместо этого разрешить свойство input, вы можете префикс его имени с помощью `./` Или `this` (или устаревшего `this/`)

<Flex>
<ExamplePart examplePage="/examples/helper-data-name-conflict" show="template" />
<ExamplePart examplePage="/examples/helper-data-name-conflict" show="input" />
<ExamplePart examplePage="/examples/helper-data-name-conflict" show="preparationScript" />
</Flex>

## Подвыражения

Handlebars предлагает поддержку подвыражений, что позволяет вызывать несколько помощников в одном усе и передавать результаты вызовов внутренних помощников в качестве аргументов внешним помощникам. Подвыражения разделяются круглыми скобками.

```handlebars
{{outer-helper (inner-helper 'abc') 'def'}}
```

В этом случае `inner-helper` будет вызываться со строковым аргументом `'abc'`, и все, что возвращает функция `inner-helper`, будет передано в качестве первого аргумента для `outer-helper` (и `'def'` будет передан как второй аргумент для `outer-helper`).

## Контроль пробелов

Пробелы в шаблоне могут быть опущены с любой стороны любого оператора усов, добавив в фигурные скобки символ `~`.
При применении все пробелы с этой стороны будут удалены до первого выражения руля или непробельного символа на этой стороне.

```handlebars
{{#each nav ~}}
  <a href="{{url}}">
    {{~#if test}}
      {{~title}}
    {{~^~}}
      Empty
    {{~/if~}}
  </a>
{{~/each}}
```

в этом контексте:

```js
{
  nav: [{ url: "foo", test: true, title: "bar" }, { url: "bar" }];
}
```

приводит к выводу без новой строки и форматирования пробелов:

```html
<a href="foo">bar</a><a href="bar">Empty</a>
```

Это расширяет стандартное поведение удаления строк, которые являются «автономными» помощниками (только помощник блока, комментарий или частичное и пробел).

```handlebars
{{#each nav}}
  <a href="{{url}}">
    {{#if test}}
      {{title}}
    {{^}}
      Empty
    {{/if}}
  </a>
{{~/each}}
```

окажет

```html
<a href="foo">
  bar
</a>
<a href="bar">
  Empty
</a>
```

## Экранирование выражений Handlebars

::: v-pre

Содержимое Handlebars может быть экранировано одним из двух способов: встроенным экранированием или необработанными помощниками блока. Встроенные escape-последовательности, созданные путем добавления к блоку усов префикса `\`. Необработанные блоки создаются с помощью фигурных скобок `{{{{` усов.

:::

```handlebars
\{{escaped}}
{{{{raw}}}}
  {{escaped}}
{{{{/raw}}}}
```

Необработанные блоки работают так же, как и другие [помощники блоков](block-helpers.html), но при этом дочерний контент обрабатывается как буквальная строка.
