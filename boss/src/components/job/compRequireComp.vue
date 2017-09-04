<template>
  <div class="same_mask">
      <div class="slide_sametab">
          <div class="same_list" v-for="(outList,index) in slideTemp">
            <p>{{outList.title}}</p>
            <ul>
              <li v-for="(inner,innerIndex) in outList.list"
              :class="{actived:checkOut(index,innerIndex)}"
              @click="addClass(outList,index,innerIndex)">{{inner}}</li>
            </ul>
          </div>
        </div>
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
    indexArr:{
      type:Array
    }
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
    checkOut(index,innerIndex){
      return this.indexArr[index].indexOf(innerIndex)!=-1;
    },
    addClass(outList,index,innerIndex){
      let isCheckbox=outList.isCheckbox;
      // 如果是多选且不是点的 全部
      if(isCheckbox){
        if(innerIndex!=0){
            // 清除0位置的
          if(this.indexArr[index].indexOf(0)!=-1){
            this.indexArr[index].splice(0,1);
          }
          // 如果已经选过一次了
          if(this.indexArr[index].indexOf(innerIndex)!=-1){
            // 获得当前下边并且移除
            let now=this.indexArr[index].indexOf(innerIndex);
            this.indexArr[index].splice(now,1);
            // 否则就继续追加
          }else{
            this.indexArr[index].push(innerIndex);
          }
        }
      //如果是单选
      }else{
          // this.indexArr[index]=[];
          this.indexArr[index].push(innerIndex);
      }
      // if(!isCheckbox&&innerIndex!=0){
      //   console.log("单选");
      
      // }
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
<style lang="scss" scoped>
@import "../../styles/slideTabCom.scss";  
</style>
