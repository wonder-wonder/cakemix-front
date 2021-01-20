<template>
  <div class="editor-header">
    <DocNav class="doc-nav-box" @toParentFolder="$emit('toParentFolder')" />
    <DocSwitch v-if="isLoaded && !isMobile" :is-editable="isEditable" />
    <DocSimpleSwitch
      v-if="isLoaded && isMobile"
      :is-mobile="isMobile"
      :is-editable="isEditable"
    />
    <DocSwitchButton
      v-if="isLoaded"
      :icon-type="'question'"
      :is-selected="false"
      @click="$emit('input', 'question')"
    >
      <fa-icon icon="question-circle" />
    </DocSwitchButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DocNav from '@/components/molecules/document/DocNav.vue'
import DocSwitch from '@/components/molecules/document/DocSwitch.vue'
import DocSimpleSwitch from '@/components/molecules/document/DocSimpleSwitch.vue'
import DocSwitchButton from '@/components/atoms/document/DocSwitchButton.vue'

export default Vue.extend({
  components: {
    DocNav,
    DocSwitch,
    DocSimpleSwitch,
    DocSwitchButton,
  },
  props: {
    isLoaded: {
      type: Boolean,
      default: false,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isMobile(): boolean {
      return this.$store.getters['device/isMobile']
    },
  },
})
</script>

<style lang="scss" scoped>
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
