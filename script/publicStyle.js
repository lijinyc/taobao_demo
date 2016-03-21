$(function(){
   //输入框
   $("#search").focus(function(){
  	 var $search=$(this).val(); 	
     if($search=="请输入商品名称"){
        $(this).val("");
     }
   }).blur(function(){
  	 var $search=$(this).val(); 	
     if($search==""){
        $(this).val("请输入商品名称");
     }
   });
     //换肤
    $.fn.getHexBackgroundColor = function() {
    var rgb = $(this[0]).css('backgroundColor');
    rgb = rgb.match(/\d+/g);
    function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
      return rgb= "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
    }
    $(".skin li").click(function(){ 
       //获取当前点击li的class
       var type=$(this).attr('class');            
       //更改id=‘cssfile’中的href
       $('#cssfile').attr('href','style/'+type+'.css');
       var skinVal=$(this).getHexBackgroundColor();      
        
       $.cookie("myColor",skinVal);//将上一次用户点击的颜色存储到cookie
       //将值存放入cookie中
       $.cookie("color",type);      
    });
    //当页面第一次加载进来，获取用户存储的颜色或者设置默认值
    //当用户没有存储颜色时，默认为白色
    var skin6=$(".skin_6").getHexBackgroundColor();
    $(".one").css("backgroundColor",skin6);
    var cookieSkin=$.cookie("myColor");//获取用户存储的颜色值
    var colora=$.cookie("color");
    if(colora){
      $('#cssfile').attr('href','style/'+colora+'.css');
    }

});