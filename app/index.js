/*para que se adapte a la pantalla*/
$(window).resize(function() {
    // var heightBrowser =$(window).height();
    var widthBrowser =$(window).width();
    // console.log("Tamaño de la pantalla del navegador: width="+widthBrowser +" height="+heightBrowser );
    
    /*condiciono asi aparece*/
    if(widthBrowser>1199){
        $('.nav__menu').show();
    }else{
        $('.nav__menu').hide();
    }
 });

 /*para que cargue el documento*/
$(document).ready(function(){
    let count = 0;
    /*para los botones del header*/
        $("#btn-menu").click(function(){
          if(count===0 ){
              $('.nav__menu').show("slow");
              count=1;
          }else{
              $('.nav__menu').hide("slow");
              count=0;
          }
        })


});

