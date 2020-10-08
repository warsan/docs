import { executeExample } from "./execute-example";
import Handlebars from "handlebars";

describe("the handlebars runner", () => {
  it("следует запустить простой пример", () => {
    expect(runWithAppliedDefaultValues({ template: "{{name}}", input: '{ name: "Erwin"}' })).toEqual("Erwin");
  });

  it("должен регистрировать части", () => {
    expect(
      runWithAppliedDefaultValues({
        template: "template {{>partial}}",
        partials: [{ name: "partial", content: "partial {{name}}" }],
        input: '{ name: "Erwin"}'
      })
    ).toEqual("template partial Erwin");
  });

  it("должен выполнить сценарий подготовки", () => {
    expect(
      runWithAppliedDefaultValues({
        template: "{{loud name}}",
        // language=JavaScript
        preparationScript: 'Handlebars.registerHelper("loud", function (arg) { return arg.toUpperCase() })',
        input: '{ name: "Erwin"}'
      })
    ).toEqual("ERWIN");
  });

  it("должен выдавать ошибки синтаксического анализа", () => {
    expect(() => runWithAppliedDefaultValues({ template: "{{loud" })).toThrow();
  });
});

function runWithAppliedDefaultValues(incompleteExample) {
  const exampleDefaults = { template: "", partials: [], preparationScript: "", input: "{}" };
  return executeExample(Handlebars, { ...exampleDefaults, ...incompleteExample });
}
