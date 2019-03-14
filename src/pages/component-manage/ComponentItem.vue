<template>
  <div class="component-item">
    <div class="item-body">
      <div class="item-left">
        <ul class="fields-list">
          <li class="field-item">
            <span class="field-label">组件中文名称：</span>
            <span class="field-value">{{ data.chineseName }}</span>
          </li>
          <li class="field-item">
            <span class="field-label">组件英文名称：</span>
            <span class="field-value">{{ data.englishName }}</span>
          </li>
          <li class="field-item">
            <span class="field-label">安装依赖说明：</span>
            <span class="field-value">{{ data.dependencies }}</span>
          </li>
          <li class="field-item">
            <span class="field-label">组件类别：</span>
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
            <span class="field-label">Git地址：</span>
            <a class="field-value gitlab-address" :href="data.gitlab">{{ data.gitlab }}</a>
          </li>
        </ul>
      </div>
      <div class="item-right">
        <a href="javascript:void(0)" class="component-img" @click="previewImg(data.img)"><img :src="data.img" title="点击预览" width="100%" height="100%"></a>
      </div>
    </div>
    <div class="item-footer operate-wrap">
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
              chineseName: '',
              englishName: '',
              dependencies: '',
              gitlab: '',
              tag: ''
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
        previewImg (src) {
          this.$emit('preview', src);
        },
        clickTag (tag) {
          this.$emit('tagClick', tag);
        }
      }
    };
</script>

<style scoped lang="less">
  .component-item{
    box-sizing: border-box;
    width: 100%;
    margin: 0 0;
    padding: 15px;
    .item-body {
      display: flex;
      .item-left {
        flex: 1;
      }
      .item-right {
        width: 150px;
        height: 150px;
        border: 1px solid #e5e5e5;
        .component-img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .field-item {
      margin: 15px 0;
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
      .button-wrap {
        margin-left: auto;
        button {
          display: inline-block;
        }
      }
    }

  }

</style>
