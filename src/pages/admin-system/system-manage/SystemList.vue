<template>
    <div class="system-list-page">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="main-container">
          <div class="operate-bar">
            <div class="operate-button">
              <el-button type="primary" @click="goToCreateSystemPage" size="mini">添加系统</el-button>
            </div>
          </div>
          <div class="system-list" ref="loadingTarget">
            <Empty v-if="systemList === 0">
              <el-button type="primary" @click="goToCreateSystemPage" size="mini">添加菜单</el-button>
            </Empty>
            <template v-else>
              <div class="system-item"
                   v-for="(system, index) in systemList"
                   :key="index">
                <div class="item-top">
                  <h4 class="system-name">{{ system.label }}</h4>
                  <div class="system-operate">
                    <el-button
                      @click="goToCreateMenuPage(system._id, system.label)"
                      class="operate-button"
                      type="primary"
                      icon="el-icon-plus"
                      size="mini" plain></el-button>
                    <el-button
                      @click="goToUpdateSystemPage(system._id)"
                      class="edit-button operate-button"
                      type="warning"
                      icon="el-icon-edit"
                      size="mini" plain></el-button>
                    <el-button
                      @click="openDeleteSystemDialog(system._id)"
                      class="delete-button operate-button"
                      type="danger"
                      icon="el-icon-delete"
                      size="mini" plain></el-button>
                  </div>
                </div>
                <div class="item-bottom">
                  <ul class="menu-list">
                    <li class="menu-item" v-for="(menu, index) in system.menus" :key="index">
                      <span class="menu-name">{{ menu.label }}</span>
                      <span class="menu-operate">
                        <i class="el-icon-edit" @click="goToUpdateMenuPage(menu._id)"></i>
                        <i class="el-icon-delete" @click="openDeleteMenuDialog(menu._id)"></i>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import routerNameConfig from '../../../router/config';

  export default {
    name: '',
    components: {
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
          showErrorMsg: true,
          loading: this.$refs.loadingTarget
        });

        xhrInstance.then(result => {
          this.systemList = result;
        });
      },
      // 删除系统
      deleteSystem (id) {
        return this.$http({
          url: '/system/' + id,
          method: 'delete',
          showErrorMsg: true,
          showSuccessMsg: true
        });
      },
      openDeleteSystemDialog (id) {
        this.$alert.warning('确定要删除该项吗？').then((willDone) => {
          if (willDone) {
            const { xhrInstance } = this.deleteSystem(id);

            xhrInstance.then(() => {
              this.getSystemList();
            });
          }
        });
      },
      // 删除菜单
      deleteMenu (id) {
        return this.$http({
          url: '/menu/' + id,
          method: 'delete',
          showErrorMsg: true,
          showSuccessMsg: true
        });
      },
      openDeleteMenuDialog (id) {
      this.$alert.warning('确定要删除该项吗？').then((willDone) => {
        if (willDone) {
          const { xhrInstance } = this.deleteMenu(id);

          xhrInstance.then(() => {
            this.getSystemList();
          });
        }
      });
    },
      // 去往增加系统页面
      goToCreateSystemPage () {
        this.$router.push({ name: routerNameConfig.AdminCreateSystemRouterName });
      },
      // 去往更新系统页面
      goToUpdateSystemPage (systemId) {
        this.$router.push({ name: routerNameConfig.AdminUpdateSystemRouterName, params: { id: systemId } });
      },
      // 去往增加菜单页面
      goToCreateMenuPage (systemId, systemName) {
        this.$router.push({ name: routerNameConfig.AdminCreateMenuRouterName, query: { systemId, systemName } });
      },
      // 去往更新菜单页面
      goToUpdateMenuPage (id) {
        this.$router.push({ name: routerNameConfig.AdminUpdateMenuRouterName, params: { id } });
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
    .system-list {
      .system-item {
        margin: 15px;
        font-size: 14px;
        .item-top {
          display: flex;
          align-items: center;
          .system-name {
            font-weight: 600;
          }
          .system-operate {
            margin-left: auto;
            /deep/ .el-button--mini {
              padding: 4px 10px;
            }
          }
        }
        .item-bottom {
          .menu-list {
            margin-left: 50px;
            margin-top: 20px;
            .menu-item {
              display: flex;
              padding: 10px 5px;
              margin: 5px;
              .menu-operate {
                margin-left: auto;
                i {
                  font-size: 16px;
                  padding: 0 10px;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
