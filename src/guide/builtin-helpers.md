# Встроенные помощники

## #if

Вы можете использовать помощник `if` для условного рендеринга блока. Если его аргумент возвращает `false`, `undefined`, `null`, `""`, `0` или `[]`, Handlebars не будет отображать блок.

<ExamplePart examplePage="/examples/builtin-helper-if-block.md" show="template" />

Когда вы передаете следующий ввод в вышеуказанный шаблон

<ExamplePart examplePage="/examples/builtin-helper-if-block.md" show="input" />

Это даст результат, как показано ниже:

<ExamplePart examplePage="/examples/builtin-helper-if-block.md" show="output" />

Если на входе пустой объект JSONObject `{}`, тогда `author` станет `undefined` и условие `if` не выполнится, в результате чего вывод будет следующим:

```html
<div class="entry"></div>
```

При использовании выражения блока вы можете указать раздел шаблона для запуска, если выражение возвращает ложное значение. Раздел, помеченный как `else`, называется "else разделом".

<ExamplePart examplePage="/examples/builtin-helper-ifelse-block.md" show="template" />

### Подвыражения

Помощники - это предлагаемый способ добавления пользовательской логики в шаблоны. Вы можете написать любой помощник и использовать его в подвыражении.

Например, при проверке инициализации переменной встроенная проверка `#if` может не подходить, так как она возвращает false для пустых коллекций (см. [Utils.isEmpty](/api-reference/utilities.html#handlebars-utils-isempty-value)).

Вы можете написать помощника, который проверяет наличие «неопределенного», например:

<ExamplePart examplePage="/examples/builtin-helper-if-subexpression.md" show="preparationScript" />

Затем используйте свой помощник как подвыражение:

<ExamplePart examplePage="/examples/builtin-helper-if-subexpression.md" show="template" />

## #unless

Вы можете использовать помощник `unless` как обратный помощнику` if`. Его блок будет отрисован, если выражение вернет ложное значение.

<ExamplePart examplePage="/examples/builtin-helper-unless-block.md" show="template" />

Если поиск `license` в текущем контексте возвращает ложное значение, Handlebars выдаст предупреждение. В противном случае он ничего не отобразит.

## #each

Вы можете перебирать список с помощью встроенного помощника `each`. Внутри блока вы можете использовать `this` для ссылки на повторяемый элемент.

<ExamplePart examplePage="/examples/builtin-helper-each-block.md" show="template" />

при использовании с этим контекстом:

<ExamplePart examplePage="/examples/builtin-helper-each-block.md" show="input" />

приведет к:

<ExamplePart examplePage="/examples/builtin-helper-each-block.md" show="output" />

Вы можете использовать выражение `this` в любом контексте для ссылки на текущий контекст.

Вы можете дополнительно предоставить раздел `else`, который будет отображаться только тогда, когда список пуст.

<ExamplePart examplePage="/examples/builtin-helper-eachelse-block.md" show="template" />

::: v-pre

При просмотре элементов в `each` вы можете дополнительно ссылаться на текущий индекс цикла через `{{@index}}`.

```handlebars
{{#each array}} {{@index}}: {{this}} {{/each}}
```

Кроме того, для итерации объекта `{{@key}}` ссылается на текущее имя ключа:

```handlebars
{{#each object}} {{@key}}: {{this}} {{/each}}
```

Первый и последний шаги итерации отмечаются переменными `@first` и `@last` при итерации по массиву.
При итерации по объекту доступен только `@first`. Каждый вложенный блок может обращаться к итерационным переменным через пути на основе глубины. Например, для доступа к родительскому индексу можно использовать `{{@../index}}`.

:::

## #with

Вспомогательная функция `with` позволяет вам изменить контекст оценки части шаблона.

<ExamplePart examplePage="/examples/builtin-helper-with-block.md" show="template" />

при использовании с этим контекстом:

<ExamplePart examplePage="/examples/builtin-helper-with-block.md" show="input" />

приведёт к:

<ExamplePart examplePage="/examples/builtin-helper-with-block.md" show="output" />

`with` также может использоваться с параметрами блока для определения известных ссылок в текущем блоке. Пример выше можно преобразовать в

<ExamplePart examplePage="/examples/builtin-helper-with-block-param.md" show="template" />

Это позволяет сложным шаблонам потенциально предоставлять более ясный код, чем позволяют подробные ссылки `../`.

::: v-pre

Вы можете дополнительно предоставить раздел `{{else}}`, который будет отображаться, только если переданное значение пусто.

:::

<Flex>
<ExamplePart examplePage="/examples/builtin-helper-with-else.md" show="template" />
<ExamplePart examplePage="/examples/builtin-helper-with-else.md" show="input" />
</Flex>

## lookup

Помощник `lookup` позволяет динамическое разрешение параметров с помощью переменных Handlebars.

Это полезно для разрешения значений в индексах массива.

<ExamplePart examplePage="/examples/builtin-helper-lookup.md" show="template" />

Его также можно использовать для поиска свойств объекта на основе данных из ввода. Ниже приведен более сложный пример, в котором `lookup` в подвыражении используется для изменения контекста оценки на другой объект на основе значения свойства.

<ExamplePart examplePage="/examples/builtin-helper-lookup-dynamic-property.md" show="template" />

## log

Помощник `log` позволяет вести журнал состояния контекста при выполнении шаблона.

<ExamplePart examplePage="/examples/builtin-helper-log.md" show="template" />

Он делегирует `Handlebars.logger.log`, который может быть переопределен для выполнения настраиваемого ведения журнала.

Этому методу можно передать любое количество аргументов, и все они будут отправлены регистратору.

<ExamplePart examplePage="/examples/builtin-helper-log-multiple-params.md" show="template" />

Уровень журнала может быть установлен с помощью параметра хеширования уровня. Поддерживаемые значения: отладка, информация, предупреждение и ошибка. Если опущено, по умолчанию используется информация,

Ведение журнала является условным в зависимости от уровня и значения, установленного в `Handlebars.logger.level`, которое по умолчанию равно `info`. Будут выведены все операторы журнала на текущем уровне или выше.

<ExamplePart examplePage="/examples/builtin-helper-log-loglevel.md" show="template" />
