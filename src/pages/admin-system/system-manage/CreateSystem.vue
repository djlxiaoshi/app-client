<template>
  <div class="create-system-page">
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

              <el-form-item label="系统Icon" prop="icon">
                <el-input v-model="data.icon"></el-input>
              </el-form-item>

              <el-form-item label="系统权限" prop="permission">
                <el-checkbox-group v-model="data.permission">
                  <el-checkbox
                    v-for="(item, index) in roles"
                    :key="index"
                    :label="item.value"
                  >{{ item.label }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="formValidate" class="create-btn">
                  立即创建
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
  import dayjs from 'dayjs';
  import routerNameConfig from '../../../router/config';

  export default {
    name: '',
    data () {
      return {
        rules: {
          label: [
            { required: true, trigger: 'blur', message: '菜单名不能为空' }
          ],
          permission: [
            { required: true, trigger: 'blur', message: '系统权限设置不能为空' }
          ]
        },
        data: {
          label: '',
          icon: '',
          permission: [],
          menus: [
            { label: '我的文章', path: '', icon: '', permission: '' }
          ]
        },
        roles: [
          { label: '管理员', value: 'admin' },
          { label: '普通用户', value: 'general' },
          { label: '游客', value: 'guest' }
        ]
      };
    },
    mounted () {

    },
    methods: {

      createSystem () {
        return this.$http({
          url: '/system',
          method: 'post',
          showErrorMsg: true,
          showSuccessMsg: true,
          data: { ...this.data, createTime: dayjs().format('YYYY-MM-DD HH:MM:ss') }
        });
      },
      formValidate () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const { xhrInstance } = this.createSystem();
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
  .create-system-page {
    .system-menus {
      display: flex;
    }
  }
</style>
