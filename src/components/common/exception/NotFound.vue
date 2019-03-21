<template>
  <div class="not-found-page">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="main-container">
        <img src="./img/not-found-exception.svg" alt="">
        <div class="not-found-text">
          <h1 class="not-found-desc">404!!!页面不见了</h1>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: ''
  };
</script>

<style scoped lang="less">
  .not-found-page {
    height: 100%;
    .main-container {
      text-align: center;
      padding: 50px 0;
    }
    .not-found-desc {
      margin: 40px 0;
      font-weight: 700;
      font-size: 20px;
      text-align: center;
      color: #bac8c4;
    }
  }
</style>
