<template>
  <div class="slide_tab">
    <ul class="slide_one">
      <li v-for="(list,index) in slideTemp"
      :class="{ selected: list.hadSelested }"
      @click="toggleSelected(list,index)" :key="index"><span>{{list.name}}</span><i class="iconfont icon-correct"></i></li>
    </ul>
    <div id="mask" class="mask" @click="hide"></div>
  </div>
</template>

<script>
export default {
  name: 'slide',
  // props下的slideTemp是父组件传来的数组数据
  props:{
    slideTemp:{
				type:Array,
				default:[]
    },
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  watch:{

  },
  computed:{

  },
  methods:{
    // 切换选择样式
    toggleSelected(list,index){
      // console.log(this.slideTemp);
      if(!list.hadSelested){
        this.slideTemp.filter(value =>{
            value.hadSelested=false;
        });
        list.hadSelested=true;
        // 1、向父组件注入一个toParent自定义方法传递当前选中的 内容
        this.$emit("toParent",list.name);
      }
      // this.$emit("toParent",list.name);
      // console.log(list.name);
    },
    // 1、向父组件传递自定义事件，告知要隐藏
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
<style lang="stylus" scoped>
</style>
