<template>
  <div class="home">
    <leftMenu />
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
    sliderNav
  },
  data() {
    return {
      
    };
  },
  methods: {
  },
};
</script>

<style lang="less">
@import "~@/assets/css/home.less";
</style>
