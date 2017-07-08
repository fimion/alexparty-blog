<template>
    <div class="logout">
      Logging Out...
    </div>
</template>

<script>
    export default{
        name: 'logout',
        data () {
          return {}
        },
      methods:{

            doLogout(){
                this.$store.commit('logout');
                this.$router.push('/');
            }
      },
      mounted(){
            this.doLogout();
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
