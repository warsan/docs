---
layout: InteractivePlaygroundLayout
example:
  template: |
    Geo-Coordinates :
    {{#each cities}}
       {{name}} {{#with location}} {{north}}, {{east}} {{/with}}
    {{/each}}
  partials:
  input:
    cities:
      - name: Дармштадт
        location:
          north: 49.87
          east: 8.64
      - name: Сан-Франциско
        location:
          north: 37.73
          east: -122.44
---
