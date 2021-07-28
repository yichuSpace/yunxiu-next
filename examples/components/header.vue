<template>
  <header class="page-header">
    <div class="header-container">
      <div class="left" style="width: 580px" flex="main:justify cross:center">
        <div class="logo">
          fdg
          <yun-button></yun-button>
        </div>
        <div class="logo">
          fdgasfd
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
  methods: {
    openSearch() {
      this.$refs.searchRef.handleOpen();
    },
  },
};
</script>
<style lang="scss" scoped>
.page-header {
  width: 100%;
  color: red;
}
</style>
