<template>
  <div class="slide_tab">
    <p v-for="(list,index) in slideTemp">{{list}}</p>
    <!-- -->
    <div class="tab_box">
      <ul class="tab_bar flex_parent">
        <li class="flex_child" v-for="(item,index) in tabbar" :class="{on:item.isSelected}"
        @click="toggleSelect(item,index)">
          <i class="iconfont" :class="item.iconClass"></i>{{ item.title }}
        </li>
      </ul>
      <div class="tab_list_box">
        <div class="tab_list" v-for="(nav,index) in tabbar" v-show="nav.isSelected">
          <p v-for="(position,index) in nav.detail">{{ position }}</p>
        </div>
      </div>
    </div>
    <!--遮罩-->
    <div id="mask" class="mask" @click="hide"></div>
  </div>
</template>

<script>
export default {
  name: 'slide',
  props:{
    
    slideTemp:{
				type:Array,
				default:[]
    },
  },
  data () {
    return {
      tabbar:[
        {
          title:"商圈",
          isSelected:true,
          iconClass:"icon-shangquanguimo",
          detail:["上海","黄埔","浦东"]
        },
        {
          title:"地铁",
          isSelected:false,
          iconClass:"icon-ditie",
          detail:["1","2","3","4"]
        }
      ],
    }
  },
  watch:{

  },
  computed:{

  },
  methods:{
    // toggleSelect
    toggleSelect(item,index){
      if(!item.isSelected){
        this.tabbar.filter(value=>{
          value.isSelected=false;
        });
        item.isSelected=true;
      }
    },
    // 传递到父组件，告知要隐藏
    hide(){
      this.$emit("hide");
    },
    cantScroll(){
      let mask=document.getElementById("mask");
      mask.addEventListener("touchmove",function(event){
        event.preventDefault();
      })
      // console.log(mask);
    }
  },
  // 創建后挂载到root之后调用该钩子函数
  mounted(){
    this.cantScroll();
  },
  // 该实例被创建还没挂载root之前，ajax可以在这里
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../styles/slideTabCom.scss";  
</style>
