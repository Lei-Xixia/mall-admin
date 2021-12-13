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
              <a-breadcrumb-item>首页</a-breadcrumb-item>
              <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
            </a-breadcrumb>
          </template>
        </div>
        <ul class="user-info">
          <li>
            欢迎:leilei
            <a-icon type="down" />
          </li>
          <li>退出</li>
        </ul>
      </div>
</template>

<script>
export default {
  methods: {
    toggleCollapsed(){
      this.$store.dispatch("changeCollapsed")
    }
  }

}
</script>

<style>

</style>