<template>
  <header class="page-header">
    <div class="header-container">
      <div class="left" style="width: 580px" flex="main:justify cross:center">
        <div class="logo">
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
<style lang="scss">
$btn-disable-color: #c5c8ce;
.page-header {
  width: 100%;
  color: $btn-disable-color;
}
</style>
