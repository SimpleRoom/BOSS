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
                    <slideTabComp v-if="slideIndex==0" :slideTemp="slideTemp"></slideTabComp>
                    <selectCityComp v-else-if="slideIndex==1" :slideTemp="slideTemp"></selectCityComp>
                    <compRequireComp v-else-if="slideIndex==2" :slideTemp="slideTemp"></compRequireComp>
                    <compRequireComp v-else="slideIndex==2" :slideTemp="slideTemp"></compRequireComp>
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
        <!--上拉加載-->
        <img v-show="willshow" @click="gotop" src="/static/images/backTop.png" class="backTop" alt="">
    </div>
</template>

<script>
    import slideTabComp from './slideTabComp.vue'
    import selectCityComp from './selectCityComp.vue'
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
                slideTemp:[],
                slideData:[
                    ["推荐","最新"],
                    ["上海","北京","深圳"],
                    ["公司","互联网","移动互联网"],
                    ["本科","硕士","专科"]
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
            changeColor(nav,index){
                let _this=this;
                this.slideIndex=index;
                this.slideTemp=this.slideData[index];
                if(nav.isSelected){
                    nav.isSelected=false;
                }else{
                    this.navlist.filter(value =>{
                        value.isSelected=false;
                    });
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
            }
            
        },
        mounted(){
            window.addEventListener("scroll", this.willscroll);
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
