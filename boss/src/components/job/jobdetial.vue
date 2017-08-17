<template>
  <div class="job_detial">
    <div class="job_detial_header">
      <router-link to="/home" class="flex_child"><span class="icon-left"></span></router-link>
      <h3>{{msg}}</h3>
      <div class="job_detial_icon">
        <i class="iconfont icon-aixin" :class="{ selected: isSelected }" @click="toggleSelect"></i>
        <i class="iconfont icon-fenxiang1"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      apiurl: "/static/data/joblist.json",
      msg: '职位详情',
      tempInfo:"",
      id:"",
      isSelected:false,
      jobdetial:""
    }
  },
  watch:{
    '$route': 'fecthIndex'
  },
  computed:{

  },
  methods:{
    toggleSelect(){
      if(this.isSelected){
        this.isSelected=false;
      }else{
        this.isSelected=true;
      }
    },
    fecthIndex(){
      this.id=this.$route.params.jobId;
      console.log(this.id);
      this.fetchData(this.id);
    },
    fetchData(index){
      let _this=this;
      this.$http.get('/static/data/joblist.json')
          .then(response => {
              if(response.data.code=="0"){
                  // 根据id匹配指定的信息列表
                  _this.jobdetial=response.data.main[index].detial;
                  console.log(_this.jobdetial);
              }
          })
          .catch(error => {
              console.log(error);
      });
    }
  },
  // 創建后挂载到root之后调用该钩子函数
  mounted(){

  },
  // 该实例被创建还没挂载root之前，ajax可以在这里
  created(){
    this.fecthIndex();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../styles/jobdetial.scss";
</style>
