<template>
    <footer class="app-footer">
      <ul class="item-wrap">
        <li class="foot-item" v-for="(footer, index) in footerConfig" :key="index">
          <router-link :to="footer.path">
            <p class="icon-wrap">
              <i class="iconfont" :class="footer.icon"></i>
            </p>
            <p class="label-wrap">
              <span>{{ footer.label }}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </footer>
</template>

<script>
    import footerConfig from '@/router/footer.route';
    export default {
      data () {
        return {
          footerConfig
        };
      },
      mounted () {
        console.log(footerConfig);
      }
    };
</script>

<style scoped lang="less">
  .app-footer {
    height: 100%;
    .item-wrap {
      display: flex;
      justify-content: space-around;
    }
    .foot-item {
      text-align: center;
      a {
        text-decoration: none;
        color: #000;
      }
      .router-link-active {
        color: red;
      }
    }
    .icon-wrap, .label-wrap {
      margin: 5px 0;
    }
    .icon-wrap {
      .iconfont{
        font-size: 24px;
      }
    }
    .label-wrap {
      font-size: 14px;
    }
  }
</style>
