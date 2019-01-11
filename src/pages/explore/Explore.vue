<template>
    <section>
      发现
    </section>
</template>

<script>
    export default {
      mounted () {
        this.$http({
          url: '/explore',
          method: 'get',
          hasWarning: true,
          showSuccessMsg: true
        }).then(() => {

        });
      }
    };
</script>

<style scoped>

</style>
