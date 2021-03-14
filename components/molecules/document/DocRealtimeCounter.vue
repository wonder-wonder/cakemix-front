<template>
  <div class="realtime-counter-container">
    <div v-if="!isSmallWidth" class="user-icon-container">
      <div
        v-for="(v, k) in topThreeUsers"
        :key="`rt-user-icon-${k}`"
        class="user-icon-box tooltip"
      >
        <img
          v-if="v.icon !== ''"
          :src="v.icon"
          alt="user_icon"
          class="user-icon"
        />
        <fa-icon
          v-if="v.icon === ''"
          class="user-icon svg-icon-padding"
          icon="cat"
        />
        <span class="tooltiptext" v-text="v.name" />
      </div>
      <fa-icon v-if="moreThanThree" class="has-additional-user" icon="plus" />
    </div>
    <div class="realtime-counter-list-container">
      <input id="realtime-button" type="checkbox" name="realtime-button" >
      <label
        for="realtime-button"
        class="realtime-counter-button"
        v-text="numOfUsersWithMe"
      />
      <div class="users-list-container">
        <div class="user-box myself" v-text="wordsOfList" />
        <div v-for="(v, k) in users" :key="`rt-user-${k}`" class="user-box">
          <img
            v-if="v.icon !== ''"
            :src="v.icon"
            alt="user_icon"
            class="user-icon"
          />
          <fa-icon
            v-if="v.icon === ''"
            class="user-icon svg-icon-padding"
            icon="cat"
          />
          <span class="user-name" v-text="v.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { UserModel } from '@/scripts/model/user/manager'

export default Vue.extend({
  props: {
    users: {
      type: Array as PropType<UserModel[]>,
      default: [],
    },
  },
  computed: {
    topThreeUsers(): UserModel[] {
      const us = this.users.map(u => ({ ...u }))
      return us.reverse().slice(0, 3)
    },
    numOfUsersWithMe(): number {
      return this.users.length + 1
    },
    numOfUsers(): number {
      return this.users.length
    },
    moreThanThree(): boolean {
      return this.numOfUsers > 3
    },
    wordsOfList(): string {
      let words = ''
      if (this.numOfUsers === 1) {
        words += `You and 1 user`
      } else if (this.numOfUsers > 1) {
        words += `You and ${this.numOfUsers} users`
      } else {
        words += 'Only you'
      }
      words += ' are online'
      return words
    },
    isSmallWidth(): boolean {
      return this.$store.getters['device/isSmallWidth']
    },
  },
})
</script>

<style lang="scss" scoped>
.realtime-counter-container {
  display: flex;
  align-items: center;
  height: 100%;

  .user-icon-container {
    display: flex;
    align-content: center;
    padding: 0 8px;
    height: auto;

    .tooltip {
      position: relative;
      display: inline-block;
      .tooltiptext {
        visibility: hidden;
        width: 100px;
        max-height: 40px;
        background-color: whitesmoke;
        color: black;
        text-align: center;
        border-radius: 6px;
        padding: 4px 8px;
        position: absolute;
        z-index: 1;
        top: -5px;
        right: 110%;
        font-size: 10px;
        font-weight: bold;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 100%;
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent transparent whitesmoke;
        }
      }
      &:hover {
        .tooltiptext {
          visibility: visible;
        }
      }
    }

    .user-icon-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      width: 32px;
      border-radius: 16px;
      background-color: whitesmoke;
      .user-icon {
        height: 28px;
        width: 28px;
        border-radius: 14px;
        pointer-events: none;
      }
      .svg-icon-padding {
        padding: 4px;
      }
    }
    .has-additional-user {
      font-size: 16px;
      color: white;
    }
  }
  .realtime-counter-list-container {
    position: relative;
    #realtime-button {
      display: none;
    }
    .realtime-counter-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 48px;
      color: black;
      background-color: white;
      border: solid 4px white;
      border-radius: 8px;
      font-size: 24px;
      font-family: 'Righteous';
      user-select: none;
    }
    .users-list-container {
      position: absolute;
      display: flex;
      flex-flow: row wrap;
      visibility: hidden;
      height: auto;
      max-height: 200px;
      width: 224px;
      padding: 8px;
      top: 52px;
      left: -172px;
      background-color: white;
      border-radius: 8px;
      z-index: 999;
      box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.4);
      overflow: scroll;
      .user-box {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        height: 48px;
        width: 100%;
        padding: 4px;
        .user-icon {
          height: 36px;
          width: 36px;
          border-radius: 20px;
          pointer-events: none;
        }
        .svg-icon-padding {
          padding: 4px;
        }
        .user-name {
          display: flex;
          align-items: center;
          height: auto;
          width: auto;
          padding-left: 8px;
          color: black;
          overflow: hidden;
          font-size: 14px;
          font-weight: bold;
        }
      }
      .myself {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        height: 24px;
        width: 100%;
        padding: 4px;
        font-size: 12px;
        font-weight: bold;
      }
    }
    #realtime-button:checked {
      & ~ .realtime-counter-button {
        color: white;
        background-color: gray;
        border: solid 4px white;
      }
      & ~ .users-list-container {
        visibility: visible;
      }
    }
  }
}
</style>
