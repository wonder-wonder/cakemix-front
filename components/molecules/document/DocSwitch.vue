<template>
  <b-tooltip
    label="This is read-only document"
    position="is-bottom"
    type="is-info"
    :animated="true"
    :active="showToolTip"
  >
    <div class="document-switch-container">
      <DocSwitchButton :is-selected="selected === 1" @click="updateStatus(1)">
        <fa-icon icon="pencil-alt" />
      </DocSwitchButton>
      <DocSwitchButton :is-selected="selected === 2" @click="updateStatus(2)">
        <fa-icon icon="columns" />
      </DocSwitchButton>
      <DocSwitchButton :is-selected="selected === 3" @click="updateStatus(3)">
        <fa-icon icon="eye" />
      </DocSwitchButton>
    </div>
  </b-tooltip>
</template>

<script lang="ts">
import Vue from 'vue'
import DocSwitchButton from '@/components/atoms/document/DocSwitchButton.vue'

export default Vue.extend({
  components: {
    DocSwitchButton,
  },
  props: {
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showToolTip(): boolean {
      return !this.isEditable
    },
    selected(): boolean {
      return this.$store.getters['editor/displayType']
    },
  },
  created() {
    this.$store.commit('editor/displayType', this.isEditable ? 2 : 3)
  },
  methods: {
    updateStatus(state: number) {
      if (this.isEditable) {
        this.$store.commit('editor/displayType', state)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.document-switch-container {
  display: inline-flex;
  flex-flow: row nowrap;
  border-radius: 8px;
  color: black;
  background-color: white;
}
</style>
