import { serializeToYaml } from "./example-serializer";
import { safeLoad } from "js-yaml";

describe("пример-сериализатор", () => {
  it("должен скрывать пустые партиалы и сценарий подготовки и ввод", () => {
    assertYamlEquals(
      serializeToYaml({
        error: null,
        input: "{  }\n",
        output: "\n",
        partials: [],
        preparationScript: "",
        template: "{{name}}\n"
      }),
      `
template: |
  {{name}}
`
    );
  });

  it("должен анализировать ввод как json5", () => {
    assertYamlEquals(
      serializeToYaml({
        error: null,
        input: "{ name: 'Erwin' }\n",
        output: "Erwin\n",
        partials: [],
        preparationScript: "",
        template: "{{name}}\n"
      }),
      `
template: |
  {{name}}
input:
  name: Erwin
    `
    );
  });

  it("должен преобразовать частный список в объект с частным именем в качестве ключей", () => {
    assertYamlEquals(
      serializeToYaml({
        error: null,
        input: "{}\n",
        output: "\n",
        partials: [
          {
            name: "partial1",
            content: "{{name1}}"
          },
          {
            name: "partial2",
            content: "{{name2}}"
          }
        ],
        preparationScript: "",
        template: ""
      }),
      `
      template: ''
      partials:
        partial1: '{{name1}}'
        partial2: '{{name2}}'
    `
    );
  });

  it("должен возвращать свойства yaml в правильном порядке ", () => {
    expect(
      serializeToYaml({
        error: null,
        preparationScript: "Handlebars.registerHelper()",
        input: "{name:'Erwin'}\n",
        partials: [
          {
            name: "p1",
            content: "{{name1}}"
          },
          {
            name: "p2",
            content: "{{name2}}"
          }
        ],
        output: "\n",
        template: ""
      })
    ).toMatch(/[\S\s]*template[\S\s]*partials[\S\s]*preparationScript[\S\s]*input/);
  });

  it("должен обработать отсутствующий ввод, подготовительный сценарий, частные данные и вывод", () => {
    assertYamlEquals(serializeToYaml({ template: "Hi there!" }), `template: 'Hi there!'`);
  });

  it("должен выбросить, если шаблон отсутствует", () => {
    expect(() => serializeToYaml({ preparationScript: "abc" })).toThrow(/must have a 'template' property/i);
  });

  it("должен выбросить, если ввод не является допустимой строкой json5", () => {
    expect(() => serializeToYaml({ template: "", input: "[ 5" })).toThrow(/Ошибка при синтаксическом анализе 'input' как json5/i);
  });
});

function assertYamlEquals(actual, expected) {
  const actualJsObject = safeLoad(actual);
  const expectedJsObject = safeLoad(expected);
  expect(actualJsObject).toEqual(expectedJsObject);
}
