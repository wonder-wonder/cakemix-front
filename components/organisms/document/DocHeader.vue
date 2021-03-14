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
    <div class="spacing" />
    <DocRealtimeCounter :users="users" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import DocNav from '@/components/molecules/document/DocNav.vue'
import DocSwitch from '@/components/molecules/document/DocSwitch.vue'
import DocSimpleSwitch from '@/components/molecules/document/DocSimpleSwitch.vue'
import DocSwitchButton from '@/components/atoms/document/DocSwitchButton.vue'
import DocRealtimeCounter from '@/components/molecules/document/DocRealtimeCounter.vue'
import { UserModel } from '@/scripts/model/user/manager'

export default Vue.extend({
  components: {
    DocNav,
    DocSwitch,
    DocSimpleSwitch,
    DocSwitchButton,
    DocRealtimeCounter,
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
    users: {
      type: Array as PropType<UserModel[]>,
      default: [],
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
  .spacing {
    width: 100%;
  }
}
</style>
