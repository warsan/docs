---
layout: InteractivePlaygroundLayout
example:
  template: |-
    {{#> layout}}
      {{#*inline "nav"}}
        Мой Nav
      {{/inline}}
      {{#*inline "content"}}
        Мой контент
      {{/inline}}
    {{/layout}}
  partials:
    layout: |-
      <div class="nav">
        {{> nav}}
      </div>
      <div class="content">
        {{> content}}
      </div>
---
