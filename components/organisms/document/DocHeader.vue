<template>
  <div class="editor-header">
    <DocSwitch />
    <DocSwitchButton
      :icon-type="'question'"
      :is-selected="false"
      @click="$emit('input', 'question')"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DocSwitch from '@/components/molecules/document/DocSwitch.vue'
import DocSwitchButton from '@/components/atoms/document/DocSwitchButton.vue'

@Component({
  components: {
    DocSwitch,
    DocSwitchButton,
  },
})
export default class DocHeader extends Vue {}
</script>

<style lang="scss">
.editor-header {
  display: flex;
  align-items: center;
  position: relative;
  width: 100vw;
  padding: 0 16px;
  background-color: grey;
}
</style>
