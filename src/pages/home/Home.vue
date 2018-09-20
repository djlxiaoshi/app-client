<template>
    <section class="home-page">
      <header class="home-header border-1px">我的书签</header>
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
    </section>
</template>

<script>
  import LinkItem from './link-item/LinkItem';
    export default {
      components: {
        LinkItem
      },
      data () {
        return {
          favoriteList: [],
          activeIndex: -1,
          btns: [
            {
              action: 'clear',
              text: '不再关注',
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
        onItemClick (item) {
          debugger;
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
                this.favoriteList.splice(index, 1);
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
    .home-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 40px;
      z-index: 1000;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      font-weight: 700;
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
