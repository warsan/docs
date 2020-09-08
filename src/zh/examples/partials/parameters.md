---
layout: InteractivePlaygroundLayout
example:
  template: "{{> myPartial parameter=favoriteNumber }}"
  partials:
    myPartial: "Результат - {{parameter}}"
  input:
    favoriteNumber: 123
---
