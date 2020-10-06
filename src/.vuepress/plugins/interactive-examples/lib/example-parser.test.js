import { ExampleParser } from "./example-parser";
import { multilineBlock } from "../../../../../test-utils/multilineblock";

describe("парсер примера", () => {
  it("должен разобрать простой пример", () => {
    let parser = new ExampleParser({
      template: "{{name}}\n",
      input: { name: "Erwin" }
    });

    expect(parser.parse()).toEqual({
      error: null,
      input: '{ name: "Erwin" }\n',
      output: "Erwin\n",
      partials: [],
      preparationScript: "",
      template: "{{name}}\n"
    });
  });

  it("должен правильно разобрать пример с помощником", () => {
    let parser = new ExampleParser({
      template: "{{helper}}\n",
      // language=JavaScript
      preparationScript: 'Handlebars.registerHelper("helper", () => "abc");\n',
      input: {}
    });

    expect(parser.parse()).toEqual({
      error: null,
      input: "{}\n",
      output: "abc\n",
      partials: [],
      preparationScript: 'Handlebars.registerHelper("helper", () => "abc");\n',
      template: "{{helper}}\n"
    });
  });

  it("должен правильно разобрать пример с частичными", () => {
    let parser = new ExampleParser({
      template: "{{> myPartial}}\n",
      partials: {
        myPartial: "Hello"
      },
      input: {}
    });

    expect(parser.parse()).toEqual({
      error: null,
      input: "{}\n",
      output: "Hello",
      partials: [
        {
          name: "myPartial",
          content: "Hello"
        }
      ],
      preparationScript: "",
      template: "{{> myPartial}}\n"
    });
  });

  it("должен рассматривать отсутствующий ввод как 'null'", () => {
    let parser = new ExampleParser({
      template: "{{> myPartial}}\n",
      partials: {
        myPartial: "Hello"
      }
    });

    expect(parser.parse()).toEqual({
      error: null,
      input: "null\n",
      output: "Hello",
      partials: [
        {
          name: "myPartial",
          content: "Hello"
        }
      ],
      preparationScript: "",
      template: "{{> myPartial}}\n"
    });
  });

  it("должен сохранять ошибки, возникающие при выполнении", () => {
    let parser = new ExampleParser({
      template: "{{helper}}",
      // language=JavaScript
      preparationScript: multilineBlock`
Handlebars.registerHelper("helper", () => {
  throw new Error("Test-Error");
});
`,
      input: {}
    });

    const parsedExample = parser.parse();

    expectErrorInExample(parsedExample, "Test-Error");
  });

  it("должен сохранять ошибки, возникающие при разборе шаблона", () => {
    let parser = new ExampleParser({
      template: "{{helper",
      input: {}
    });

    const parsedExample = parser.parse();

    expectErrorInExample(
      parsedExample,
      "Ошибка синтакс-анализа на линии 1:\n{{helper\n--^\nОжидая 'ID', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'NULL', 'DATA', got 'INVALID'"
    );
  });

  it("должен сохранять ввод, даже если выполнится с ошибкой", () => {
    let parser = new ExampleParser({
      template: "{{helper",
      input: { someVariable: 3 }
    });

    const parsedExample = parser.parse();

    expect(parsedExample.input).toContain("someVariable");
  });
});

function expectErrorInExample(parsedExample, errorMessage) {
  expect(parsedExample).toBeTruthy();
  expect(parsedExample.error).toBeTruthy();
  expect(parsedExample.error.message).toEqual(errorMessage);
  expect(parsedExample.error.stack).toBeTruthy();
  expect(parsedExample.output).toBeNull();
}
