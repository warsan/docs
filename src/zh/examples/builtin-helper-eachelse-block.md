---
layout: InteractivePlaygroundLayout
example:
  template: |-
    {{#each paragraphs}}
    <p>{{this}}</p>
    {{else}}
    <p class="empty">Без содержания</p>
    {{/each}}
  input: {}
---
