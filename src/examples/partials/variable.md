---
layout: InteractivePlaygroundLayout
example:
  template: |
    {{> (lookup . 'myVariable') }}
  partials:
    lookupMyPartial: Найден!
  input:
    myVariable: lookupMyPartial
---
