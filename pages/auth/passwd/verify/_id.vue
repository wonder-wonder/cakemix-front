<template>
  <div class="passwd-verify-container">
    <NavHeader :is-drop-down-enable="false" />
    <section v-if="!isVerified" class="passwd-verify-box">
      <b-progress size="is-large" />
    </section>
    <PasswdReset v-if="isVerified" class="passwd-verify-box" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import PasswdReset from '@/components/organisms/auth/PasswdReset.vue'
import { AuthApi } from '@/scripts/api/index'
import { successToast, failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getToastDesc } from '@/scripts/model/toast'
import { getTitle, PAGES } from '@/scripts/model/head/index'

export type DataType = {
  isVerified: boolean
}

export default Vue.extend({
  components: {
    NavHeader,
    PasswdReset,
  },
  data(): DataType {
    return {
      isVerified: false,
    }
  },
  head: {
    title: getTitle(PAGES.VERIFY_TOKEN),
  },
  computed: {
    passwdToken() {
      return this.$route.params.id
    },
  },
  created() {
    if (this.passwdToken === '') {
      failureToast(
        // @ts-ignore
        this.$buefy,
        getToastDesc(TOAST_TYPE.TOKEN_VERITY).failure,
        1
      )
      this.$router.push('/auth/passwd')
      return
    }
    new AuthApi(this.$store.getters['auth/config'])
      .getPassResetVerify(this.passwdToken)
      .then(() => {
        // @ts-ignore
        successToast(this.$buefy, getToastDesc(TOAST_TYPE.TOKEN_VERITY).success)
        this.isVerified = true
      })
      .catch(err => {
        failureToast(
          // @ts-ignore
          this.$buefy,
          getToastDesc(TOAST_TYPE.TOKEN_VERITY).failure,
          err.response.status
        )
        this.$router.push('/auth/passwd')
      })
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.passwd-verify-container {
  height: 100vh;
  width: 100vw;

  .passwd-verify-box {
    position: absolute;
    background-color: whitesmoke;
    top: 45%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    max-width: 320px;
    width: 100%;
    border-radius: 8px;
    padding: 16px;
  }
}
</style>
