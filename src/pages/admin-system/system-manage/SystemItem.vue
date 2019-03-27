<template>
  <div class="system-item">
    <div class="item-top">
      <h4 class="system-name">{{ data.label }}</h4>
      <div class="system-operate">
        <el-button
          @click="goToCreateMenuPage(data._id, data.label)"
          class="operate-button"
          type="primary"
          icon="el-icon-plus"
          size="mini" plain></el-button>
        <el-button
          @click="goToUpdateSystemPage(data._id)"
          class="edit-button operate-button"
          type="warning"
          icon="el-icon-edit"
          size="mini" plain></el-button>
        <el-button
          @click="openDeleteSystemDialog(data._id)"
          class="delete-button operate-button"
          type="danger"
          icon="el-icon-delete"
          size="mini" plain></el-button>
      </div>
    </div>
    <div class="item-bottom">
      <ul class="menu-list">
        <li class="menu-item" v-for="(menu, index) in data.menus" :key="index">
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

<script>
  import routerNameConfig from '../../../router/config';

  export default {
    name: '',
    props: {
      data: {
        type: Object,
        default () {
          return {

          };
        }
      }
    },
    methods: {
      // 去往增加菜单页面
      goToCreateMenuPage (systemId, systemName) {
        this.$router.push({ name: routerNameConfig.AdminCreateMenuRouterName, query: { systemId, systemName } });
      },
      // 去往更新菜单页面
      goToUpdateMenuPage (id) {
        this.$router.push({ name: routerNameConfig.AdminUpdateMenuRouterName, params: { id } });
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
    }
  };
</script>

<style scoped lang="less">
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
</style>
