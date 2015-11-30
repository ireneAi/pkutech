window.onload = function (){

	//Ö÷Ò³´óÍ¼ÇÐ»»
	var index_main = document.getElementById("index_main");
	var banner_btn_box = document.getElementById("banner_btn");
	var banner_btn = document.getElementById("banner_btn").getElementsByTagName("a");
	var banner_all_c = document.getElementById("banner_all");
	var banner_all_n = document.getElementById("banner_all").getElementsByTagName("span");
	var timer = protimer = playTimer = null;
	var index = i = 0;
	var bOrder = true;
	var windowWidth = document.body.offsetWidth || document.documentElement.offsetWidth;
	
	if (window.innerHeight) {
		winHeight = window.innerHeight - 170;
	} else if ((document.body) && (document.body.clientHeight)) {
		winHeight = document.body.clientHeight -170; 
	}
	index_main.style.height = winHeight + "px";
	
	//³õÊ¼»¯×´Ì¬
	
	cutover();
	
	//°´Å¥µã»÷ÇÐ»»
	for (i = 0; i < banner_btn.length; i++)
	{
		banner_btn[i].index = i;
		banner_btn[i].onclick = function ()
		{
			index = this.index;			
			cutover()
			returnValue = false;			
		}
	}
	//Êó±êÒÆÈëÕ¹Ê¾ÇøÍ£Ö¹×Ô¶¯²¥·Å
	banner_btn_box.onmouseover = function ()
	{
		clearInterval(playTimer)
	};
	
	//Êó±êÀë¿ªÕ¹Ê¾Çø¿ªÊ¼×Ô¶¯²¥·Å
	banner_btn_box.onmouseout = function ()
	{
		playTimer = setInterval(next, 5000)
	};

	function cutover(){			
		for (k = 0; k < banner_btn.length; k++) {
			banner_btn[k].className = "";				
			banner_all_n[k].style.width = windowWidth + "px";				
			startMove(banner_all_n[k],0)
			banner_all_n[k].style.filter='alpha(opacity:'+0+')';
			banner_all_n[k].style.opacity=0;		
			banner_all_n[k].style.zIndex = 0;	
			banner_all_n[k].style.display="none";
		}
		banner_btn[index].className = "in";
		banner_all_n[index].style.display="block";
		startMove(banner_all_n[index],"100")		
		banner_all_n[index].style.zIndex = 10;
		banner_all_c.style.backgroundImage = "";
	}
	
	function next()
	{
		//ÅÐ¶Ï²¥·ÅË³Ðò
		index++ 		
		
		//ÕýÐò
		index >= banner_all_n.length && (index =0);			
		
		cutover()
	}
	
	playTimer = setInterval(next, 5000);	
	
	function startMove(id,iTarget){
		clearInterval(timer);
		timer = setInterval(function ()
		{
			doMove(id,iTarget)
		}, 100)	
	}
	function doMove (id,iTarget)
	{		
		var cur=Math.round(parseFloat(getStyle(id,"opacity"))*100);
		var iSpeed = (iTarget - cur) / 7;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);		
		id.style.filter='alpha(opacity:'+(cur+iSpeed)+')';
		id.style.opacity=(cur+iSpeed)/100;
	}
	function getStyle(obj, name){
		if(obj.currentStyle){
			return obj.currentStyle[name];
		} 
		else{
			return getComputedStyle(obj, false)[name];
		}
	}
	


}

