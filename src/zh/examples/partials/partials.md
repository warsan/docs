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
      Человеку {{person.name}} исполнилось {{person.age}} лет.
  input:
    persons:
      - name: Nils
        age: 20
      - name: Teddy
        age: 10
      - name: Nelson
        age: 40
---
# test

```handlebars
test
```
