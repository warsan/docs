# Настройка разработки

Этот сайт использует [Vuepress](https://v1.vuepress.vuejs.org/) как генератор статических страниц.  
Этот генератор статических страниц, основан на [vue.js](https://vuejs.org/) и создан для написания документации по этой структуре.

Vuepress основан на файлах markdown. Каждая HTML-страница сайта имеет соответствующий файл markdown в этом репозитории.

## Требования и рекомендуемые инструменты

Для создания и развития сайта необходимы следующие инструменты:

- NodeJS (последний LTS) и соответствующая версия `npm`

Следующие инструменты помогут вам в разработке

- Текстовый редактор, предпочтительно IDE с поддержкой Markdown, JavaScript и CSS
  [Visual Studio Code](https://code.visualstudio.com/) или
  [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/download/) возможны варианты.
- IDE-поддержка Vue.js, Markdown, JavaScript и Stylus
- Также [vue-devtools](https://github.com/vuejs/vue-devtools)

## Setup / Commands  

После клонирования репозитория вы, вероятно, захотите выполнить следующие команды:

- `npm install` (required) устанавливает библиотеки зависимостей и требуется для создания сайта.
- `npm run dev` запускает webpack-dev-сервер, обычно на порту 8080. Этот сервер имеет функцию живой перезагрузки. Стили будут автоматически обновляться при изменении исходных файлов. Изменения в markdown changes и Vue.компоненты js будут видны сразу же.  
_Обратите внимание, что изменения в файле `src/.vuepress/config.js` не являются частью live-reload и требуют перезапуска команды._  
- `npm run preview` должен быть запущен до создания pull-запроса.
Он будет очищать каталоги сборки, запускать тесты и линтеры, сайт. Предварительный просмотр сайта, похожий на производство, можно посмотреть в порту 9080

Другие команды нужны не так часто:

- `npm run fix` пытается исправить все `eslint` ошибки и запускает `prettier` чтобы всё отформатировать. Это также делается в ловушке перед фиксацией, поэтому нет необходимости запускать эту команду вручную.
- `npm run clean` удаляет все кэшированные и встроенные файлы. Это может быть полезно, если у вас есть ошибки, которые вы не можете объяснить и которые просто не исчезнут.
- Скрипты `test`,`lint`, `format` и `build` просто существуют, чтобы сделать другие команды в пакете `package.json` более читабельными.

## Различия между dev-сервером и производством

Сайт Vuepress - это Vue.приложение js. В то время как dev-сервер запускает все приложение в браузере, рабочий сайт предварительно визуализируется с последующими изменениями, выполняемыми в браузере.

Компоненты Vue.js, которые работают только в браузере, будут корректно работать на dev-сервере, но не будут работать в продакшене.

Подробнее см.
[Browser API Access Restrictions](https://v1.vuepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions)

Несколько заметок о сайте и процессах сборки

- На сайте используется тема по умолчанию Vuepress с несколькими настраиваемыми стилями.
- Файлы Markdown в этом репозитории автоматически становятся HTML-файлами на сайте.

## Файлы и каталоги

Папка `src` содержит все источники страницы. Это включает в себя

- `src/**/*.md`: Файлы Markdown, по одному для каждого HTML-файла, имеющего фактическое содержимое.
- `src/.vuepress/styles`: [stylus](http://stylus-lang.com/) файлы,  корректирующие стили CSS веб-сайта (ссылка на добавление документации TODO)
- `src/.vuepress/components`: пользовательские компоненты Vue.js и Layouts, созданные для этого сайта (TODO добавить ссылку документации)
- `src/.vuepress/public/`: корневой каталог для общедоступных файлов, которые копируются на сайт как есть.
- `src/.vuepress/plugins/`: Vuepress-плагины, созданные для этого сайта.

## Развёртывание

Развёртывание состоит из двух этапов:

- Предварительный просмотр сайта по адресу [handlebars-draft](https://handlebars-draft.knappi.org) автоматически обновляется при перемещении изменений в ветку `master`.
Страницы Github размещаются в ветви `gh-pages` этого репозитория.
- Рабочий сайт (в настоящее время временный сайт [handlebars-prod](https://handlebars-prod.knappi.org) обновляется, когда изменения помещаются в ветку `production`.
Страницы Github для рабочего сайта размещаются в ветке `master` репозитория [docs-prod-ghpages](https://github.com/handlebars-lang/docs-prod-ghpages).

В обоих случаях само развертывание выполняется через [Travis-CI job](https://travis-ci.org/handlebars-lang/docs)

Задание Travis-CI использует учетную запись [handlebars-site-bot](https://github.com/handlebars-site-bot) для обновления github-страниц этого репозитория.
