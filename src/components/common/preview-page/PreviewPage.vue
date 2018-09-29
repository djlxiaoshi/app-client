<template>
    <section class="preview-page">

      <div style="overflow: auto;">
        <iframe :src="src" frameborder="0" class="preview-frame" ref="frame"></iframe>
      </div>

    </section>
</template>

<script>
    export default {
      name: 'preview-page',
      props: {
        src: {
          type: String,
          default: '',
          required: true
        }
      },
      mounted () {
        let frameBody = this.$refs.frame.contentWindow.document.body;
        frameBody.style.overflow = 'hidden';
        frameBody.style.background = 'red';
      }
    };
</script>

<style scoped lang="less">
  .preview-page {
    position: absolute;
    top: 0;
    bottom: -60px;
    left: 0;
    right: 0;
    z-index: 1000;
    .preview-frame {
      width: 100%;
      height: 100%;
    }
  }
</style>
