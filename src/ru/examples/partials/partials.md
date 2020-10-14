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
      {{persons.length}} найдено людей
    person: |
      Персоне {{person.name}} исполнилось {{person.age}} лет.
  input:
    persons:
      - name: Nils
        age: 20
      - name: Teddy
        age: 10
      - name: Nelson
        age: 40
---

```handlebars
test
```
