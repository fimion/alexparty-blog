<template>
  <div id="app">
    <header-bar id="header"></header-bar>
    <sidebar id="sidebar"></sidebar>
    <router-view id="router-view"></router-view>
    <messages id="messages"></messages>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Messages from '@/components/Messages'
import HeaderBar from '@/components/Header'

export default {
  name: 'app',
  components:{
      Sidebar,
      Messages,
    HeaderBar,
  }
}
</script>

<style>
  *{margin:0; padding:0;box-sizing: border-box;}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding:0;
  width:100%;
  height: 100%;
}
h1,h2,h3,h4,h5,h6{
  /*-webkit-margin-before:0; -webkit-margin-after: 0;  -webkit-margin-start: 0;  -webkit-margin-end: 0;*/line-height: 1em;
}
a{
  color:#6699FF;
  text-decoration: none;
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
    border:none;
    text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
}
  .btn.router-link-active{color:#fff;}


.btn:hover{
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
  #sidebar{
    grid-column-start:1;
    grid-row-start: 2;
    grid-row-end: auto;
  }
  #router-view{
    grid-column-start: 2;
    grid-column-end: 7;
    grid-row-start: 2;
    grid-row-end: auto;
    margin-top: 128px;
  }

  #messages{
    grid-column-start: 7;
    grid-row-start: 2;
    grid-row-end: auto;
    z-index: 5000;
  }
  #header{
    grid-column-start: 1;
    grid-column-end: 8;

  }

  .card{
    background-color:#e6e6e6;
    border-radius: 2px;
    margin:0 auto 16px;
    max-width:800px;
    padding:16px;
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
  @supports (display:grid){
    @media screen and (min-width: 1000px){
      #app{
        display:grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap:16px;
      }
      #sidebar{
        text-align: center;
        min-height: calc(100vh - 64px);
      }
      #router-view{
        margin-top: 0;
      }
    }
  }
</style>
