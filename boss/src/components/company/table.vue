<template>
	<div class="table">
		<div class="tablecontent">
			<ul class="clear">
				<li v-for="item in tabData">{{item}}</li>
			</ul>
		</div>
		<div class="bottom">
			<ul class="clear">
				<li>重置</li>
				<li>确认</li>
			</ul>
		</div>
		<div class="zhezhao" @click="hide">
		
		</div>
	</div>
</template>

<script>
	export default{
		mounted(){
		},
		props:{
			tabData:{
				type:Array,
				default:[]
			}
		},
		methods:{
			hide(){
				this.$emit("hide")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.table{
		background: #F8F8F8;
		/*padding-top: 0.013333rem;*/
		/*background: rgba(0,0,0,0.5);*/
		/*position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;*/
	}
	.zhezhao{
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	.tablecontent{
		padding: 0.506666rem 0.48rem 1.093333rem 0.48rem;
		ul{
			list-style: none;
			/*display: flex;
			justify-content: space-between;
			flex-wrap: wrap;*/
			margin-left: 0.346666rem;
			li{
				display: inline-block;
				min-width: 1.7rem;
				padding:0.213333rem 0.133333rem;
				font-size: 24px;
				margin-bottom: 0.32rem;
				text-align: center;
				border: 1px solid #CECECE;
				border-radius: 10px;
				margin-right: 0.346666rem;
				background: #FFFFFF;
			}
		}
	}
	.bottom{
		ul{
			list-style: none;
			li{
				float: left;
				width: 50%;
				padding: 0.346666rem 0;
				text-align: center;
			}
			li:nth-child(1){
				background: #fff;
				border-top: 1px solid #DCDCDC;
			}
			li:nth-child(2){
				background: #53CAC3;
				color: #fff;
			}
		}
	}
</style>