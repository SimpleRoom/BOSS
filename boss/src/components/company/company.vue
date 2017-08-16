<template>
  <div class="company-list">
    <div class="head clear">
    	公司
    	<div class="right"><span class="icon-earth"></span></div>
    </div>
    <div class="head-tab">
    	<ul class="clear">
    		<li>融资<span class="icon-down"></span></li>
    		<li>规模<span class="icon-down"></span></li>
    		<li>行业<span class="icon-down"></span></li>
    	</ul>
    </div>
    <div class="content">
    	<ul>
    		<li class="clear" v-for="item in InfoData" :id="item.id">
    			<div class="right pull-left">
    				<img :src="item.comp_pic" alt="" />
    			</div>
    			<div class="left pull-left">
    				<p>{{item.comp_name}}</p>
    				<p>{{item.comp_address}}</p>
    				<p><span>{{item.comp_nature}}</span><span>|</span><span>不需要融资</span><span>|</span><span>{{item.comp_people}}</span></p>
    				<div>热招:<span style="color: #76D5CF;">{{item.hot_pos_name}}</span>等<span>{{item.hot_pos_no}}</span>个职位<span class="icon-right pull-right"></span></div>
    			</div>
    		</li>
    	</ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      InfoData:[]
    }
  },
  watch:{

  },
  computed:{

  },
  methods:{
		fenchData(){
			var _this=this;
			this.$http.get('../../../static/data/joblist.json').then(function(res){
				if(res.data.code==0){
					_this.InfoData=res.data.company;
					console.log(_this.InfoData)
				}
			})
		}
  },
  // 創建后挂载到root之后调用该钩子函数
  mounted(){
		this.fenchData();
  },
  // 该实例被创建还没挂载root之前，ajax可以在这里
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.company-list{
		background: #E9EFEF;
	}
	.head{
		font-size: 0.481481rem;
		padding: 0.37037rem 0;
		background: #53CAC3;
		text-align: center;
		position: relative;
		color: #FFFFFF;
		.right{
			position: absolute;
			font-size: 0.555555rem;
			right: 0.37037rem;
			top:0.37037rem;
		}
	}
	.head-tab{
		background: #fff;
		color: #8D8D8D;
		ul{
			list-style: none;
			padding: 0.37037rem 0;
			li{
				float: left;
				width: 33.3%;
				box-sizing: border-box;
				text-align: center;
				border-right: 1px solid #E5E5E5;
				span{
					vertical-align: middle;
				}
			}
		}
	}
	.content{
		margin: 0.185185rem 0.185185rem 0 0.185185rem;
		ul{
			list-style: none;
			li{
				padding: 0.185185rem 0 0 0;
				margin-bottom: 0.185185rem;
				background: #fff;
				position: relative;
				.right{
					padding: 0.185185rem;
					img{
						width: 2.185185rem;
						height: 2.185185rem;
					}
				}
				.left{
					margin-left:0.185185rem ;
					p{
						margin-bottom: 0.462962rem;
						color: #8D8D8D;
					}
					p:nth-child(1){
						font-weight: bold;
						font-size: 0.481481rem;
						color: #333;
					}
					p:nth-child(3) span{
						padding-right: 0.092592rem;
					}
					/*p:nth-child(4){
						border-top: 1px solid #E5E5E5;
						padding: 0.37037rem 0;
						span{
							padding: 0 0.092592rem;
						}
					}*/
					div{
						border-top: 1px solid #E5E5E5;
						padding:  0.462962rem 0;
						/*min-width: 9.259259rem;*/
						span{
							padding: 0 0.092592rem;
						}
						span:last-child{
							position: absolute;
							right: 0.185185rem;
							bottom:0.462962rem ;
						}
					}
				}
			}
		}
	}
</style>
