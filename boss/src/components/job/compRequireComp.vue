<template>
  <div class="same_mask">
    <!--  -->
      <div class="slide_sametab">
          <div class="same_list" v-for="(outList,index) in slideTemp" :key="index">
            <p>{{outList.title}}</p>
            <ul>
              <li v-for="(inner,innerIndex) in outList.list"
              :class="{actived:checkOut(index,innerIndex)}"
              @click="addClass(outList,index,innerIndex)" :key="innerIndex">{{inner}}</li>
            </ul>
          </div>
        </div>
        <!-- 重置和确定按钮-->
        <ul class="reset_city flex_parent">
          <li class="flex_child" @click="resetSelect">重置</li>
          <li class="flex_child on" @click="hide">确定&nbsp;{{viewCount | filterZero}}</li>
        </ul>
      <div id="mask" class="mask" @click="hide"></div>
  </div>
</template>

<script>
  /*
  * slideTemp : 接收父组件传递来的动态数据
  * indexArr ：接收父组件传递来的数组，匹切换配选中状态
  *
  *
  */
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
      // 6 添加选中个数
      viewNum:[0,0],
      viewCount:0
    }
  },
  // 1 过滤为0的显示为 空
  filters:{
    filterZero(value){
      return value==0?"":value;
    }
  },
  watch:{

  },
  computed:{

  },
  methods:{
    // 2 重置所有选中状态
    resetSelect(){
      // 由于是传递进来的数组不能重新赋值对应的数组，只能操作！
      for(let i=0;i<this.indexArr.length;i++){
        // 之前只要有改动才清空数组
        if(this.indexArr[i].indexOf(0)==-1){
          this.indexArr[i].splice(0,this.indexArr[i].length);
          this.indexArr[i].push(0);
        }
        // 恢复0位置
      }
    },
    // 3 匹配是否有选中状态
    checkOut(index,innerIndex){
      return this.indexArr[index].indexOf(innerIndex)!=-1;
    },
    // 4、点击切换选中状态
    addClass(outList,index,innerIndex){ 
      let isCheckbox=outList.isCheckbox;
      //2、 如果是多选且不是点的 全部
      if(isCheckbox){
        //2.1 不是0位置其他可以多选
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
            // 6.1 选中总数--
            // this.viewCount--;
            // 否则就继续追加
          }else{
            this.indexArr[index].push(innerIndex);
            // 6.1 选中总数++
            // this.viewCount++;
          }
          // 5、获取当前数组的length,以备非 0位置都取消选中后恢复0位置选中
          let len=this.indexArr[index].length;
          // 5.1、如果不是0位置且都没选中恢复 0位置选中
          if(len==0){
            this.indexArr[index].push(0);
            // console.log(this.indexArr[index]);
          }
        // 2.2 如果是0位置先清空
        }else{
          let leng=this.indexArr[index].length;
          this.indexArr[index].splice(0,leng);
          this.indexArr[index].push(innerIndex);
          // 6.1 选中0
          // this.viewCount=0;
        }
      //3、如果是单选
      }else{
         // 清除0位置的
         let leng=this.indexArr[index].length;
         if(this.indexArr[index].indexOf(innerIndex)==-1){
          //  如果是单选清空数组，重新添加一个
           this.indexArr[index].splice(0,leng);
           this.indexArr[index].push(innerIndex);
          // 6.1 选中总数++
          //  this.viewCount++;
         }
      }
    },
    // 1、向父组件传递自定义事件，告知要隐藏
    hide(){
      this.$emit("hide");
    },
    // 4、半透明移动端禁止滚动
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
