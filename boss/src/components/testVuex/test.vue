<template>
  <div class="tset">
    <h3>test vuex</h3>
    <h3>{{$store.state.count}}=={{count}}</h3>
    <button @click="$store.commit('add',5)">+</button>
    <button @click="minus">-</button>
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState,mapMutations,mapGetters } from 'vuex'
export default {
  name: 'testVuex',
  data () {
    return {
      // count:0
    }
  },
  watch:{

  },
  // 1、计算属性
  // computed:{
  //   count(){
  //     return this.$store.state.count+5
  //   }
  // },

  // 2、
  // computed:mapState({
  //   // 2.1
  //   // count:function(state){
  //   //   return state.count+7
  //   // }
  //   // 2.2
  //   count:state=>state.count+6
  // }),

  // 3、 辅助函数 把count指向了$store.state.count
  computed:{
    ...mapState([
      "count"
    ]),
    // change(){
    //   this.$store.getters.change
    // }
    ...mapGetters([
      "count"
    ])
  },
  // 4、辅助函数添加到methods内，上面即可直接使用
  methods:{
    ...mapMutations([
      "add",
      "minus"
    ])
  },
  // 創建后挂载到root之后调用该钩子函数
  mounted(){
    
  },
  // 该实例被创建还没挂载root之前，ajax可以在这里
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
h3{
  text-align:center;
  line-height:50px;
}
button{
  padding:.3rem .4rem;
  font-size:.46rem;
  margin:0 15px;
}
</style>
