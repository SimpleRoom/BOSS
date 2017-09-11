<template>
  <div class="message-list">
    <div class="messge_bar clear">
      <div class="message_box">
          <router-link class="border_left" to="/message/msg">消息</router-link>
          <router-link class="border_right" to="/message/msg/inter">互動</router-link>
      </div>
    </div>
    <div class="message_show">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'message',
  data () {
    return {
      messageNav:[
        {title:'聊天',route:'message'},
        {title:'互动',route:'mesInteract'}
      ]
    }
  },
  methods:{
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
<style lang="scss" scoped>
@import "../../styles/message.scss";  

</style>
