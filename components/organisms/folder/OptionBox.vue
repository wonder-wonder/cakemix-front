<template>
  <div class="option-box" />
</template>

<script lang="ts">
import Vue from 'vue'
// import {  } from '@/scripts/api/index'

export type DataType = {}

export default Vue.extend({
  components: {},
  data(): DataType {
    return {}
  },
  methods: {
    failureToast(err: Number) {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: `Update Failed [ Error : ${err} ]`,
        position: 'is-bottom',
        type: 'is-danger',
      })
    },
  },
})
</script>

<style lang="scss">
.option-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 24px 32px;
  background-color: white;
}
</style>
