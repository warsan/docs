---
layout: InteractivePlaygroundLayout
example:
  template: |-
    {{#with city as | city |}}
      {{#with city.location as | loc |}}
        {{city.name}}: {{loc.north}} {{loc.east}}
      {{/with}}
    {{/with}}
  input:
    city:
      name: San Francisco
      summary: Сан-Франциско - это <b>культурный центр</b> в <b>Северной Калифорнии</b>
      location:
        north: "37.73,"
        east: -122.44
      population: 883305
---
