<template>
  <div class="hello">
    <div v-if="isSinglePost" class="posts">
      <div class="post">
        <div class="date">
          {{getDate(getSinglePost.date)}}
        </div>
        <h2>{{getSinglePost.title}}</h2>
        <div class="content card" v-html="getSinglePost.content">
        </div>
      </div>
      <router-link to="/posts" class="btn">Back to Posts</router-link>
      <div class="disqus card">
      <vue-disqus :shortname="disqusName" :identifier="getSinglePost.date.toString()" :url="getSinglePostUrl" :title="getSinglePost.title"></vue-disqus>
      </div>
    </div>
    <div v-else>
    <h1>{{ msg }}</h1>
    <ul class="posts">
      <li v-for="(post, index) in posts" class="post">
        <div class="date">
          {{getDate(post.date)}}
        </div>
        <h2><router-link :to="'/posts/'+post.date">{{post.title}}</router-link></h2>
        <div class="content card" v-html="post.content">
        </div>
      </li>
    </ul>
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
h1, h2 {
  font-weight: normal;
}

.posts {
  padding: 0;
  text-align: center;
}

.post {
  display: block;
  margin: 8px auto;
  text-align: left;
  max-width: 500px;
  width:100%;
  position:relative;
}

.post h2{
  border-bottom: 4px solid #f6f6f6;
  line-height:1em;
  margin:0;
  padding:0;
}

.post .content{

}

.post .date{
  position:absolute;
  top:8px;
  right:8px;
  text-align: right;
}



  @media screen and (max-width:1024px){
    .post .date{
      position: static;
      float:right;
    }
  }
</style>
