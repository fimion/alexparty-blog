<template>
    <div v-if="!excerpt">
        <div class="post">
            <div class="date">{{getDate}}</div>
            <h2>{{post.title}}</h2>
            <vue-markdown class="content" :source="postContent"/>
        </div>
        <router-link to="/posts" class="btn">Back to Posts</router-link>
        <div class="disqus">
            <vue-disqus  :shortname="disqusName" :identifier="post.date.toString()" :url="getSinglePostUrl" :title="post.title"></vue-disqus>
        </div>
    </div>
    <div class="post" v-else>
        <div class="date">{{getDate}}</div>
        <h2><router-link :to="'/posts/'+post.date">{{post.title}}</router-link></h2>
        <vue-markdown class="content" :source="postContent"/>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  const VueDisqus = ()=>import(/* webpackChunkName:'vue-disqus.component' */'vue-disqus/VueDisqus.vue');
  const VueMarkdown = ()=>import(/* webpackChunkName:'vue-markdown.component' */'vue-markdown');
  export default {
    name: 'ap-post',
    data() {
      return {}
    },
    props: {
      post: {
        type:Object,
        validator:function(post){
          return(typeof post.title !== 'undefined'
            &&  typeof post.content !== 'undefined'
            &&  typeof post.date !== 'undefined');
          },
            default: function(){
              return {title:'',content:'',date:Date.now()};
            },
        },
        excerpt:{
          type:Boolean,
          default:false
        }
      },
    computed:{
      postContent(){
            if(this.excerpt){
              return this.post.content.slice(0,100)+((this.post.content.length>100)?'...':'');
            }
            return this.post.content;
          },
      getSinglePostUrl(){
        return this.disqusUrl+this.post.date;
      },
      getDate(){
        let mydate = new Date(this.post.date);
        return mydate.toLocaleDateString();
      },
      ...mapGetters({
        disqusName:'disqusName',
        disqusUrl:'disqusUrl'
      })
    },
    methods:{
    },
    components:{
      VueDisqus,
      VueMarkdown,
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .date{float:right; padding: 4px 8px;}
    .content{text-align: left; white-space: pre-wrap;}


    @media screen and (min-width: 1000px){
        @supports (display:grid) {

        }
    }
</style>
