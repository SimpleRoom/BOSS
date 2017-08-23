<template>
  <div class="slide_tab">
    <ul class="slide_one">
      <li v-for="(list,index) in slideTemp"
      :class="{ selected: list.hadSelested }"
      @click="toggleSelected(list,index)"><span>{{list.name}}</span><i class="iconfont icon-correct"></i></li>
    </ul>
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
        this.$emit("toParent",list.name);
      }
      // this.$emit("toParent",list.name);
      // console.log(list.name);
    },
    // 子传父的通信桥梁
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
