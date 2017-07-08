<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  name: 'app',
  components:{
      Sidebar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  padding:0;
  width:100%;

}
  .router-view{
    padding:16px;
    flex-grow: 2;
  }
</style>
