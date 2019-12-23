//Cargador
$(function() {
	//Nav clase oculta
    $(".navBar").addClass("navHide");
    //Iconos navSide
    $(".drop a").append("<i class='material-icons right iconDrop'>arrow_drop_down</i>");
    $(".dropdown").append("<i class='material-icons iconDrop'>arrow_drop_down</i>");
    $(".hijoDropdown").hide();
});
//Abre Nav con boton
$(".botonMenu").click(function(){
	$(".navBar").show();
	$("#clearNav").show();
	$(".navBar").toggleClass('navHide navShow');
	$('body').css('overflow-x','hidden');
	$('body').css('overflow-y','hidden');
});
//Cierra Nav con click
$("#clearNav").click(function() {
	$("#clearNav").hide();
	$(".navBar").toggleClass('navShow navHide');
	$('body').css('overflow-x','hidden');
	$('body').css('overflow-y','scroll');

});

//Slider//
function slider(autoInicio, btnControl){
	//div para contenidos
	$(".slider").append("<div id='divContenidoSlider'></div>");
	var num_diapositivas = $(".slider  img").length; 
	// Botones Bottom
	centinela = 1;
	controlC  = parseInt(num_diapositivas)+1;
	$(".slider").after("<div id='btnSliderBottom' class='row'  style='text-align:center;'></div>");
	while (centinela<controlC) {
		$("#btnSliderBottom").append("<div class='controlSli' id='sli"+centinela+"'></div>");
		centinela++;
	};
	/*//Bottones deracha e izquierda
	if (btnControl!==null) {
		$(".slider").append("<i class='material-icons botonDerecha'>keyboard_arrow_right</i><i class='material-icons botonIzquierda'>keyboard_arrow_left</i>")
	}*/
	//URL IMAGENES
	var images = $('.slides li').children('img').map(function(){
    return $(this).attr('src')
	}).get();
	//URL A VALORES
	$(".slider").append("<input type='hidden' id='urls' value='"+images+"'>");
	var urlsImg = $("#urls").val();
	if (urlsImg != null) {
	//Array de imagenes
	var arrayImg = urlsImg.split(',');
		//ocultar imagenes
		$(".slides img").hide();
		//ocultar contenidos
		$(".slides li").hide();

		var contenido = $(".slides").html();
		$(".slider").append("<div id='contenidoSlider'>"+contenido+"</div>");
		var contiene = $("#contenidoSlider li img").remove();
		var este 	 = $("#contenidoSlider").html();


		var items = $("#contenidoSlider").find('li').map(function() {
		var item = { };

		  item.id = this.value;
		  item.content = $(this).html();

		  return item;
		});
		var json  = JSON.stringify(items);
		var jsonObjet	 = $.parseJSON(json);
		var arrayContent = jsonObjet;

		// Sacar el alto mas alto :D
		function ancho() {
			$.each(arrayImg, function(index, value) { 
			  var tmpImg = new Image();
				tmpImg.src=value; 
				$(tmpImg).on('load',function(){
				  var masAlta  = 0;	
				  var orgHeight = tmpImg.height;
				  if (orgHeight>masAlta){masAlta=orgHeight}
				  $(".slider").css("height",masAlta);

				}); 
			});
		}

		ancho();


		function estilos(){


			$(".slider").fadeTo();
			$(".slider").css('width', '100%');
			$(".slider").css('background-size','cover');
			$(".slider").css('background-position','center');
			$(".slider").css('background-color','grey');
			$(".slider").css('position','relative');
			$("#divContenidoSlider").css("display","none");

		}

		estilos();

		function estilosFinos() {
		        $(".slider").fadeIn("400", function() {
		        	$("#divContenidoSlider").fadeIn();
		        });
		}

		function botonesSlider(inicio) {
			$(".activoSli").removeClass("activoSli");
			$("#sli"+inicio).toggleClass("activoSli");
			centinela2 = 1;
			controlImg = 0;
			while (centinela2<controlC) {
				$("#sli"+centinela2).attr("url",arrayImg[controlImg]);
				centinela2++;
				controlImg++;
			}
		}

		var controlAuto 	= setInterval(fondoDefault, 4500);

		function fondoDefault() {
			estilos();

			var maximo  		= num_diapositivas-1;
			var urlFondo		= arrayImg['0'];
			var entero			= 1;
			var contenidoActual = arrayContent; 
			inicio      	    = $(".slider").attr("cuantos");
			if (inicio>maximo) {
				inicio=0;
			}
			if (inicio==null) {
				inicio=0;
				$(".slider").attr("cuantos",inicio);
			}
		
			else {
				urlFondo 		= arrayImg[inicio];
			}
			$("#divContenidoSlider").html(contenidoActual[inicio].content);
			inicio 		  = parseInt(inicio)+parseInt(entero);
			$(".slider").attr("cuantos",inicio);
			$(".slider").css('background-image', 'url('+urlFondo+')');
			estilosFinos();
			botonesSlider(inicio);

			

		}

		fondoDefault();
		

		$( ".controlSli" ).on( "click", function() {
			var urlAPoner = $(this).attr("url");
			var donde     = $(this).attr("id");
			var res       = donde.replace("sli","");
			var res2	  = res-1;
			var contenidoActual = arrayContent; 

			$(".slider").css('background-image', 'url('+urlAPoner+')');
			$("#divContenidoSlider").html(contenidoActual[res2].content);
			estilos();
			estilosFinos();
			botonesSlider(res);
			clearInterval(controlAuto); 
		});

		$('.slider').hover(
		  function () {
		    $('.botonDerecha').show("slow");
		    $('.botonIzquierda').show("slow");

		  }, 
		  function () {
		    $('.botonDerecha').hide("slow");
		    $('.botonIzquierda').hide("slow");
		  }
		);
	};
};

