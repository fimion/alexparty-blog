<template>
 <div class="messages">
  <div v-for="(message, index) in getMessages" class="message card bs5" v-on:click="closeMessage(index)">
   <h5>{{message.type}}</h5>
   <p>{{message.from}}</p>
   <pre v-if="message.msg">{{message.msg}}</pre>
  </div>
 </div>
</template>

<script>
 import {mapGetters, mapMutations} from 'vuex'
  export default{
    name: 'messages',
    data () {
      return {}
    },
    computed:{
      ...mapGetters(['getMessages'])
    },
    methods:{
      ...mapMutations(['closeMessage'])
    },
    mounted(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messages{
 position:fixed;
 bottom:0;
 right:32px;
 padding:8px;
 width:100%;
 max-width: 300px;
}
 .message{
  min-height: 50px;
  cursor:pointer;
 }
</style>
