<template>
    <div class="admin">
      <h1>Admin</h1>
        <div v-if="!action">
            <router-link to="admin/addpost">Add Post</router-link>
            <ul class="posts">
                <li v-for="(post, index) in thePosts" class="post">
                    <div class="title">
                        <router-link :to="'/admin/editpost/'+post.id" >{{post.title}}</router-link>
                    </div>
                    <div class="date">
                        {{post.date}}
                    </div>
                </li>
            </ul>
        </div>
        <div v-else-if="action=='addpost'">
            <h2>Add Post</h2>
            <div class=" form">
                <div class="post-title input">
                    <label for="post-title">Title:</label>
                    <input id="post-title" type="text" name="post-title" v-model="postTitle"/>
                </div>
                <div class="post-body input">
                    <label for="post-body">Content:</label>
                    <textarea id="post-body" type="" name="post-body" v-model="postBody"></textarea>
                </div>
                <div class="post-date input">
                    <label for="post-date">Content:</label>
                    <input id="post-date" type="date" name="post-date" v-model="postDate" />
                    <p>{{unix}}</p>
                </div>
                <div class="input"><button @click="addPost" type="submit">Submit</button></div>
            </div>


        </div>
        <div v-else-if="action=='editpost'">
            <h2>Edit Post</h2>
            <div class=" form">
                <div class="post-title input">
                    <label for="post-title">Title:</label>
                    <input id="post-title" type="text" name="post-title" v-model="postTitle"/>
                </div>
                <div class="post-body input">
                    <label for="post-body">Content:</label>
                    <textarea id="post-body" type="" name="post-body" v-model="postBody"></textarea>
                </div>
                <div class="post-date input">
                    <label for="post-date">Content:</label>
                    <input id="post-date" type="date" name="post-date" v-model="postDate" />
                    <p>{{unix}}</p>
                </div>
                <div class="input"><button @click="addPost" type="submit">Submit</button></div>
            </div>


        </div>
        <pre>{{ error }}</pre>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
   export default{
        name: 'admin',
        data () {
            return {
                postTitle:'',
                postBody:'',
                postDate:(new Date()).toISOString().substring(0,10),
                postList:[],
                error:''

            }
        },
        computed:{
            action:function(){
                return this.$route.params.action;
            },
            actionId:function(){
                return this.$route.params.id
            },
            unix:function(){
                let returndate = new Date(this.postDate);

                return returndate.getTime();
            },

            ...mapState(['_posts']),
            ...mapGetters(['thePosts'])
        },
        methods:{
            addPostSuccess(data){
              this.error = data;
            },
            errorHandler(data){
                this.error = 'ERROR\n\n'+data;
            },
            addPost(){
                let senddata = {
                  'title': this.postTitle,
                  'content': this.postBody,
                  'date': this.unix
                };
                this.error = senddata;
                this.$store.dispatch('addPost',senddata)
                    .then(this.addPostSuccess)
                    .catch(this.errorHandler);
            }

        },
        mounted(){

        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .form{
        text-align: left;
    }
    #post-body{
        min-width: 99%;
        min-height: 250px;

    }
</style>
