<template>
  <div class="meschat">
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
</template>

<script>
  export default{
    created(){
      this.fenchData()
    },
    data(){
      return {
        meschatData:{}
      }
    },
    methods:{
      fenchData(){
        const _this=this;
        this.$http.get('/static/data/message.json').then((res)=>{
          var res1 = res.data;
          // console.log(res1.data.chat)
          if(res.data.code == 0){
            // console.log(111);
            _this.meschatData=res1.data.chat.chat_lists;
            // console.log(_this.meschatData);
          }
        }).catch(()=>{
          alert(error)
        })
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .clear:after {
      display: table;
      content: '';
      clear: both;
  }
  .meschat h4 {
    background: #fff;
    line-height: 1.8;
    padding: 0.167rem 0.417rem;
    font-size: 0.444rem;
    border-left: 0.083rem solid #42bfee;
    margin-top: 0.278rem;
    border-bottom: 0.028rem solid #e9efef;
    border-top: 0.028rem solid #e9efef;
  }
  .meschat h4 span {
    float: right;
    padding: 0.139rem 0.333rem;
    background: #c3c3c3;
    color: #FFF;
    border-radius: 0.083rem;
    font-size: 0.278rem;
    line-height: normal;
    margin-top: 0.056rem;
  }
  .chatlist {
    background: #fff;
    padding: 0 0.556rem
  }
  .chatlist li {
    position: relative;
    padding: 0.278rem 0;
    border-bottom: 0.028rem solid #e9efef;
  }
  .chatlist li:last-child {
    border-bottom: none;
  }
  .chatlist li .infoleft {
    /*padding-right: 0.417rem;*/
    width: 2rem;
    position: relative;
    margin-right: -2rem;
  }
  .chatlist li .infoleft img {
    width: 1.389rem;
    height: 1.389rem;
    border-radius: 1.389rem;

  }
  .chatlist li .pull_right {
    width: 100%;
    padding-left: 2rem;
  }
  .pull_right p {
    color: #ccc;
  }
  .chatlist li p .name {
    font-size: 0.389rem;
    color: #333;
  }
  .chatlist li p span {
    color: #999;
  }
</style>
