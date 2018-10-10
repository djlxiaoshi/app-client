<template>
  <section class="app-login">
    <el-row type="flex" justify="center">
      <el-col :xs="20" :sm="16" :md="12" :lg="10" :xl="8">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>登录</span>
          </div>
          <div class="card-body">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="card-footer">
            <span class="go-register" @click="goToRegister">注册账户</span>
            <a href="javascript:void(0)" class="">忘记密码</a>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
    export default {
        name: 'app-login',
      components: {
      },
      data () {
          return {
            form: {
              username: '',
              password: ''
            }
          };
      },
      methods: {
        login () {

        },
        goToRegister () {
          this.$router.push('/register');
        }
      }
    };
</script>

<style scoped lang="less">
  .app-login {
    .box-card {
      margin-top: 50px;
      .card-footer {
        display: flex;
        justify-content: space-around;
        .go-register {
          cursor: pointer;
        }
      }
    }
  }
</style>
