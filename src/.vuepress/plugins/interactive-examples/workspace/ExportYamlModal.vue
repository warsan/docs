<template>
  <Modal :show="show" class="export-yaml-modal" @close="$emit('close')">
    <template v-slot:header>Export YAML</template>
    <p>
      Можно скопировать yaml-код ниже как обложку для примера страницы.
    </p>
    <hr />
    <pre class="yaml-contents" disabled v-text="yaml"></pre>
  </Modal>
</template>
<script lang="js">
import Modal from "../../../private-components/Modal.vue";

export default {
  components: { Modal },
  props: {
    yaml: {type: String, required: false, default: null},
  },
  computed: {
    show() {
      return this.$props.yaml != null
    }
  }
}
</script>
<style scoped lang="stylus">
.yaml-contents {
    overflow: auto;
}
</style>
