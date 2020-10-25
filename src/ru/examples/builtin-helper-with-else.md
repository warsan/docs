---
layout: InteractivePlaygroundLayout
example:
  template: |+
    {{#with city}}
    {{city.name}} (не показано, поскольку нет города)
    {{else}}
    Город не найден
    {{/with}}
  input:
    person:
      firstname: Yehuda
      lastname: Katz
---
