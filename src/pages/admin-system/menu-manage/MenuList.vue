<template>
  <div class="menu-list-page">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="main-container">
        <MenuItem
          v-for="(item, index) in data"
          :key="index"
          :data="item"
          @edit="goToUpdateMenuPage"
          @delete="openDeleteDialog"
          @addMenu="goToAddMenuPage"
        ></MenuItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import MenuItem from './MenuItem';
  import routerNameConfig from '../../../router/config';

  export default {
    name: '',
    components: {
      MenuItem
    },
    data () {
      return {
        data: []
      };
    },
    mounted () {
      this.getMenuList();
    },
    methods: {
      getMenuList () {
        const { xhrInstance } = this.$http({
          url: '/menus',
          method: 'get'
        });

        xhrInstance.then(data => {
          this.data = data;
        });
      },
      goToUpdateMenuPage (id) {
        this.$router.push({ name: routerNameConfig.AdminUpdateMenuRouterName, params: { id } });
      },
      deleteMenu (id) {
        return this.$http({
          url: '/menu/' + id,
          method: 'delete',
          showErrorMsg: true,
          showSuccessMsg: true
        });
      },
      openDeleteDialog (id) {
        this.$alert.warning('确定要删除该项吗？').then((willDone) => {
          if (willDone) {
            const { xhrInstance } = this.deleteMenu(id);

            xhrInstance.then(() => {
              this.getMenuList();
            });
          }
        });
      },
      goToAddMenuPage (defaultSystem) {
        this.$router.push({ name: routerNameConfig.AdminCreateMenuRouterName, query: { defaultSystem: defaultSystem } });
      }
    }
  };
</script>

<style scoped lang="less">
  .menu-list-page {

  }
</style>
