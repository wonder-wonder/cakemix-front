<template>
  <div class="signup-verify-container">
    <NavHeader :is-drop-down-enable="false" />
    <section class="signup-verify-box">
      <b-progress size="is-large" />
    </section>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import { AuthApi } from '@/scripts/api/index'
import { successToast, failureToast } from '@/scripts/utils/toast'
import { getTitle, PAGES } from '@/scripts/model/head/index'

export default Vue.extend({
  components: {
    NavHeader,
  },
  head: {
    title: getTitle(PAGES.VERIFY_TOKEN),
  },
  computed: {
    signupToken() {
      return this.$route.params.id
    },
  },
  created() {
    if (this.signupToken === '') {
      // @ts-ignore
      failureToast(this.$buefy, 'Signup failed', 1)
      this.$router.push('/auth/login')
      return
    }
    new AuthApi(this.$store.getters['auth/config'])
      .postRegistVerify(this.signupToken)
      .then(() => {
        successToast(
          // @ts-ignore
          this.$buefy,
          'Signup requested, a varification url will be sent'
        )
        this.$router.push('/')
      })
      .catch(err => {
        // @ts-ignore
        failureToast(this.$buefy, 'Signup failed', err.response.status)
      })
      .finally(() => {
        this.$router.push('/auth/login')
      })
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.signup-verify-container {
  height: 100vh;
  width: 100vw;

  .signup-verify-box {
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
