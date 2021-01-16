<template>
  <div class="no-list-box">
    <i class="fa fa-times-circle fa-fw" />
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
  color: whitesmoke;
  i {
    font-size: 120px;
  }
  div {
    font-size: 40px;
  }
}
</style>
