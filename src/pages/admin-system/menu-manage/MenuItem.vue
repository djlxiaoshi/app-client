<template>
    <div class="menu-system-item">
      <div class="item-header">
        <h3 class="system-name">{{ data._id }}</h3>
        <div class="operate-bar">
          <el-button type="primary" @click="goToAddMenuPage" size="mini">添加菜单</el-button>
        </div>
      </div>
      <div class="item-body">
        <div class="menu-item" v-for="(menu, index) in data.menuList" :key="index">
          <div class="item-body-left">
            <ul class="fields-list" >
              <li class="field-item">
                <span class="field-label">菜单名称：</span>
                <span class="field-value">{{ menu.label }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">菜单Icon：</span>
                <span class="field-value">{{ menu.icon }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">菜单路径：</span>
                <span class="field-value">{{ menu.path }}</span>
              </li>
            </ul>
          </div>
          <div class="item-body-right">
            <el-button
              @click="editItem(menu._id)"
              class="edit-button operate-button"
              type="warning"
              icon="el-icon-edit"
              size="mini" plain></el-button>
            <el-button
              @click="deleteItem(menu._id)"
              class="delete-button operate-button"
              type="danger"
              icon="el-icon-delete"
              size="mini" plain></el-button>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  export default {
    name: '',
    props: {
      data: {
        type: Object,
        default () {
          return {
            system: '',
            menuList: []
          };
        }
      }
    },
    methods: {
      editItem (id) {
        this.$emit('edit', id);
      },
      deleteItem (id) {
        this.$emit('delete', id);
      },
      goToAddMenuPage () {
        this.$emit('addMenu', 'blog');
      }
    }
  };
</script>

<style scoped lang="less">
  .menu-system-item {
    margin: 15px;
    .item-header {
      display: flex;
      .operate-bar {
        margin-left: auto;
      }
    }
    .system-name {
      font-size: 16px;
      font-weight: 600;
    }
    .menu-item {
      display: flex;
      align-items: flex-end;
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;
      font-size: 14px;
      .item-body-right {
        margin-left: auto;
      }
    }
    .fields-list {
      margin-left: 20px;
    }
    .field-item {
      margin: 10px 0;
    }
  }
</style>
