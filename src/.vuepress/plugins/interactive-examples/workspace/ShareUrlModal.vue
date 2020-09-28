<template>
  <Modal :show="show" @close="$emit('close')">
    <template v-slot:header>Поделитесь этим примером </template>
    <p>Вставляйте этот URL-адрес в проблемы с github, 
      чтобы поделиться своими настройками при регистрации ошибок или вопросов.
    </p>
    <hr />
    <input ref="urlInput" type="text" :value="urlForSharing" class="url-for-sharing" onfocus="this.select()" />
    <button @click="copyToClipboard">Скопировать в буфер обмена</button>
    <div class="share">
      <button @click="reportSecurityIssue">Сообщить о рисках</button>
      <button @click="askQuestion">Для вопроса на github</button>
      <button @click="fileBug">Ошибка файла на github</button>
    </div>
    <div v-show="successNotification" class="success-notification">{{ successNotification }}</div>
  </Modal>
</template>
<script lang="js">
  import Modal from "../../../private-components/Modal.vue";
  import Vue from "vue";

  export default {
    components: { Modal },
    props: {
      urlForSharing: { type: String, required: false, default: null }
    },
    data() {
      return {
        successNotification: null
      };
    },
    computed: {
      show() {
        return this.$props.urlForSharing != null;
      }
    },
    watch: {
      show() {
        Vue.nextTick(() => this.$refs.urlInput.select());
      }
    },
    methods: {
      copyToClipboard() {
        this.$refs.urlInput.select();
        document.execCommand("copy");
        this.notifySuccess("URL скопирован в буфер обмена");
      },
      notifySuccess(message) {
        this.$data.successNotification = message;
        setTimeout(() => this.successNotification = null, 2000);
      },

      askQuestion() {
        const issueBody = `
* [ ] Это НЕ проблема безопасности !! Если да, отправьте отчет по адресу https://www.npmjs.com/advisories/report?package=handlebars**

# Пример ссылки

${this.$props.urlForSharing}

# Вопрос

`;
        document.location.href = `https://github.com/wycats/handlebars.js/issues/new?body=${encodeURIComponent(issueBody)}`;
      },
      fileBug() {
        const issueBody = `
* [ ] Это НЕ проблема безопасности !! Если да, отправьте отчет по адресу https://www.npmjs.com/advisories/report?package=handlebars**

# Описание ошибки

# Пример ссылки

${this.$props.urlForSharing}

# Ожидаемый результат

# Фактический результат `;
        document.location.href = `https://github.com/wycats/handlebars.js/issues/new?body=${encodeURIComponent(issueBody)}`;
      },
      reportSecurityIssue() {
        const body = `

--Insert description here--

Вот URL-адрес для проверки проблемы:

${this.$props.urlForSharing}

`;
        document.location.href = `mailto:security@npmjs.com?body=${encodeURIComponent(body)}`;
      }
    }
  };
</script>
<style scoped lang="stylus">
.url-for-sharing {
    width: 100%;
}

.success-notification {
    color: green;
    border: 1px solid green;
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
}

.share {
    border: 1px dashed $baseColor;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
}
</style>
