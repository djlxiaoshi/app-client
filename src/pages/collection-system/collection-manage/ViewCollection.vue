<template>
    <div class="view-collection-page">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="main-container">
          <el-card ref="loadingTarget">
            <ul class="fields-list">
              <li class="field-item">
                <span class="field-label">收藏详情：</span>
                <div class="field-value img-field-value">
                  <div class="img-wrap">
                    <img v-if="data.img" :src="getImgAddress(data.img)" width="100%" height="100%">
                  </div>
                  <el-upload
                    ref="upload"
                    class="upload-component"
                    :action="$globalConfig.SERVER_ADDRESS + '/component/img/'"
                    :data="{componentId: $route.params.id}"
                    list-type="text"
                    :with-credentials="true"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleSuccess">
                    <p class="support-desc">支持 jpg、png 格式大小 5M 以内的图片</p>
                    <el-button class="upload-avatar-btn" size="small">点击上传</el-button>
                  </el-upload>
                </div>
              </li>
              <li class="field-item">
                <span class="field-label">收藏名称：</span>
                <span class="field-value">{{ data.name }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">收藏描述：</span>
                <span class="field-value">{{ data.desc }}</span>
              </li>
              <li class="field-item tag-field">
                <span class="field-label">组件类别：</span>
                <el-tag class="field-value" size="small" v-if="data.tag" @click="goToGetCollectionByTagPage">
                  {{ data.tag.label }}
                </el-tag>
                <span class="field-value" v-else>暂无类别</span>
              </li>
              <li class="field-item">
                <span class="field-label">预览地址：</span>
                <a class="field-value common-link" :href="data.url">{{ data.url }}</a>
              </li>
              <li class="field-item">
                <span class="field-label">编辑：</span>
                <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="goToEditPage">编辑</el-button>
              </li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import routerNameConfig from '../../../router/config';

  export default {
    data () {
      return {
        data: {
          name: '',
          desc: '',
          url: '',
          tag: '',
          img: ''
        }
      };
    },
    mounted () {
      this.getCollectionById();
    },
    methods: {
      getCollectionById () {
        const collectionId = this.$route.params.id;
        const { xhrInstance } = this.$http({
          url: '/collection/' + collectionId,
          method: 'get',
          data: {
            operate: {
              $lookup: true
            }
          },
          showErrorMsg: true,
          loading: this.$refs.loadingTarget.$el
        });

        xhrInstance.then(res => {
          this.data = res;
        });
      },
      // 上传图片前的校验工作
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 < 300;

        if (!(isJPG || isPNG)) {
          this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 300KB!');
        }
        return (isJPG || isPNG) && isLt2M;
      },
      getImgAddress (imgPath) {
        return this.$globalConfig.SERVER_ADDRESS + imgPath;
      },
      handleSuccess (res) {
        this.$set(this.data, 'img', res.data.path);
        this.$notify.success('上传成功');
      },
      goToEditPage () {
        this.$router.push({ name: routerNameConfig.UpdateCollectionRouterName, params: { id: this.$route.params.id } });
      },
      goToGetCollectionByTagPage () {
        this.$router.push({
          name: routerNameConfig.CollectionListByTagRouterName,
          query: { tagId: this.data.tag._id, tagLabel: this.data.tag.label }
        });
      }
    }
  };
</script>

<style scoped lang="less">
  .view-collection-page {
    .fields-list {
      .field-item {
        display: flex;
        align-items: flex-start;
        margin: 30px 0;
        font-size: 14px;
        .img-wrap {
          width: 100px;
          height: 100px;
          margin-right: 20px;
          border: 1px solid #e5e5e5;
        }
        .img-field-value {
          display: flex;
          align-items: flex-end;
          .upload-component {
            /deep/ .el-upload {
              text-align: left;
              .support-desc {
                margin-bottom: 10px;
              }
            }
          }
        }

        .field-label {
          width: 150px;
        }
      }
      .field-item.tag-field {
        /deep/ .el-tag {
          cursor: pointer;
        }
      }
    }
  }
</style>
