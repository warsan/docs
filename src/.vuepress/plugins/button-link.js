/* eslint-env node */

export function buttonLink() {
  return {
    name: "button link",
    extendMarkdown(md) {
      // Добавьте правило постобработки, которое предоставляет все ссылки с текстом типа «Подробнее:» css-class «кнопка-подробнее»
      md.inline.ruler2.push("button_link", function learnMore(state) {
        if (state.src.startsWith("!button[")) {
          const token = state.tokens[1];
          if (token && token.type === "link_open") {
            token.attrPush(["class", "button-link"]);
            state.tokens.shift();
          }
        }
      });
    }
  };
}
