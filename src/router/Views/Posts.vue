<template>
    <div v-if="isSinglePost" class="posts">
      <div class="post card">
        <h2>{{getSinglePost.title}}</h2>
        <div class="date">
          {{getDate(getSinglePost.date)}}
        </div>
        <div class="content" v-html="getSinglePost.content">
        </div>
      </div>
      <router-link to="/posts" class="btn">Back to Posts</router-link>
      <div class="disqus card">
      <vue-disqus :shortname="disqusName" :identifier="getSinglePost.date.toString()" :url="getSinglePostUrl" :title="getSinglePost.title"></vue-disqus>
      </div>
    </div>
    <div v-else>
      <div v-for="(post, index) in posts" class="card post">
        <h2><router-link :to="'/posts/'+post.date">{{post.title}}</router-link></h2>
        <div class="date">
          {{getDate(post.date)}}
        </div>
        <div class="content" v-html="post.content">
        </div>
      </div>
    </div>
</template>

<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'
import VueDisqus from 'vue-disqus/VueDisqus.vue'
export default {
  name: 'posts',
  data () {
    return {
      msg: 'Loading...',
    }
  },
  computed:{
    isSinglePost(){
      if(typeof this.$route.params.date !== 'undefined'){
        return true;
      }
      return false;
    },
    getSinglePost(){
      if(typeof this.$route.params.date !== 'undefined'){
        let postdate = this.$route.params.date;
          return this.getPostByDate(postdate);
      }
      return false;
    },
    getSinglePostUrl(){
      return this.disqusUrl+this.getSinglePost.date;
    },
    ...mapGetters({
      posts: 'thePosts',
      disqusName:'disqusName',
      disqusUrl:'disqusUrl',
      siteTitle:'siteTitle'

    })
  },
  methods:{
      updatePosts(){
          this.getPosts()
            .then(this.updateMsg)
            .catch(this.oops);
      },
      updateMsg(data){
        this.msg = "Welcome to Alex.Party!"
      },
      oops(data){
        this.msg = this.$store.posts._postsErr;
      },
      getDate(date){
          let mydate = new Date(date);
          return mydate.toLocaleDateString();
      },
      getPostByDate(date){
        let arrlength = (this.posts).length;
        for(let x=0; x< arrlength; x++){
          if(parseInt(this.posts[x].date) === parseInt(date)) return this.posts[x];
        }
      },
    ...mapActions(['getPosts'])
  },
  mounted: function() {
      this.updatePosts();
  },
  components:{
    VueDisqus
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and (min-width: 1000px){
    @supports (grid-area: auto) {

    }
  }
</style>
