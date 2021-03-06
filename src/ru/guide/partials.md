# Части (партиалы)

Handlebars позволяет повторно использовать шаблон через партиалы. Частичные элементы - это обычные шаблоны Handlebars, которые могут напрямую вызываться другими шаблонами.

## Основные части

Чтобы использовать партиал, он должен быть зарегистрирован через `Handlebars.registerPartial`.

<ExamplePart examplePage="ru/examples/partials/basic.md" show="preparationScript"/>

Этот вызов зарегистрирует партиал `myPartial`. Части могут быть предварительно скомпилированы, а предварительно скомпилированный шаблон передан во второй параметр.

Вызов частей выполняется с помощью синтаксиса частичного вызова:

<ExamplePart examplePage="ru/examples/partials/basic.md" show="template"/>

Будет отображать партиал с именем `myPartial`. Когда партиал выполняется, он будет запущен в текущем контексте выполнения.

## Динамические части

Можно динамически выбрать партиал для выполнения с помощью синтаксиса подвыражения.

<ExamplePart examplePage="ru/examples/partials/dynamic.md" show="template"/>

Вычисляет `whichPartial` и затем отображает партиал, имя которого возвращается этой функцией.

Подвыражения не разрешают переменные, поэтому `whichPartial` должна быть функцией. Если простая переменная имеет частичное имя, её можно разрешить с помощью помощника `lookup`.

<ExamplePart examplePage="ru/examples/partials/variable.md" show="template"/>

## Частичные контексты

Можно выполнить частичное выполнение в настраиваемом контексте, передав контекст частичному вызову.

<ExamplePart examplePage="ru/examples/partials/other-context.md" show="template"/>

## Частичные параметры

Пользовательские данные могут быть переданы частям через параметры хеширования.

<ExamplePart examplePage="ru/examples/partials/parameters.md" show="template"/>

Устанавливает параметр в значение при выполнении партиала.

Это особенно полезно для предоставления данных из родительских контекстов частичному:

<ExamplePart examplePage="ru/examples/partials/parent-context.md" show="template"/>

## Частичные блоки

Нормальное поведение при попытке визуализации не найденного партиала заключается в том, что реализация выдает ошибку.
Если вместо этого требуется аварийное переключение, частичные вызовы могут быть вызваны с использованием синтаксиса блока.

<ExamplePart examplePage="ru/examples/partials/failover.md" show="template"/>

Что будет отображать `Failover content`, если партиал `myPartial` не зарегистрирован.

Этот синтаксис блока также может использоваться для передачи шаблонов в партиал, который может быть выполнен с помощью специально названного партиала, `@partial-block`. Шаблон:

<ExamplePart examplePage="ru/examples/partials/partial-block.md" show="template"/>

с партиалом `layout`, содержащим

<ExamplePart examplePage="ru/examples/partials/partial-block.md" show="partial" name="layout"/>

показал бы

<ExamplePart examplePage="ru/examples/partials/partial-block.md" show="output"/>

При таком вызове блок будет выполняться в контексте партиала во время вызова. Глубинные пути и параметры блока действуют относительно частичного блока, а не частичного шаблона.

<ExamplePart examplePage="ru/examples/partials/partial-block-parameters.md" show="template"/>

Будет отображать `child.value` из этого шаблона, а не партиала.

## Встроенные части

Шаблоны могут определять частичные элементы с блочной областью видимости через декоратор `inline`.

<ExamplePart examplePage="ru/examples/partials/inline.md" show="template"/>

Что будет отображать партиал `myPartial` для каждого дочернего элемента.

Каждый встроенный партиал доступен текущему блоку и всем дочерним элементам, включая выполнение других партиалов. Это позволяет использовать шаблоны макетов и аналогичные функции:

<ExamplePart examplePage="ru/examples/partials/inline-blocks.md" show="template"/>

Где партиал `layout` может быть:

<ExamplePart examplePage="ru/examples/partials/inline-blocks.md" show="partial" name="layout"/>
