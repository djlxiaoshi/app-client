<template>
    <div class="home-link-item">
      <div class="item-title">{{ data.title }}</div>
      <div class="item-details">
        {{ data.abstract }}
      </div>
      <div class="item-desc">
        <span class="item-time">
          {{ data.time }}
        </span>
        <span class="item-tag">
          {{ data.tags }}
        </span>
      </div>
      <div class="item-operate">
        <el-button
          @click="editItem(data.id)"
          class="edit-button operate-button"
          type="primary"
          icon="el-icon-edit"
          size="mini" plain></el-button>
        <el-button
          @click="deleteItem(data.id)"
          class="delete-button operate-button"
          type="danger"
          icon="el-icon-delete"
          size="mini" plain></el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'link-item',
      props: {
        data: {
          type: Object
        }
      },
      methods: {
        deleteItem (id) {
          this.$emit('delete', id);
        },
        editItem (id) {
          this.$emit('edit', id);
        }
      }
    };
</script>

<style scoped lang="less">
  .home-link-item{
    width: 100%;
    margin: 0 0 15px;
    padding: 15px 2px 20px 0;
    .item-title {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
    }
    .item-details, .item-desc {
      margin: 0 0 8px;
      font-size: 13px;
      line-height: 24px;
      color: #999;
    }
    .item-operate {
      display: flex;
      justify-content: flex-end;
      .operate-button {

      }
    }
  }

</style>
