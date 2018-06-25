<template>
	<div  class="lt-full zmiti-index-main-ui "  :class="{'show':show}" >
		<transition name='index'>
			<div class="zmiti-index lt-full" ref='page' v-if='!showIndexMask' :style="{height:viewH+'px'}">
				<section>
					<div>
						<img :src="imgs.title" alt="">
					</div>
					<canvas :width="viewW" height="500" ref='canvas'>
					</canvas>
					<div class="zmiti-vote-group" v-for='(group,i) in dataSource' :key="i">
						<header>
							<img :src="group.groupimage" alt="">
						</header>
						<div v-for='(vote ,k ) in group.list' :key='k'  class="zmiti-vote-item" >
							<div>
								<div v-tap='[openImage,vote]' :style="{width:210+'px',height:'210px',background:'url('+vote.image+') no-repeat center',backgroundSize:'cover'}">
								</div>
								<div class="zmiti-vote-item-title" v-tap='[toggle,vote]'>
									<div>{{vote.title}}</div>
									<div>
										<span :class="{'active':vote.checked}"></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="zmiti-sure" v-tap='[entryResultPage]'>
						<img :src="imgs.sure" alt="">
					</div>
				</section>
			</div>
		</transition>
		<div  class="zmiti-image-mask lt-full" v-if='currentVote.image' v-tap='[closeMask]'>
			<div>
				<img :src="currentVote.image" alt="">
			</div>
			<div class="zmiti-vote-content">
				<h2>{{currentVote.title}}</h2>
				<div>{{currentVote.content}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import Point from './point';
	import IScroll from 'iscroll';
	export default {
		props:['obserable','nickname','pv'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				pointW:0,
				pointH:0,
				points:[],
				show:true,
				dataSource:[],
				showIndexMask:false,
				showMasks:false,
				transX:-200,
				image:'',
				currentVote:{},
				showVideo:false,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				fullscreen:true,
			}
		},
		components:{
		},
		
		methods:{

			imgStart(e){
				e.preventDefault(); 
			},

			openImage(vote){
				
				this.currentVote =  vote;
				console.log(vote)
			},
			closeMask(){
				this.currentVote = {};
			},
			toggle(vote){
				vote.checked = !vote.checked;
				this.dataSource = this.dataSource.concat([]);
			},
			submit(){
				var voteids = '1,2,3,4,5,6'; //要投票的id集合
				$.ajax({//提交投票
					url:"xxxx",
					type:'post',
					data:{
						voteids:voteids
					}
				});

				$.ajax({//获取投票结果
					type:'post',
					url:'xxxx',
				})
			},
			
			entryResultPage(){
				var {obserable} = this;
				
				obserable.trigger({
					type:"toggleMain",
					data:{
						show:true,
						dataSource : this.dataSource
					}
				})
			},
			initPoints(){

				var canvas = this.$refs['canvas'];
				var context = canvas.getContext('2d');

				var width = canvas.width,
					height = canvas.height;
				var img = new Image();
				img.onload = ()=>{
					for(var i = 0 ;i<100;i++){
						var p = new Point({
							img,
							context,
						})
						this.points.push(p);
					}
				}
				img.src = imgs.point;

				var animationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame,
					m = Math;

				var render = ()=>{
					if(width<=0){
						width = canvas.width,
						height = canvas.height;
					}
					context.clearRect(0,0,width,height);

					this.points.map((point,i)=>{
						point.angle += point.speed;
						//point.angle = (point.angle | 0)
						point.angle %= 360;
						point.x += m.sin(point.angle/180*m.PI)*point.speedX;

						point.y -= 1;
						if(point.defaultY  -  point.y  >  point.maxHeight){
							point.y = point.defaultY
						}
						point.update();
					});
					!this.showIndexMask && animationFrame(render);
				}
				
				render()


			},
			getData(){
				var s = this;
				$.getJSON('./assets/js/data.json?t='+new Date().getTime(),data=>{
					if(data.code === 0){
						s.dataSource = data.list;
						setTimeout(() => {
							s.scroll.refresh();
						}, 300);
					}
				})
			}
			
		},
		mounted(){

			var {obserable} = this;
			this.getData();
			obserable.on('toggleIndex',(data)=>{
				this.show = data.show;
			})

			//this.initPoints();

			this.scroll = new IScroll(this.$refs['page'],{
				scrollbars:true
			})
		}
	}
</script>