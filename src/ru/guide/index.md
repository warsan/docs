# Вступление

## Что такое Handlebars?

Handlebars - это простой **язык шаблонов**.

Он использует шаблон и входной объект для создания HTML или других текстовых форматов. Шаблоны Handlebars выглядят как
обычный текст со встроенными выражениями Handlebars.

<ExamplePart examplePage="/examples/simple-expressions" show="template"/>

Выражение ручки - это `{{`, некоторое содержимое, за которым следует `}}`. Когда шаблон выполняется, эти выражения
заменяются значениями из входного объекта.

!button[Узнать больше: Выражения](expressions.html)

## Установка

Самый быстрый способ проверить Handlebars - загрузить его с _CDN_ и встроить в файл HTML.

<<< @/src/usage-examples/compiler-and-runtime/simple-console-out.html

::: warning Предупреждение

Этот метод можно использовать для небольших страниц и для тестирования. Есть несколько других способов использования
Handlebars, когда вы ориентируетесь на реальные производственные системы.

!button[Узнать больше: Установка](../installation/index.md)

:::

# Особенности языка

## Простые выражения

Как показано ранее, следующий шаблон определяет два выражения Handlebars

<ExamplePart examplePage="/examples/simple-expressions" show="template"/>

Если применяется к входному объекту

<ExamplePart examplePage="/examples/simple-expressions" show="input"/>

выражения будут заменены соответствующими свойствами. Результат тогда

<ExamplePart examplePage="/examples/simple-expressions" show="output"/>

## Вложенные объекты ввода

Иногда входные объекты содержат другие объекты или массивы. Например:

<ExamplePart examplePage="/examples/path-expressions-dot" show="input" />

В таком случае вы можете использовать точечную нотацию, чтобы получить доступ к вложенным свойствам.

<ExamplePart examplePage="/examples/path-expressions-dot" show="template"/>

!button[Узнай больше: Выражения](./expressions.md)

Некоторые встроенные помощники позволяют изменять текущий контекст на вложенный объект. Затем вы можете получить доступ
к этому объекту, как если бы это был корневой объект.

## Контекст оценки

Встроенные помощники блоков `each` и `with` позволяют вам изменять текущий контекст оценки.

Вспомогательная функция `with` погружается в свойство объекта, предоставляя вам доступ к его свойствам.

<Flex>
<ExamplePart examplePage="/examples/builtin-helper-with-block" show="template"/>
<ExamplePart examplePage="/examples/builtin-helper-with-block" show="input"/>
</Flex>

Вспомогательная функция `each` выполняет итерацию по массиву, позволяя вам получить доступ к свойствам каждого объекта с
помощью простых выражений ручек.

<Flex>
<ExamplePart examplePage="/examples/builtin-helper-each-block" show="template"/>
<ExamplePart examplePage="/examples/builtin-helper-each-block" show="input"/>
</Flex>

!button[Подробнее: Встроенные помощники](./builtin-helpers.md)

## Комментарии к шаблону

::: v-pre

Вы можете использовать комментарии в коде руля так же, как и в своем коде. Так как обычно существует некоторый уровень
логики, это хорошая практика.

Комментарии не будут в итоговом выводе. Если вы хотите, чтобы комментарии появлялись. Просто используйте комментарии
html, и они будут выведены.

Любые комментарии, которые должны содержать `}}` или другие токены дескрипторов, должны использовать синтаксис
`{{!-- --}}`.

:::

<ExamplePart examplePage="/examples/comments" show="template"/>

## Пользовательские помощники

Доступ к помощникам Handlebars можно получить из любого контекста шаблона. Вы можете зарегистрировать помощник с помощью
метода Handlebars.registerHelper.

<Flex>
<ExamplePart examplePage="/examples/helper-simple" show="template" />
<ExamplePart examplePage="/examples/helper-simple" show="preparationScript" />
</Flex>

Помощники получают текущий контекст как контекст `this` функции.

<Flex>
<ExamplePart examplePage="/examples/helper-this-context" show="template" />
<ExamplePart examplePage="/examples/helper-this-context" show="preparationScript" />
</Flex>

## Блок-помощники

Выражения блоков позволяют вам определять помощников, которые будут вызывать раздел вашего шаблона с контекстом,
отличным от текущего. Эти помощники блока идентифицируются знаком `#` перед именем помощника и требуют соответствующих
закрывающих усов `/` с тем же именем. Давайте рассмотрим помощника, который будет генерировать список HTML:

<ExamplePart examplePage="/examples/helper-block" show="preparationScript" />

В примере создается помощник с именем `list` для создания нашего списка HTML. Помощник получает `people` в качестве
первого параметра и хэш `options` в качестве второго параметра. Хэш параметров содержит свойство с именем `fn`, которое
вы можете вызывать в контексте так же, как вы вызываете обычный шаблон Handlebars.

При выполнении шаблон отобразит:

<ExamplePart examplePage="/examples/helper-block" show="output" />

У помощников блоков есть больше возможностей, таких как возможность создавать раздел `else` (используется, например,
встроенным помощником `if`).

Поскольку содержимое помощника блока экранируется, когда вы вызываете `options.fn(context)`, Handlebars не экранирует
результаты помощника блока. Если бы это было так, внутреннее содержимое было бы экранировано дважды!

!button[Узнать больше: Блок-помощники](block-helpers.html)

## HTML-экранирование

::: v-pre

Поскольку он изначально был разработан для генерации HTML, Handlebars экранирует значения, возвращаемые `{{выражение}}`.
Если вы не хотите, чтобы Handlebars экранировал значение, используйте "тройной притон", `{{{`.

:::

<ExamplePart examplePage="/examples/html-escaping" show="template" />

Специальные символы во второй строке будут экранированы:

<ExamplePart examplePage="/examples/html-escaping" show="output" />

Handlebars не избегает `Handlebars.SafeString`. Если вы пишете помощник, который генерирует свой собственный HTML, вы
обычно захотите вернуть `new Handlebars.SafeString(result)`. В таком случае вам нужно будет вручную экранировать
параметры.

<ExamplePart examplePage="/examples/helper-safestring" show="preparationScript" />

Это позволит избежать переданных параметров, но пометить ответ как безопасный, поэтому Handlebars не будет пытаться
избежать его, даже если "тройной тайник" не используется.

::: warning Предупреждение

Handlebars не экранирует строки JavaScript. Использование Handlebars для генерации JavaScript, например встроенных
обработчиков событий, потенциально может привести к уязвимостям межсайтового скриптинга.

:::

## Части

Частичные элементы Handlebars позволяют повторно использовать код путем создания общих шаблонов. Вы можете
зарегистрировать частичное использование метода `registerPartial`:

<ExamplePart examplePage="/examples/partials/register" show="preparationScript" />

Следующий шаблон и ввод:

<Flex>
<ExamplePart examplePage="/examples/partials/register" show="template" />
<ExamplePart examplePage="/examples/partials/register" show="input" />
</Flex>

даст следующий результат:

<ExamplePart examplePage="/examples/partials/register" show="output" />

!button[Узнать больше: Частичные](partials.html)

## Встроенные помощники

Handlebars предлагает множество встроенных помощников, таких как условное if и каждый итератор.

!button[Узнать больше: Встроенные помощники](builtin-helpers.html)

## Справочник по API

Handlebars предлагает множество API-интерфейсов и служебных методов для приложений и помощников.

!button[Узнать больше: Справочник по API](/api-reference/)
