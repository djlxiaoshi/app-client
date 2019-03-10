<template>
    <div class="tag-item">
      <div class="tag-img-wrap" @click="getCollectionsByTag(tagData._id)">
        <img :src="getDefaultCover()" alt="" class="tag-img" width="100%">
      </div>
      <div class="tag-details">
        <h4 class="tag-name">{{ tagData.label }}</h4>
        <div class="tag-desc">
          <span class="tag-owner">{{tagData.ownerName}}</span>
          <span class="tag-count">{{tagData.collections.length || 0 }}篇文章</span>
          <span class="tag-followers">{{tagData.followers || 0 }}人关注</span>
        </div>
      </div>
    </div>
</template>

<script>
  import defaultImg1 from './img/tag-default-1.jpg';
  import defaultImg2 from './img/tag-default-2.jpg';
  import defaultImg3 from './img/tag-default-3.jpg';

  import { randomNum } from '../../../assets/js/utils';

  const defaultImg = [
    defaultImg1,
    defaultImg2,
    defaultImg3
  ];
    export default {
        props: {
          tagData: {
            type: Object,
            default: () => {
              return {};
            }
          },
          defaultImg: [

          ]
        },
      methods: {
        getCollectionsByTag (tagId) {
          this.$router.push('tag/' + tagId);
        },
        getDefaultCover () {
          const index = randomNum(2);
          console.log(index);
          console.log(defaultImg[index]);
          return defaultImg[index];
        }
      }
    };
</script>

<style scoped lang="less">
  .tag-item {
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    width: 320px;
    margin: 10px auto;
    .tag-details {
      padding: 10px;
    }
    .tag-name {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .tag-desc {
      font-size: 12px;
      .tag-owner, .tag-count, .tag-followers {
        margin-right: 5px;
      }
    }
    .tag-img-wrap {
      width: 100%;
      height: 160px;
      overflow: hidden;
      cursor: pointer;
    }
    .tag-img {
      width: 100%;
      transition: all 0.4s linear;
      &:hover {
        transform: scale(1.1);
        transition: all 0.4s linear;
      }
    }
  }
</style>
