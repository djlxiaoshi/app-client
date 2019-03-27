<template>
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

            <el-form-item label="所属系统">
              <span>{{ $route.query.systemName }}</span>
            </el-form-item>

            <el-form-item label="菜单名称" prop="label">
              <el-input v-model="data.label"></el-input>
            </el-form-item>

            <el-form-item label="菜单Icon" prop="icon">
              <el-input v-model="data.icon"></el-input>
            </el-form-item>

            <el-form-item label="菜单路径" prop="path">
              <el-input v-model="data.path"></el-input>
            </el-form-item>

            <el-form-item label="菜单权限" prop="permission">
              <el-checkbox-group v-model="data.permission">
                <el-checkbox
                  v-for="(item, index) in roleList"
                  :key="index"
                  :label="item.value">
                  {{ item.label }}
                </el-checkbox>
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
          path: [
            { required: true, trigger: 'blur', message: '菜单路径不能为空' }
          ],
          permission: [
            { required: true, trigger: 'blur', message: '权限选择不能为空' }
          ]
        },
        data: {
          permission: []
        },
        systemList: [],
        roleList: [
          { label: '管理员', value: 'admin' },
          { label: '普通用户', value: 'general' },
          { label: '游客', value: 'guest' }
        ]
      };
    },
    mounted () {
      this.setDefaultSystem();
      this.getSystemList();
    },
    methods: {
      getSystemList () {
        const { xhrInstance } = this.$http({
          url: '/systems'
        });

        xhrInstance.then(result => {
          this.systemList = result;
        });
      },
      setDefaultSystem () {
        if (this.$route.query && this.$route.query.systemName) {
          this.$set(this.data, 'system', this.$route.query.systemId);
        }
      },
      createMenu () {
        return this.$http({
          url: '/menu',
          method: 'post',
          showErrorMsg: true,
          showSuccessMsg: true,
          data: { ...this.data, createTime: dayjs().format('YYYY-MM-DD HH:MM:ss') }
        });
      },
      formValidate () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const { xhrInstance } = this.createMenu();
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

</style>
