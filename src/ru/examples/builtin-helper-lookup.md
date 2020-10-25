---
layout: InteractivePlaygroundLayout
example:
  template: |+
    {{#each people}}
       {{.}} живёт в {{lookup ../cities @index}}
    {{/each}}
  input:
    people:
      - Nils
      - Yehuda
    cities:
      - Darmstadt
      - San Francisco
---
