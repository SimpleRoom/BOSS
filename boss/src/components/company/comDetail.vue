<template>
<div class="comdetail">
	<h1>我是详情页面</h1>
</div>
</template>

<script>
	export default{
		mounted(){
			this.fenchData()
		},
		data(){
			return {
				InfoData:{}
			}
		},
		methods:{
			fenchData(){
				const _this=this;
				const id=parseInt(this.$route.params.id)-1;
				this.$http.get('/static/data/comdetail.json').then((res)=>{
					if(res.data.code==200){
						_this.InfoData=res.data.company[id];
						console.log(_this.InfoData)
					}
				}).catch(()=>{
					alert(error);
				})
			},
		}
	}
</script>

<style>
</style>