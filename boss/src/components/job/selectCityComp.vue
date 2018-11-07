<template>
  <div class="slide_tab">
    <!-- -->
    <div class="tab_box">
      <!--商圈和地铁的按钮切换 -->
      <ul class="tab_bar flex_parent">
        <li class="flex_child" v-for="(item,index) in tabbar" :class="{on:item.isSelected}"
        @click="toggleSelect(item,index)" :key="index">
          <i class="iconfont" :class="item.iconClass"></i>{{ item.title }}
        </li>
      </ul>
      <!--商圈和地铁的列表切换 -->
      <div class="tab_list_box">
        <div class="tab_list" v-for="(nav,index) in tabbar" v-show="nav.isSelected" :key="index">
          <div class="tab_position">
            <!--左边区县或者地铁-->
            <div class="tab_position_left">
              <p v-for="(position,innerIndex) in nav.places" 
              :class="{on:position.isOn}"
              @click="toggleClass(position,index,innerIndex)" :key="innerIndex">{{ position.name }}</p>
            </div>
            <!-- 右边具体路或者位置 -->
            <div class="tab_position_right">
              <p v-for="(text,num) in tempList"
              :class="{ishad:text.isHad}"
              :data-id="text.pfid"
              @click="toggleChange(text,num)" :key="num"><span>{{text.road}}</span><i class="iconfont icon-correct"></i></p>
            </div>
          </div>
        </div>
      </div>
      <!-- 重置和确定按钮-->
      <ul class="reset_city flex_parent">
        <li class="flex_child" @click="resetSelect">重置</li>
        <li class="flex_child on" @click="hide">确定&nbsp;{{viewCount | filterZero}}</li>
      </ul>
      <!-- 切换城市 -->
      <div class="toggle_cities"><p><i class="icon-position"></i>切换城市</p></div>
    </div>
    <!--遮罩-->
    <div id="mask" class="mask" @click="hide"></div>
  </div>
</template>

<script>
export default {
  name: "slide",
  // 该子组件数据太多没从父组件传递
  // props:{
  //   slideTemp:{
  // 			type:Array,
  // 			default:[]
  //   },
  // },
  /*
  *3、点击重置如何让 局部对应 DIV：tab_position_left 默认滚动到顶部
  *
  *
  *
  *
  *
  *
  */
  data() {
    return {
      apiUrl: "",
      tabbar: [],
      // 右边动态列表数据
      tempList: [
        {
          pfid: "1",
          road: "全上海",
          isHad: false
        }
      ],
      // 分别记录商圈和地铁的选中下标
      tempOne: [
        {
          index: "",
          // 7 记录选中的个数
          count: 0
        },
        {
          index: "",
          // 7 记录选中的个数
          count: 0
        }
      ],
      // 3.1记录div下标，以便重置默认滚到顶部
      domIndex: 0,
      // 7 记录选中的个数要显示出来的
      viewCount: ""
    };
  },
  watch: {},
  computed: {},
  // 7.4 过滤为0的显示为 空
  filters: {
    filterZero(value) {
      return value == 0 ? "" : value;
    }
  },
  methods: {
    // 3.2层循环，不太好！！
    resetSelect() {
      let _this = this;
      let arr = this.tabbar;
      for (let i = 0; i < arr.length; i++) {
        let places = arr[i].places;
        for (let j = 0; j < places.length; j++) {
          places[j].isOn = false;
          let list = places[j].list;
          for (let k = 0; k < list.length; k++) {
            list[k].isHad = false;
          }
        }
        // 都清空后，需要默认显示第一个选项
        places[0].isOn = true;
        this.tempOne[i].index = "";
        // 6.0 右边具体路的暂存区
        this.tempList = [
          {
            pfid: "1",
            road: "全上海",
            isHad: false
          }
        ];
      }
      // 3.3 让 DIV默认滚动到顶部
      let defaultDivs = document.getElementsByClassName("tab_position_left");
      defaultDivs[this.domIndex].scrollTop = 0;
      // console.log(this.domIndex);
      // 7.3 重置所有的选中个数
      _this.tempOne.filter(every => {
        every.count = 0;
      });
      _this.viewCount = 0;
    },
    // 1、向父组件传递自定义事件，告知要隐藏
    hide() {
      this.$emit("hide");
    },
    // 阻止半透明滚动事件
    cantScroll() {
      let mask = document.getElementById("mask");
      mask.addEventListener("touchmove", function(event) {
        event.preventDefault();
      });
      // console.log(mask);
    },
    // 初始化请求接口
    initApiUrl() {
      // let domain="https://"+window.location.host+"/";
      // 本地
      let domain = "http://" + window.location.host + "/";
      let str = "static/data/city.json";
      this.apiUrl = domain + str;
      // console.log(this.apiUrl);
    },
    // 请求数据
    getData() {
      let _this = this;
      // console.log("aa");
      _this.$http
        .get(_this.apiUrl)
        .then(respon => {
          if (respon.data.code == "0") {
            _this.tabbar = respon.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 4 商圈和地铁按钮选中样式的切换
    toggleSelect(item, index) {
      let _this = this;
      // 7.0 切换到上次选中的个数
      _this.viewCount = _this.tempOne[index].count;
      _this.domIndex = index;
      // 简单记录下选中的下标
      let tempNum = _this.tempOne[index].index;
      let lists = _this.tabbar[index].places;
      if (!item.isSelected) {
        this.tabbar.filter(value => {
          value.isSelected = false;
        });
        item.isSelected = true;
        // 如果存在
        if (tempNum) {
          _this.tempList = lists[tempNum].list;
          // console.log("存在");
        } else {
          _this.tempList = lists[0].list;
          // console.log("不");
        }
      }
    },
    // 5 左边区县和地铁的选中切换
    toggleClass(position, index, innerIndex) {
      let _this = this;
      // 5.1 先清除上一次所有的选中样式
      _this.tempList.filter(list => {
        list.isHad = false;
      });
      // 7.1 清除之前选中的个数
      _this.tempOne[_this.domIndex].count = 0;
      _this.viewCount = 0;
      // 5.2 获取对应列表
      let lists = _this.tabbar[index].places;
      if (!position.isOn) {
        lists.filter(value => {
          value.isOn = false;
        });
        position.isOn = true;
        // 重新匹配右邊的
        _this.tempList = lists[innerIndex].list;
        // 动态付给下标记录
        _this.tempOne[index].index = innerIndex;
      }
    },
    // 6 右边 详细路切换 除了0 位置可以多选
    toggleChange(text, num) {
      let _this = this;
      // 6.1 这次选中的操作
      // _this.tempList 右边动态的数据列表
      if (num !== 0) {
        // 清除第一个选中的样式
        _this.tempList[0].isHad = false;
        // 下面切换
        text.isHad = !text.isHad;
        // 7.2 重新计算选中的个数
        if (text.isHad) {
          _this.tempOne[_this.domIndex].count++;
        } else {
          _this.tempOne[_this.domIndex].count--;
        }
        _this.viewCount = _this.tempOne[_this.domIndex].count;
      } else {
        // 清除所有的选中样式
        _this.tempList.filter(list => {
          list.isHad = false;
        });
        // 只要0位置被点击一次，0 位置只能是选中
        text.isHad = !text.isHad;
        // 7.5 重置所有的选中个数
        _this.tempOne.filter(every => {
          every.count = 0;
        });
        _this.viewCount = 0;
      }
    }
  },
  // 創建后挂载到root之后调用该钩子函数
  mounted() {
    this.cantScroll();
  },
  // 该实例被创建还没挂载root之前，ajax可以在这里
  created() {
    this.initApiUrl();
    this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
</style>
