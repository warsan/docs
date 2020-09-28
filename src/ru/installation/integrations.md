# Интеграция

Следующие пакеты интегрируют Handlebars в разные среды.
Эти пакеты  официально **не** поддерживаются командой Handlebars.

Существует несколько плагинов webpack, которые позволяют использовать Handlebars в среде Webpack.

## Webpack: handlebars-loader

[Handlebars-loader](https://github.com/pcardune/handlebars-loader) позволяет вам импортировать [предскомпилированный](./precompilation.html) шаблон.
Просто запишите свой шаблон handlebars в файл `template.handlebars` и импортируйте его, используя

```js
const compiledTemplate = require("./template.handlebars");
```

или

```js
import compiledTemplate from "./template.handlebars";
```

## Webpack: handlebars-webpack-plugin

[Handlebars-webpack-plugin](https://github.com/sagold/handlebars-webpack-plugin) использует Handlebars для статического построения ваших HTML-страниц при компиляции вашего приложения.

## Babel: handlebars-inline-precompile

[Babel-plugin-handlebars-inline-precompile](https://github.com/jamiebuilds/babel-plugin-handlebars-inline-precompile) предварительно компилирует шаблоны Handlebars, которые предоставляются как литералы шаблонов в исходном коде JavaScript:

```js
import hbs from "handlebars-inline-precompile";
const compiledTemplate = hbs`{{name}}`;
```

Пожалуйста, обратитесь к документации пакета за инструкциями по установке.

## Browserify: hbsfy

Пакет [hbsfy](https://www.npmjs.com/package/hbsfy) позволяет импортировать предварительно скомпилированные шаблоны в среде просмотра:

```js
const compiledTemplate = require("./template.handlebars");
```

## Parcel: parcel-plugin-handlebars

Есть старый плагин для parcel:
https://www.npmjs.com/package/parcel-plugin-handlebars

Но вы должны использовать одну из многих более свежих вилок этого пакета:
https://www.npmjs.com/search?q=parcel-plugin-handlebars

Самый последний из них:
https://www.npmjs.com/package/@inventory/parcel-plugin-handlebars

## Parcel: parcel-plugin-handlebars-precompile

TODO: Напишите здесь текст

https://www.npmjs.com/package/parcel-plugin-handlebars-precompile
