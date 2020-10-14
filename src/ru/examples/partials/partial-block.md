---
layout: InteractivePlaygroundLayout
example:
  template: |-
    {{#> layout }}
    Мой контент
    {{/layout}}
  partials:
    layout: Контент сайта {{> @partial-block }}
---
