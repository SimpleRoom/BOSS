<template>
  <div class="mesInteract">
    <div class="inter_header">
        <ul class="inter_bar flex_parent">
            <li v-for="(item,index) in listBar" :class="{ isHad:item.isHad }" :key="index" class="flex_child">{{ item.title }}</li>
        </ul>
    </div>
    <!-- 数据列表 -->
    <div class="inter_mask">
      <div class="inter_list">
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        apiUrl: "",
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
        interestedme:[],
        followedme:[],
        newlists:[]
      }
    },
    computed:{

    },
    methods:{
      initApiUrl(){
          // 线上
          // let domain="https://"+window.location.host+"/";
          // 本地
          let domain="http://"+window.location.host+"/";
          var str="static/data/message.json";
          this.apiUrl=domain+str;
          // console.log(this.apiUrl);
      },
      loadDate(){
        let _this=this;
        this.$http.get(_this.apiUrl)
            .then(response => {
              if(response.data.code=="0"){
                let interlist=response.data.data.interactive;
                _this.interestedme.list=interlist.interestedme;
                _this.followedme.list=interlist.followedme;
                _this.newlists.list=interlist.newlists;
              }
              console.log(_this.listBar);
            })
            .catch(error => {
              console.log(error);
        });
      }
    },
    mounted(){

    },
    created(){
      this.initApiUrl();
      this.loadDate();
    }
  }
</script>

<style lang="stylus" scoped>
</style>
