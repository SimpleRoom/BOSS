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
    <!---->
    <div class="top_detial_bg">
      <div class="top_detial">
        <h3>{{need_job}} <span>【{{job_money}}】</span></h3>
        <p>
          <span><i class="icon-position"></i>{{job_place}}</span>
          <span><i class="icon-seniority"></i>{{job_year}}</span>
          <span><i class="icon-education"></i>{{job_edu}}</span>
        </p>
        <div class="comp_info">
          <div class="comp_img">
            <img :src="com_img" alt="">
          </div>
          <div class="comp_msg">
            <h3>{{com_name}}</h3>
            <p><span v-for="list in com_msgarr">{{list}}</span></p>
          </div>
          <div class="comp_icon">
            <i class="icon-right"></i>
          </div>
        </div>
        <div class="comp_detial_place">
          <p><span>{{comp_address.front_road}}</span>*{{comp_address.front_detial}}</p>
          <i class="icon-position"></i>
        </div>
      </div>
    </div>
    <!--职位详情-->
    <!--技能要求-->
    <!--竞争力分析-->
    <!--boss信息-->
    <!--温馨提示-->
    <!--推荐职位-->
    <!--立即沟通-->
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
      // 匹配的新数据
      jobdetial:"",
      // 职位和薪资
      need_job:"",
      job_money:"",
      // 3
      job_place:"",
      job_year:"",
      job_edu:"",
      // 公司信息
      com_img:"",
      com_name:"",
      com_msgarr:[],
      // 地址
      comp_address:"",
      // 工作职责
      job_respon:[],
      job_require:[],
      job_skills:[],
      // 是否团队信息
      // team_info.code=0不显示
      isTeam:false,
      team_info:"",
      // boss信息
      boss_img:"",
      boss_name:"",
      boss_title:"",
      boss_online:"",
      // 温馨提示都一样
      // 推荐职位
      recommend_jobs:[]
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
                  let nowlist=response.data.main[index];
                  _this.jobdetial=nowlist.detial;
                  _this.need_job=nowlist.need_job;
                  _this.job_money=nowlist.job_money;
                  // 3个
                  _this.job_place=nowlist.con_place;
                  _this.job_year=nowlist.seniority;
                  _this.job_edu=nowlist.education;
                  // 公司信息
                  _this.com_img=_this.jobdetial.com_img;
                  _this.com_name=nowlist.conmpany;
                  _this.com_msgarr=_this.jobdetial.com_msg;
                  // 详细地址
                  _this.comp_address=_this.jobdetial.com_address;
                  // 职责
                  _this.job_respon=_this.jobdetial.job_responsibility;
                  _this.job_require=_this.jobdetial.job_requirements;
                  _this.job_skills=_this.jobdetial.job_skill;
                  // 是否显示团队信息
                  var team_code=_this.jobdetial.team_info.code;
                  if(team_code!=0){
                    _this.isTeam=true;
                    _this.team_info=_this.jobdetial.team_info.team_msg;
                  }
                  // boss信息
                  _this.boss_img=nowlist.src;
                  _this.boss_name=nowlist.ceo;
                  _this.boss_title=nowlist.title;
                  _this.boss_online=nowlist.detial.boss_online;
                  console.log(_this.jobdetial);
                  // 推荐职位
                  _this.recommend_jobs=nowlist.detial.recommend_jobs;
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
