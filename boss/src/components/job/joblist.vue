<template>
    <div id="main">
        <!--固定的顶部-->
        <div class="main_fixed_top">
            <div class="job_header clear">
                <div class="job_header_left">
                    <span>web前端</span>
                    <span>HTML5</span>
                </div>
                <div class="inforight job_header_icon">
                    <span><i class="iconfont icon-jiahao"></i></span>
                    <b></b>
                    <span><i class="iconfont icon-sousuo"></i></span>
                </div>
            </div>
            <div class="job_nav">
                <ul class="flex_parent">
                    <li class="flex_child" v-for="(nav,index) in navlist"
                     :class="{ selected: nav.isSelected }"
                     @click="changeColor(nav,index)">
                     {{nav.title}}<span class="icon-down"></span>
                    </li>
                </ul>
                <keep-alive>
                    <slideTabComp v-show="navlist[0].isSelected" @toParent="fromChild" @hide="hide" v-if="slideIndex==0" :slideTemp="slideTemp"></slideTabComp>
                    <selectCityComp v-show="navlist[1].isSelected" @hide="hide" v-else-if="slideIndex==1"></selectCityComp>
                    <compRequireComp v-show="navlist[2].isSelected" @hide="hide" v-else-if="slideIndex==2" :indexArr="indexArr[0]" :slideTemp="slideTemp"></compRequireComp>
                    <compRequireComp v-show="navlist[3].isSelected" @hide="hide" v-else="slideIndex==3" :indexArr="indexArr[1]" :slideTemp="slideTemp"></compRequireComp>
                </keep-alive>
            </div>
        </div>
        <!--列表-->
        <div class="job_content" id="jobcontent" ref="wrapper">
            <ul class="page-infinite-list job_lists" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                <li v-for="job in jobs">
                    <router-link @click="changeDetialId(job)" :to="{ name: 'detail', params: { jobId: job.id }}">
                        <h4 class="clear">{{job.need_job}}<span class="inforight">{{job.job_money}}</span>
                        </h4>
                        <p class="clear"><span></span>{{job.conmpany}}</p>
                        <p class="clear">
                            <span class="icon-position"></span><span>{{job.con_place}}</span>
                            <span class="icon-seniority"></span><span>{{job.seniority}}</span>
                            <span class="icon-education"></span><span>{{job.education}}</span>
                        </p>
                        <p class="clear title">
                            <img :src="job.src" alt="" class="infoleft">
                            <span class="infoleft">{{job.ceo}}</span>
                            <span class="infoleft">{{job.title}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
            <div v-show="loading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>客官您滑慢点...
            </div>
        </div>
        <!--返回顶部-->
        <!-- <img v-show="willshow" @click="gotop" src="/static/images/backTop.png" class="backTop" alt=""> -->
    </div>
</template>

<script>
    /*
    * 注=> : somename 向子组件传递数据
    *      @ some 接收子组件传递过来的自定义事件
    *说明：1、keep-alive子组件里的v-show为了点击自己切换自己下组件的显示和隐藏，v-if-else 是为了切换4个切换按钮 对应子组件的显示和隐藏
    * 2、组件内的 slideTemp是传到子组件的 数组数据(切换回变化)，selectCityComp内数据太多没向子组件传递
    * 3、@toParent是子组件传递给父组件的数据的自定义方法,在父组件自定义为：fromChild 方法
    * 4、@hide 子组件传递过来的自定义事件,在父组件自定义为：hide 方法
    * v-show只是单纯的切换css属性display的none和block，v-if 会移除和新建DO树！
    * 5、:indexArr 为了传递到子组件记录是否选中的状态
    *
    *
    *
    *
    **/
    // 推荐子组件
    import slideTabComp from './slideTabComp.vue'
    // 城市选择组件
    import selectCityComp from './selectCityComp.vue'
    // 公司和要求公用一个子组件
    import compRequireComp from './compRequireComp.vue'
    export default {
        data () {
            return {
                navlist:[
                    {
                        title:"推荐",
                        isSelected:false,
                    },
                    {
                        title:"上海",
                        isSelected:false,
                    },
                    {
                        title:"公司",
                        isSelected:false,
                    },
                    {
                        title:"要求",
                        isSelected:false,
                    }
                ],
                slideIndex:"",
                isShowSlide:false,
                slideTemp:[],
                // 传递到 公司和 要求子组件 记录是否选中的状态
                indexArr:[[[0],[0],[0]],[[0],[0],[0]]],
                slideData:[
                    [
                        {
                            "name":"推荐",
                            "hadSelested":true
                        },
                        {
                            "name":"最新",
                            "hadSelested":false
                        }
                    ],
                    // 城市选择这项数据太多没用父子通信传递数据
                    [0,1],
                    [
                        {
                            title:"融资规模",
                            isCheckbox:true,
                            list:["全部","未融资","天使轮","A轮","B轮","C轮","D轮及以上","已上市","不需要融资"]
                        },
                        {
                            title:"团队规模",
                            isCheckbox:true,
                            list:["全部","0-20人","20-99人","100-499人","500-999人","1000-9999人","10000人以上"]
                        },
                        {
                            title:"行业",
                            isCheckbox:true,
                            list:["全部","非互联网行业","健康医疗","生活服务","旅游","金融","信息安全","广告营销","数据服务","智能硬件","文化娱乐","网络招聘",
                                "分类信息","电子商务","移动互联网","企业服务","社交网络","教育培训","O2O","游戏","互联网","媒体","IT软件"]
                        }
                    ],
                    [
                        {
                            title:"最低学历",
                            isCheckbox:true,
                            list:["全部","中专及以下","高中","大专","本科","硕士","博士"]
                        },
                        {
                            title:"经验",
                            isCheckbox:true,
                            list:["全部","应届生","1年以内","1-3年","3-5年","5-10年","10年以上"]
                        },
                        {
                            title:"薪资(单选)",
                            isCheckbox:false,
                            list:["全部","3k以下","3k-5k","5k-10k","10k-20k","20k-50k","50k以上"]
                        },
                    ]
                ],
                willshow: false,
                timer: null,
                mainscroll: null,
                apiUrl: "",
                jobs: [],
                temp:[],
                jobId:"",
                loading: false,
                allLoaded: false,
                wrapperHeight: 0
            }
        },
        components:{
            slideTabComp,selectCityComp,compRequireComp
        },
        computed: {},
        methods: {
            // 3、接收子传来的选项
            fromChild(msg){
                this.navlist[0].title=msg;
                // console.log(msg);
            },
            ///4、接收子传来的是否隐藏
            hide(){
                // this.isShowSlide=false;
                this.navlist.filter(value =>{
                    value.isSelected=false;
                });
            },
            // 5、切换的时候动态改变要传递到子组件的数据：this.slideTemp
            changeColor(nav,index){
                let _this=this;
                this.slideIndex=index;
                this.slideTemp=this.slideData[index];
                if(nav.isSelected){
                    nav.isSelected=false;
                }else{
                    // 先清空所有选中效果
                    this.navlist.filter(value =>{
                        value.isSelected=false;
                    });
                    // 设置当前选中效果
                    nav.isSelected=true;
                }
                // console.log(this.slideIndex);
            },
            willscroll(){
                //2.1 使用定时器，防止频繁滚动
                if (window.scrollTime) {
                    window.clearTimeout(window.scrollTime);
                }
                //2.2 定时器
                window.scrollTime = window.setTimeout(() => {
                    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    this.willshow = (scrollTop > 300) ? true : false;
                    // console.log("滚动了");
                }, 100);
            },
            //3 返回顶部
            gotop(){
                this.willshow = !this.willshow;
                let d = document.documentElement;
                let b = document.body;
                // console.log(this.timer,d,b);
                this.timer = window.setInterval(() => {
                    d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                    b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                    //到达顶部清除定时器，重新绑定滚动事件
                    if ((d.scrollTop + b.scrollTop) === 0) clearInterval(this.timer, window.onscroll = this.willscroll);
                }, 10);
            },
            loadData(){
                let _this=this;
                this.$http.get(_this.apiUrl)
                    .then(response => {
                        if(response.data.code=="0"){
                            _this.jobs=response.data.main;
                            // 模擬每次下拉加載的10條假數據
                            _this.temp=response.data.main;
                            // console.log(response.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                });
            },
            // 模擬無限下拉加載
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    this.jobs=this.jobs.concat(this.temp);
                    this.loading = false;
                    // console.log(this.jobs);
                }, 2500);
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
            // 4.1、阻止局部滚动到达边界后会造成页面继续滚动(不合适)
            stopScroll(){
                let container=document.getElementById("jobcontent");
                // console.log(container);
                container.addEventListener("touchmove",function(event){
                    event.preventDefault();
                },false);
            },
            // 4、2把阻止事件remove
            removeStopScroll(){
                let container=document.getElementById("jobcontent");
                container.removeEventListener("touchmove",function(event){
                    event.preventDefault();
                },false);
            }
            
        },
        mounted(){
            // 去掉范湖底部事件监听
            // window.addEventListener("scroll", this.willscroll);
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            // console.log(this.$refs.wrapper.getBoundingClientRect().top);
        },
        created(){
            this.initApiUrl();
            this.$nextTick(function () {
                this.loadData();
            });
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../styles/main.scss";  
</style>
