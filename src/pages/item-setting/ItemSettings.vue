<template>
  <div class="add-page">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="14" :md="14" :lg="13" :xl="14">
            <el-card class="box-card">
              <div slot="header" class="card-header">
                {{ isAddMode ? '添加收藏' : '修改收藏' }}
              </div>
              <div class="card-body">
                <el-form ref="form" :model="$route.params" label-width="80px">
                  <el-form-item label="链接地址">
                    <el-input v-model="$route.params.url"></el-input>
                  </el-form-item>

                  <el-form-item label="标题">
                    <el-input v-model="$route.params.title"></el-input>
                  </el-form-item>

                  <el-form-item label="分类">
                    <input-tag :tags.sync="$route.params.tags"></input-tag>
                  </el-form-item>

                  <el-form-item label="概括">
                    <el-input v-model="$route.params.abstract"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="create-btn">
                      {{ isAddMode ? '立即创建' : '保存修改' }}
                    </el-button>
                  </el-form-item>

                </el-form>
              </div>
              <div class="card-footer"></div>
            </el-card>
          </el-col>

          <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4" style="border: 1px solid red;" :offset="1">
            待续
          </el-col>
        </el-row>

  </div>
</template>

<script>
  import dayjs from 'dayjs';
  export default {
    props: {
      mode: {
        type: String,
        default: 'add'
      },
      data: {
        type: Object,
        default () {
          return {
            url: '',
            title: '',
            tags: [],
            abstract: ''
          };
        }
      }
    },
    data () {
      return {

      };
    },
    mounted () {
    },
    computed: {
      isAddMode () {
        return this.mode === 'add';
      }
    },
    methods: {
      onSubmit () {

      },
      edit () {
        const data = {
          time: dayjs().format('YYYY-MM-DD HH:MM:ss')
        };
        Object.assign(data, this.$route.params.data);

        this.$http({
          url: '/collection' + this.data.id,
          method: 'put',
          hasWarning: true,
          showSuccessMsg: true,
          data: data
        }).then(() => {

        });
      },
      add () {
        const data = {
          time: dayjs().format('YYYY-MM-DD HH:MM:ss')
        };
        Object.assign(data, this.$route.params.data);

        this.$http({
          url: '/collection',
          method: 'post',
          hasWarning: true,
          showSuccessMsg: true,
          data: data
        }).then(() => {
          this.reset();
        });
      },
      reset () {
        this.data.url = '';
        this.data.title = '';
        this.data.tags = [];
        this.data.abstract = '';
      }
    }
  };

</script>

<style lang="less" scoped>
  .add-page {
    margin: 40px auto;
    .box-card {
      border-radius: 20px;
      .create-btn {
        width: 100%;
      }
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
