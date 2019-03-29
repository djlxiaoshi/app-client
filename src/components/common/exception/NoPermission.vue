<template>
    <div class="no-permission-page">
      <div>
        <img src="./img/no-permission-exception.svg" alt="">
        <div class="exception-text">
          <h1 class="exception-desc">权限不足</h1>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: ''
  };
</script>

<style scoped lang="less">
  .no-permission-page {
    position: relative;
    height: calc(100vh);
    display: flex;
    align-items: center;
    justify-content: center;
    .exception-desc {
      margin: 40px 0;
      font-weight: 700;
      font-size: 20px;
      text-align: center;
      color: #bac8c4;
    }
  }
</style>
