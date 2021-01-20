<template>
  <div class="doc-nav-box" @click="$emit('toParentFolder')">
    <div class="image-box">
      <fa-icon icon="chevron-left" />
    </div>
    <div class="service-name" v-text="'Cakemix'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.doc-nav-box {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  .image-box {
    height: 42px;
    width: 42px;
    border-radius: 50%;
    padding: 3px 0px 0px 11px;
    font-size: 24px;
    color: black;
    background-color: whitesmoke;
  }

  .service-name {
    font-family: 'Righteous';
    font-size: 24px;
    padding: 0 16px;
    color: white;
  }
}
</style>
