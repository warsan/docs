---
layout: InteractivePlaygroundLayout
example:
  template: |
    {{>header}}
    <hr/>
    {{#each persons}}
    {{>person person=.}}
    {{/each}}
  partials:
    header: |
      {{persons.length}} persons found
    person: |
      Персоне {{loud person.name}} исполнилось {{person.age}} лет.
  preparationScript: |
    Handlebars.registerHelper('loud', function (aString) {
        return aString.toUpperCase()
    })
  input:
    persons:
      - name: Nils
        age: 20
      - name: Teddy
        age: 10
      - name: Nelson
        age: 40
---
