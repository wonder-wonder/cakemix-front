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

export default Vue.extend({
  components: {
    NavHeader,
  },
  computed: {
    signupToken() {
      return this.$route.params.id
    },
  },
  created() {
    if (this.signupToken === '') {
      this.failureToast(1)
      this.$router.push('/auth/login')
      return
    }
    new AuthApi(this.$store.getters['auth/config'])
      .postRegistVerify(this.signupToken)
      .then(() => {
        this.successToast()
        this.$router.push('/')
      })
      .catch(() => {
        this.failureToast(2)
      })
      .finally(() => {
        this.$router.push('/auth/login')
      })
  },
  methods: {
    successToast() {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Signup requested, a varification url will be sent',
        type: 'is-success',
      })
    },
    failureToast(err: Number) {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: `Signup Failed [ Error : ${err} ]`,
        position: 'is-bottom',
        type: 'is-danger',
      })
    },
  },
})
</script>

<style lang="scss">
html {
  background-color: rgb(32, 32, 32);
}
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
