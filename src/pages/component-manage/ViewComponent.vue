<template>
    <div class="view-component-page">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="main-container">
          <el-card ref="loadingTarget">
            <ul class="fields-list">
              <li class="field-item">
                <span class="field-label">组件展示：</span>
                <div class="field-value img-field-value">
                  <img class=" img-field" :src="component.img" width="100px" height="100px">
                  <el-upload
                    ref="upload"
                    class="upload-component"
                    action="http://localhost:3000/component/img/"
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
                <span class="field-label">组件中文名称：</span>
                <span class="field-value">{{ component.chineseName }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">组件英文名称：</span>
                <span class="field-value">{{ component.englishName }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">安装依赖说明：</span>
                <span class="field-value">{{ component.dependencies }}</span>
              </li>
              <li class="field-item tag-field">
                <span class="field-label">组件类别：</span>
                <el-tag class="field-value" size="small" v-if="component.tag" @click="goToGetComponentsByTagPage">
                  {{ component.tag.label }}
                </el-tag>
                <span class="field-value" v-else>暂无类别</span>
              </li>
              <li class="field-item">
                <span class="field-label">Gitlab地址：</span>
                <a class="field-value gitlab-link" :href="component.gitlab">{{ component.gitlab }}</a>
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
  export default {
    data () {
      return {
        component: {
          chineseName: 'dsfgsg',
          englishName: '',
          dependencies: '',
          gitlab: '',
          img: '',
          tag: ''
        }
      };
    },
    mounted () {
      this.getComponentById();
    },
    methods: {
      getComponentById () {
        const componentId = this.$route.params.id;
        this.$http({
          url: '/component/' + componentId,
          method: 'get',
          hasWarning: true,
          loading: true,
          loadingTarget: this.$refs.loadingTarget.$el
        }).then(res => {
          this.component = res;
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
      handleSuccess (res) {
        this.$set(this.component, 'img', res.data.path);
        this.$notify.success('上传成功');
      },
      goToEditPage () {
        this.$router.push('/component/UpdateComponent/' + this.$route.params.id);
      },
      goToGetComponentsByTagPage () {
        this.$router.push('/component/ComponentListByTag?tagId=' + this.component.tag._id + '&tagLabel=' + this.component.tag.label);
      }
    }
  };
</script>

<style scoped lang="less">
  .view-component-page {
    .fields-list {
      .field-item {
        display: flex;
        align-items: flex-start;
        margin: 30px 0;
        font-size: 14px;
        .img-field {
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
        .gitlab-link {
          text-decoration: underline;
          color: #000;
          &:hover {
            color: lightgreen;
          }
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
