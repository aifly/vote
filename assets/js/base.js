var imgs = {
	play: './assets/images/play.png',
	title: './assets/images/title.jpg',
	resultTitle: './assets/images/result-title.jpg',
	point: './assets/images/point.png',
	shanyaozhixing: './assets/images/shanyaozhixing.jpg',
	qiumishenghui: './assets/images/qiumishenghui.jpg',
	jingcaidingge: './assets/images/jingcaidingge.jpg',
	ranqingqiuchang: './assets/images/ranqingqiuchang.jpg',

	Rshanyaozhixing: './assets/images/r-shanyaozhixing.jpg',
	Rqiumishenghui: './assets/images/r-qiumishenghui.jpg',
	Rjingcaidingge: './assets/images/r-jingcaidingge.jpg',
	Rranqingqiuchang: './assets/images/r-ranqingqiuchang.jpg',
	logo: './assets/images/logo.png',
	sure: './assets/images/sure.png',
	img1:"./assets/images/1-1.png",
	img2:"./assets/images/1-2.png",
	img3:"./assets/images/1-3.png",
	img4:"./assets/images/1-4.png",
	img5:"./assets/images/1-5.png",
	img6:"./assets/images/1-6.png",
	img7:"./assets/images/1-7.png",
	img8:"./assets/images/1-8.png",

	img9:"./assets/images/2-1.png",
	img10:"./assets/images/2-2.png",
	img11:"./assets/images/2-3.png",
	img12:"./assets/images/2-4.png",
	img13:"./assets/images/2-5.png",
	img14:"./assets/images/2-6.png",
	img15:"./assets/images/2-7.png",

	img16: "./assets/images/3-1.png",
	img17: "./assets/images/3-2.png",
	img18: "./assets/images/3-3.png",
	img19: "./assets/images/3-4.png",
	img20: "./assets/images/3-5.png",
	
	img21: "./assets/images/4-1.png",
	img22: "./assets/images/4-2.png",
	img23: "./assets/images/4-3.png",
	img24: "./assets/images/4-4.png",
	img25: "./assets/images/4-5.png",
	img26: "./assets/images/4-6.png",
	img27: "./assets/images/4-7.png",
	img28: "./assets/images/4-8.png",
	img29: "./assets/images/4-8.png"

}




var arr = [];


for (var attr in imgs) {
	arr.push(imgs[attr]);
}


var mainImgList = [
	{
		url:imgs.img1,
		type:'rect'
	},{
		url:imgs.img2,
		type:'circle'
	},{
		url:imgs.img3,
		type:'circle'
	}
];

var musics = {
	music: {
		src: './assets/music/bg2.mp3',
		autoplay: false,
		name: 'bg',
		loop: true
	},
	photo:{
		src:'./assets/music/photo.mp3',
		autoplay:false,
		name:"photo",
		loop:false
	}
};

 (function () {

 	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
 		handleFontSize();
 	} else {
 		if (document.addEventListener) {
 			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
 		} else if (document.attachEvent) {
 			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
 			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
 		}
 	}

 	function handleFontSize() {
 		// 设置网页字体为默认大小
 		WeixinJSBridge.invoke('setFontSizeCallback', {
 			'fontSize': 0
 		});
 		// 重写设置网页字体大小的事件
 		WeixinJSBridge.on('menu:setfont', function () {
 			WeixinJSBridge.invoke('setFontSizeCallback', {
 				'fontSize': 0
 			});
 		});
 	}
 })();