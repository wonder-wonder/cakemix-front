<template>
  <div class="editor-header">
    <HomeIcon class="home-icon-box" />
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
import DocSwitch from '@/components/molecules/document/DocSwitch.vue'
import DocSwitchButton from '@/components/atoms/document/DocSwitchButton.vue'

export default Vue.extend({
  components: {
    DocSwitch,
    DocSwitchButton,
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
