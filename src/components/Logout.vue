<template>
    <div class="logout">
      Logging Out...
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default{
        name: 'logout',
        data () {
          return {}
        },
      methods:{

            doLogout(){
                this.setAuthLogout();
                this.$router.push('/');
            },
        ...mapMutations(['setAuthLogout'])
      },
      mounted(){
            this.doLogout();
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
