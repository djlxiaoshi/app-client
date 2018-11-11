<template>
  <div class="edit-page">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="12" :md="12" :lg="13" :xl="14">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            编辑收藏
          </div>
          <div class="card-body">
            <el-form ref="form" :model="formData" label-width="80px" label-position="left">
              <el-form-item label="链接地址">
                <el-input v-model="formData.url"></el-input>
              </el-form-item>

              <el-form-item label="标题">
                <el-input v-model="formData.title"></el-input>
              </el-form-item>

              <el-form-item label="分类">
                <input-tag :tags.sync="formData.tags"></input-tag>
              </el-form-item>

              <el-form-item label="概括">
                <el-input v-model="formData.abstract"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="save" class="create-btn">
                  保存修改
                </el-button>
              </el-form-item>

            </el-form>
          </div>
          <div class="card-footer"></div>
        </el-card>
      </el-col>

      <el-col
        class="app-card"
        :xs="0" :sm="6" :md="6"
        :lg="4" :xl="4" :offset="1">
        待续
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import dayjs from 'dayjs';
  export default {
    data () {
      return {
        formData: {
          url: '',
          title: '',
          tags: [],
          abstract: ''
        },
        prevFormData: ''
      };
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$http({
          url: '/collection/' + vm.$route.params.id,
          method: 'get',
          hasWarning: true
        }).then(data => {
          vm.formData = data;

          vm.prevFormData = JSON.stringify({
            url: data.url,
            title: data.title,
            tags: data.tags,
            abstract: data.abstract
          });
        });
      });
    },
    mounted () {

    },
    beforeRouteLeave (to, from, next) {
      // 离开时做保存提示，通过比较内容是否更改，判断是否弹出提示框
      if (this.contentStringify(this.formData) === this.prevFormData) {
        next();
        return;
      }
      this.$alert.warning('此时离开，编辑内容将不会被保存').then((confirm) => {
        if (confirm) {
          next();
        }
      });
    },
    methods: {
      save () {
        const data = {
          time: dayjs().format('YYYY-MM-DD HH:MM:ss')
        };
        Object.assign(data, this.formData);

        this.$http({
          url: '/collection',
          method: 'put',
          hasWarning: true,
          showSuccessMsg: true,
          data: data,
          loading: true,
          loadingTarget: this.$refs.form.$el
        }).then(() => {
          this.prevFormData = this.contentStringify(this.formData);
        });
      },
      contentStringify (formData) {
        return JSON.stringify({
          url: formData.url,
          title: formData.title,
          tags: formData.tags,
          abstract: formData.abstract
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  .edit-page {
    margin: 40px auto;
    .box-card {
      /*border-radius: 20px;*/
      .create-btn {
        width: 100%;
      }
    }
    .card-body {
      position: relative;
    }
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
