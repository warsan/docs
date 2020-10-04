# (Пред)компиляция

## `Handlebars.compile(template, options)`

Компилирует шаблон, чтобы его можно было сразу выполнить.

```js
const template = Handlebars.compile("{{foo}}");
template({});
```

Поддерживает множество опций, которые изменяют способ выполнения шаблона.

::: v-pre

- `data`: Установите значение `false`, чтобы отключить отслеживание `@data`.
- `compat`: Установите значение `true`, чтобы включить рекурсивный поиск по полю.
- `knownHelpers`: Хеш, содержащий список помощников, которые, как известно, существуют (правда) во время выполнения
  шаблона. Передача этого позволяет компилятору оптимизировать ряд случаев. Встроенные помощники автоматически
  включаются в этот список и могут быть опущены, если для этого значения установлено значение `false`.
- `knownHelpersOnly`: Установите значение `true`, чтобы разрешить дальнейшую оптимизацию на основе списка известных
  помощников.
- `noEscape`: Установите значение `true`, чтобы HTML не экранировал содержимое.
- `strict`: Запускаем в строгом режиме. В этом режиме шаблоны будут бросать, а не игнорировать отсутствующие поля. Это
  имеет побочный эффект отключения обратных операций, таких как `{{^foo}}{{/foo}}`, если поля явно не включены в
  исходный объект.
- `assumeObjects`: Удаляет проверки существования объекта при перемещении по путям. Это подмножество `strict` режима,
  который генерирует оптимизированные шаблоны, когда известно, что входные данные безопасны.
- `preventIndent`: По умолчанию частичный вызов с отступом приводит к тому, что вывод всей части имеет такой же отступ.
  Это может привести к неожиданному поведению при частичной записи тегов `pre`. Установка для этого параметра значения
  `true` отключит функцию автоматического отступа.
- `ignoreStandalone`: Отключает автономное удаление тегов, если установлено значение `true`. Если установлено, блоки и
  частичные элементы, находящиеся в отдельной строке, не удаляют пробелы в этой строке.
- `explicitPartialContext`: Отключает неявный контекст для партиалов. Если этот параметр включен, частичные данные,
  которым не передано значение контекста, будут выполняться для пустого объекта.

:::

## `Handlebars.precompile(template, options)`

Предварительно компилирует данный шаблон, чтобы его можно было отправить клиенту и выполнить без компиляции.

```js
var templateSpec = Handlebars.precompile("{{foo}}");
```

Поддерживает все те же параметры, что и метод `Handlebars.compile`. Дополнительно могут пройти:

- `srcName`: Пройдёт при создании исходной карты для входного файла. При выполнении таким образом структура возврата - `{code, map}` с `code`, содержащим определение шаблона, и `map`, содержащим исходную карту.
- `destName`: Необязательный параметр, используемый вместе с `srcName` для предоставления имени файла назначения при создании исходных карт.

## `Handlebars.template(templateSpec)`

Устанавливает шаблон, который был предварительно скомпилирован с помощью `Handlebars.precompile`.

```js
var template = Handlebars.template(templateSpec);
template({});
```