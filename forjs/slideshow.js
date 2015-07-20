//window.onload是一个事件，就是当文档加载完成之后就会触犯该事件，这样可以为此事件绑定事件处理函数，并且将要执行的脚本代码放//在事件处理函数中，就可以避免获取不到对象的情况。
      window.onload=function(){
        var div = document.getElementById('box');
        var li = div.getElementsByTagName('ol')[0].getElementsByTagName('li');
        var ul = div.getElementsByTagName('ul')[0];
        var time = null;
        var time2 = null;
        var num = 0;/**以上获取元素、声明变量**/
        function next()
        {
          num=(num+1)%li.length;//取余数的公式，让num的值在li的长度之间切换。这里让num+1，取到的是当前li的下一个li。
          tab();//调用函数
        }
        time2=setInterval(next,2000);//每两秒钟运行一遍此函数，next()这个函数是控制轮播图的自动轮播
        for (var i=0;i<li.length ;i++ )
        {
          li[i].index=i;//js中可以获取属性也可以自定义属性，现在就是给所有的li自定义一个叫index的属性并与循环里的变量i相等。
          li[i].onmouseover=function(){
            clearInterval(time2);//当鼠标放到li上时，清除time2这个计时器，也就不再调用next这个自动轮播的函数
            num=this.index;//此时的num等于当前li的下标，而并非next中的li的下一个的下标
            tab();//调用tab函数
        }
        li[i].onmouseout=function(){
          time2=setInterval(next,2000);
        }//当鼠标离开时，重新绑定计时器，运行自动轮播
      }
       function tab()
      {
         for (var i=0;i<li.length ;i++ ){
           li[i].className='';//遍历每个li，先将所有li的class名清空
        }
        li[num].className='on';//使li[num]的li的class名为选中样式。如运行的是next这个函数，li[num]就是指当前的下一个，否则是指当前下标
        startMove(ul,{'top':(-num*div.clientHeight)});//以上都是控制li的轮播，下面调用的函数控制的是图片的轮播。传递进去的参数可能看起来有些复杂，在这里一一做解：ul:对象，{}中的是段json数据，'top'就是样式里的top值，top值等于负的,num(相对应的li的下标)乘以div的高度(这里div的高度便是图片的高度，如不等于的情况下可以另作设置，也可直接设置成数值。)
      }
      function startMove(obj,json)
      {
        clearInterval(obj.time);//防止多次运行计时器叠加
        obj.time=setInterval(function(){
          doMove(obj,json);//调用函数，并传参进去
        },30);
      }
    }
    function doMove(obj,json)
    {
      var cur = 0;//初始值
      var attr = null;//声明变量
      for (attr in json )//循环json数据
      {
        cur = parseInt(getStyle(obj,attr)) || 0;//初始值等于，传递进来的属性值，取整后的值。无法取整就等于0，‘|| 0’为保险起见而设。‘getStyle(obj,attr)’:调用getStyle函数并传参进去
      }
       var speed = (json[attr] - cur)/8;//缓冲公式,目标点减初始值，除以系数
      speed = (speed>0) ? Math.ceil(speed) : Math.floor(speed);//速度向上向下取整
      obj.style[attr] = cur + speed +'px';//对象的属性值也就是ul的top值等于初始值+速度+单位
    }
    function getStyle(obj,attr)//为获取对象的非行间样式，也就是写在css里的样式
    {
      if(obj.currentStyle)//兼容写法，如果是ie浏览器，返回…
      {
        return obj.currentStyle[attr];
      }else{
        return getComputedStyle(obj,false)[attr];//标准浏览器，返回…
      }
    }