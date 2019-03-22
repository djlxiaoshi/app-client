<template>
    <div class="system-list-page">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="main-container">
          <div class="operate-bar">
            <div class="operate-button">
              <el-button type="primary" @click="goToAddSystemPage" size="mini">添加系统</el-button>
            </div>
          </div>
          <SystemItem
            v-for="(item, index) in systemList"
            :key="index"
            :data="item"
            @edit="goToUpdatePage"
            @delete="openDeleteDialog"
          ></SystemItem>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import SystemItem from './SystemItem';
  import routerNameConfig from '../../../router/config';

  export default {
    name: '',
    components: {
      SystemItem
    },
    data () {
      return {
        systemList: []
      };
    },
    mounted () {
      this.getSystemList();
    },
    methods: {
      // 获取系统列表
      getSystemList () {
        const { xhrInstance } = this.$http({
          url: '/systems',
          method: 'get',
          showErrorMsg: true
        });

        xhrInstance.then(result => {
          this.systemList = result;
        });
      },
      goToAddSystemPage () {
        this.$router.push({ name: routerNameConfig.AdminCreateSystemRouterName });
      },
      goToUpdatePage (id) {
        this.$router.push({ name: routerNameConfig.AdminUpdateSystemRouterName, params: { id } });
      },
      deleteSystem (id) {
        return this.$http({
          url: '/system/' + id,
          method: 'delete',
          showErrorMsg: true,
          showSuccessMsg: true
        });
      },
      openDeleteDialog (id) {
        this.$alert.warning('确定要删除该项吗？').then((willDone) => {
          if (willDone) {
            const { xhrInstance } = this.deleteSystem(id);

            xhrInstance.then(() => {
              this.getSystemList();
            });
          }
        });
      }
    }
  };
</script>

<style scoped lang="less">
  .system-list-page {
    .operate-bar {
      display: flex;
      margin-bottom: 10px;
      padding: 5px 10px;
      border-bottom: 1px solid #e5e5e5;
      background: #ffffff;
      .operate-button {
        margin-left: auto;
      }
    }

  }
</style>
