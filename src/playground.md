---
layout: InteractivePlaygroundLayout
example:
  template: |
    {{firstname}} {{loud lastname}}
  partials:
  preparationScript: |
    Handlebars.registerHelper('loud', function (aString) {
        return aString.toUpperCase()
    })
  input:
    firstname: Yehuda
    lastname: Katz
---

<!--
 Эта страница действует как начальная страница для общих примеров. 
 Основная цель наличия такой страницы состоит в том, чтобы ее URL-адрес не изменялся, 
 чтобы старые общие URL-адреса оставались действительными.
-->
