$(document).ready(function(){
			//模拟后台的数据
			var data=["你好","你最近如何","我还好","一切顺利","你找个工作了吗"];
			//关键字搜索
			var oldWords;
			var timer;
			var arr=[];
				//文本框获得焦点时，开启定时器，每个两秒判断文本框内容是否一致
			$(".search").focus(function(){
				oldWords=$(".search").val();
				timer=setInterval(function(){
					$(".contentDiv").empty();
					arr=[];
					$(".contentDiv").css("display","none");
					if($(".search").val()==""){
						$(".contentDiv").css("display","none");
					}else{
						if(oldWords==$(".search").val()){
							for(var i in data){
								if(data[i].indexOf($(".search").val())==0){
									arr.push(data[i]);		
								}
							}
							for(var i in arr){					
								$(".contentDiv").append('<p>'+arr[i]+'</p>');			
							}
							$(".contentDiv").css("display","block");
						}else{
							oldWords=$(".search").val();
						}
					}
				},1000)
			})
				//文本框失去焦点时消除定时器
			$(".search").blur(function(){
				clearInterval(timer);
				$(".contentDiv").css("display","none");
			})
			$(window).scroll(function(){
				//当滚动距离大于100px,上方固定栏显示
				var scrollTop=$(window).scrollTop();
				if(scrollTop>100){
					$(".hideWhenScrollBlock").fadeIn(200);
				}else{
					$(".hideWhenScrollBlock").fadeOut(200);
				}
				//当滚动距离大于1400px,左边固定栏显示
				var isLoad=false;
				var isLoad1=false;
				if(scrollTop>1400){
					$(".hideDivBlock").fadeIn(200);
					$(".hideDivBlock").find("li").eq(0).css("background-color","#F00");
					$(".hideDivBlock").find("li").eq(0).siblings().css("background-color","#333");
					var lastChild=$(".hideDivBlock").find("li").parent("ol").children("li:last-child");
					lastChild.css("background-color","black");
					//动态加载享品质的页面	
					if(isLoad==false){
						setTimeout(function(){
							var lazyLoadDiv="<ol><li><img src='img/enjoyquality-img5.jpg'><div class='loadInfo'>京东超市</div></li><li><img src='img/enjoyquality-img5.jpg'><div class='loadInfo'>京东超市</div></li><li><img src='img/enjoyquality-img3.jpg'><div class='loadInfo'>京东超市</div></li><li><img src='img/enjoyquality-img4.jpg'><div class='loadInfo'>京东超市</div></li><li><img src='img/enjoyquality-img5.jpg'><div class='loadInfo'>京东超市</div></li><li><img src='img/enjoyquality-img6.jpg'><div class='loadInfo'>京东超市</div></li></ol>"
							$('#lazyImg').html("");
							$('#lazyImg').append(lazyLoadDiv);
							isLoad=true;
						},1000)
					}
				}else{
					$(".hideDivBlock").fadeOut(200);
				}
				if(scrollTop>2000){
					$(".hideDivBlock").find("li").eq(1).css("background-color","#F00");
					$(".hideDivBlock").find("li").eq(1).siblings().css("background-color","#333");
					var lastChild=$(".hideDivBlock").find("li").parent("ol").children("li:last-child");
					lastChild.css("background-color","black");
					//动态加载爱生活的页面
					if(isLoad1==false){
						setTimeout(function(){
							var lazyLoadDiv="<ol><li><img src='img/enjoyquality-img5.jpg'><div class='loadInfo'>京东超市</div></li><li><img src='img/enjoyquality-img5.jpg'><div class='loadInfo'>京东超市</div></li><li><img src='img/enjoyquality-img3.jpg'><div class='loadInfo'>京东超市</div></li><li><img src='img/enjoyquality-img4.jpg'><div class='loadInfo'>京东超市</div></li><li><img src='img/enjoyquality-img5.jpg'><div class='loadInfo'>京东超市</div></li><li><img src='img/enjoyquality-img6.jpg'><div class='loadInfo'>京东超市</div></li></ol>"
							$('.lovelife').find('ul').html("");
							$('.lovelife').find('ul').append(lazyLoadDiv);
							isLoad1=true;
						},1000)
					}
				}
				if(scrollTop>2500){
					$(".hideDivBlock").find("li").eq(2).css("background-color","#F00");
					$(".hideDivBlock").find("li").eq(2).siblings().css("background-color","#333");
					var lastChild=$(".hideDivBlock").find("li").parent("ol").children("li:last-child");
					lastChild.css("background-color","black");
				}
			});
			//轮播图左边的详细信息
			$('.mainpage-class-list').find('li').hover(function(){
					var index=$(this).index();
					$('.detailitem').eq(index).css("display","block");
					$('.detailitem').eq(index).siblings('.detailitem').css("display","none");
					$('#demo').css("display","none");
				},function(){
					$('.detailitem').eq($(this).index()).css("display","none");
					$('#demo').css("display","block");
				})
			//点击左边固定栏的某一个变色(除了最后一个)后滚动条到达指定距离
			$(".hideDivBlock").find("li").click(function(){
				var index=$(this).index();
				var _this=$(this);
				//变色
				$(this).css("background-color","#F00");
				$(this).siblings("li").css("background-color","#333");
				var lastChild=$(this).parent("ol").children("li:last-child");
				lastChild.css("background-color","black")
				//改变距离
				var instance=0;
				index==lastChild.index()?instance:instance=1450+index*1000;
				$("html,body").animate({scrollTop:instance},{duration:500,complete:function(){
					if($(window).scrollTop()==0)
					$(_this).parent("ol").children("li:first-child").css("background-color","red");
				}})
			})
			
			//右边固定栏功能菜单
			var arr=["京东会员","购物车","我的足迹","咨询JiMi"];
			$(".sidebar-rightfixed ").find("li").hover(
							function(){
								
								$(this).stop().animate({width:100},{duration:300,complete:function(){$(this).find('a').html(arr[$(this).parent("ul").index()]);	}})

							}
							,function(){
								$(this).stop().animate({width:35},{duration:300,complete:function(){$(this).find('a').html("")}})
							}
			);
			//点击购物车显示页面
			var cartIsOpen=false;
			$(".sidebar-rightfixed ").find('ul').click(function(){
				var index=$(this).index();
				if(index == 1){
					if(!cartIsOpen){
						$(this).animate({right:250},{duration:500,complete:function(){}})
						$(this).siblings("ul").animate({right:250},{duration:400,complete:function(){}})
						$(".sidebar-rightfixed").animate({right:250},{duration:400,complete:function(){}})
						$(".car-cart").animate({right:0},{duration:400,complete:function(){}})
						$(".pages").animate({width:250},{duration:400,complete:function(){}})
						$(".car-cart-bottom").animate({width:250},{duration:400,complete:function(){}})
						cartIsOpen=!cartIsOpen;
					}else{
						$(this).animate({right:0},{duration:200,complete:function(){}})
						$(this).siblings("ul").animate({right:0},{duration:400,complete:function(){}})
						$(".sidebar-rightfixed").animate({right:0},{duration:400,complete:function(){}})
						$(".car-cart").animate({right:-250},{duration:400,complete:function(){}})
						$(".pages").animate({width:0},{duration:400,complete:function(){}})
						$(".car-cart-bottom").animate({width:0},{duration:400,complete:function(){}})
						cartIsOpen=!cartIsOpen;
					}
				}
			})
			//点击商品显示详情信息
			var productList=[];
			var totalPrice=0;
				//鼠标移入移出动画效果
			$('.seckill-content-list').find('li').hover(function(){$(this).find('img').animate({top:-5},200)},function(){$(this).find('img').animate({top:0},200)})
			
			$('.seckill-content-list').find('li').click(function(){
				
				var _this=$(this);
				var index=$(this).index();
				var i='<div class="product"><div id="small"><img src='+_this.find('img')[0].src+' width="350" height="350"></div><div id="slider"></div><div id="big"><img id="bigImg" src='+_this.find('img')[0].src+' width="1250" height="1250"/> </div><div class="append-cart"><a href="jacascript:">加入购物车</a></div></div>';
				$('.body').append(i);	
				magnifyingGlass();		
				$('.product-info').fadeIn(200,function(){
					$('.product').fadeIn(500);
				});
					//加入购物车
						//信息
						function info(){
							$('.car-cart').html("");
							$('.car-cart').css({"line-height":0,'text-align':'left'});
							totalPrice=0;
							for(var i in productList){	
								var cartDiv='<div class="divcart"><img src='+productList[i].imgSrc+' width=250 height=50><div style="font-size:15px; line-height:25px;"><p>'+productList[i].productName+'</p></div><span class="colorred">￥</span><span class="bigfont colorred">'+productList[i].newPrice+'</span><span>￥</span><span class="textline">'+productList[i].oldPrice+'</span><div style="margin-top:10px;"><div style="width:25px; height:25px;color:black; line-height:22px;text-align:center; display:inline-block"><a href="javascript:" style="color:black">-</a></div><div style="display:inline-block;"><input type="text" class="counts" value='+productList[i].counts+' style="width:25px; height:25px;"></div><div style="width:25px; height:25px;color:black; line-height:22px;text-align:center; display:inline-block; class="add"><a href="javascript:" style="color:black">+</a></div></div>';
								$('.car-cart').append(cartDiv);
								totalPrice=totalPrice+productList[i].newPrice*productList[i].counts;
								console.log(totalPrice);
								//商品总价格
								$('.car-cart-bottom').find('i').text(totalPrice);
								//商品加减数量						
								$('.car-cart').find('a').click(function(){				
										console.log($(this).parents(".car-cart").find('img')[0].src);
										var index=$(this).parents('.divcart').index();
										info();
										if($(this).text()=="-"){
											if(productList[index].counts<=1){
												
												productList[index].counts=1;
												info();
											}else{
												productList[index].counts--;
												info();
											}
											
										}
										if($(this).text()=="+"){
											productList[index].counts++;
											info();
										}
										 
								})
									
							}
									
						}
				
					$(".append-cart").click(function(){
						 var isHave=false;
						 var productInfo={imgSrc:_this.find('img')[0].src,productName:_this.find('a').children('p').html(),newPrice:_this.find('.bigfont.colorred').text(),oldPrice:_this.find('.textline').text(),counts:1};
						if(productList.length==0){
							productList.push(productInfo);
							info();
						}else if(productList.length!=0){
							for(var j in productList){
								if(productList[j].imgSrc ==_this.find('img')[0].src){
									productList[j].counts++;			
									info();
									isHave=true;					
								}
							}
							if(isHave!=true){
								productList.push(productInfo);
								info();
							}
						}
						$('.product-info').fadeOut(200,function(){
							$('.product').fadeOut(500,function(){$(this).html("")});
							
						});
							//页码数
								//每一页显示的行数
						
									$('.pages').html("");
									var rows=3;
									//商品总数量
									var productTotal=productList.length;
									//总页数
									var productPages;
									if(productTotal<rows){
										productPages=1;;
									}
									else if(productTotal%rows!=0){
										productPages=parseInt(productTotal/rows)+1;
									}else{
										productPages=parseInt(productTotal/rows);
									}
									if(productPages!=0){
										for(var i=1;i<=productPages;i++){
											var btn="<div class='btn'>"+i+"</div>"
											$('.pages').append(btn);
											
										}
									}
							function productBtn(indexBtn,PageIndex){
											var currentPage;
											var pageIndex="";
											 var currentPrice=0;
											 if(PageIndex==null || PageIndex==""){
												 pageIndex=indexBtn;
											 }else{
												 pageIndex=PageIndex;
											 }	
											$('.car-cart').html("");
											currentPage=pageIndex*rows;
											totalPrice=0;
											for(var i=0;i<currentPage;i++){
												currentPrice+=productList[i].newPrice*productList[i].counts;
											}
											for( var l=currentPage;l<productList.length;l++){
													$('.car-cart').css({"line-height":0,'text-align':'left'});			
														var cartDiv='<div class="divcart"><img src='+productList[l].imgSrc+' width=250 height=50><div style="font-size:15px; line-height:25px;"><p>'+productList[l].productName+'</p></div><span class="colorred">￥</span><span class="bigfont colorred">'+productList[l].newPrice+'</span><span>￥</span><span class="textline">'+productList[l].oldPrice+'</span><div style="margin-top:10px;"><div style="width:25px; height:25px;color:black; line-height:22px;text-align:center; display:inline-block"><a href="javascript:" style="color:black">-</a></div><div style="display:inline-block;"><input type="text" class="counts" value='+productList[l].counts+' style="width:25px; height:25px;"></div><div style="width:25px; height:25px;color:black; line-height:22px;text-align:center; display:inline-block; class="add"><a href="javascript:" style="color:black">+</a></div></div>';
														$('.car-cart').append(cartDiv);
														
														totalPrice=currentPrice+totalPrice+productList[l].newPrice*productList[l].counts;
														console.log(totalPrice);
														//商品总价格
														$('.car-cart-bottom').find('i').text(totalPrice);
														//商品加减数量						
														$('.car-cart').find('a').click(function(){				
																console.log($(this).parents(".car-cart").find('img')[0].src);
																var index=$(this).parents('.divcart').index();
																info();
																if($(this).text()=="-"){
																	if(productList[index+currentPage].counts<=1){	
																		productList[index+currentPage].counts=1;			
																		productBtn(indexBtn,pageIndex);
																		
																	}else{
																		productList[index+currentPage].counts--;
																		productBtn(indexBtn,pageIndex);
																	}
																	
																}
																if($(this).text()=="+"){
																	productList[index+currentPage].counts++;
																			productBtn(indexBtn,pageIndex);
																	
																}
														})
															
													}
							}
							$('.btn').click(function(){
										var indexBtn=$(this).index();
										productBtn(indexBtn,"");	
												
									})
					})
						
			})
				
		});
		 // JavaScript Document