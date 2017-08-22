<template>
<div class="comdetail">
	<div class="head">
		<a class="left" href="javascript:history.back(-1)" ><span class="icon-left"></span></a>
		<mt-swipe :auto="2000" class="swiper">
		  <mt-swipe-item v-for="item in InfoData.srclist" :key="item.id"><img :src="item.src"/></mt-swipe-item>
		</mt-swipe>
	</div>
	<div class="comInfo">
		<div class="follow">
			<span class="iconfont icon-aixin"></span><span @click="follow($event)" flag="true">{{followData}}</span>
		</div>
		<ul class="clear">
			<li>
				<img :src="InfoData.comp_pic"/>
			</li>
			<li>
				<p>{{InfoData.comp_name}}</p>
				<p></p>
				<p><span>{{InfoData.comp_nature}}</span><span>{{InfoData.comp_stock}}</span><span>{{InfoData.comp_people}}</span></p>
			</li>
		</ul>
		<ol class="clear">
			<li v-for="(item,index) in tabData" @click="change(index)" :class="{active:index==nowIndex}">
				<a v-if="index==0"  href="javascript:;">{{item.title}}</a>
				<a v-else  href="javascript:;">{{item.title}}({{InfoData.hot_pos_no}})</a>
			</li>
		</ol>
		<div class="content">
			
		</div>
	</div>
</div>
</template>

<script>
	export default{
		mounted(){
			this.fenchData()
		},
		data(){
			return {
				InfoData:{},
				followData:"关注",
				hotNum:"",
				tabData:[{'title':'公司概况'},{'title':'热门职位'}],
				nowIndex:0
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
			follow(ev){
				const el=ev.target;
				let   flag=el.getAttribute("flag");
				console.log(flag)
				if(flag=="true"){
					alert("关注成功");
					this.followData="已关注";
					el.setAttribute("flag",false);
				}else{
					console.log("heyuhsuo")
					alert("取消关注成功");
					this.followData="关注";
					el.setAttribute("flag",true);
				}
			},
			change(index){
				this.nowIndex=index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head{
		position: relative;
		.swiper{
			width: 100%;
			height: 4.666666rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.left{
			position: absolute;
			left: 0.133333rem;
			top: 0.133333rem;
			display: inline-block;
			z-index: 999;
			width: 44px;
			height: 44px;
			text-align: center;
			line-height: 48px;
			border-radius: 22px;
			background: rgba(0,0,0,0.5);
			color: #FFFFFF;
		}
	}
	.comInfo{
		position: relative;
		.follow{
			position: absolute;
			top: 0.4rem;
			right: 0.266666rem;
			color: #60CEC7;
			border: 1px solid #60CEC7;
			padding: 0.16rem 0.32rem;
			border-radius: 5px;
			font-size: 0.293333rem;
			font-weight: bold;
			span{
				font-weight: bold;
				margin-right: 5px;
			}
		}
		ul{
			list-style: none;
			padding: 0.533333rem 0;
			border-bottom: 1px solid #E4E4E4;
			li{
				float: left;
			}
			li:nth-child(1){
				width: 20%;
				text-align: center;
				img{
					width: 1.6rem;
					height: 1.6rem;
				}
			}
			li:nth-child(2){
				width: 80%;
				text-indent: 1em;
				p{
					margin-bottom: 0.266666rem;
					height: 0.266666rem;
					color: #AAAAAA;
				}
				p:nth-child(1){
					font-size: 0.373333rem;
					height: 0.373333rem;
					color: #333;
					font-weight: bold;
				}
				p:nth-child(3){
					span{
						margin-right: 0.533333rem;
					}
				}
			}
		}
		ol{
			list-style: none;
			font-size: 0.4rem;
			li{
				float: left;
				width: 50%;
				text-align: center;
				a{
					color: #838383;
					display: inline-block;
					padding: 0.4rem 0.266666rem;
				}
			}
			.active{
				a{
					border-bottom: 4px solid #53CAC3;
					color: #333;
				}
			}
		}
		.content{
			padding: 0.266666rem;
			background: #E9EFEF;
		}
	}
</style>