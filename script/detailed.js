$(function(){
  //放大镜
  var options ={
    zoomWidth:380,
    zoomHeight:317,
    position:"right",
　　 yOffset:0,
    lens:true,
    imageOpacity:1.0
  };
  $("#one3DivTwo1Ul_1_2 .jqzoom").jqzoom(options);    

  //当点击不是红色的图片(中间小图片)
  $("#one3DivTwo1Ul_1_1").show();
  $("#one3DivTwo1Ul_1").hide();
  $(".one3DivTwo1Ul .buttonImg").click(function(){
    var one3id=$(this)[0].id;//获取当前id
    $(this).hide().siblings(".buttonImg").show(); 
    $('.selectedH').hide().siblings('.selected').show();    
    //拼接id,找倒该id，将对应的内容进行操作
    $("#"+one3id+"_1").show().siblings(".buttonImgH").hide();
    $("#"+one3id+"_2").show().siblings().hide(); 
    $("#"+one3id+"_2 .jqzoom").jqzoom(options);
  }); 

   //鼠标滑过快递地址
   $('.address').hover(function(){
     $(this).attr('style','background:#f47a86;border:1px solid red;color:#fff;');
   },function(){
    $(this).attr('style','background:#fff;');
   }); 

  //尺寸、颜色分类
  $(".noborder").click(function(){
    var ys=$(this)[0].id;   
    $(this).hide().siblings(".noborder").show();
    $("#"+ys+"_1").show().siblings(".border").hide();
  });

  //尺寸
  $('.one4DivFiveUl>li').click(function(){
    determineF();
  });

  //颜色分类
  $(".one4DivSixUl li").click(function(){
    $('.buttonImgH').hide().siblings('.buttonImg').show();
    var one4Six1=$(this).attr('name');//获取当前name的值
    $("."+one4Six1+'_1').show().siblings().hide();
    determineF();
  }); 
 
  //数量-
  $(".one4DiveSevenMin").click(function(){    
    var one4SevenBox1=$(".one4DiveSevenBox").val();
    var thisP1=$(this).parent().parent();
    thisP1.find("#one4Span").remove();//防止提示重复出现
    var parse1=parseInt(one4SevenBox1)-1;
    if(parse1==-1){
      parse1=0;
    }
    $(".one4DiveSevenBox").val(parse1);
    //判断如果是0就提示，如果不是0就-1
    if(parse1==0){
      var prompt1="<span id='one4Span' style='color: red; font-size: 13px; float: left; margin-top: -22px; margin-left: 292px;'>你输入的是0件</span>";
      thisP1.append(prompt1);
    }
    determineF();
  });

  //数量+
  $(".one4DiveSevenAdd").click(function(){
   var one4SevenBox2=$(".one4DiveSevenBox").val();
   var thisP2=$(this).parent().parent();
   var num=$("#num").text();
   thisP2.find("#one4Span").remove();
   if(one4SevenBox2==num){
     var prompt2="<span id='one4Span' style='color: red; font-size: 13px; float: left; margin-top: -22px; margin-left: 292px;'>已超出库存数量</spa>"
     thisP2.append(prompt2);
   }else{
    var pase2=parseInt(one4SevenBox2)+1;
    $(".one4DiveSevenBox").val(pase2);
   }
    determineF();
  });

  //手动输入数量值
  $(".one4DiveSevenBox").keyup(function(){    
    var thisP3=$(this).parent().parent();
    thisP3.find("#one4Span").remove();
    var a=$(this).val();
    if(a<1){
     var prompt3="<span id='one4Span' style='color: red; font-size: 13px; float: left; margin-top: -22px; margin-left: 292px;'>你输入的是0件</span>";
     $('.one4DiveSeven').append(prompt3);
    }
    if(a>98){
     var prompt4="<span id='one4Span' style='color: red; font-size: 13px; float: left; margin-top: -22px; margin-left: 292px;'>已超出库存数量</span>";
     thisP3.append(prompt4);
    }
     determineF();
  });

  //立即购买   
  $('.one4DiveEight_1').click(redX);  
  //加入购物车
  $('.one4DiveEight_2').click(redX);

  xz=$('.xz').parent(); 
  function redX(event){
    var size=$('.one4DivFive_1'); //尺寸
     var color=$('.one4DivSix_1');//颜色
     var input=$('.one4DiveSevenBox').val(); //数量  
     
     if($('.one4DivFiveUl>li.border:hidden').length==$('.one4DivFiveUl>li.border').length||
        $('.one4DivSixUl>li.border:hidden').length==$('.one4DivSixUl>li.border').length||
        input==0){           
         var i="<i class='iconfont' id='iconfont' style='"
                                                 +'float: right;'
                                                 +'margin-right: 8px;'
                                                 +'margin-top: -169px;'
                                                 +'color: #c40000;'
                                                 +"'>&#xe63c;</i><div id='check' style='"
                                                                                  +'color:#c40000;'
                                                                                  +'font-size: 14px;'
                                                                                  +'margin-left: 82px;'
                                                                                  +'margin-top: 11px;'
                                                                                  +"'>请勾选您要的商品信息!</div>";
 
       xz.css({'border':'1px solid red','height':'221px'});
       xz.append(i);
       $('.one4DiveEight').hide();                                
      }else{    
         if($(event.target).hasClass('one4DiveEight_1'))  
            window.open('paymentPage.html');//支付页
          else
           window.open('shoppingCart.html');//购物车
      }
      //点击关闭图标
     $('#iconfont').click(function(){  
       $(this).remove();
       $('#check').remove();
       xz.removeAttr("style");
       $('.one4DiveEight').show();
       $('#determine').remove();
     });  
  }
  var type='';
  //立即购买   
  $('.one4DiveEight_1').click(function(){
    type='gmai';        
  });  
  //加入购物车
  $('.one4DiveEight_2').click(function(){
    type='gwchen'
  });
  //创建确定按钮
  function determineF(){         
         if(xz.attr('style')){  
          var newInput=$('.one4DiveSevenBox').val();//获取最新input的值
          $('#determine').remove();//先删除，防止重复出现
          var determine="<span id='determine' style='"
                                                    +'background:red;'
                                                    +'border: 1px solid #c40000;'
                                                    +'color: #fff;'
                                                    +'cursor: pointer;'
                                                    +'display: inline-block;'
                                                    +'height: 28px;'
                                                    +'margin-left: 82px;'
                                                    +'margin-top: 9px;'
                                                    +'padding-top: 3px;'
                                                    +'text-align: center;'
                                                    +' width: 72px;'
                                                    +"'>确定</span>";    
          //判断是否都选中，如果都选中就出现确认按钮       
          if($('.one4DivFiveUl>li.border:hidden').length<$('.one4DivFiveUl>li.border').length &&
             $('.one4DivSixUl>li.border:hidden').length<$('.one4DivSixUl>li.border').length &&
             newInput!=0){ 
                $('#check').hide();
                xz.append(determine);
          }
          //点击确定
          $('#determine').click(function(){                    
             if(type=='gmai'){
              window.open('paymentPage.html');//支付页
             }else if (type=='gwchen') {
              window.open('shoppingCart.html');//购物车
             };
          });           
        } 
       };
});

 