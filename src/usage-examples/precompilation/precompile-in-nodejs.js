let template = "Handlebars <b>{{doesWhat}}</b> предскомпилирован!";
let Handlebars = require("handlebars");
let compiled = Handlebars.precompile(template);
console.log(compiled);