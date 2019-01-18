<template>
    <div class="user-info-page">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
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
                    :on-success="handleSuccess">
                      <p class="support-desc">支持 jpg、png 格式大小 5M 以内的图片</p>
                      <el-button class="upload-avatar-btn" size="small">点击上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>

              <el-form-item label="用户名" prop="title">
                <el-input v-model="user.username" :disabled="inputStatus.usernameDisabled">
                  <el-button slot="append" icon="el-icon-edit" @click="edit('username')"></el-button>
                </el-input>
              </el-form-item>

              <el-form-item label="个人介绍">
                <el-input v-model="user.info" :disabled="inputStatus.infoDisabled">
                  <el-button slot="append" icon="el-icon-edit" @click="edit('info')"></el-button>
                </el-input>
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
          }, () => {});
        }
      }
    };
</script>

<style scoped lang="less">
  .user-info-page {
    .user-info-panel {
      .el-upload {
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
      }
      .avatar-right {
        .support-desc {
          color: #909090;
          font-size: 12px;
        }
        .upload-avatar-btn {

        }
      }
    }
  }
</style>
