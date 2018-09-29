<template>
  <header class="app-header">
    <el-row type="flex" align="middle" class="hidden-xs-only">
      <el-col  :span="14">
        <el-menu
          :default-active="activeIndex"
          class="header-menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">我的书签</el-menu-item>
          <el-menu-item index="2">热门收藏</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="8">
        <div class="header-search">
          <el-input placeholder="搜索" v-model="searchText" suffix-icon="el-input__icon"></el-input>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="avatar-wrap">
          <el-dropdown>
            <a class="user-avatar"></a>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>导出</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="hidden-sm-and-up">
      <el-col :span="6">
        <div class="menu-col">
          <i class="iconfont icon-menu"></i>
        </div>
      </el-col>
      <el-col :span="12">
        dfh
      </el-col>
      <el-col :span="6">
        dhf
      </el-col>
    </el-row>
  </header>

</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        searchText: ''
      };
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style scoped lang="less">
  .app-header {
    height: 100%;
    max-width: 960px;
    margin: 0 auto;
    /deep/ .el-col {
      padding: 0 20px;
    }
    .header-search {

    }
    .avatar-wrap {
      .user-avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: lightgreen;
      }
    }

    .hidden-sm-and-up {
      height: 100%;
      color: #ffffff;
      .menu-col {
        .iconfont {
          font-size: 24px !important;
          cursor: pointer;
        }
      }
    }
  }
</style>
