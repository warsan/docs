# Установка

Есть множество способов установить Handlebars в зависимости от языка программирования и среды, которую вы используете.

## npm или yarn (recommended)

Эталонная реализация Handlebars написана на JavaScript. Чаще всего устанавливается с помощью `npm` или `yarn`:

```bash
npm install handlebars
# или
yarn add handlebars
```

Затем вы можете использовать Handlebars, используя `require`

```js
const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "Nils" }));
```

::: tip

Использование «npm» или «yarn» - рекомендуемый способ использования Handlebars. Если вы хотите использовать шаблоны Handlebars в
веб-браузере, мы рекомендуем вам использовать движок сборки, такой как Webpack, Browserify или Parcel.

Страница [интеграции](integrations.md) содержит список плагинов для тех загрузчиков, которые позволяют автоматически предварительно скомпилировать шаблоны или использовать Handlebars в противном случае.

!button[Learn more: Integrations](integrations.md)

:::

### Сборки браузера в npm-пакете

Сборки браузера находятся в каталоге `node_modules/handlebars/dist/`.  
Их доступность для браузера будет зависеть от того, какую систему сборки вы используете, но это может быть так же просто, как копирование файлов в доступное место.

Это предпочтительный метод установки при использовании прекомпилятора, поскольку он гарантирует, что ваши предварительно скомпилированные шаблоны всегда будут работать с одной и той же версией среды выполнения.

## Скачивание Handlebars

Следующие загрузки предоставляются для удобства сообщества. Они не предназначены для рабочего использования, но могут дать вам быстрый старт без необходимости настраивать механизм сборки.

### Последний выпуск (версия {{$handlebarsVersions.latest}})

<DownloadHandlebars>

Используйте эту версию в качестве быстрого старта, если хотите компилировать свои шаблоны в браузере.

</DownloadHandlebars>

<DownloadHandlebars :runtimeOnly="true">

Используйте эту версию, когда вы используете [пред-скомпилированные шаблоны](precompilation.md) в браузере. Эта версия не включает компилятор.

</DownloadHandlebars>

### Нереализованные сборки

Все выпущенные версии Handlebars и сборки CI доступны для загрузки в S3 на нашей [странице сборок](https://com.s3.amazonaws.com/builds.handlebarsjs/bucket-listing.html?sort=lastmod&sortdir=desc).

Самая последняя проходящая мастер-сборка называется `handlebars-latest.js`, и каждый проходящий SHA-алгоритм на мастере создает файл `handlebars-gitSHA.js`. Хотя все они проходят CI, предпочтительно использовать одну из помеченных версий.

**Note**: Страница сборок предоставляется для удобства сообщества, но вы не должны использовать ее для размещения Handlebars в рабочей среде.

## CDNs

Handlebars также размещен на нескольких бесплатных CDN.

- [cdnjs](https://cdnjs.com/libraries/handlebars.js)
- [jsDelivr](http://www.jsdelivr.com/#!handlebarsjs). Доступно расширенное использование, такое как [псевдонимы версий и сборка](https://github.com/jsdelivr/jsdelivr#usage).

## RubyGems

Официальная сборка Handlebars доступна на https://rubygems.org/gems/handlebars-source

## Bower, Component, Composer, jspm

Handlebars можно включить с помощью других менеджеров пакетов, таких как:

- Bower (deprecated)
- Component
- Composer
- jspm

См. https://github.com/components/handlebars.js для подробностей

## Применение

Вы можете доставить шаблон в браузер, включив его в тег `<script>`.

```html
<script id="entry-template" type="text/x-handlebars-template">
  <div class="entry">
    <h1>{{title}}</h1>
    <div class="body">
      {{body}}
    </div>
  </div>
</script>
```

::: предупреждение: Всегда используйте тег скрипта для вашего шаблона

Если вы используете этот метод, вам нужно обернуть свой шаблон тегом сценария. В противном случае браузер может удалить или изменить
части вашего шаблона, если вы этого не сделаете. Для примера взгляните на ["Неожиданная разметка в таблицах"](https://html.spec.whatwg.org/multipage/parsing.html#unexpected-markup-in-tables).

:::

Скомпилируйте шаблон на JavaScript с помощью Handlebars.compile

```js
var source = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);
```

Получите HTML-результат оценки шаблона Handlebars, выполнив шаблон с контекстом.

```js
var context = { title: "Мой новый пост", body: "Это мой первый пост!" };
var html = template(context);
```

приведёт к

```html
<div class="entry">
  <h1>Мой новый пост</h1>
  <div class="body">
    Это мой первый пост!
  </div>
</div>
```

### Предварительная компиляция шаблонов

В предыдущем примере мы загрузили версию Handlebars для компилятора и среды выполнения. Гораздо эффективнее заранее скомпилировать шаблоны и включить предварительно скомпилированную версию на свой веб-сайт. Вы можете включить меньшую среду выполнения, и браузеру не нужно будет компилировать шаблоны перед их запуском.

!button[Подробнее: Precompilation](precompilation.html)

## Bower (deprecated)

::: warning

[Bower is deprecated](https://bower.io/blog/2017/how-to-migrate-away-from-bower/)

Бауэр версии Handlebars по-прежнему публикуются (на данный момент) для обратной совместимости. Но если вы создаете новый проект, вы не должны использовать его больше.

:::

## Другие языки программирования

Существуют реализации `handlebars` для многих языков программирования.

- TODO: Добавьте сюда список
