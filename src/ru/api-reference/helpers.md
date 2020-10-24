# Помощники

## Параметр `options`

В дополнение к параметрам, используемым в вызове помощника, объект `options` передаётся помощнику в качестве дополнительного параметра.

- `lookupProperty(object, propertyName)`: функция, которая возвращает «собственное свойство» объекта. Эти функции соблюдают белые списки, указанные в `allowedProtoProperties` и `allowedProtoMethods`. Пример:

  <ExamplePart examplePage="/ru/examples/helper-lookup-property.md" show="preparationScript" />

- TODO: Опишите все варианты, которые передаются помощникам
