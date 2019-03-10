<template>
  <div class="tag-details-page">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <el-card class="card-left" ref="loadingTarget">
          <div class="tag-desc">
            共有{{tagMsg.collectionsCount || 0}}篇文章，{{ tagMsg.followers }}人关注
          </div>
          <CollectionItem
            :has-delete="false"
            :has-edit="false"
            v-for="(item, index) in favoriteList"
            :data="item"
            :key="index"
            @delete="onBtnClick(index)"
            @edit="edit(item)"
          ></CollectionItem>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import CollectionItem from '../collections-manage/CollectionItem';

  export default {
    name: '',
    components: {
      CollectionItem
    },
    data () {
      return {
        favoriteList: [],
        tagMsg: {}
      };
    },
    mounted () {
      this.getCollectionsByTagId();
      this.getTagById();
    },
    methods: {
      getCollectionsByTagId () {
        this.$http({
          url: '/getCollectionsByTagId',
          data: {
            tagId: this.$route.params.id
          },
          hasWarning: true,
          loading: true,
          loadingTarget: this.$refs.loadingTarget.$el
        }).then(data => {
          this.favoriteList = data;
        }, () => {
        });
      },
      getTagById () {
        this.$http({
          url: '/tag',
          data: {
            tagId: this.$route.params.id
          },
          hasWarning: true,
          loading: true,
          loadingTarget: this.$refs.loadingTarget.$el
        }).then(data => {
          this.tagMsg = data;
        }, () => {
        });
      }
    },
    watch: {
      '$route' (to, from) {
        this.getCollectionsByTagId();
        this.getTagById();
      }
    }
  };
</script>

<style scoped lang="less">
  .tag-details-page {
    .tag-desc {
      padding: 0 10px 12px 10px;
      border-bottom: 1px solid #e5e5e5;
      font-weight: 600;
    }
  }
</style>
