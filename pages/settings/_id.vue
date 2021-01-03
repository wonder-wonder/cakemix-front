<template>
  <div class="settings-container">
    <NavHeader :is-drop-down-enable="true" />
    <Tabs class="tabs-container" :current="viewName" />
    <div class="view-container">
      <Profile v-if="viewName === TAB_TYPE_MODEL.PROFILE" />
      <Auth v-if="viewName === TAB_TYPE_MODEL.AUTH" />
      <Users v-if="viewName === TAB_TYPE_MODEL.USERS" />
      <Teams v-if="viewName === TAB_TYPE_MODEL.TEAMS" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import Tabs, { TAB_TYPE_MODEL } from '@/components/organisms/settings/Tabs.vue'
import Profile from '@/components/organisms/settings/Profile.vue'
import Auth from '@/components/organisms/settings/Auth.vue'
import Users from '@/components/organisms/settings/Users.vue'
import Teams from '@/components/organisms/settings/Teams.vue'

type DataType = {
  TAB_TYPE_MODEL: typeof TAB_TYPE_MODEL
}

export default Vue.extend({
  components: {
    NavHeader,
    Tabs,
    Profile,
    Auth,
    Users,
    Teams,
  },
  data(): DataType {
    return {
      TAB_TYPE_MODEL,
    }
  },
  computed: {
    viewName(): string {
      return this.$route.params.id
    },
  },
  created() {
    const view = Object.values(this.TAB_TYPE_MODEL).filter(
      v => v === this.viewName
    )
    if (view.length === 0) {
      this.$router.push(`/settings/profile`)
    }
  },
})
</script>

<style lang="scss" scoped>
.settings-container {
  background-color: rgb(32, 32, 32);

  .tabs-container {
    margin: 32px auto;
    overflow: scroll;
  }
  .view-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background-color: rgb(32, 32, 32);
  }
}
</style>
