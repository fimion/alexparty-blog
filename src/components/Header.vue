<template>
    <header class="header">
        <span class="cheeseburger btn" @click="toggleMenu()">&#9776;</span>
        <h1 class="title">Alex.Party - {{$route.name}}</h1>
    </header>
</template>

<script>
    export default {
      name:'header-bar',
      data(){
        return{
          msg:''
        }
      },
      computed:{
        menu:{
          get(){
            return this.$store.state._menuOpen;
          },
          set(value){
            this.$store.commit('updateMenu', value);
          }
        },
      },
      methods:{
        toggleMenu(){
          this.menu = !this.menu;
        },
      }

    };
</script>

<style scoped>
    .header{
        background-color: #6699FF;
        padding:8px;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        color:#FFF;
        z-index: 100;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
    .cheeseburger{
         float:left;
         display:inline-block;
     }
    @supports (grid-area: auto) {
        @media screen and (min-width: 1000px) {
            header.header{
                position:sticky!important;
            }
            span.cheeseburger {
                display: none!important;
            }
        }
    }
</style>