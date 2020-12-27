<template>
  <div class="editor-header">
    <DocNav class="doc-nav-box" :folder-id="parentId" />
    <DocSwitch />
    <DocSwitchButton
      :icon-type="'question'"
      :is-selected="false"
      @click="$emit('input', 'question')"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DocNav from '@/components/molecules/document/DocNav.vue'
import DocSwitch from '@/components/molecules/document/DocSwitch.vue'
import DocSwitchButton from '@/components/atoms/document/DocSwitchButton.vue'

type DataType = {
  parentId: string
}

export default Vue.extend({
  components: {
    DocNav,
    DocSwitch,
    DocSwitchButton,
  },
  data(): DataType {
    return {
      parentId: '',
    }
  },
  created() {
    // TODO: api call to get parent id
    this.parentId = ''
  },
})
</script>

<style lang="scss">
.editor-header {
  display: flex;
  align-items: center;
  position: relative;
  width: 100vw;
  padding: 0 16px;
  background-color: black;

  .home-icon-box {
    margin-right: 16px;
  }
}
</style>
