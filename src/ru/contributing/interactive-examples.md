# Создание интерактивных примеров

[[toc]]

Можно определить интерактивные примеры. Примеры или части примера могут быть **встроены в любую страницу**. Автоматическое соединение позволяет посетителю открыть пример в **playground**, где он может менять шаблоны, входные данные и сразу увидеть полученный результат.

## Создание примеров

Чтобы определить пример, создайте новый файл разметки в каталоге `examples`. Данные примера определены в начале страницы, на которую имеется ссылка. См. [all-features-example-raw](../examples/all-features.md) для полной демонстрации всех функций.

Поддерживаются следующие свойства frontmatter:

- `layout`: Всегда должен быть `InteractivePlaygroundLayout`.
- `example`: Содержит пример
  - `template`: Основной шаблон Handlebars
  - `partials`: Объект со свойством on для каждой зарегистрированной части, ключ - это частичное имя, значение - частичное содержимое
  - `preparationScript`: Скрипт, который выполняется перед компиляцией и запуском шаблона. `Handlebars` доступен как глобальная переменная в этом скрипте.
  - `input`: Входной шаблон как встроенный YAML-объект.
  - `errorExpected`: Логическое значение (по умолчанию: `false`), указывающее, что в этом примере ожидается ошибка. По умолчанию примеры, которые вызывают ошибку во время выполнения, приводят к сбою сборки всего сайта. Если вы пишете пример, описывающий ошибку, вам нужно установить этот флаг в значение `true`.

Выходные данные примера автоматически вычисляются с использованием последней версии Handlebars.

## Пример данных

Если возможно, в примерах следует использовать варианты общего набора данных. Следовательно, файл [src/examples/\_example-base-data.yaml](https://github.com/handlebars-lang/docs/blob/master/src/examples/_example-base-data.yaml) содержит данные, которые можно использовать повторно и адаптировать к каждому примеру. Если данных в этом файле недостаточно, добавьте новые данные, но убедитесь, что они каким-то образом связаны.

## Встраивание частей примера.

Компонент `<ExamplePart>` позволяет вам показать часть примера в текущем месте.

```md
<ExamplePart examplePage="/ru/examples/builtin-helper-each-block" show="template"/>
```

приведёт к

<ExamplePart examplePage="/ru/examples/builtin-helper-each-block" show="template"/>

Реквизит для этого компонента:

- `examplePage`: путь к странице примера под папкой `src`
- `show`: Часть примера, которую нужно вставить на страницу. Возможные значения: `template`, `input`, `output`, `error`, `preparationScript` и `partial`.
- `name` (optional): Эта опция нужна только когда `show ="partial"`. Она определяет имя партиала, который следует вставить в пример.

Компонент очень полезен, если вы хотите встроить части примера в плавный текст. Вы можете вставить входной JSON с помощью `<ExamplePart examplePage="/ru/examples/all-features" show="input" />` и на странице появится следующий фрагмент кода:

<ExamplePart examplePage="/ru/examples/all-features" show="input" />

Затем, чтобы показать читателю шаблон, вы можете использовать `show="template"` с тем же `examplePage`.

<ExamplePart examplePage="/ru/examples/all-features" show="template" />

Вы можете визуализировать партиал, используя, например, `show=partial` и `name=person`

<ExamplePart examplePage="/ru/examples/all-features" show="partial" name="person"/>

Если у вас есть пример с помощниками, вы также можете включить сценарий подготовки:

<ExamplePart examplePage="/ru/examples/all-features" show="preparationScript" />

## Горизонтальная планировка

Если вы хотите расположить две части примера горизонтально, вы можете использовать компонент `<Flex>`.

```md
<Flex>
<ExamplePart examplePage="/ru/examples/builtin-helper-each-block" show="template"/>
<ExamplePart examplePage="/ru/examples/builtin-helper-each-block" show="input"/>
</Flex>
```

становится

<Flex>
<ExamplePart examplePage="/ru/examples/builtin-helper-each-block" show="template"/>
<ExamplePart examplePage="/ru/examples/builtin-helper-each-block" show="input"/>
</Flex>
