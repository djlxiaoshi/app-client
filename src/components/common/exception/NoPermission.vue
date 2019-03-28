<template>
    <div class="no-permission-page">
      <div class="main-container">
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
    height: 100%;
    .main-container {
      text-align: center;
      padding: 50px 0;
    }
    .exception-desc {
      margin: 40px 0;
      font-weight: 700;
      font-size: 20px;
      text-align: center;
      color: #bac8c4;
    }
  }
</style>
