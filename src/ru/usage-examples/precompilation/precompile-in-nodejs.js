let template = "Handlebars <b>{{doesWhat}}</b> Предкомпиляция！";
let Handlebars = require("handlebars");
let compiled = Handlebars.precompile(template);
console.log(compiled);
