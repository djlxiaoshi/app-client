<template>
    <div class="user-info-page">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
          <el-card class="user-info-panel">
            <el-form
              ref="form"
              :rules="rules"
              :model="user"
              label-width="80px"
              label-position="left">
              <el-form-item label="头像" prop="url">
                <img class="user-avatar avatar-left" :src="user.avatar" alt="">
                <div class="avatar-right">
                  <el-upload
                    ref="upload"
                    class="upload-avatar-input"
                    action="http://localhost:3000/avatar/"
                    list-type="text"
                    :with-credentials="true"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleSuccess">
                      <p class="support-desc">支持 jpg、png 格式大小 5M 以内的图片</p>
                      <el-button class="upload-avatar-btn" size="small">点击上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>

              <el-form-item label="用户名" prop="title" class="username-input-item">
                <el-input v-model="user.username" :disabled="inputStatus.usernameDisabled" width="300px"></el-input>
                <el-button icon="el-icon-edit" @click="edit('username')"></el-button>
              </el-form-item>

              <el-form-item label="个人介绍" class="user-info-input-item">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="user.info"
                  :disabled="inputStatus.infoDisabled">
                </el-input>
                <el-button icon="el-icon-edit" @click="edit('info')"></el-button>
              </el-form-item>

              <el-form-item label="">
                  <el-button @click="save">保存</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { SET_USER_MSG } from 'store/mutation-types';

    export default {
        data () {
          return {
            user: {
              avatar: '',
              username: '',
              info: ''
            },
            rules: {

            },
            inputStatus: {
              usernameDisabled: true,
              infoDisabled: true
            }
          };
        },
      created () {
        this.$http({
          url: '/user',
          method: 'get',
          hasWarning: true
        }).then((user) => {
          this.user = user;
        }, () => {});
      },
      methods: {
        ...mapMutations({
          'setUserMsg': SET_USER_MSG
        }),
        handleSuccess (res) {
          this.user.avatar = res.data.path;
          this.$notify.success('上传成功');
        },
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
        edit (type) {
          switch (type) {
            case 'username': {
              this.inputStatus.usernameDisabled = false;
              break;
            }
            case 'info': {
              this.inputStatus.infoDisabled = false;
              break;
            }
          }
        },
        save () {
          this.$http({
            url: '/user',
            method: 'put',
            data: {
              info: this.user.info,
              username: this.user.username
            },
            hasWarning: true,
            showSuccessMsg: true
          }).then((user) => {
            // 更新用户信息
            this.setUserMsg(user);

            this.resetStatus();
          }, () => {});
        },
        resetStatus () {
          this.inputStatus.usernameDisabled = true;
          this.inputStatus.infoDisabled = true;
        }
      }
    };
</script>

<style scoped lang="less">
  .user-info-page {
    .user-info-panel {
      /deep/ .el-upload {
        text-align: left;
      }
      .avatar-left, .avatar-right{
        display: inline-block;
        vertical-align: middle;
      }
      .avatar-left {
        margin-right: 20px;
      }
      .user-avatar {
        width: 80px;
        height: 80px;
        border: 1px solid #e5e5e5;
      }
      .avatar-right {
        .support-desc {
          color: #909090;
          font-size: 12px;
        }
        .upload-avatar-btn {

        }
      }
      .username-input-item {
        /deep/ .el-input {
          width: 80%;
        }
      }
      .user-info-input-item {
        /deep/ .el-textarea {
          width: 80%;
          textarea {
            font-family: 'Arial';
          }
        }
      }
    }
  }
</style>
