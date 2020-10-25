---
layout: InteractivePlaygroundLayout
example:
  template: |
    helper: {{name}}
    data: {{./name}} или {{this/name}} или {{this.name}}
  partials:
  preparationScript: |
    Handlebars.registerHelper('name', function () {
        return "Nils"
    })
  input:
    name: Yehuda
---
