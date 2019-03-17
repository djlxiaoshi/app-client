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

            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="data.label"></el-input>
            </el-form-item>

            <el-form-item label="菜单Icon" prop="icon">
              <el-input v-model="data.icon"></el-input>
            </el-form-item>

            <el-form-item label="菜单路径" prop="path">
              <el-input v-model="data.path"></el-input>
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

  export default {
    name: '',
    data () {
      return {
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '菜单名不能为空' }
          ],
          path: [
            { required: true, trigger: 'blur', message: '菜单路径不能为空' }
          ]
        },
        data: {}
      };
    },
    methods: {
      createMenu () {
        this.$http({
          url: '/menu',
          method: 'post',
          hasWarning: true,
          showSuccessMsg: true,
          data: Object.assign(this.data, { createTime: dayjs().format('YYYY-MM-DD HH:MM:ss') })
        });
      },
      formValidate () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.createMenu();
          }
        });
      }
    }
  };
</script>

<style scoped>

</style>
