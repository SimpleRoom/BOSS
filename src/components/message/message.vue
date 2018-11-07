<template>
  <div class="message-list">
    <div class="messge_bar clear">
      <div class="message_box">
          <span v-for="(nav,index) in messageNav"
           :class="{on:nav.isOn}"
           @click="toggleOn(nav,index)" :key="index">{{nav.title}}</span>
      </div>
    </div>
    <div class="message_show">
      <!-- 消息列表 -->
      <div class="meschat" v-show="messageNav[0].isOn">
          <h4 class="clear">联系人<span>查看新开聊(0)</span></h4>
          <div class="chatlist">
            <ul class="code">
                <router-link class="clear" tag="li" v-for="(item,index) in meschatData" :key="index" :to="{path : 'meschatDetail'}">
                  <div class="infoleft">
                    <img :src="item.chat_img">
                  </div>
                  <div class="inforight pull_right">
                    <p class="clear"><span class="name">{{item.chat_name}}</span><span class="inforight">{{item.chat_time}}</span></p>
                    <p><span>{{item.chat_title[0]}}</span> | <span>{{item.chat_title[1]}}</span></p>
                    <p>{{item.chat_msg.chat_msg_detial[1]}}</p>
                  </div>
                </router-link>
            </ul>
          </div>
      </div>
      <!-- 互动列表 -->
      <div class="info_list" v-show="messageNav[1].isOn">
        <div class="inter_header">
            <ul class="inter_bar flex_parent">
                <li v-for="(item,index) in listBar"
                 :class="{ isHad:item.isHad }" class="flex_child"
                 @click="toggleTab(item,index)" :key="index">{{ item.title }}</li>
            </ul>
        </div>
        <div class="interact-list">
          <div class="interact-same" v-for="(same,subScript) in lists" :key="subScript">
            <div class="inter-img"><img :src="same.comp_pic" alt=""></div>
            <div class="interact-msg">
              <h3 class="clear">{{same.hot_pos_name}} <span>{{same.end_time}}</span></h3>
              <p>{{same.comp_name}}</p>
              <p><span><i class="icon-seniority"></i>{{same.seniority}}</span><span><i class="icon-education"></i>{{same.education}}</span><span><i class="iconfont icon-qian"></i>{{same.job_money}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',
  data () {
    return {
      apiUrl:"",
      messageNav:[
        {title:'聊天',isOn:true},
        {title:'互动',isOn:false}
      ],
      // 1、消息数据
      meschatData:{},
      // 2、互动切换
      listBar:[
        {
          title:"对我感兴趣",
          isHad:true
        },
        {
          title:"看过我",
          isHad:false
        },
        {
          title:"新职位",
          isHad:false
        }
      ],
      tempIndex:0,
      //4.0 总数据
      interactData:[],
      //4.1 要渲染的指定的互动数据
      lists:[]
    }
  },
  methods:{
    // 1、初始化APIURL
    initApiUrl(){
      // 线上
      // let domain="https://"+window.location.host+"/";
      // 本地
      let domain="http://"+window.location.host+"/";
      var str="static/data/message.json";
      this.apiUrl=domain+str;
    },
    // 2、请求data
    fenchData(){
      const _this=this;
      this.$http.get(_this.apiUrl).then((res)=>{
        var res1 = res.data;
        // console.log(res1.data.chat)
        if(res.data.code == 0){
          // 消息的數據
          _this.meschatData=res1.data.chat.chat_lists;
          //4.3 互動的數據
          _this.interactData=res1.data.interactive;
          _this.lists=_this.interactData[0];
        }
      }).catch(()=>{
        alert(error)
      })
    },
    // 3、消息和互动的切换
    toggleOn(nav,index){
      if(!nav.isOn){
        this.messageNav.filter( item=>{
          item.isOn=false;
        });
        nav.isOn=true;
      }
    },
    toggleTab(item,index){
      //4.4
      this.lists=this.interactData[index];
      // console.log(index);
      if(!item.isHad){
        this.listBar.filter( value=>{
          value.isHad=false;
        });
        item.isHad=true;
      }
    }
  },
  // 創建后挂载到root之后调用该钩子函数
  mounted(){

  },
  // 该实例被创建还没挂载root之前，ajax可以在这里
  created(){
    this.initApiUrl();
    this.fenchData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>
