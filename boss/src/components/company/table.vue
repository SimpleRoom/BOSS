<template>
	<div class="table">
		<div class="tablecontent">
			<ul class="clear">
				<li v-for="(item,index) in tabData" :class="{active:checkActive(index)}" @click="addClass(index,$emit)">{{item}}</li>
			</ul>
		</div>
		<div class="bottom">
			<ul class="clear">
				<li @click="refesh">重置</li>
				<li @click="btnSure">{{btnsure}}</li>
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
			},
			nowIndex:{
				type:Array
			}
		},
		data(){
			return {
				btnsure:"确认"
			}
		},
		methods:{
			hide(){
				this.$emit("indexData");
				this.$emit("hide");
			},
			checkActive(index){
				return this.nowIndex.indexOf(index)!=-1;
			},
			judgeIndex(idx){
				let number=idx.length;
				if(number==1){
					if(idx[0]==0){
						this.btnsure="确认";
					}else{
						this.btnsure="确认("+idx.length+")";
					}
				}else{
					this.btnsure="确认("+idx.length+")";
				}
				return true;
			},
			addClass(index,ev){
				if(index!=0){
					//需要把  全部  上的active类名去掉
					if(this.nowIndex.indexOf(0)!=-1){
						this.nowIndex.splice(0,1);
					}
					//需要把  全部  上的active类名去掉----结束
					console.log(this.nowIndex);
					if(this.nowIndex.indexOf(index)==-1){
						this.nowIndex.push(index);
					}else{
						this.nowIndex.forEach((el,ind)=>{
							if(index==this.nowIndex[ind]){
								this.nowIndex.splice(ind,1);
							}
						})
					}
					
					this.btnsure="确认("+this.nowIndex.length+")";
				}else{
					if(this.nowIndex.indexOf(index)==-1){
						this.nowIndex.push(index);
						this.$emit("indexData");
						this.btnsure="确认";
					}
				}
				
				//这里需要判断用户是否把选的都取消了,是就让其默认为全部
				if(this.nowIndex.length==0){
					this.$emit("indexData");
					this.btnsure="确认";
				}
				
				
			},
			refesh(){
//				let number=this.nowIndex.length;
//				if(number=1){
//					if(this.nowIndex[0]==0){
//						number=0;
//					}
//				}
				this.$emit("indexData");
				this.btnsure="确认";
			},
			btnSure(){
				let number=this.nowIndex.length;
				if(number==1){
					if(this.nowIndex[0]==0){
						number=0;
					}
				}
				this.$emit("btnSure",number,this.nowIndex);
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
				margin-bottom: 0.32rem;
				text-align: center;
				border: 1px solid #CECECE;
				border-radius: 10px;
				margin-right: 0.346666rem;
				background: #FFFFFF;
			}
			.active{
				background: #53CAC3;
				color: #fff;
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