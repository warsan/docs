---
layout: InteractivePlaygroundLayout
example:
  template: |-
    {{#each paragraphs}}
    <p>{{this}}</p>
    {{else}}
    <p class="empty">Нет контента</p>
    {{/each}}
  input: {}
---
