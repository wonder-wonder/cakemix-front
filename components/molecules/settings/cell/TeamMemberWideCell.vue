<template>
  <div class="user-wide-cell-container">
    <div class="icon-box">
      <i v-if="!hasImage" class="fa fa-user" />
      <b-image v-if="hasImage" :src="user.member.icon_uri" :rounded="rounded" />
    </div>
    <div class="title-item" v-text="user.member.name" />
    <div class="detail-item" v-text="user.member.uuid" />
    <Select
      :current="current"
      :select-items="selectItem"
      class="selection-item"
      :disabled="!isEditable"
      @input="changedPerm"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Select from '@/components/atoms/input/Select.vue'
import { MemberInfoModel, ProfileModel } from '@/scripts/api/index'

type DataType = {
  pTable: string[]
}

export default Vue.extend({
  components: {
    Select,
  },
  props: {
    user: {
      type: Object as PropType<MemberInfoModel>,
      default: {} as MemberInfoModel,
    },
    ownPermission: {
      type: Number,
      default: 3,
    },
  },
  data(): DataType {
    return {
      pTable: ['User', 'Admin', 'Owner'],
    }
  },
  computed: {
    hasImage(): boolean {
      const member = this.user.member as ProfileModel
      if (member === undefined) {
        return false
      }
      return !(member.icon_uri === '')
    },
    selectItem(): string[] {
      if (!this.isEditable) {
        return this.pTable
      }
      return this.pTable.slice(0, this.ownPermission + 1)
    },
    current(): string {
      return this.pTable[this.user.permission ?? 0]
    },
    isEditable(): boolean {
      return (
        this.ownPermission > 0 &&
        this.ownPermission < 3 &&
        this.ownPermission >= (this.user.permission ?? 0)
      )
    },
  },
  methods: {
    changedPerm(type: string) {
      const perm = this.selectItem.indexOf(type) ?? this.user.permission ?? 0
      this.user.permission = perm
      this.$emit('changed', perm)
    },
  },
})
</script>

<style lang="scss">
.user-wide-cell-container {
  display: grid;
  grid-template-rows: 20px 20px;
  grid-template-columns: 40px 16px auto 100px;
  align-items: center;
  height: 56px;
  width: 100%;
  padding: 8px;
  transition: all 100ms;
  color: black;

  &:hover {
    background-color: rgb(245, 245, 245);
  }

  .icon-box {
    grid-row: 1 / 3;
    grid-column: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    height: 40px;
    width: 40px;
    font-size: 32px;
    border-radius: 8px;
    background-color: black;
  }

  .title-item {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    font-size: 16px;
    margin-left: 16px;
  }

  .detail-item {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    font-size: 12px;
    margin-left: 16px;
    color: gray;
  }

  .selection-item {
    width: 100%;
    grid-row: 1 / 3;
    grid-column: 4 / 5;
    font-size: 12px;
    color: gray;
  }
}
</style>