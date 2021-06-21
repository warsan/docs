# Хуки

Есть несколько мест, где вы можете подключиться к вызовам функции Handlebars.

## helperMissing

Этот хук называется, когда усы или блок-заявление

- простое выражение усов не является зарегистрированным помощником AND
- не является свойством текущего контекста оценки.

Вы можете добавить пользовательские обработки для этих ситуаций, зарегистрировав помощник 'helperMissing':

<ExamplePart examplePage="ru/examples/hook-helper-missing.md" show="template" />
<ExamplePart examplePage="ru/examples/hook-helper-missing.md" show="preparationScript" />
<ExamplePart examplePage="ru/examples/hook-helper-missing.md" show="output" />

Помощник получает те же аргументы и опции ('hash', 'имя' и т.д.), как и любой пользовательский помощник или блок-помощник. `options.name` - это имя призвания помощников.

### Поведение по умолчанию

Если к усам не передаются параметры, поведение по умолчанию заключается в том, чтобы ничего не делать и игнорировать всё выражение усов или весь блок:

<Flex>
<ExamplePart examplePage="ru/examples/hook-helper-missing-default-no-param.md" show="template" />
<ExamplePart examplePage="ru/examples/hook-helper-missing-default-no-param.md" show="output" />
</Flex>

Если параметр передается в ус, Handlebars сгенерируют исключение:

<Flex>
<ExamplePart examplePage="ru/examples/hook-helper-missing-default-param.md" show="template" />
<ExamplePart examplePage="ru/examples/hook-helper-missing-default-param.md" show="error" />
</Flex>

## blockHelperMissing

Этот хук вызывается, когда

- block-expression вызывает незарегистрированный помощник,
- но имя соответствует свойству в текущем контексте оценки.

Вы можете справиться с этой ситуацией, зарегистрировав помощника с именем `blockHelperMissing`.

<ExamplePart examplePage="ru/examples/hook-block-helper-missing.md" show="template" />
<ExamplePart examplePage="ru/examples/hook-block-helper-missing.md" show="preparationScript" />
<ExamplePart examplePage="ru/examples/hook-block-helper-missing.md" show="output" />

### Поведение по умолчанию

Хук будет вызываться с разрешенным значением свойства в текущем контексте и с полем `options.name`, установленным в имя свойства.

Если перехватчик не переопределен, то реализация по умолчанию будет имитировать поведение Mustache и просто вызывать блок.

<ExamplePart examplePage="ru/examples/hook-block-helper-missing-default.md" show="template" />
<ExamplePart examplePage="ru/examples/hook-block-helper-missing-default.md" show="output" />
