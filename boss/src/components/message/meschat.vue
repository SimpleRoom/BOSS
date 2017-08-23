<template>
  <div class="meschat">
      <h4 class="clear">联系人<span>查看新开聊(0)</span></h4>
      <div class="chatlist">
        <ul class="code">
          <li class="clear">
            <div class="left">
              <img src="../../../static/images/wangxiao.jpg">
            </div>
            <div class="left">
              <p class="clear"><span class="name">张明</span><span class="right">7月20日</span></p>
              <p><span>米猪控股</span> | <span>项目经理</span></p>
              <p>请问自身前段开发工程师还在招吗，谢谢！</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="chatlist">
        <ul class="code">
            <router-link tag="li" v-for="(item,index) in meschatData" :key="item.index" :to="{path : item.route}">
              {{item.title}}
            </router-link>
        </ul>
        <div class="show">
          <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script>
  export default{
    mounted(){
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
        const id=parseInt(this.$route.params.id)-1;
        this.$http.get('/static/data/message.json').then((res)=>{
          if(res.data.code==200){
            _this.meschatData=res.data.company[id];
            console.log(_this.InfoData)
          }
        }).catch(()=>{
          alert(error);
        })
      },
    }
  }
</script>

<style>
  .clear:after {
      display: table;
      content: '';
      clear: both;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
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
    padding: 0.278rem 0;
    border-bottom: 0.028rem solid #e9efef;
  }
  .chatlist li .left img {
    width: 1.389rem;
    height: 1.389rem;
    border-radius: 1.389rem;
    margin-right: 0.417rem;
    margin: 0.222rem 0.417rem 0.222rem 0;
  }
  .chatlist li p .name {
    font-size: 0.389rem;
    color: #333;
  }
  .chatlist li p span {
    color: #ccc;
  }













</style>
