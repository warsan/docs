let template = "Handlebars <b>{{doesWhat}}</b> Предскомпилирован！";
let Handlebars = require("handlebars");
let compiled = Handlebars.precompile(template);
console.log(compiled);
