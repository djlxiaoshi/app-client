<template>
  <div class="update-menu-page">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
        <el-card class="box-card">
          <div class="card-body">
            <el-form
              ref="form"
              :rules="rules"
              :model="data"
              label-width="150px"
              label-position="left">

              <el-form-item label="菜单名称" prop="label">
                <el-input v-model="data.label"></el-input>
              </el-form-item>

              <el-form-item label="菜单Icon" prop="icon">
                <el-input v-model="data.icon"></el-input>
              </el-form-item>

              <el-form-item label="菜单路径" prop="path">
                <el-input v-model="data.path"></el-input>
              </el-form-item>

              <el-form-item label="所属系统" prop="system">
                <el-radio-group v-model="data.system">
                  <el-radio label="collection">收藏系统</el-radio>
                  <el-radio label="blog">博客系统</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="formValidate" class="create-btn">
                  保存修改
                </el-button>
              </el-form-item>

            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import routerNameConfig from '../../../router/config';

  export default {
    name: '',
    data () {
      return {
        rules: {
          label: [
            { required: true, trigger: 'blur', message: '菜单名不能为空' }
          ],
          path: [
            { required: true, trigger: 'blur', message: '菜单路径不能为空' }
          ],
          system: [
            { required: true, trigger: 'blur', message: '所属系统不能为空' }
          ]
        },
        data: {}
      };
    },
    mounted () {
      this.getMenu();
    },
    methods: {
      getMenu () {
        const { xhrInstance } = this.$http({
          url: '/menu/' + this.$route.params.id,
          method: 'get'
        });
        xhrInstance.then(result => {
          this.data = result;
        });
      },
      updateMenu () {
        const { xhrInstance } = this.$http({
          url: '/menu/' + this.$route.params.id,
          method: 'put',
          showErrorMsg: true,
          showSuccessMsg: true,
          data: this.data
        });

        xhrInstance.then(() => {
          this.$router.push({ name: routerNameConfig.AdminMenuListRouterName });
        });
      },
      formValidate () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.updateMenu();
          }
        });
      }
    }
  };
</script>

<style scoped lang="less">
  .update-menu-page {

  }
</style>
