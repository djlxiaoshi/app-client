<template>
  <div class="collection-item">
    <div class="item-body">
      <div class="item-left">
        <ul class="fields-list">
          <li class="field-item">
            <span class="field-label">收藏名称：</span>
            <span class="field-value">{{ data.name }}</span>
          </li>
          <li class="field-item">
            <span class="field-label">收藏描述：</span>
            <span class="field-value">{{ data.desc }}</span>
          </li>
          <li class="field-item">
            <span class="field-label">收藏分类：</span>
            <el-tag
              v-if="data.tag"
              @click="clickTag(data.tag)"
              class="field-value"
              size="small">
              {{ data.tag.label }}
            </el-tag>
            <span class="field-value" v-else>暂无类别</span>
          </li>
          <li class="field-item">
            <span class="field-label">收藏地址：</span>
            <a class="field-value common-link" :href="data.url" target="_blank">{{ data.url }}</a>
          </li>
        </ul>
      </div>
      <div class="item-right">
        <img :src="getImgAddress(data.img)" title="点击预览" width="100%" height="100%" v-if="data.img">
      </div>
    </div>
    <div class="item-footer">
      <span class="create-time">
        添加时间：{{ data.createTime || '未知' }}
      </span>
      <span class="button-wrap">
          <el-button
          v-if="hasView"
          @click="viewItem(data.id)"
          class="edit-button operate-button"
          type="primary"
          icon="el-icon-view"
          size="mini" plain></el-button>
          <el-button
            v-if="hasEdit"
            @click="editItem(data.id)"
            class="edit-button operate-button"
            type="warning"
            icon="el-icon-edit"
            size="mini" plain></el-button>
          <el-button
            v-if="hasDelete"
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
      props: {
        data: {
          type: Object,
          default () {
            return {
              name: '',
              desc: '',
              tag: '',
              url: '',
              img: '',
              createTime: ''
            };
          }
        },
        hasView: {
          type: Boolean,
          default: true
        },
        hasEdit: {
          type: Boolean,
          default: true
        },
        hasDelete: {
          type: Boolean,
          default: true
        }
      },
      methods: {
        viewItem (id) {
          this.$emit('view', id);
        },
        deleteItem (id) {
          this.$emit('delete', id);
        },
        editItem (id) {
          this.$emit('edit', id);
        },
        clickTag (tag) {
          this.$emit('tagClick', tag);
        },
        getImgAddress (imgPath) {
          return this.$globalConfig.SERVER_ADDRESS + imgPath;
        }
      }
    };
</script>

<style scoped lang="less">
  .collection-item{
    box-sizing: border-box;
    width: 100%;
    margin: 0 0;
    padding: 15px;
    .item-body {
      display: flex;
      margin-bottom: 10px;
      .item-left {
        flex: 1;
      }
      .item-right {
        width: 120px;
        height: 120px;
        border: 1px solid #e5e5e5;
      }
    }
    .field-item {
      margin: 5px 0;
      .field-label, .field-value {
        font-size: 14px;
        line-height: 24px;
      }
      /deep/ .el-tag {
        cursor: pointer;
      }
      .gitlab-address {
        text-decoration: underline;
        color: #000;
        &:hover {
          color: lightgreen;
        }
      }
    }

    .item-footer {
      display: flex;
      font-size: 14px;
      .create-time {
        color: #999999;
      }
      .button-wrap {
        margin-left: auto;
        button {
          display: inline-block;
        }
      }
    }

  }

</style>
