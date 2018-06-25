<template>
	<transition name='main'>
	
		<div class="lt-full zmiti-main-main-ui " :class="{'show':show}"  ref='page'>
			<div>
				<div>
					<img :src='imgs.resultTitle' alt="">
				</div>

				<div class="zmiti-vote-group" v-for='(group,i) in dataSource' :key="i">
					<header class="zmiti-vote-header">
						<img :src="group.groupimage1" alt="">
					</header>
					<div v-for='(vote ,k ) in group.list' :key='k'  class="zmiti-vote-item" >
						<div  :style="{width:210+'px',height:'210px',background:'url('+vote.image+') no-repeat center',backgroundSize:'cover'}">
						</div>
						<div class="zmiti-vote-item-progress" >
							<div>{{vote.title}}</div>
							<div>
								<span :style="{transform:'translateX('+vote.vote/totalVote*100+'%)'}"></span>
								<label for="">{{vote.vote}}</label>
							</div>
						</div>
					</div>
				</div>
				<h1 style="height:50px;"></h1>
			</div>
	
		</div>
	
	</transition>
</template>

<script>
	import './index.css';
	
	import {
	
		imgs
	
	
	} from '../lib/assets.js';
	
	import $ from 'jquery';
	
	import zmitiUtil from '../lib/util';

	import IScroll from 'iscroll';
	
	export default {
	
		props: ['obserable', 'pv', 'randomPv', 'nickname', 'headimgurl'],
	
		name: 'zmitiindex',
	
		data() {
	
			return {
				imgs,
				showTeam: false,
				showQrcode: false,
				show: false,
				totalVote:1,
				dataSource:[],
				viewW: window.innerWidth,
				viewH: window.innerHeight,
				showMasks: false,
			}
		},
	
		components: {},
		methods: {
			restart() {
				window.location.href = window.location.href.split('?')[0];
			},
			share() {
				this.showMasks = true;
			},
		},
	
		mounted() {
			window.s = this;
			var {obserable} = this;
			var s = this;
			obserable.on("toggleMain",(data)=>{
				this.show = data.show;
				this.dataSource = data.dataSource;
			
				var allVote = 0;
				$.getJSON("./assets/js/score.json?t="+new Date().getTime(),data1=>{
					console.log(data1.list);
					data1.list.map((item,i)=>{
						
						allVote +=item.vote;
						
						s.dataSource.forEach((dt,k)=>{
							
							dt.list.forEach((d,l)=>{
								
								if(d.id === item.id){
									d.vote = item.vote
									
								}
							})
						});

						
					})

					s.totalVote = allVote;

					s.dataSource = s.dataSource.concat([]);
					setTimeout(() => {
						s.scorll.refresh();
					}, 100);
				})
			})

			this.scorll = new IScroll(this.$refs['page'],{
				scrollbars:true
			})
		}
	
	}
</script>