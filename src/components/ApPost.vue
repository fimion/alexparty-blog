<template>
    <div v-if="!excerpt">
        <div class="post">
            <h2>{{post.title}}</h2>
            <div class="date">
                {{getDate(post.date)}}
            </div>
            <div class="content" v-html="postContent">
            </div>
        </div>
        <router-link to="/posts" class="btn">Back to Posts</router-link>
        <div class="disqus">
            <vue-disqus :shortname="disqusName" :identifier="post.date.toString()" :url="getSinglePostUrl" :title="post.title"></vue-disqus>
        </div>
    </div>
    <div class="post" v-else>
        <h2><router-link :to="'/posts/'+post.date">{{post.title}}</router-link></h2>
        <div class="date">
            {{getDate(post.date)}}
        </div>
        <div class="content" v-html="postContent">
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import VueDisqus from 'vue-disqus/VueDisqus.vue'
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
          }
        },
        default: function(){
          return {title:'',content:'',date:Date.now()};
        },
        excerpt:{
          type:Boolean,
          default:false
        }
      },
    computed:{
      postContent(){
            if(this.excerpt){
              return this.post.content;
            }
            return this.post.content;
          },
      getSinglePostUrl(){
        return this.disqusUrl+this.post.date;
      },
      ...mapGetters({
        disqusName:'disqusName',
        disqusUrl:'disqusUrl'
      })
    },
    methods:{
      getDate(date){
        let mydate = new Date(date);
        return mydate.toLocaleDateString();
      }
    },
    components:{
      VueDisqus
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @media screen and (min-width: 1000px){
        @supports (grid-area: auto) {

        }
    }
</style>
