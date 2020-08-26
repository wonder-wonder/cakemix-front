<template>
  <div class="document-box">
    <div class="icon-box">
      <i class="fa fa-file fa-fw" />
    </div>
    <div class="title-box">
      <span v-text="documentModel.title" />
    </div>
    <div class="desc1-box">
      <span v-text="documentModel.author" />
    </div>
    <div class="desc2-box">
      <span v-text="documentModel.date" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Folder extends Vue {
  @Prop({
    default: {
      title: 'Sample Document',
      author: '0eta0',
      date: '2020/08/14 22:32:51 -JST',
    },
  })
  documentModel!: any
}
</script>

<style lang="scss">
.document-box {
  display: grid;
  width: 344px;
  grid-template-rows: 32px 20px 24px;
  grid-template-columns: 64px 280px;
  border: solid 1px white;
  border-radius: 5px;
  color: white;
  background-color: black;
  transition: all 100ms;

  &:hover {
    background-color: rgb(100, 100, 100);
  }

  .icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 4;
    grid-column: 1;
    font-size: 40px;
  }

  .title-box {
    display: flex;
    align-items: center;
    grid-row: 1;
    grid-column: 2;
    font-size: 20px;
    font-weight: bold;
  }

  .desc1-box {
    display: flex;
    align-items: center;
    grid-row: 2;
    grid-column: 2;
    font-size: 16px;
  }

  .desc2-box {
    display: flex;
    align-items: center;
    grid-row: 3;
    grid-column: 2;
    font-size: 16px;
  }
}
</style>
