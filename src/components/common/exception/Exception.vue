<template>
  <div class="app-exception">
    <div class="left">
      <img src="@/assets/images/no-page.svg">
    </div>
    <div class="right">
      <h1 class="item">404</h1>
      <p class="item">抱歉，你访问的页面不存在</p>
      <div class="item">
        <el-button type="primary">
          <router-link :to="{ path: '/' }">返回首页</router-link>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
    data () {
      return {
      };
    },
    mounted () {
    },
    props: {
      type: {
        type: Number,
        default: 1
      },
      redirectTo: {
        type: String,
        default: '/'
      }
    },
    methods: {}
  };
</script>

<style lang="less" scoped>
  .app-exception {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
  .exception-page {
    .left {
      flex: 0 0 30%;
      height: 300px;
    }
    .right {
      .item {
        margin: 25px auto;
      }
      h1 {
        font-size: 40px;
      }
      button {
        a {
          color: #fff;
          text-decoration: none;
        }
      }
    }
  }
</style>
