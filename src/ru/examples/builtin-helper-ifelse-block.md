---
layout: InteractivePlaygroundLayout
example:
  template: |-
    <div class="entry">
    {{#if author}}
    <h1>{{firstName}} {{lastName}}</h1>
    {{else}}
    <h1>Неизвестный автор</h1>
    {{/if}}
    </div>
  input:
    author: false
    firstName: Yehuda
    lastName: Katz
---
