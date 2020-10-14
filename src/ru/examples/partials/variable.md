---
layout: InteractivePlaygroundLayout
example:
  template: |
    {{> (lookup . 'myVariable') }}
  partials:
    lookupMyPartial: Нашёл!
  input:
    myVariable: lookupMyPartial
---
