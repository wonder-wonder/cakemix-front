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
  computed: {
    passwdToken() {
      return this.$route.params.id
    },
  },
  created() {
    if (this.passwdToken === '') {
      this.failureToast(1)
      this.$router.push('/auth/passwd')
      return
    }
    new AuthApi(this.$store.getters['auth/config'])
      .getPassResetVerify(this.passwdToken)
      .then(() => {
        this.successToast()
        this.isVerified = true
      })
      .catch(() => {
        this.failureToast(2)
        this.$router.push('/auth/passwd')
      })
  },
  methods: {
    successToast() {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Token was verified',
        type: 'is-success',
      })
    },
    failureToast(err: Number) {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: `Token verification Failed [ Error : ${err} ]`,
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
