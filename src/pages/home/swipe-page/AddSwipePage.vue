<template>
  <transition name="page-move">
    <cube-page title="添加" v-on="$listeners">
      <div slot="content">
        <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
          <cube-form-group>
            <cube-form-item v-for="(field, index) in fields" :field="field" :key="index"></cube-form-item>
          </cube-form-group>
          <cube-form-group>
            <cube-button type="submit">Submit</cube-button>
          </cube-form-group>
        </cube-form>
      </div>
    </cube-page>
  </transition>
</template>

<script>
  import CubePage from '@/components/common/swipe-page/SwipePage';

  export default {
    components: {
      CubePage
    },
    data () {
      return {
        validity: {},
        valid: undefined,
        model: {
          titleValue: '',
          urlValue: '',
          tagsValue: ''
        },
        fields: [
          {
            type: 'input',
            modelKey: 'titleValue',
            label: '标题',
            props: {
              placeholder: '请输入'
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'urlValue',
            label: 'url',
            props: {
              placeholder: '请输入URL'
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'tagsValue',
            label: '分类',
            props: {
              placeholder: '请输入'
            }
          }
        ]
      };
    },
    methods: {
      submitHandler (e) {
        if (this.valid) {
          this.addLinkItem();
        }
      },
      addLinkItem () {
        this.$http({
          url: '/favorite/',
          method: 'post',
          data: {
            title: this.model.titleValue,
            url: this.model.urlValue,
            source: '个人网站',
            time: '2018-9-19',
            tags: [this.model.tagsValue]
          },
          hasWarning: true
        }).then(result => {

        });
      },
      validateHandler (result) {
        this.validity = result.validity;
        this.valid = result.valid;
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .page-move-enter, .page-move-leave-active
    transform: translate(100%, 0)
  .page-move-enter-active, .page-move-leave-active
    transition: transform .3s
</style>
