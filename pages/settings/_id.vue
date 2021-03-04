<template>
  <div class="settings-container">
    <NavHeader :is-drop-down-enable="true" />
    <div class="settings-menu-container">
      <div class="settings-left-container">
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
      </div>
      <div class="settings-right-container">
        <button class="settings-menu" @click="openSideBar">
          <fa-icon icon="bars" class="icon" />
        </button>

        <div class="view-container">
          <Profile v-if="viewName === TAB_TYPE_MODEL.PROFILE" />
          <Auth v-if="viewName === TAB_TYPE_MODEL.AUTH" />
          <Users v-if="viewName === TAB_TYPE_MODEL.USERS" />
          <Teams v-if="viewName === TAB_TYPE_MODEL.TEAMS" />
        </div>
      </div>
      <SideBar :open.sync="open" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SideBar, {
  TAB_TYPE_MODEL,
  TabModel,
  tabModels,
} from '@/components/organisms/tool/SideBar.vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import Profile from '@/components/organisms/settings/Profile.vue'
import Auth from '@/components/organisms/settings/Auth.vue'
import Users from '@/components/organisms/settings/Users.vue'
import Teams from '@/components/organisms/settings/Teams.vue'

type DataType = {
  TAB_TYPE_MODEL: typeof TAB_TYPE_MODEL
  tabModels: TabModel[]
  open: boolean
}

export default Vue.extend({
  components: {
    NavHeader,
    Profile,
    Auth,
    Users,
    Teams,
    SideBar,
  },
  data(): DataType {
    return {
      TAB_TYPE_MODEL,
      tabModels,
      open: false,
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
  methods: {
    openSideBar() {
      this.open = true
    },
  },
})
</script>

<style lang="scss" scoped>
.settings-container {
  background-color: rgb(32, 32, 32);

  .settings-menu-container {
    display: flex;
    flex-flow: row nowrap;
    margin: 16px auto;

    .settings-left-container {
      min-width: 220px;
      @media only screen and (max-width: 700px) {
        display: none;
      }
    }
    .settings-right-container {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      width: 100%;

      .settings-menu {
        display: none;
        @media only screen and (max-width: 700px) {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          height: 40px;
          width: 80px;
          font-size: 20px;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          border: 0;
          .icon {
            margin-right: 4px;
            font-size: 28px;
          }
        }
      }
      .view-container {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        background-color: rgb(32, 32, 32);
      }
    }
  }
}
</style>
