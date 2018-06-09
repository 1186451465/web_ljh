// JavaScript Document
window.onload=function(){
	imgLocation("container","box");
	var imgData={"data":[{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"}]};
	window.onscroll=function(){
		if(checkFlag){
			var cparent = document.getElementById("container");
			for(var i=0;i<imgData.data.length;i++){
				var ccontent=document.createElement("div");
					ccontent.className="box";
					cparent.appendChild(ccontent);
				var boxImg= document.createElement("div");	
					boxImg.className="box-img";
					ccontent.appendChild(boxImg);
				var img=document.createElement("img");
					img.src="images/"+imgData.data[i].src+"";
					boxImg.appendChild(img);
				imgLocation("container","box");
						 
			}
		}
	}
}
function imgLocation(parent,content){
	var cparent = document.getElementById(parent);
	var ccontent = getChildElement(cparent,content);
	var imgWidth =  ccontent[0].offsetWidth;
	var num = Math.floor(document.documentElement.clientWidth/imgWidth);
	cparent.style.cssText = "width: "+imgWidth * num+"px;margin: 0 auto";
	//计算高度
	var boxHeightArr=[];
	for(var i=0;i<ccontent.length;i++){
		if(i<num){
			boxHeightArr[i]=ccontent[i].offsetHeight;
		}else{
			var minheigth=getMin(boxHeightArr);
			var minindex=getMinheigthLocation(boxHeightArr,minheigth);
			ccontent[i].style.position="absolute";
			ccontent[i].style.top= minheigth+"px";
			ccontent[i].style.left= ccontent[minindex].offsetLeft+"px";
			boxHeightArr[minindex]=boxHeightArr[minindex]+ccontent[i].offsetHeight;
			
		}
	}
	
}
//获得子集
function getChildElement(parent,content){
	var contentArr=[];
	var allcontent=parent.getElementsByTagName('*');
	for(var i=0;i<allcontent.length;i++){
		if(allcontent[i].className == content)
		  contentArr.push(allcontent[i]);
	}
	return  contentArr;
	
}
function getMin(arr){
	var arrLength=arr.length;
	for(var i=0,ret=arr[0];i<arrLength;i++){
		ret=Math.min(ret,arr[i]);
	}
	return ret;
}
function checkFlag(){
	var cparent = document.getElementById("container");
	var ccontent = getChildElement(cparent,"box");
	var lastContentHeigth=ccontent[ccontent.length-1].offsetTop;
	var scrollTop=document.documentElement.scrollTop;
	if(document.documentElement.clientHeigth+scrollTop>lastContentHeigth)
					return true;
}
function getMinheigthLocation(boxHeightArr,minheigth){
	
	for(var i in boxHeightArr){
		if(boxHeightArr[i] == minheigth)
		   return i;
	}
}
/*//计算浏览器可以容纳的图片数量 
function imgcounts(){
	var BomWidth = document.documentElement.clientWidth;
	var ImgWidth = getChildElement("container","box")[0].offsetWidth;
	var counts = Math.floor(BomWidth/ImgWidth);
	return counts;
}
//得到图片最小高度
function getMinheight(imgRow){
	for(var i=0,ret=imgRow[0];i<imgRow.length;i++){
		ret=Math.min(ret,imgRow[i]);
		
	}
	return ret;
}
//得到最小高度图片的序列号
function getMinindex(imgRow){
	var minheight=getMinheight(imgRow);
	var index;
	for(var i=0;i<imgRow.length;i++){
		if(imgRow[i].offsetHeight == minheight){
			index=i;
		}
	}
	return index;
}*/