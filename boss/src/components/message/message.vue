<template>
  <div class="message-list">
        <ul class="head_tab">
            <router-link tag="li" v-for="(item,index) in messageNav" :key="item.index" :to="{path : item.route}">
              {{item.title}}
            </router-link>
        </ul>
        <div class="show_htab">
            <router-view></router-view>
        </div>
  </div>
</template>

<script>
  import mesChat from './mesChat.vue'
  import mesInteract from './mesInteract.vue'
export default {
  name: 'hello',
  components:{
    mesChat,
    mesInteract
  },
  data () {
    return {
      messageData:'',
      messageNav:[
        {title:'聊天',route:'message'},
        {title:'互动',route:'mesInteract'}
      ]
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
  .message-list {
    background: #e9efef;
    min-height: 16.667rem;
  }
  .message-list .head_tab {
    background: #53CAC3;
    text-align: center;
    padding: 0.25rem 0;
  }
  .message-list .head_tab li {
    display: inline-block;
    color: #fff;
    font-size: 0.4rem;
    padding: 0.2rem 0.5rem;
    border: 1px solid #fff;
    border-radius: 0.125rem;
    cursor: pointer;
  }
  .message-list .head_tab li:first-child {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .message-list .head_tab li:nth-child(2) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .message-list .head_tab li.router-link-exact-active{
    background: #fff;
    color: #53CAC3;
  }

</style>
