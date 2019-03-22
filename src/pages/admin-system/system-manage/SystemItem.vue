<template>
  <div class="system-item">
    <div class="item--left">
      <ul class="fields-list" >
        <li class="field-item">
          <span class="field-label">系统名称：</span>
          <span class="field-value">{{ data.label }}</span>
        </li>
        <li class="field-item">
          <span class="field-label">系统Icon：</span>
          <span class="field-value">{{ data.icon }}</span>
        </li>
        <li class="field-item">
          <span class="field-label">系统访问权限：</span>
          <span class="field-value">{{ data.permission }}</span>
        </li>
      </ul>
    </div>
    <div class="item--right">
      <el-button
        @click="editItem(data._id)"
        class="edit-button operate-button"
        type="warning"
        icon="el-icon-edit"
        size="mini" plain></el-button>
      <el-button
        @click="deleteItem(data._id)"
        class="delete-button operate-button"
        type="danger"
        icon="el-icon-delete"
        size="mini" plain></el-button>
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
      }
    }
  };
</script>

<style scoped lang="less">
  .system-item {
    margin: 15px;
    display: flex;
    align-items: flex-end;
    font-size: 14px;
    .item--right {
      margin-left: auto;
    }
    .fields-list {
      margin-left: 20px;
    }
    .field-item {
      margin: 15px 0;
    }
  }
</style>
