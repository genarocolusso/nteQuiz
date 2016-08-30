$(document).ready(function(){
var altura = window.outerHeight;
var largura = window.outerWidth;
//alert(largura+" "+altura);
var i = 30;
var j =30;
for(j;j<largura*2;j+=80){
for(i=30;i<altura;i+=80){

  $("body").append("<div class='estrelinha'' style='top:"+i+"px ; left:"+j+"px ;'></div>  " );

}

}

});
