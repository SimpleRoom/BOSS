<template>
  <div class="company-list">
  	<div class="top">
	    <div class="head clear">
	    	公司
	    	<div class="right"><span class="icon-earth"></span></div>
	    </div>
	    <div class="head-tab"  ref="wrapper">
	    	<ul class="clear">
	    		<li v-for="(item,index) in titleData" :key="item.id" @click="tabChange(index)">{{item.title}}<span class="icon-down"></span></li>
	    	</ul>

	    	 <tableView ref="judge" :tabData="tabData1" :nowIndex="nowIndex" @hide="hide" @indexData="indexData" @btnSure="btnSure" v-show="showHide"></tableView>

	    </div>
    </div>
    <div class="content">
    	<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
    		<router-link tag="li" class="clear" v-for="(item,index) in InfoData" :key="index" :to="{path : /comdetail/+item.id}">
    			<div class="right pull-left">
    				<img :src="item.comp_pic" alt="" />
    			</div>
    			<div class="left pull-left">
    				<p>{{item.comp_name}}</p>
    				<p>{{item.comp_address}}</p>
    				<p><span>{{item.comp_nature}}</span><span>|</span><span>不需要融资</span><span>|</span><span>{{item.comp_people}}</span></p>
    				<div>热招:<span style="color: #76D5CF;">{{item.hot_pos_name}}</span>等<span>{{item.hot_pos_no}}</span>个职位<span class="icon-right pull-right"></span></div>
    			</div>
    		</router-link>
    	</ul>
    	<div v-show="loading" class="page-infinite-loading loadStyle">
        		客官您滑慢点...
    	</div>
    </div>
  </div>
</template>

<script>
import tableView from "./table.vue";
export default {
  name: "company",
  components: {
    tableView
  },
  data() {
    return {
      apiUrl: "",
      loading: false,
      wrapperHeight: 0,
      InfoData: [],
      nowIndex: [0],
      indexSub: [[0], [0], [0]],
      tableIndex: 0,
      titleData: [{ title: "融资",id:1 }, { title: "规模",id:2 }, { title: "行业",id:3 }],
      tabData: [
        [
          "全部",
          "未融资",
          "天使轮",
          "A轮",
          "B轮",
          "C轮",
          "D轮及以上",
          "已上市",
          "不需要融资"
        ],
        [
          "全部",
          "0-20人",
          "20-99人",
          "100-499人",
          "500-999人",
          "1000-9999人",
          "10000以上"
        ],
        [
          "全部",
          "非互联网行业",
          "健康医疗",
          "生活服务",
          "旅游",
          "金融",
          "信息安全",
          "广告营销",
          "数据服务",
          "智能硬件",
          "文化娱乐",
          "网络招聘",
          "分类信息",
          "电子商务",
          "企业服务",
          "移动互联网",
          "社交网络",
          "教育培训",
          "游戏",
          "O2O",
          "互联网",
          "媒体",
          "IT软件"
        ]
      ],
      tabData1: [],
      showHide: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    initApiUrl() {
      // 线上
      // let domain="https://"+window.location.host+"/";
      // 本地
      let domain = "http://" + window.location.host + "/";
      var str = "static/data/joblist.json";
      this.apiUrl = domain + str;
      // console.log(this.apiUrl);
    },
    //模拟无限下拉加载
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.InfoData = this.InfoData.concat(this.InfoData);
        this.loading = false;
        // console.log(this.jobs);
      }, 2500);
    },
    fenchData() {
      const _this = this;
      this.$http.get(_this.apiUrl).then(res => {
        if (res.data.code == 0) {
          _this.InfoData = res.data.company;
        }
      });
    },
    tabChange(index) {
      this.tableIndex = index;
      this.tabData1 = this.tabData[index];
      this.nowIndex = this.indexSub[index];
      this.showHide = true;
      this.$refs.judge.judgeIndex(this.nowIndex);
      //调用子组件的方法
    },
    hide() {
      this.showHide = false;
    },
    indexData() {
      this.nowIndex = [0];
      //			var title=this.titleData[this.tableIndex].title;
      //			this.titleData[this.tableIndex].title=title.replace(/[^\u4e00-\u9fa5]+/,"")+"("+number+")";
    },
    btnSure(number, indexData) {
      this.indexSub[this.tableIndex] = indexData;
      let title = this.titleData[this.tableIndex].title;
      if (number != 0) {
        this.titleData[this.tableIndex].title =
          title.replace(/[^\u4e00-\u9fa5]+/, "") + "(" + number + ")";
      } else {
        this.titleData[this.tableIndex].title = title.replace(
          /[^\u4e00-\u9fa5]+/,
          ""
        );
      }

      this.showHide = false;
    }
  },
  // 創建后挂载到root之后调用该钩子函数
  mounted() {
    //		window.addEventListener("scroll", this.willscroll);
  },
  // 该实例被创建还没挂载root之前，ajax可以在这里
  created() {
    this.initApiUrl();
    this.fenchData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.loadStyle {
  text-align: center;
  color: rgb(118, 213, 207);
  font-size: 0.48rem;
}
.company-list {
  background: #e9efef;
  /* padding-bottom: 1.8rem; */
}
.top {
  position: fixed;
  width: 100%;
  z-index: 999;
}
.head {
  font-size: 0.481481rem;
  padding: 0.37037rem 0;
  background: #53cac3;
  text-align: center;
  position: relative;
  color: #ffffff;
  .right {
    position: absolute;
    font-size: 0.555555rem;
    right: 0.37037rem;
    top: 0.37037rem;
  }
}
.head-tab {
  background: #fff;
  color: #8d8d8d;
  position: relative;
  ul {
    list-style: none;
    padding: 0.37037rem 0;
    li {
      float: left;
      width: 33.3%;
      box-sizing: border-box;
      text-align: center;
      border-right: 1px solid #e5e5e5;
      span {
        vertical-align: middle;
      }
    }
  }
}
.content {
  padding: 2.9rem 0.185185rem 1.8rem 0.185185rem;
  ul {
    list-style: none;
    li {
      padding: 0.185185rem 0 0 0;
      margin-bottom: 0.185185rem;
      background: #fff;
      position: relative;
      .right {
        padding: 0.185185rem;
        img {
          width: 2.185185rem;
          height: 2.185185rem;
        }
      }
      .left {
        margin-left: 0.185185rem;
        p {
          margin-bottom: 0.462962rem;
          color: #8d8d8d;
        }
        p:nth-child(1) {
          font-weight: bold;
          font-size: 0.481481rem;
          color: #333;
        }
        p:nth-child(3) span {
          padding-right: 0.092592rem;
        }
        /*p:nth-child(4){
						border-top: 1px solid #E5E5E5;
						padding: 0.37037rem 0;
						span{
							padding: 0 0.092592rem;
						}
					}*/
        div {
          border-top: 1px solid #e5e5e5;
          padding: 0.462962rem 0;
          /*min-width: 9.259259rem;*/
          span {
            padding: 0 0.092592rem;
          }
          span:last-child {
            position: absolute;
            right: 0.185185rem;
            bottom: 0.462962rem;
          }
        }
      }
    }
  }
}

/*动画效果*/
.slidedown-enter,
.slidedown-leave-active {
  opacity: 0;
  transform: translate3d(0, 0, 0);
}
.slidedown-enter-active,
.slidedown-leave-active {
  transition: all 0.5s ease-in;
}
</style>
