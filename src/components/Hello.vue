<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul class="posts">
      <li v-for="(post, index) in posts" class="post">
        <h2>{{post.title}}</h2>
        <div class="content">
          {{post.content}}
        </div>
        <div class="date">
          {{getDate(post.date)}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters,mapState} from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Loading...',
      posts: []
    }
  },
  computed:{
      apiPath(){
         return this._username + '/' + this._posts
      },
      ...mapState(['_username','_posts']),
      ...mapGetters(['jsonbin'])
  },
  methods:{
      setPosts(data){
        if(Array.isArray(data.data)){
            data.data.sort(function(post1, post2){
               if(post1.date > post2.date) return -1;
               if(post1.date < post2.date) return 1;
               return 0;
            });
          this.posts = data.data;
          this.msg = 'Welcome to Alex.Party!';
          return;
        }
        return Promise.reject("Returned data is not an Array.");
      },
      handleError(data){
        this.msg = 'ERROR: '+data;
      },
      getPosts(){
          this.axios.get(this.jsonbin(this.apiPath))
            .then(this.setPosts)
            .catch(this.handleError)
      },
      getDate(date){
          let mydate = new Date(date);
          return mydate.toLocaleDateString();
      }
  },
  mounted: function() {
      this.getPosts();
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
  margin: 8px 0;
  padding:16px;
  background-color:#e6e6e6;
  border-radius: 10px;
  min-height: 100px;

}

.post .date{
  position:absolute;
  top:8px;
  right:8px;
  text-align: right;
}

a {
  color: #42b983;
}
</style>
