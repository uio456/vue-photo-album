<template>
  <div id="app">
  <Header />
  <!-- Header.vue 會一直出現在Navbar 所以直接引進App.vue裡 -->
  <!-- 其他的都透過 router-view引進 -->
    <router-view/>

  </div>
</template>

<script>
import Header from "@/components/Header"
export default {
  name: 'App',
  components: {
    Header: Header
  }
}
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
