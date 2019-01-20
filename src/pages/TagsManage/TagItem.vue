<template>
    <div class="tag-item">
      <div class="tag-img-wrap">
        <img :src="tagData.img" alt="" class="tag-img">
      </div>
      <div class="tag-details">
        <h4 class="tag-name">{{ tagData.label }}</h4>
        <div class="tag-desc">
          <span class="tag-owner">{{tagData.ownerName}}</span>
          <span class="tag-count">{{tagData.count || 0 }}篇文章</span>
          <span class="tag-followers">{{tagData.followers || 0 }}人关注</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        props: {
          tagData: {
            type: Object,
            default: () => {
              return {};
            }
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
