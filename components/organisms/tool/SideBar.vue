<template>
  <section>
    <b-sidebar
      class="sidebar"
      :open="open"
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
              @click="$router.push(`/settings/${model.id}`)"
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
  SECURITYLOG: 'security-log',
  SESSION: 'session',
} as const

export type TabModel = {
  id: string
  label: string
  icon: string
}

export const tabModels = [
  {
    id: TAB_TYPE_MODEL.PROFILE,
    label: 'Profile',
    icon: 'badge-account-horizontal-outline',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.AUTH,
    label: 'Authentication',
    icon: 'lock-reset',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.USERS,
    label: 'Users',
    icon: 'account',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.TEAMS,
    label: 'Teams',
    icon: 'account-group',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.SECURITYLOG,
    label: 'Security log',
    icon: 'file-chart',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.SESSION,
    label: 'Session',
    icon: 'cellphone-link',
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
