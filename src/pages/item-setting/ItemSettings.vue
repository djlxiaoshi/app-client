<template>
  <div class="add-page">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="链接地址">
        <el-input v-model="form.url"></el-input>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="分类">
        <input-tag :tags.sync="form.tags"></input-tag>
      </el-form-item>

      <el-form-item label="概括">
        <el-input v-model="form.abstract"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import dayjs from 'dayjs';
  export default {
    data () {
      return {
        form: {
          url: '',
          title: '',
          tags: [],
          abstract: ''
        }
      };
    },
    mounted () {
    },
    methods: {
      onSubmit () {
        const data = {
          time: dayjs().format('YYYY-MM-DD HH:MM:ss')
        };
        Object.assign(data, this.form);

        this.$http({
          url: '/favorite',
          method: 'post',
          hasWarning: true,
          data: data
        }).then(() => {
          this.$message({
            type: 'success',
            message: '添加成功，前往‘我的书签查看’!'
          });

          this.reset();
        });
      },
      reset () {
        this.form.url = '';
        this.form.title = '';
        this.form.tags = [];
        this.form.abstract = '';
      }
    }
  };

</script>

<style lang="less" scoped>
  .add-page {
    margin: 40px auto;
    /deep/ .vue-input-tag-wrapper {
      box-sizing: border-box;
      padding-left: 15px;
      padding-right: 15px;
      height: 40px;
      line-height: 1.5;
      border: 1px solid #dcdfe6;
      border-radius: 4px;

      &:hover {
        border-color: #c0c4cc;
      }
    }
  }
</style>
