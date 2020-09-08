let template = "Handlebars <b>{{doesWhat}}</b> предварительно скомпилирован!";
let Handlebars = require("handlebars");
let compiled = Handlebars.precompile(template);
console.log(compiled);