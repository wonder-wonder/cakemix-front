<template>
  <div class="document-switch-container">
    <DocSwitchButton
      :icon-type="'pencil'"
      :is-selected="selected === 1"
      @click="updateStatus(1)"
    />
    <DocSwitchButton
      :icon-type="'split'"
      :is-selected="selected === 2"
      @click="updateStatus(2)"
    />
    <DocSwitchButton
      :icon-type="'eye'"
      :is-selected="selected === 3"
      @click="updateStatus(3)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DocSwitchButton from '@/components/atoms/document/DocSwitchButton.vue'

export default Vue.extend({
  components: {
    DocSwitchButton,
  },
  computed: {
    selected() {
      return this.$store.getters['editor/displayType']
    },
  },
  created() {
    this.updateStatus(2)
  },
  methods: {
    updateStatus(status: number) {
      this.$store.commit('editor/displayType', status)
    },
  },
})
</script>

<style lang="scss">
.document-switch-container {
  display: inline-flex;
  flex-flow: row nowrap;
  border-radius: 5px;
  color: white;
  background-color: gray;
}
</style>
