---
layout: InteractivePlaygroundLayout
example:
  template: |-
    {{#*inline "myPartial"}}
      Мой контент
    {{/inline}}
    {{#each people}}
      {{> myPartial}}
    {{/each}}
  input:
    people:
      - firstname: Nils
      - firstname: Yehuda
---
