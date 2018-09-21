<template>
    <section class="home-page">
      <header class="home-header">
        <span>我的书签</span>
        <div class="add-btn" @click="addItem">添加</div>
      </header>
      <div class="home-body">
        <cube-scroll
          ref="scroll">
          <div class="link-wrap">
            <cube-swipe @item-click="onItemClick">
              <transition-group name="swipe" tag="ul">
                <li class="swipe-item-wrapper" v-for="(data,index) in favoriteList" :key="data.id">
                  <cube-swipe-item
                    ref="swipeItem"
                    :btns="btns"
                    :index="index"
                    @btn-click="onBtnClick"
                    @active="onItemActive">
                    <link-item :data="data" :key="index"></link-item>
                  </cube-swipe-item>
                </li>
              </transition-group>
            </cube-swipe>
          </div>
        </cube-scroll>

      </div>

      <add-item @swipe-back="back" v-show="showSwipePage"></add-item>
    </section>
</template>

<script>
  import LinkItem from './link-item/LinkItem';
  import AddItem from './swipe-page/AddSwipePage';

    export default {
      components: {
        LinkItem,
        AddItem
      },
      data () {
        return {
          favoriteList: [],
          activeIndex: -1,
          showSwipePage: false,
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
        onItemClick (item) {
          console.log('click item:', item);
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
        },
        onItemActive (index) {
          if (index === this.activeIndex) {
            return;
          }
          if (this.activeIndex !== -1) {
            const activeItem = this.$refs.swipeItem[this.activeIndex];
            activeItem.shrink();
          }
          this.activeIndex = index;
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
