<template>
    <div class="login">
      <h1>{{ msg }}</h1>
      <pre v-if="error!==''">{{error}}</pre>
        <div> </div>
        <div class="form card">
            <div class="username input">
                <label for="username">User:</label>
                <input id="username" type="text" name="username" v-model="username"/>
            </div>
            <div class="password input">
                <label for="password">Password:</label>
                <input id="password" type="password" name="password" v-model="password"/>
            </div>
            <div><button @click="doLogin" @keyup.enter="doLogin" type="submit" class="btn">Submit</button></div>
        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations, mapActions} from 'vuex'

    export default{
        name: 'login',
        data () {
            return {
                msg:'Log In',
                error:'',
                username: '',
                password: ''
            }
        },
        computed:{
            ...mapState([
                '_localurl'
            ])

        },
        methods:{
            validateLogin(response){
                this.$router.push('/admin');
            },
            catchError(data){
                this.msg = 'ERROR';
                this.error = data;
            },
            doLogin(){
                event.preventDefault();
                this.doAuthentication( {
                    username: this.username,
                    password: this.password
                })
                    .then(this.validateLogin)
                    .catch(this.catchError);


            },
            ...mapMutations({
                _login:'login'
            }),
          ...mapActions(['doAuthentication'])
    },
      mounted(){

      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
