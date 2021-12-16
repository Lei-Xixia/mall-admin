<template>
  <div class="home">
    <leftMenu :key="key" />
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <sliderNav />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftMenu from "./components/leftMenu.vue";
import sliderNav from "./components/sliderNav.vue";
export default {
  components: {
    leftMenu,
    sliderNav,
  },
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
};
</script>

<style lang="less">
@import "~@/assets/css/home.less";
</style>
