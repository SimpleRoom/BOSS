<template>
  <div class="me-info">
   	<div class="head">
   		<div class="head-t">
   				<div class="clear"><span class="iconfont icon-shezhi pull-right seting"></span></div>
   				<div class="my-info clear">
   						<div class="pull-left my-l"><img src="/static/images/dehua.png"/></div>
   						<div class="pull-left my-m">
   							<span>何玉硕</span>
   							<span>在职-考虑机会</span>
   						</div>
   						<div class="pull-right my-r">
   							<div class="clear">
	   							<div class="pull-left">
	   								<span>编辑简历</span>
	   								<span>完善度100%</span>
	   							</div>
	   							<div class="pull-left my-r-l">
	   								<span class="icon-right"></span>
	   							</div>
   							</div>
   						</div>
   				</div>
   		</div>
   		<div class="head-b">
   				<ul class="clear">
   					<li>
   						<span>1</span>
   						<span>沟通过</span>
   					</li>
   					<li>
   						<span>0</span>
   						<span>已投递</span>
   					</li>
   					<li>
   						<span>0</span>
   						<span>待面试</span>
   					</li>
   				</ul>
   		</div>
   	</div>
   	
   	<div class="main">
   		<ul class="clear">
   			<li>
   				<span class="iconfont icon-weixiao"></span>
   				<span>小秘书</span>
   			</li>
   			<li>
   				<span class="iconfont icon-jianli"></span>
   				<span>上传简历</span>
   			</li>
   			<li>
   				<span class="iconfont icon-gongsi"></span>
   				<span>关注公司</span>
   			</li>
   			<li>
   				<span class="iconfont icon-saomiao"></span>
   				<span>登录网页版</span>
   			</li>
   			<li>
   				<span class="iconfont icon-liwuhe"></span>
   				<span>我的道具</span>
   			</li>
   			<li>
   				<span class="iconfont icon-shangcheng"></span>
   				<span>道具商城</span>
   			</li>
   			<li>
   				<span class="iconfont icon-aixin"></span>
   				<span>感兴趣职位</span>
   			</li>
   			<li>
   				<span class="iconfont icon-qianbao"></span>
   				<span>钱包</span>
   			</li>
   		</ul>
   	</div>
   	<div class="bottom">
   		<ul>
   			<li>
   				<a href="javascript:;" class="icon-"><i class="iconfont icon-tongzhi icon"></i>通知</a>
   			</li>
   			<li>
   				<a href="javascript:;" class="icon-"><i class="iconfont icon-yinsi icon"></i>私密设置</a>
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
      msg: 'Welcome to Your Vue.js App'
    }
  },
  watch:{

  },
  computed:{

  },
  methods:{

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
	.me-info{
		position: absolute;
		width: 100%;
		height: 100%;
		background: #E9EFEF;
	}
	.head{
		.head-t{
			height: 4rem;
			background: #53CAC3;
			.seting{
				padding: 10px;
				font-size: 0.5rem;
				color: #FFFFFF;
				font-weight: bold;
			}
			.my-info{
				margin: 0.533333rem 0.466666rem 0 0.333333rem ;
				height: 1.733333rem;
				color: #fff;
				font-weight: normal;
				img{
					width: 1.733333rem;
					height: 1.733333rem;
					border-radius: 0.866666rem;
				}
				.my-m{
					padding: 0.4rem 0.32rem;
					span{
						display: block;
					}
					span:nth-child(1){
						font-size: 0.4rem;
					}
				}
				.my-r{
					padding: 0.4rem 0.32rem;
				}
				.my-r{
					span{
						display: block;
						text-align: right;
					}
					.my-r-l{
						padding: 0.4rem 0.066666rem;
					}
				}
			}
		}
		.head-b{
			background: #fff;
			ul{
				list-style: none;
				li{
					float: left;
					width: 33.33%;
					text-align: center;
					padding:0.466666rem 0 0.4rem 0;
					span{
						display: block;
					}
					span:nth-child(1){
						font-weight: bold;
						font-size: 0.5rem;
					}
					span:nth-child(2){
						color: #B3B3B3;
					}
					
				}
			}
		}
	}
	
	.main{
		margin-top: 0.24rem;
		color: #333;
		ul{
			list-style: none;
			background: #FFFFFF;
			li{
				width: 25%;
				float: left;
				text-align: center;
				border-right: 1px solid #E5E5E5;
				border-bottom: 1px solid #E5E5E5;
				padding: 0.613333rem 0 0.506666rem 0;
				span{
						display: block;
				}
				span:nth-child(1){
					margin-bottom:0.266666rem;
					font-size: 0.7rem;
				}
			}
			li:nth-child(4n+0){
				border-right: none;
			}
		}
	}
	.bottom{
		a{
			color: #333;
			display: block;
			position: relative;
		}
		a:after{
			content: "\e90a";
			position: absolute;
			right: 0;
			top: 0;
		}
		margin-top: 0.24rem;
		ul{
			list-style: none;
			background: #fff;
			li{
				padding: 0.4rem 0.266666rem;
				border-bottom: 1px solid #F4F4F4;
				font-size: 0.48rem;
			}
			.icon{
				font-family:"iconfont" !important;
			  font-style:normal;
			  font-size:0.506666rem;
			  -webkit-font-smoothing: antialiased;
			  -moz-osx-font-smoothing: grayscale;
			  padding: 0.453333rem;
			  /*vertical-align: middle;*/
			}
			/*.icon1:before{
				content: "\e60e";
			}
			.icon2:before{
				content: "\e62a";
			}*/
		}
	}
</style>
