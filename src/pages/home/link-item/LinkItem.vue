<template>
    <div class="link-item border-1px">
      <div class="link-title">{{ data.title }}</div>
      <div class="link-details">
        <span class="link-source ellipsis">{{ data.source }}</span>
        <span class="link-time">{{ data.time }}</span>
        <span class="link-tags ellipsis"> {{ getTag(data.tags) }} </span>
      </div>
    </div>
</template>

<script>
    export default {
      props: {
        data: {
          title: String,
          time: String,
          source: String,
          url: String,
          tags: Array
        }
      },
      mounted () {
      },
      methods: {
        /**
         * 获取链接分类
         * @param {array} tags
         * @returns {*}
         */
        getTag (tags) {
          if (Array.isArray(tags)) {
            return tags[0] || '未分类';
          }
          return '未分类';
        }
      }
    };
</script>

<style scoped lang="less">
  .link-item {
    margin: 0 10px;
    padding: 10px 0;
    .link-title {
      font-size: 18px;
    }
    .link-details {
      display: flex;
      padding: 20px 0 10px 0;
      text-align: center;
      font-size: 14px;
      color: #888;
      .link-source {
        flex: 1;
        text-align: left;
      }
      .link-time {
        flex: 0 0 100px;
      }
      .link-tags {
        flex: 0 0 120px;
      }
    }
  }
</style>
