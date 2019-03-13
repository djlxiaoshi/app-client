<template>
    <div class="app-empty-component">
      <div class="empty-component-main-container">
        <p class="empty-text">{{ emptyText }}</p>
        <img src="./empty.svg" width="120px">
        <div class="custom-slot">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'app-empty-component',
    props: {
      emptyText: {
        type: String,
        default: '空空如也'
      }
    }
  };
</script>

<style scoped lang="less">
  .app-empty-component {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .empty-component-main-container {
      padding: 20px;
      .empty-text {
        color: #999999;
        text-align: center;
      }
      .custom-slot {
        text-align: center;
      }
    }
  }
</style>
