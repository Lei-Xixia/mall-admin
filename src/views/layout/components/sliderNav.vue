<template>
  <div class="main-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <template>
        <a-breadcrumb>
          <a-breadcrumb-item>{{
            currentRoute[0] ? currentRoute[0].meta.title : ""
          }}</a-breadcrumb-item>
          <a-breadcrumb-item
            ><router-link :to="{ name: currentRoute[1].name }" href="">{{
              currentRoute[1] ? currentRoute[1].meta.title : ""
            }}</router-link></a-breadcrumb-item
          >
        </a-breadcrumb>
      </template>
    </div>
    <ul class="user-info">
      <li>
        {{ $store.state.user.username }}
        <a-icon type="down" />
      </li>
      <li @click="logout">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  // 监测路由的变化
  watch: {
    $route: function () {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch("changeCollapsed");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less">
.user-info {
  position: fixed;
  right: 0;
  top: 0;
}
</style>
