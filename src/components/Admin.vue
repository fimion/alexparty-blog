<template>
    <div class="admin">
      <h1>Admin</h1>
        <div v-if="!action">
            <router-link to="admin/add">Add Post</router-link>
        </div>
        <div v-else-if="action=='add'">
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
                postDate:new Date(),
                postList:[],
                error:''

            }
        },
        computed:{
            action:function(){
                return this.$route.params.action;
            },
            unix:function(){
                let returndate = new Date(this.postDate);

                return returndate.getTime();
            },

            ...mapState(['_posts']),
            ...mapGetters(['jsonbin','adminHeader'])
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
                    'title':this.postTitle,
                    'content':this.postBody,
                    'date':this.unix
                }
                this.error = senddata;
                this.$http.patch(
                    this.jsonbin('me/'+this._posts),
                    senddata,
                    {headers:this.adminHeader})
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
