<template>
  <div class="signup-container">
    <NavHeader :is-drop-down-enable="false" />
    <SignupBox class="signup-box" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SignupBox from '@/components/organisms/auth/SignupBox.vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import { AuthApi } from '@/scripts/api/index'
import { failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getDesc } from '@/scripts/model/toast/index'
import { getTitle, PAGES } from '@/scripts/model/head/index'

export default Vue.extend({
  components: {
    NavHeader,
    SignupBox,
  },
  head: {
    title: getTitle(PAGES.SIGNUP),
  },
  computed: {
    signupToken() {
      return this.$route.params.id
    },
  },
  created() {
    new AuthApi().getAuthRegistPreToken(this.signupToken).catch(err => {
      failureToast(
        // @ts-ignore
        this.$buefy,
        getDesc(TOAST_TYPE.TOKEN_VERITY).failure,
        err.response.status
      )
      this.$router.push('/')
    })
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.signup-container {
  height: 100%;
  width: 100vw;

  .signup-box {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    max-width: 320px;
    width: 100vw;
    border-radius: 8px;
  }
}
</style>
