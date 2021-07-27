<template>
  <div id="app" ref="scrollBox">
    <main-header />
    <main-footer />
    <!-- <div class="main-cnt">
      <side-nav class="nav" />
      <div class="page-container" ref="containerRef">
        <div class="global-anchor" v-if="anchors.length">
          <b-scrollbar>
            <b-anchor :scroll-offset="100" ref="anchorRef">
              <template v-for="item in anchors" :key="item.id">
                <b-anchor-link
                  :href="`#${item.id}`"
                  :title="item.text"
                ></b-anchor-link>
              </template>
            </b-anchor>
          </b-scrollbar>
        </div>
        <router-view />
        <main-footer />
      </div>
      <b-back-top></b-back-top>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {
    console.log("sadf");
  },
};
</script>
