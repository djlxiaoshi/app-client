<template>
    <div class="home-link-item">
      <div class="item-title app-ellipsis-1"><a :href="data.url">{{ data.title }}</a></div>
      <div class="item-abstract app-ellipsis-3">
        <a :href="data.url">
          {{ data.abstract }}
        </a>
      </div>

      <div class="item-tags-wrap">
        <span>标签：</span>
        <a
          class="item-tag"
          v-for="(tag, index) in data.tags"
          :key="index">
            {{ tag }}
          </a>
      </div>

      <div class="item-details">
        <span class="item-time">
            {{ data.createTime }}
          </span>

        <span class="button-wrap">
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
        </span>

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
    box-sizing: border-box;
    width: 100%;
    margin: 0 0;
    padding: 15px;

    .item-title, .item-abstract {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .item-title {
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
    }
    .item-abstract, .item-desc, .item-time, .item-tags-wrap {
      margin: 0 0 8px;
      font-size: 13px;
      line-height: 24px;
      color: #999;
    }
    .item-tags-wrap {
      .item-tag {
        display: inline-block;
        cursor: pointer;
        margin-right: 10px;
        font-size: 10px;
        &:hover {
          text-decoration: underline;
          color: rgb(255, 208, 75);
        }
      }
    }
    .item-details {
      display: flex;
    }
    .button-wrap {
      margin-left: auto;
    }
  }

</style>
