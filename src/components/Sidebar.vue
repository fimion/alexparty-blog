<template>
    <div class="sidebar">
      <h3>{{$route.name}}</h3>
      <div class="msg" v-if="msg">{{msg}}</div>
      <ul>
        <li v-for="link in links" v-if="link.always || link.login == isLoggedIn">
            <router-link :to="link.url" class="btn">{{ link.title }}</router-link>
        </li>
          <li><span class="btn" v-on:click="setAuthError({info:'Test',from:'SidebarButton'})">Test Message</span></li>
      </ul>
        <h6>What is this?</h6>
        <p>This is a blog made by <a href="mailto:fimion@gmail.com">Alex Riviere</a> using Vue and <a href="https://jsonbin.org" target="_blank">JsonBin</a>
            as a backend. It's mostly a proof of concept to see if it could be done.
        </p>
        <a href="https://github.com/fimion/alexparty-blog" class="btn" target="_blank">View the Mess on Github</a>
    </div>
</template>

<script>
    import {mapState,mapGetters,mapMutations} from 'vuex'
    export default{
        name: 'sidebar',
        data () {
            return {
                links:[
                  {title:'Posts', url:'/',login:false,always:true},
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
        methods:{
          ...mapMutations(['setAuthError'])
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sidebar{
    max-width:300px;
    background: #e6e6e6;
    height: 100%;
    width: 20vw;
    text-align: center;
      position: fixed;
      top:0;
      left:0;
      box-shadow: 0 0 20px rgba(0,0,0,0.19), 0 0 6px rgba(0,0,0,0.23);
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

    p{
        padding: 0 32px;
    }
</style>
