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
        <ul class="goos_tips">
          <li v-for="tips in good_tips">{{tips}}</li>
        </ul>
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
    <div class="top_detial_bg">
      <h3><i class="iconfont icon-jianli"></i><span>职位详情</span></h3>
      <div class="job_repon">
        <p v-for=" repon in job_respon">{{repon}}</p>
      </div>
      <div class="job_require" v-show="isMore">
        <p v-for="requires in job_require">{{requires}}</p>
      </div>
      <div class="toggle_more">
        <p v-if="isMore" class="toggle-up"><i class="icon-top" @click="toggleMore"></i></p>
        <p v-else ="isMore" class="toggle-down"><i class="icon-down" @click="toggleMore"></i></p>
      </div>
    </div>
    <!--技能要求-->
    <div class="top_detial_bg">
      <h3><i class="iconfont icon-liwuhe"></i><span>技能要求</span></h3>
      <ul class="skills">
        <li v-for="skill in job_skills">{{skill}}</li>
      </ul>
    </div>
    <!--团队信息-->
    <div class="top_detial_bg" v-show="isTeam">
      <h3><i class="icon-me"></i><span>团队介绍</span></h3>
      <div class="team"><p class="team-info">{{team_info}}</p></div>
    </div>
    <!--竞争力分析-->
    <div class="top_detial_bg">
      <h3><i class="iconfont icon-gongsi"></i><span>您的竞争力分析</span><b>查看完整数据 <i class="icon-right"></i></b></h3>
    </div>
    <!--boss信息-->
    <div class="top_detial_bg">
      <h3><i class="icon-me"></i><span>BOSS</span></h3>
    </div>
    <!--温馨提示-->
    <div class="top_detial_bg">
      <h3><i class="icon-message"></i><span>温馨提示</span></h3>
    </div>
    <!--推荐职位-->
    <div class="top_detial_bg">
      <h3><i class="iconfont icon-jianli"></i><span>职位详情</span></h3>
    </div>
    <!--立即沟通-->
    <div class="top_detial_bg">
      <h3><i class="iconfont icon-jianli"></i><span>职位详情</span></h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
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
      good_tips:[],
      // 工作职责
      job_respon:[],
      job_require:[],
      isMore:false,
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
    toggleMore(){
      this.isMore=!this.isMore;
    },
    toggleSelect(){
      this.isSelected=!this.isSelected;
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
                  // 公司福利
                  _this.good_tips=_this.jobdetial.good_tips;
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
