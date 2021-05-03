<template>
  <div class="editor-header">
    <DocNav class="doc-nav-box" @toParentFolder="$emit('toParentFolder')" />
    <DocSwitch v-if="isLoaded && !isMobile" :is-editable="isEditable" />
    <DocSimpleSwitch
      v-if="isLoaded && isMobile"
      :is-mobile="isMobile"
      :is-editable="isEditable"
    />
    <div class="spacing" />

    <ActionMenu
      :position="'is-bottom-left'"
      :current-folder-id="currentFolderId"
      :model="document"
      :model-type="'DOCUMENT'"
      :is-nav-header="true"
      @openPrintView="$emit('openPrintView')"
      @deleted="$emit('toParentFolder')"
      @willDelete="$emit('willDelete')"
      @cannotDelete="$emit('cannotDelete')"
    >
      <DocSwitchButton>
        <fa-icon icon="bars" class="action-menu" />
      </DocSwitchButton>
    </ActionMenu>
    <DocRealtimeCounter :users="users" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import DocNav from '@/components/molecules/document/DocNav.vue'
import ActionMenu from '@/components/organisms/folder/ActionMenu.vue'
import DocSwitch from '@/components/molecules/document/DocSwitch.vue'
import DocSimpleSwitch from '@/components/molecules/document/DocSimpleSwitch.vue'
import DocSwitchButton from '@/components/atoms/document/DocSwitchButton.vue'
import DocRealtimeCounter from '@/components/molecules/document/DocRealtimeCounter.vue'
import { UserModel } from '@/scripts/model/user/manager'
import { DocumentModel } from '@/scripts/api/index'

export default Vue.extend({
  components: {
    DocNav,
    ActionMenu,
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
    document: {
      type: Object as PropType<DocumentModel>,
      default: {} as DocumentModel,
    },
    currentFolderId: {
      type: String,
      default: '',
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
  .action-menu {
    color: white;
  }
}
</style>
