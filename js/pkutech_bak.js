window.onload = function (){

	//主页大图切换
	var index_main = document.getElementById("index_main");
	var banner_btn_box = document.getElementById("banner_btn");
	var banner_btn = document.getElementById("banner_btn").getElementsByTagName("a");
	var banner_all_c = document.getElementById("banner_all");
	var banner_all_n = document.getElementById("banner_all").getElementsByTagName("span");
	var timer = protimer = playTimer = null;
	var index = i = 0;
	var bOrder = true;
	var windowWidth = document.body.offsetWidth || document.documentElement.offsetWidth;
	
	//初始化状态
	cutover();
	
	//按钮点击切换
	for (i = 0; i < banner_btn.length; i++)
	{
		banner_btn[i].index = i;
		banner_btn[i].onclick = function ()
		{
			index = this.index;			
			cutover()
		}
	}
	//鼠标移入展示区停止自动播放
	banner_btn_box.onmouseover = function ()
	{
		clearInterval(playTimer)
	};
	
	//鼠标离开展示区开始自动播放
	banner_btn_box.onmouseout = function ()
	{
		playTimer = setInterval(next, 3000)
	};

	function cutover(){	

		banner_all_c.style.width = windowWidth * banner_all_n.length + "px";
		for (k = 0; k < banner_btn.length; k++) {
			banner_btn[k].className = "";				
			banner_all_n[k].style.width = windowWidth + "px";
		}
		banner_btn[index].className = "in";
		startMove(banner_all_c,-(index * windowWidth))		
	}
	
	function next()
	{
		//判断播放顺序
		bOrder ? index++ : index--;			
		
		//正序
		index >= banner_all_n.length && (index = banner_all_n.length - 2, bOrder = false);			
		
		//倒序
		index <= 0 && (index = 0, bOrder = true);

		cutover()
	}
	
	playTimer = setInterval(next, 3000);
	

	function startMove(id,iTarget){
		clearInterval(timer);
		timer = setInterval(function ()
		{
			doMove(id,iTarget)
		}, 30)	
	}
	function doMove (id,iTarget)
	{		
		var iSpeed = (iTarget - id.offsetLeft) / 7;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);		
		id.offsetLeft == iTarget ? clearInterval(timer) : id.style.left = id.offsetLeft + iSpeed + "px"
	}
	//产品切换
	var btn_prev = document.getElementById("btn_prev");
	var btn_next = document.getElementById("btn_next");
	var pro_list_box = document.getElementById("pro_list_box");
	var pro_list_box_1 = pro_list_box.getElementsByTagName("span")[0];
	var pro_dl = pro_list_box_1.getElementsByTagName("dl");
	pro_list_box_1.style.width = pro_dl.length * 324 + "px";
	pro_list_box_1.style.left = 0;
	var new_div = document.createElement("span");
            pro_list_box.appendChild(new_div);
            new_div.innerHTML= pro_list_box_1.innerHTML;   
            new_div.style.width = pro_dl.length * 324 + "px";          
            new_div.style.left = 324 * pro_dl.length  +"px";	
     
	btn_next.onclick = function() {		
		next_pd(new_div,pro_list_box_1);
		next_pd(pro_list_box_1,new_div);

		new_div.style.left = new_div.offsetLeft - 324 +"px";	
		pro_list_box_1.style.left = pro_list_box_1.offsetLeft - 324 +"px";	
		return false
	}
	btn_prev.onclick = function() {		
		prev_pd(new_div,pro_list_box_1);
		prev_pd(pro_list_box_1,new_div);
     	new_div.style.left = new_div.offsetLeft + 324 +"px";	
		pro_list_box_1.style.left = pro_list_box_1.offsetLeft + 324 +"px";

	}
	function prev_pd(lefta,leftb){
		if(lefta.offsetLeft == 0){
			leftb.style.left = - leftb.offsetWidth + 30 + "px";
		}
	}
	function next_pd(lefta,leftb){
		if(lefta.offsetLeft == 0){
			leftb.style.left = leftb.offsetWidth -30 +"px";	
		}
	}

function getStyle(obj, name)
{
if(obj.currentStyle)
{
return obj.currentStyle[name];
} 
else
{
return getComputedStyle(obj, false)[name];
}
}
 
 
 
 
 
 
//注意：在多物体运动框架中，所有东西都不能公用 ！否则出问题，BUG；将必要的变量加到物体的属性中就行。即：属性与运动对象绑定：速度、其他属性值（如透明度等等）
function startMoven(obj, json, fnEnd)//完美运动框架//换为json，如：startMove(oDiv, {width: 400, height: 400})
{
clearInterval(obj.timer);
obj.timer=setInterval(function (){
 
var bStop=true;   //关键 //假设：所有的值都已经到了
 
 
for(var attr in json) //用一个循环，把原来的那套东西包在里面，每次定时器执行的时候，都会循环，循环的次数取决于json里面写了什么
{
 
var cur=0;
 
if(attr=='opacity')
{
cur=Math.round(parseFloat(getStyle(obj, attr))*100); //因为这里，会出问题，小数
}
else
{
cur=parseInt(getStyle(obj, attr));
}
 
var speed=(json[attr]-cur)/6;
 
speed=speed>0?Math.ceil(speed):Math.floor(speed);
 
if(cur!=json[attr])
bStop=false;
 
if(attr=='opacity')
{
obj.style.filter='alpha(opacity:'+(cur+speed)+')';
obj.style.opacity=(cur+speed)/100;
 
}
else
{
obj.style[attr]=cur+speed+'px';
} 
 
}
 
 
if(bStop)//如果所有的值都到了，关闭定时器
{
clearInterval(obj.timer);
 
if(fnEnd) fnEnd();
}
 
}, 30); 
}
}

