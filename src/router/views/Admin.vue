<template>
    <div class="admin">
      <h1>Admin</h1>
        <div v-if="!action">
            <router-link to="admin/addpost" class="btn">Add Post</router-link>
            <div class="posts">
                <div v-for="(post, index) in thePosts" class="post card">
                    <div class="title">
                        <router-link :to="'/admin/editpost/'+post.id" >{{post.title}}</router-link>
                    </div>
                    <div class="date">
                        {{new Date(post.date)}}
                    </div>
                    <div class="delete btn" @click="deletePost(post.id)">X</div>
                </div>
            </div>
        </div>
        <div v-else-if="action=='addpost'">
            <h2>Add Post</h2>
            <div class="form card">
                <div class="post-title input">
                    <label for="post-title">Title:</label>
                    <input id="post-title" type="text" name="post-title" v-model="postTitle"/>
                </div>
                <div class="post-body input">
                    <label for="post-body">Content:</label>
                    <textarea id="post-body" type="" name="post-body" class="post-body" v-model="postBody" ></textarea>
                </div>
                <div class="post-date input">
                    <label for="post-date">Content:</label>
                    <flat-pickr id="post-date" name="post-date" v-model="postDate" :config="flatPickrConfig"></flat-pickr>
                    <p>{{unix}}</p>
                </div>
                <div class="input"><button @click="addPost" type="submit" class="btn">Submit</button></div>
            </div>


        </div>
        <div v-else-if="action=='editpost'">
            <h2>Edit Post {{actionId}}</h2>
            <div class="form card">
                <div class="post-title input">
                    <label for="edit-post-title">Title:</label>
                    <input id="edit-post-title" type="text" name="post-title" v-model="postTitle"/>
                </div>
                <div class="post-body input">
                    <label for="edit-post-body">Content:</label>
                    <textarea id="edit-post-body" type="" name="post-body" class="post-body" v-model="postBody"></textarea>
                </div>
                <div class="post-date input">
                    <label for="edit-post-date">Content:</label>
                    <flat-pickr id="edit-post-date" name="post-date" v-model="postDate" :config="flatPickrConfig"></flat-pickr>
                    <p>{{unix}}</p>
                </div>
                <div class="input"><button @click="editPost" type="submit" class="btn" >Submit</button></div>
            </div>
            <ap-post :post="{content:postBody,date:postDate,title:postTitle}" class="card"/>
        </div>
        <pre>{{ error }}</pre>
    </div>
</template>

<script>
    import {mapGetters, mapState, mapActions, mapMutations} from 'vuex'
    import flatPickr from 'vue-flatpickr-component'
    import 'flatpickr/dist/flatpickr.css'
    const ApPost = ()=>import(/* webpackChunkName:'ap-post.component'*/'@/components/ApPost');
   export default{
        name: 'admin',
        data () {
            return {
                postTitle:'',
                postBody:'',
                postDate: (new Date()).toISOString(),
                postList:[],
                error:'',
              flatPickrConfig:{
                  enableTime:true,
              }

            }
        },
        computed:{
            action:function(){
                let action = this.$route.params.action;
                if(action ==='editpost'){
                  let index = this.getEditIndex(this.actionId);
                  this.postTitle = this.thePosts[index].title;
                  this.postBody = this.thePosts[index].content;
                  this.postDate = (new Date(this.thePosts[index].date)).toISOString();
                }
                return this.$route.params.action;
            },
            actionId:function(){
                return this.$route.params.id
            },
            unix:function(){
                let returndate = new Date(this.postDate);

                return returndate.getTime();
            },

            ...mapState(['posts._posts']),
            ...mapGetters(['thePosts'])
        },
        methods:{
            addPostSuccess(data){
              let message= {from:'Added Post.'};
              this.setSuccessMessage(message);
              this.$router.push('/admin');
            },
          editPostSuccess(data){
            let message= {from:'Edited Post.', info:data};
            this.setSuccessMessage(message);
            this.$router.push('/admin');
          },
          deletePostSuccess(data){
            let message= {from:'Deleted Post.', info:data};
            this.setSuccessMessage(message);
            this.$router.push('/admin');
          },
            errorHandler(data){
                let error= {from:'Admin.errorHandler',info:data};
                this.setPostsError(error);
            },
            addPost(){
                let senddata = {
                  'title': this.postTitle,
                  'content': this.postBody,
                  'date': this.unix
                };
                this.$store.dispatch('addPost',senddata)
                    .then(this.addPostSuccess)
                    .catch(this.errorHandler);
            },
          checkForPosts(){
            if(this.thePosts.length <= 0){
              this.getPosts();
            }
          },
          getEditIndex(id){
            let arrlength = (this.thePosts).length;
            for(let x=0; x< arrlength; x++){
              if(this.thePosts[x].id == id) return x;
            }
          },
          editPost(){
            let senddata = {
              'title': this.postTitle,
              'content': this.postBody,
              'date': this.unix,
              'id': this.actionId
            };
            this.$store.dispatch('editPost',senddata)
              .then(this.editPostSuccess)
              .catch(this.errorHandler);

          },
          deletePost(index){
            if(confirm('Are you sure you want to delete this?')){
                let datatosend = {id:index};
                this.$store.dispatch('deletePost',datatosend)
                  .then(this.deletePostSuccess)
                  .catch(this.errorHandler);
            }
          },
          ...mapActions(['getPosts']),
          ...mapMutations(['setSuccessMessage','setPostsError'])

        },
        mounted(){
            this.checkForPosts();
        },
     components:{
       flatPickr,
       ApPost,
     }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea{
    min-height: 200px;
    min-width:400px;
}
</style>
