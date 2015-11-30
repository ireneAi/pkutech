window.onload = function (){

	//��ҳ��ͼ�л�
	var index_main = document.getElementById("index_main");
	var banner_btn_box = document.getElementById("banner_btn");
	var banner_btn = document.getElementById("banner_btn").getElementsByTagName("a");
	var banner_all_c = document.getElementById("banner_all");
	var banner_all_n = document.getElementById("banner_all").getElementsByTagName("span");
	var timer = protimer = playTimer = null;
	var index = i = 0;
	var bOrder = true;
	var windowWidth = document.body.offsetWidth || document.documentElement.offsetWidth;
	
	//��ʼ��״̬
	cutover();
	
	//��ť����л�
	for (i = 0; i < banner_btn.length; i++)
	{
		banner_btn[i].index = i;
		banner_btn[i].onclick = function ()
		{
			index = this.index;			
			cutover()
		}
	}
	//�������չʾ��ֹͣ�Զ�����
	banner_btn_box.onmouseover = function ()
	{
		clearInterval(playTimer)
	};
	
	//����뿪չʾ����ʼ�Զ�����
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
		//�жϲ���˳��
		bOrder ? index++ : index--;			
		
		//����
		index >= banner_all_n.length && (index = banner_all_n.length - 2, bOrder = false);			
		
		//����
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
	//��Ʒ�л�
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
 
 
 
 
 
 
//ע�⣺�ڶ������˶�����У����ж��������ܹ��� ����������⣬BUG������Ҫ�ı����ӵ�����������о��С������������˶�����󶨣��ٶȡ���������ֵ����͸���ȵȵȣ�
function startMoven(obj, json, fnEnd)//�����˶����//��Ϊjson���磺startMove(oDiv, {width: 400, height: 400})
{
clearInterval(obj.timer);
obj.timer=setInterval(function (){
 
var bStop=true;   //�ؼ� //���裺���е�ֵ���Ѿ�����
 
 
for(var attr in json) //��һ��ѭ������ԭ�������׶����������棬ÿ�ζ�ʱ��ִ�е�ʱ�򣬶���ѭ����ѭ���Ĵ���ȡ����json����д��ʲô
{
 
var cur=0;
 
if(attr=='opacity')
{
cur=Math.round(parseFloat(getStyle(obj, attr))*100); //��Ϊ���������⣬С��
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
 
 
if(bStop)//������е�ֵ�����ˣ��رն�ʱ��
{
clearInterval(obj.timer);
 
if(fnEnd) fnEnd();
}
 
}, 30); 
}
}

