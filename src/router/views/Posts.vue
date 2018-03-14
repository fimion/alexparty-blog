<template>
    <div v-if="!loading">
        <ap-post v-if="isSinglePost" :post="getSinglePost" class="card">
        </ap-post>
        <div class="posts" v-else>
          <template v-for="(post, index) in posts">
            <ap-post :post="post" :excerpt="true" class="card"></ap-post>
          </template>
        </div>
    </div>
    <div v-else>{{msg}}</div>
</template>

<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'
export default {
  name: 'posts',
  data () {
    return {
      msg: 'Loading...',
      loading:true,

    }
  },
  computed:{
    isSinglePost(){
      if(typeof this.$route.params !== 'undefined' && typeof this.$route.params.date !== 'undefined'){
        return true;
      }
      return false;
    },
    getSinglePost(){
      if(typeof this.$route.params !== 'undefined' && typeof this.$route.params.date !== 'undefined'){
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
        this.loading = false
      },
      oops(data){
        this.msg = this.$store.posts._postsErr;
      },
      getDate(date){
          let mydate = new Date(date);
          return mydate.toLocaleDateString();
      },
      getPostByDate(date){
        let arr = this.posts.filter(e=>parseInt(e.date)===parseInt(date))
        return arr[0]
      },
    ...mapActions(['getPosts'])
  },
  created: function() {
      this.updatePosts();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @media screen and (min-width:1000px) {
        @supports (display:grid) {
            .posts{
                display:grid;
                grid-template-columns: repeat(6,1fr);
                grid-auto-rows: 100px;
                grid-gap: 8px;
                justify-items: stretch;
            }

            .post.card{
                grid-column-end: span 2;
                grid-row-end: span 2;
                margin:0;
            }
        }
    }
</style>
