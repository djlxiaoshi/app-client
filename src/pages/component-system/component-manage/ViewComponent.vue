<template>
    <div class="view-component-page">
      <el-row type="flex" justify="center" class="main-container">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
          <el-card ref="loadingTarget">
            <ul class="fields-list">
              <li class="field-item">
                <span class="field-label">组件展示：</span>
                <img class="field-value" :src="component.img" width="100px">
              </li>
              <li class="field-item">
                <span class="field-label">组件中文名称：</span>
                <span class="field-value">{{ component.chineseName }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">组件英文名称：</span>
                <span class="field-value">{{ component.englishName }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">安装依赖说明：</span>
                <span class="field-value">{{ component.dependencies }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Gitlab地址：</span>
                <a class="field-value gitlab-link" :href="component.gitlab">{{ component.gitlab }}</a>
              </li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        component: {
          chineseName: 'dsfgsg',
          englishName: '',
          dependencies: '',
          gitlab: '',
          img: ''
        }
      };
    },
    mounted () {
      this.getComponentById();
    },
    methods: {
      getComponentById () {
        const componentId = this.$route.params.id;
        this.$http({
          url: '/component/' + componentId,
          method: 'get',
          hasWarning: true,
          loadingTarget: this.$refs.loadingTarget.$el
        }).then(res => {
          this.component = res;
        });
      }
    }
  };
</script>

<style scoped lang="less">
  .view-component-page {
    .fields-list {
      .field-item {
        display: flex;
        align-items: flex-start;
        margin: 30px 0;
        font-size: 14px;
        .field-label {
          width: 150px;
        }
        .gitlab-link {
          text-decoration: underline;
          color: #000;
          &:hover {
            color: lightgreen;
          }
        }
      }
    }
  }
</style>
