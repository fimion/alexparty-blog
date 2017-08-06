<template>
    <div class="sidebar" v-bind:class="{'open': menu}">
        <ul>
            <li v-for="link in links" v-if="link.always || link.login == isLoggedIn" @click="closeMenu()" class="sidebar-link">
                <router-link :to="link.url" class="btn">{{ link.title }}</router-link>
            </li>
            <li class="sidebar-link"><span class="btn" v-on:click="setAuthError({info:'Test',from:'SidebarButton'});closeMenu()">Test Message</span></li>
            <li class="sidebar-link"><a href="https://github.com/fimion/alexparty-blog" class="btn" target="_blank" @click="closeMenu()">View the Mess on Github</a></li>
        </ul>
        <h6>What is this?</h6>
        <p>This is a blog made by <a href="mailto:fimion@gmail.com">Alex Riviere</a> using Vue and <a
                href="https://jsonbin.org" target="_blank">JsonBin</a>
            as a backend. It's mostly a proof of concept to see if it could be done.
        </p>
    </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  export default{
    name: 'sidebar',
    data () {
      return {
        links: [
          {title: 'Posts', url: '/', login: false, always: true},
          {title: 'Login', url: '/login', login: false, always: false},
          {title: 'Admin', url: '/admin', login: true, always: false},
          {title: 'Logout', url: '/logout', login: true, always: false}
        ],
        msg: '',
      }
    },
    computed: {
      menu:{
        get(){
          return this.$store.state._menuOpen;
        },
        set(value){
          this.$store.commit('updateMenu', value);
        }
      },
      ...mapGetters(['isLoggedIn'])
    },
    methods: {
      toggleMenu(){
        this.menu = !this.menu;
      },
      closeMenu(){
        this.menu = false;
      },
      ...mapMutations(['setAuthError'])
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .sidebar{
        position:fixed;
        top:60px;
        left: 0;
        width: 100%;
        text-align: left;
        background-color: #e6e6e6;
        padding-top: 0px;
        overflow: hidden;
        max-height:0px;
        transition: max-height 0.3s ease;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        z-index: 50;
    }
    .sidebar.open{
        max-height:100%;
    }
    ul{list-style: none;}
    ul li{display:inline-block; padding:0;}
    @supports (grid-area: auto) {
        @media screen and (min-width: 1000px){
            :root:root:root .sidebar{
                position:static;
                max-height: 100%;
            }
            ul li.sidebar-link{
                display:block;
            }
        }
    }
</style>
