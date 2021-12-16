<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[defaultSelectKey]"
      :default-open-keys="[defaultOpenKey]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <a-sub-menu
        v-if="!route.meta.hidden"
        v-for="route in $store.state.menuRoutes"
        :key="route.name"
      >
        <span slot="title">
          <a-icon :type="route.meta.icon" />
          <span>{{ route.meta.title }}</span>
        </span>
        <a-menu-item
          v-for="child in route.children"
          v-if="!child.meta.hidden"
          :key="child.name"
        >
          <router-link :to="{ name: child.name }"
            ><a-icon :type="child.meta.icon" />
            {{ child.meta.title }}</router-link
          >
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    defaultSelectKey: {
      get() {
        return this.$router.currentRoute.matched[1]
          ? this.$router.currentRoute.matched[1].name
          : "";
      },
    },
    defaultOpenKey: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
  },
  watch: {
    $route(val) {
      console.log(val);
    },
  },
  created() {
    // console.log(this.$router);
  },
};
</script>

<style></style>
