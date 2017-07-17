<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul class="posts">
      <li v-for="(post, index) in posts" class="post">
        <div class="date">
          {{getDate(post.date)}}
        </div>
        <h2>{{post.title}}</h2>
        <div class="content card" v-html="post.content">
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'posts',
  data () {
    return {
      msg: 'Loading...',
    }
  },
  computed:{
    ...mapGetters({
      posts: 'thePosts',

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
    ...mapActions(['getPosts'])
  },
  mounted: function() {
      this.updatePosts();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul.posts {
  list-style-type: none;
  padding: 0;
  text-align: center;
}

li.post {
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

a {
  color: #42b983;}


  @media screen and (max-width:1024px){
    .post .date{
      position: static;
      float:right;
    }
  }
</style>
