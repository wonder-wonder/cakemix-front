<template>
  <div class="document-switch-container">
    <DocSwitchButton
      :icon-type="'pencil'"
      :is-selected="selectedRef === 1"
      @click="selected(1)"
    />
    <DocSwitchButton
      :icon-type="'split'"
      :is-selected="selectedRef === 2"
      @click="selected(2)"
    />
    <DocSwitchButton
      :icon-type="'eye'"
      :is-selected="selectedRef === 3"
      @click="selected(3)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DocSwitchButton from '@/components/atoms/document/DocSwitchButton.vue'

@Component({
  components: {
    DocSwitchButton,
  },
})
export default class DocSwitch extends Vue {
  get selectedRef() {
    return this.$store.state.editor.displayType
  }

  selected(ref: number) {
    this.$store.commit('editor/displayType', ref)
  }
}
</script>

<style lang="scss">
.document-switch-container {
  display: inline-flex;
  flex-flow: row nowrap;
  border-radius: 5px;
  background-color: white;
}
</style>
