<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view class="router-view"></router-view>
    <messages></messages>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Messages from '@/components/Messages'
export default {
  name: 'app',
  components:{
      Sidebar,
      Messages
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
  height: 100%;
}

.btn{
  background-color: #6699FF;
  text-decoration:none;
  color:#fff;
  margin:4px;
  padding: 8px;
  display:inline-block;
  border-radius:2px;
  min-width: 100px;
  cursor:pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);

}

.btn:hover{
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
  .router-view{
    padding:16px;
    flex-grow: 2;
  }

  .card{
    max-width:500px;
    width: 100%;
    margin: 8px auto;
    padding:16px;
    background-color:#e6e6e6;
    border-radius: 2px;
    min-height: 100px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
  .card.bs2{
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
  .card.bs3{
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
  .card.bs4{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  .card.bs5{
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  }
</style>
