<template>
    <div id="main">
        <h3 class="same_title">主要职位介绍</h3>
        <div class="job_content" id="jobcontent">
            <ul class="job_lists">
                <li v-for="job in jobs">
                    <router-link to="detail">
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
        </div>
        <img v-show="willshow" @click="gotop" src="/static/images/backTop.png" class="backTop" alt="">
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        data () {
            return {
                willshow: false,
                timer: null,
                mainscroll: null,
                apiurl: "/static/data/joblist.json",
                jobs: []
            }
        },
        computed: {},
        methods: {
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
                this.$http.get('/static/data/joblist.json')
                    .then(response => {
                        if(response.data.code=="0"){
                            _this.jobs=response.data.main;
                        }
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        mounted(){
            window.addEventListener("scroll", this.willscroll);
        },
        created(){
            this.$nextTick(function () {
                // this.getData();
                this.loadData();
            });
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../styles/main.scss";
</style>
