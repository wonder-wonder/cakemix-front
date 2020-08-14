<template>
  <div :key="uuid" class="folder-box">
    <div class="icon-box">
      <i class="fa fa-folder fa-fw" />
    </div>
    <div class="title-box">
      <span v-text="title" />
    </div>
    <div class="desc1-box">
      <span v-text="detail" />
    </div>
    <div class="desc2-box">
      <span v-text="date" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { v4 as uuidv4 } from 'uuid'

@Component
export default class Folder extends Vue {
  uuid: string = uuidv4()

  @Prop({ default: 'Sample Folder' })
  title!: string

  @Prop({ default: '2 folders 5 documents' })
  detail!: string

  @Prop({ default: '2020/08/14 22:32:51 -JST' })
  date!: string
}
</script>

<style lang="scss">
.folder-box {
  display: grid;
  width: 344px;
  grid-template-rows: 32px 20px 24px;
  grid-template-columns: 64px 280px;
  border: solid 1px rgb(180, 180, 180);
  border-radius: 5px;
  color: rgb(50, 50, 50);
  background-color: white;
  transition: all 100ms;

  &:hover {
    color: white;
    background-color: grey;
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
