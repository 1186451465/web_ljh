function magnifyingGlass(){
	var small1=document.getElementById("small");
	var slider=document.getElementById("slider");
	var big1 = document.getElementById("big");
	var bigImg=document.getElementById("bigImg");
	//让slider跟随鼠标移动.给小的方块绑定事件
	small1.onmousemove=function(e) {
	var even = e||event; //兼容火狐浏览器
	var x = even.clientX-small1.offsetLeft-small1.offsetWidth/1.8;
	var y = even.clientY-small1.offsetTop-small1.offsetHeight/1.65;
	//水平方向的最大值
	var maxX = small1.clientWidth-slider.clientWidth;
	//竖直方向的最大值
	var maxY = small1.clientHeight-slider.clientHeight;
	if(x<0){
	//相当于超出左侧,超出左侧时,拉回
	x=0; 
	}
	//超出右侧时拉回
	if(x>maxX){
	x=maxX;
	}
	//顶部超出
	if(y<0){
	y=0;
	}
	//底部超出
	if(y>maxY){
	y=maxY;
	}
	slider.style.top=(y) + "px";
	slider.style.left=(x) + "px";
	//放大的图片的主要实现代码:一个比例计算
	big1.scrollLeft=x/maxX*(bigImg.clientWidth-big1.clientWidth);
	big1.scrollTop=y/maxY*(bigImg.clientHeight-big1.clientHeight) ;
	}
	//鼠标移入事件
	small1.onmouseenter=function(){
	//鼠标移入到原图时候实现,上面出现的小的方块
	slider.style.display="block";
	//右侧的大图区域显示出来图片
	big1.style.display="block";
	}
	//添加鼠标移出事件,鼠标移出原图的时候,
	small1.onmouseleave=function(){
	slider.style.display="none";
	big1.style.display="none";
	}
}