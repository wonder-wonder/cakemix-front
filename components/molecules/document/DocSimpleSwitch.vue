<template>
  <b-tooltip
    label="This is read-only document"
    position="is-bottom"
    type="is-info"
    :animated="true"
    :active="showToolTip"
  >
    <div class="document-switch-container">
      <DocSwitchButton
        v-if="selected === 1"
        :is-selected="selected === 1"
        @click="updateStatus()"
      >
        <fa-icon icon="pencil-alt" />
      </DocSwitchButton>
      <DocSwitchButton
        v-if="selected === 2"
        :is-selected="selected === 2"
        @click="updateStatus()"
      >
        <fa-icon icon="columns" />
      </DocSwitchButton>
      <DocSwitchButton
        v-if="selected === 3"
        :is-selected="selected === 3"
        @click="updateStatus()"
      >
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
    isMobile: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    showToolTip(): boolean {
      return !this.isEditable
    },
    selected(): number {
      return this.$store.getters['editor/displayType']
    },
  },
  created() {
    const state = this.isEditable ? (this.isMobile ? 1 : 2) : 3
    this.$store.commit('editor/displayType', state)
  },
  methods: {
    updateStatus() {
      if (this.isEditable) {
        let state = this.selected + 1
        state = state === 2 && this.isMobile ? 3 : state
        state = state > 3 ? 1 : state
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
  border-radius: 5px;
}
</style>
