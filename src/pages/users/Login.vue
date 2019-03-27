<template>
  <section class="app-login">
    <el-row type="flex" justify="center" align="middle">
      <el-col :xs="24" :sm="16" :md="12" :lg="8" :xl="6">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>登录</span>
          </div>
          <div class="card-body">
            <el-form
              ref="form"
              :rules="rules"
              :model="form"
              label-width="0px">
              <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="formValidate" class="login-btn" size="medium">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="card-footer">
            <span class="go-register" @click="goToRegisterPage">注册账户</span>
            <span class="forget-password">忘记密码</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  import { SET_USER_MSG, SET_MENU_LIST } from 'store/mutation-types';

  export default {
    name: 'app-login',
    components: {},
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, trigger: 'blur', message: '请输入用户名' }
          ],
          password: [
            { required: true, trigger: 'blur', message: '请输入密码' }
          ]
        }
      };
    },
    computed: {
      ...mapState([
      ])
    },
    methods: {
      ...mapMutations({
        'setUserMsg': SET_USER_MSG,
        'setMenuList': SET_MENU_LIST
      }),
      login () {
        const { xhrInstance } = this.$http({
          url: '/login',
          data: {
            username: this.form.username,
            password: this.form.password
          },
          method: 'post',
          showSuccessMsg: true,
          showErrorMsg: true
        });

        xhrInstance.then((user) => {

          this.setUserMsg({
            username: user.username,
            info: user.info,
            avatar: user.avatar,
            role: user.role,
            email: user.email
          });
          this.setMenuList(user.menus);
          this.goToHomePage(user.menus);

        }, () => {
        });
      },
      formValidate () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.login();
          }
        });
      },
      goToHomePage (menuList) {
        // todo 保留上一次退出去访问的页面
        this.$router.push('/');
      },
      goToRegisterPage () {
        this.$router.push('/register');
      }
    }
  };
</script>

<style scoped lang="less">
  .app-login {
    position: relative;
    height: calc(100vh - 100px);
    /deep/ .el-row {
      height: 100%;
    }
    .box-card {
      margin-top: 50px;
      .login-btn {
        width: 100%;
        border-radius: 20px;
      }
      .card-footer {
        display: flex;
        justify-content: space-around;
        .forget-password, .go-register {
          font-size: 14px;
          cursor: pointer;
          color: #999;
        }
        .go-register {

        }
      }
    }
    /deep/ .el-form-item {
      .el-input__inner {
        border-radius: 50px;
      }
    }
  }
</style>
