<template>
    <section class="home-page">
      <header class="home-header">
        <span>我的书签</span>
        <div class="add-btn" @click="addItem">添加</div>
      </header>
      <div class="home-body">
        <link-item></link-item>
      </div>

      <swipe-page @swipe-back="back" v-show="showSwipePage"></swipe-page>

    </section>
</template>

<script>
  import LinkItem from './link-item/LinkItem';
  import SwipePage from './swipe-page/AddSwipePage';
  import PreviewPage from '@/components/common/preview-page/PreviewPage';

    export default {
      components: {
        LinkItem,
        SwipePage,
        PreviewPage
      },
      data () {
        return {
          favoriteList: [],
          activeIndex: -1,
          showSwipePage: false,
          previewUrl: '',
          btns: [
            {
              action: 'share',
              text: '分享',
              color: '#c8c7cd'
            },
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
        };
      },
      created () {
        this.getData();
      },
      mounted () {

      },
      watch: {
        favoriteList (value) {

        }
      },
      methods: {

        /**
         * 获取收藏的链接列表
         */
        getData () {
          this.$http({
            url: '/favorite',
            hasWarning: true
          }).then(data => {
            this.favoriteList = data;
          });
        },
        deleteItem (id) {
          this.$http({
            url: '/favorite/' + id,
            method: 'delete',
            hasWarning: true
          }).then(result => {
            this.getData();
          });
        },
        addItem () {
          this.showSwipePage = true;
        },
        back () {
          this.showSwipePage = false;
        },
        onItemClick (item, index) {
          window.location.href = item.url;
        },
        onBtnClick (btn, index) {
          if (btn.action === 'delete') {
            this.$createActionSheet({
              title: '确认要删除吗',
              active: 0,
              data: [
                {content: '删除'}
              ],
              onSelect: () => {
                this.deleteItem(this.favoriteList[index].id);
              }
            }).show();
          } else {
            this.$refs.swipeItem[index].shrink();
          }
        }
      }
    };
</script>

<style scoped lang="less">
  .home-page {
    position: relative;
    .home-header {
      display: flex;
      align-items: center;
      margin: 0 10px;
      height: 40px;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      .add-btn {
        margin-left: auto;
        padding: 5px 10px;
        line-height: 1;
        border-radius: 30px;
        border: 1px solid #dddddd;
        font-size: 14px;
      }
    }
    .home-body {
      height: calc(100vh - 100px);
      overflow: auto;
    }
    /deep/ .link-item {
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
</style>
