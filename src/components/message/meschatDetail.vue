<template>
  <div class="message-list">
        我是消息详情页
  </div>
</template>

<script>
export default {
  name: 'hello',
  components:{
  },
  data () {
    return {
      messageData:'',

    }
  },
  watch:{

  },
  computed:{

  },
  methods:{
    fenchData(){
      const _this=this;
      this.$http.get('/static/data/message.json').then((res)=>{
        if(res.data.code==0){
          _this.messageData=res.data.chat;
          console.log(_this.messageData)
        }
      })
    },
  },
  // 創建后挂载到root之后调用该钩子函数
  mounted(){

  },
  // 该实例被创建还没挂载root之前，ajax可以在这里
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
