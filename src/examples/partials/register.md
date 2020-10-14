---
layout: InteractivePlaygroundLayout
example:
  template: |
    {{#each persons}}
      {{>person person=.}}
    {{/each}}
  preparationScript: >
    Handlebars.registerPartial(
        "person", 
        "{{person.name}} исполнилось {{person.age}} лет.\n"
    )
  input:
    persons:
      - name: Nils
        age: 20
      - name: Teddy
        age: 10
      - name: Nelson
        age: 40
---
