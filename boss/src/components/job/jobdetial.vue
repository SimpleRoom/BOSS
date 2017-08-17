<template>
  <div class="hello">
    <h3>{{id}}</h3>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tempInfo:"",
      id:""
    }
  },
  watch:{
    '$route': 'fetchData'
  },
  computed:{

  },
  methods:{
    fetchData(){
      this.id=this.$route.params.jobId;
      console.log(this.id);
    }
  },
  // 創建后挂载到root之后调用该钩子函数
  mounted(){

  },
  // 该实例被创建还没挂载root之前，ajax可以在这里
  created(){
    this.fetchData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
