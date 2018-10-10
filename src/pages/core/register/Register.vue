<template>
  <section class="app-register">
    <el-row type="flex" justify="center">
      <el-col :xs="20" :sm="16" :md="12" :lg="10" :xl="8">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>注册</span>
          </div>
          <div class="card-body">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="邮件">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="register">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="card-footer">
            <span>已有账户，直接<span @click="goToLogin" class="go-login">登录</span></span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
    export default {
      name: 'register',
      data () {
        return {
          form: {
            username: '',
            password: '',
            email: ''
          }
        };
      },
      methods: {
        register () {

        },
        goToLogin () {
          this.$router.push('/login');
        }
      }
    };
</script>

<style scoped lang="less">
  .app-register {
    .box-card {
      margin-top: 50px;

    }
    .go-login {
      cursor: pointer;
    }
  }
</style>
