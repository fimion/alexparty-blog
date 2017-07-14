<template>
    <div class="sidebar">
      <h3>{{$route.name}}</h3>
      <div class="msg" v-if="msg">{{msg}}</div>
      <ul>
        <li v-for="link in links" v-if="link.always || link.login === isLoggedIn">
            <router-link :to="link.url" class="btn">{{ link.title }}</router-link>
        </li>
      </ul>
        <h6>What is this?</h6>
        <p>This is a blog made by Alex Riviere using Vue and <a href="https://jsonbin.org" target="_blank">JsonBin</a>
            as a backend. It's mostly a proof of concept to see if it could be done.
        </p>
    </div>
</template>

<script>
    import {mapState,mapGetters} from 'vuex'
    export default{
        name: 'sidebar',
        data () {
            return {
                links:[
                  {title:'Home', url:'/',login:false,always:true},
                  {title:'Login',url:'/login',login:false,always:false},
                  {title:'Admin',url:'/admin',login:true,always:false},
                  {title:'Logout',url:'/logout',login:true,always:false}
                ],
                msg:''
            }
        },
        computed:{
          ...mapGetters(['isLoggedIn'])
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sidebar{
    max-width:300px;
    text-align: left;
    background: #e6e6e6;
    height: 100vh;
    width: 20vw;
    text-align: center;
  }
  h3{

  }
  ul{
    list-style: none;
    padding:0;
    margin:0;
  }
  ul li{
    padding:0;
    margin:0;
  }
  .btn{
    background-color: #6699FF;
    text-decoration:none;
    color:#fff;
    margin:4px;
    padding: 8px;
    display:inline-block;
    border-radius:3px;
    min-width: 100px;
  }
    p{
        padding: 0 32px;
    }
</style>
