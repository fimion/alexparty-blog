<template>
    <ap-post v-if="isSinglePost" :post="getSinglePost" class="card">
    </ap-post>
    <div class="posts" v-else>
      <template v-for="(post, index) in posts">
        <ap-post :post="post" :excerpt="true" class="card"></ap-post>
      </template>
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

</style>