//Drop en menu left
$(".drop").click(function(){
	var cual = $(this).attr("target");
	var statusDrop = $(this).attr("status");
	if (statusDrop==null) {
		 $(this).attr("status","activo");
		 $("#"+cual).show();
		 valor = $( "ul.listBar > li > a >i" ).html();
		 replaceIconAbierto= valor.replace("arrow_drop_down","arrow_drop_up");
		 $("ul.listBar > li[target|='"+cual+"'] > a >i").text(replaceIconAbierto);
		 //$(this).append(icon);
	}
	if (statusDrop=="activo") {
		 $(this).removeAttr("status");
		 $("#"+cual).hide();
		 $("a>i").replaceWith("<i class='material-icons right iconDrop'>arrow_drop_down</i>");
	}

});

// Dropdown
$(".dropdown").click(function(){
	
	$(".hijoDropdown").hide();
	$(".hijoDropdown").removeAttr("status");
	$("i",".dropdown").html("arrow_drop_down"); 

	var cualDrop   = $(this).attr("data-target");
	var statusDrop = $(this).attr("status");
	var position   = $(this).offset();
	

	if (statusDrop==null) {
		 $(this).attr("status","activo");
		 $("#"+cualDrop).show();
		 $("#"+cualDrop).css("left",position.left);
		 $("#"+cualDrop).css("z-index","99");

		 $('i',this).html("arrow_drop_up"); 
	}
	if (statusDrop=="activo") {
		 $(this).removeAttr("status");
		 $("#"+cualDrop).hide();
		 $('i',this).html("arrow_drop_down"); 

	}

});

function modal() {
	$("body").on('click', '.modal-padre', function(event) {
		var cualModal   = $(this).attr("href");
		var existeClear = $(".clearNavModal").attr("id");
		if (existeClear==null) {
			$(cualModal).before("<div class='clearNavModal' id='clearNavModal' style='display:block'></div>");
		}
		else {
			$("#clearNavModal").show();
		}
		$(cualModal).show();
		$(cualModal).prependTo(".clearNavModal");
	});


	$(".modal-close").on("click", function(){
  		$("#clearNavModal").css("display","none");
	});

}
