<template>
  <div class="update-system-page">
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

              <el-form-item label="系统名称" prop="label">
                <el-input v-model="data.label"></el-input>
              </el-form-item>

              <el-form-item label="系统英文名" prop="name">
                <el-input v-model="data.name"></el-input>
              </el-form-item>

              <el-form-item label="系统Icon" prop="icon">
                <el-input v-model="data.icon"></el-input>
              </el-form-item>

              <el-form-item label="系统权限" prop="permission">
                <el-checkbox-group v-model="data.permission">
                  <el-checkbox label="admin">管理员</el-checkbox>
                  <el-checkbox label="general">普通用户</el-checkbox>
                  <el-checkbox label="guest">游客</el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="formValidate" class="create-btn">
                  保存更改
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
          name: [
            { required: true, trigger: 'blur', message: '菜单英文名不能为空' }
          ],
          permission: [
            { required: true, trigger: 'blur', message: '系统权限设置不能为空' }
          ]
        },
        data: {
          label: '',
          icon: '',
          name: '',
          permission: []
        }
      };
    },
    mounted () {
      this.getSystem();
    },
    methods: {

      getSystem () {
        const { xhrInstance } = this.$http({
          url: '/system/' + this.$route.params.id,
          method: 'get'
        });

        xhrInstance.then(result => {
          this.data = result;
        });
      },

      updateSystem () {
        return this.$http({
          url: '/system/' + this.$route.params.id,
          method: 'put',
          showErrorMsg: true,
          showSuccessMsg: true,
          data: this.data
        });
      },
      formValidate () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const { xhrInstance } = this.updateSystem();
            xhrInstance.then(() => {
              this.$router.push({ name: routerNameConfig.AdminSystemListRouterName });
            });
          }
        });
      }
    }
  };
</script>

<style scoped lang="less">
  .update-system-page {

  }
</style>
