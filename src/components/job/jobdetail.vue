<template>
  <div class="job_detial">
    <div class="job_detial_header">
      <router-link to="/home" class="flex_child"><span class="icon-left"></span></router-link>
      <h3>{{scrollInfo}}</h3>
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
          <li v-for="(tips,index) in good_tips" :key="index">{{tips}}</li>
        </ul>
        <div class="comp_info">
          <div class="comp_img">
            <img :src="com_img" alt="">
          </div>
          <div class="comp_msg">
            <h3>{{com_name}}</h3>
            <p><span v-for="(list,index) in com_msgarr" :key="index">{{list}}</span></p>
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
        <p v-for=" (repon,index) in job_respon" :key="index">{{repon}}</p>
      </div>
      <div class="job_require" v-show="isMore">
        <p v-for="(requires,index) in job_require" :key="index">{{requires}}</p>
      </div>
      <div class="toggle_more">
        <p v-if="isMore" class="toggle-up"><i class="icon-top" @click="toggleMore"></i></p>
        <p v-else class="toggle-down"><i class="icon-down" @click="toggleMore"></i></p>
      </div>
    </div>
    <!--技能要求-->
    <div class="top_detial_bg">
      <h3><i class="iconfont icon-liwuhe"></i><span>技能要求</span></h3>
      <ul class="skills">
        <li v-for="(skill,index) in job_skills" :key="index">{{skill}}</li>
      </ul>
    </div>
    <!--团队信息-->
    <div class="top_detial_bg" v-show="isTeam">
      <h3><i class="icon-me"></i><span>团队介绍</span></h3>
      <div class="team"><p class="team-info">{{team_info}}</p></div>
    </div>
    <!--竞争力分析-->
    <div class="top_detial_bg compare">
      <h3><i class="iconfont icon-gongsi"></i><span>您的竞争力分析</span><b>查看完整数据 <i class="icon-right"></i></b></h3>
      <p>目前共有<span>***</span>个牛人沟通过该职位,您是第<span>***</span>个</p>
      <p>您在当前竞聘者中综合竞争力排名第<span>***</span>名。</p>
    </div>
    <!--boss信息-->
    <div class="top_detial_bg">
      <h3><i class="icon-me"></i><span>BOSS</span></h3>
      <div class="boss_info">
        <div class="boss_img"><img :src="boss_img" alt=""></div>
        <div class="boss_detail">
          <p>{{boss_name}} <span>{{boss_online}}</span></p>
          <p>{{boss_title}}</p>
        </div>
      </div>
    </div>
    <!--温馨提示-->
    <div class="top_detial_bg good_tips">
      <h3><i class="icon-message"></i><span>温馨提示</span></h3>
      <p>该Boss承诺名下所有职位不向您收取费用，如有不实，请立即举报。</p>
    </div>
    <!--推荐职位-->
    <h3 class="recommend">推荐职位</h3>
    <div class="top_detial_bg">
      <ul class="recommend_list">
        <li v-for="(list,index) in recommend_jobs" :key="index">
          <div class="reco_comp_img"><img :src="list.comp_img" alt=""></div>
          <div class="reco_info">
            <h3>{{list.need_job}}<span>{{job_money}}</span></h3>
            <p><span>{{list.comp_name}}</span><span>{{list.comp_nature}}</span></p>
            <p>
              <span><i class="icon-position"></i>{{list.comp_place}}</span>
              <span><i class="icon-seniority"></i>{{list.comp_seniority}}</span>
              <span><i class="icon-education"></i>{{list.comp_edu}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!--立即沟通-->
    <div class="will_chat">
      <router-link to="/message" class="flex_child"><span>立即沟通</span></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      scrollInfo:"职位详情",
      apiUrl: "",
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
    // 返回上一次路由
    // goBack(){
    //   this.$router.back();
    // },
    willscroll(){
        //2.1 使用定时器，防止频繁滚动
        if (window.scrollTime) {
            window.clearTimeout(window.scrollTime);
        }
        //2.2 定时器
        window.scrollTime = window.setTimeout(() => {
            const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            this.scrollInfo = (scrollTop > 30) ? this.need_job : "职位详情";
            // console.log(scrollTop);
        }, 100);
    },
    toggleMore(){
      this.isMore=!this.isMore;
    },
    toggleSelect(){
      this.isSelected=!this.isSelected;
    },
    fecthIndex(){
      this.id=this.$route.params.jobId;
      this.fetchData(this.id);
      // console.log(this.id);
    },
    initApiUrl(){
        // 线上
        // let domain="https://"+window.location.host+"/";
        // 本地
        let domain="http://"+window.location.host+"/";
        var str="static/data/joblist.json";
        this.apiUrl=domain+str;
        // console.log(this.apiUrl);
    },
    fetchData(index){
      let _this=this;
      this.$http.get(_this.apiUrl)
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
                  // console.log(_this.jobdetial);
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
    window.addEventListener("scroll", this.willscroll);
  },
  // 该实例被创建还没挂载root之前，ajax可以在这里
  created(){
    this.initApiUrl();
    this.fecthIndex();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
</style>
