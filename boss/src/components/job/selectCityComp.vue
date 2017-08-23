<template>
  <div class="slide_tab">
    <p v-for="(list,index) in slideTemp">{{list}}</p>
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
