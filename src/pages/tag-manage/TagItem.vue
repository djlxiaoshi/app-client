<template>
    <div class="tag-item">
      <ul class="fields-list item-body">
        <li class="field-item">
          <span class="field-label">类别名称：</span>
          <span class="field-value">{{ data.label }}</span>
        </li>
        <li class="field-item">
          <span class="field-label">创建时间：</span>
          <span class="field-value">{{ data.createTime }}</span>
        </li>
      </ul>

      <div class="item-footer">
        <span class="button-wrap">
          <el-button
            @click="viewItem(data)"
            class="edit-button operate-button"
            type="primary"
            icon="el-icon-view"
            size="mini" plain></el-button>
          <el-button
            @click="editItem(data)"
            class="edit-button operate-button"
            type="warning"
            icon="el-icon-edit"
            size="mini" plain></el-button>
          <el-button
            @click="deleteItem(data)"
            class="delete-button operate-button"
            type="danger"
            icon="el-icon-delete"
            size="mini" plain></el-button>
        </span>
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
            label: '',
            _id: ''
          };
        }
      }
    },
    data () {
      return {

      };
    },
    methods: {
      viewItem (tag) {
        this.$emit('view', tag);
      },
      editItem (tag) {
        this.$emit('edit', tag);
      },
      deleteItem (tag) {
        this.$emit('delete', tag);
      }
    }
  };
</script>

<style scoped lang="less">
  .tag-item {
    padding: 15px;
    margin: 10px 20px;
    width: 20%;
    min-width: 250px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .field-item {
      margin: 15px 0;
      .field-label, .field-value {
        font-size: 14px;
        line-height: 24px;
      }
    }
    .item-footer {
      display: flex;
      .button-wrap {
      }
    }
  }

</style>
