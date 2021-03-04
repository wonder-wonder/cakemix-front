<template>
  <section>
    <b-sidebar
      class="sidebar"
      :open="open"
      type="is-light"
      :overlay="true"
      :fullheight="true"
      @close="$emit('update:open')"
    >
      <div class="sidebar-container">
        <b-menu>
          <b-menu-list label="SETTINGS">
            <b-menu-item
              v-for="model in tabModels"
              :key="model.id"
              :icon="model.icon"
              :label="model.label"
              @click="$router.push(`/settings/${model.route}`)"
            />
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export const TAB_TYPE_MODEL = {
  PROFILE: 'profile',
  AUTH: 'auth',
  USERS: 'users',
  TEAMS: 'teams',
} as const

export type TabModel = {
  id: string
  label: string
  icon: string
  route: string
}

export const tabModels = [
  {
    id: TAB_TYPE_MODEL.PROFILE,
    label: 'Profile',
    icon: 'badge-account-horizontal-outline',
    route: 'profile',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.AUTH,
    label: 'Authentication',
    icon: 'lock-reset',
    route: 'auth',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.USERS,
    label: 'Users',
    icon: 'account',
    route: 'users',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.TEAMS,
    label: 'Teams',
    icon: 'account-group',
    route: 'teams',
  } as TabModel,
] as TabModel[]

type DataType = {
  tabModels: TabModel[]
}

export default Vue.extend({
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data(): DataType {
    return {
      tabModels,
    }
  },
})
</script>

<style lang="scss">
.b-sidebar .sidebar-content {
  max-width: 85vw;
  width: 300px;
  background-color: #4a4a4a !important;
}

.sidebar-container {
  margin: 16px 0;
  padding: 0 !important;

  .menu-label {
    padding: 0 16px;
    font-size: 20px;
    color: white;
  }
  .menu-list {
    font-size: 20px;
    a {
      padding: 8px 24px;
      color: white;
      &:hover {
        color: black;
        background-color: whitesmoke;
      }
      &.is-active {
        color: white;
        background-color: #202020;
      }
    }
    .icon {
      margin-right: 8px;
    }
  }
}
</style>
