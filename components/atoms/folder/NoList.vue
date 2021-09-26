<template>
  <div class="no-list-box">
    <fa-icon icon="times-circle" class="icon" />
    <div>No items found</div>
  </div>
</template>

<style lang="scss" scoped>
.no-list-box {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  color: $contrast-color;
  .icon {
    height: 100px;
    font-size: 100px;
  }
  div {
    font-size: 40px;
    font-weight: bold;
  }
}
</style>
