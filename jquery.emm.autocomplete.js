(function($){
	$.fn.emmautocomplete = function(arr){

		var source	= arr['source'];
		var key		= arr['key'];

		$(this).each(function(e){			
			var width	= $(this).width();
			var height	= $(this).height();
			var offset	= $(this).offset();
			var paddingT= parseInt($(this).css("padding-top"));
			var paddingR= parseInt($(this).css("padding-right"));
			var paddingB= parseInt($(this).css("padding-bottom"));
			var paddingL= parseInt($(this).css("padding-left"));
			var border	= parseInt($(this).css("border"));
			var rand	= Math.floor(Math.random()*9999+1);

			$(this).attr("rel",rand);
	
			$.ajax(source,{
				dataType: "json",
				success: function(data){
					var data = $.makeArray(data);

					$("body").append('<ul class="emmautocomplete" rel="'+rand+'"></ul>');
					
					var ul = $('ul[rel="'+rand+'"]');
					
					for(i=0;i<data.length;i++){
						ul.append('<li i="'+i+'"><a href="#" tabindex="'+i+'">'+data[i][key]+'</a></li>');
						for(clave in data[i]){
							ul.children('li[i="'+i+'"]').attr(clave,data[i][clave]);
						}
					}
					
					ul	.css("top",offset.top+height+paddingT+paddingB+border*2)
						.css("left",offset.left)
						.css("width",width+paddingL+paddingR+'px');
						
					ul.children('li').children('a').click(function(){
						ul.hide();
						var val = $(this).text();
						$('input[rel="'+rand+'"]').val(val);
					});
					
				}
				
			});
			
			$(this).keyup(function(e){
				if(e.keyCode==38){ // ARRIBA
					return false;
				}else if(e.keyCode==40){ // ABAJO
					return false;
				}else if(e.keyCode==13){ // ENTER
					valor = $('ul[rel="'+rand+'"] li a[class="selected"]').text();
					$(this).val(valor);
					$('ul[rel="'+rand+'"] li a').removeClass('selected');
					$('ul[rel="'+rand+'"]').slideUp("fast");
					return false;
				}
				var val = $(this).val();
				$('ul[rel="'+rand+'"] li a').removeClass('selected');
				if(val==''){
					$('ul[rel="'+rand+'"] li').show();
					$('ul[rel="'+rand+'"]').hide();
				}else{
					$('ul[rel="'+rand+'"]').show();
					$('ul[rel="'+rand+'"] li').hide();
					$('ul[rel="'+rand+'"] li:contains("'+val+'")').show();
					if($('ul[rel="'+rand+'"] li:visible').size()==0){
						$('ul[rel="'+rand+'"]').hide();
					}
				}
				var tabindex = 1;

				$('ul[rel="'+rand+'"] li:visible').each(function(i){
					$(this).children('a').attr("tabindex",tabindex);
					tabindex++;
				});
			}).keydown(function(e){
				if(typeof nthchild == 'undefined'){
					nthchild = 0;
				}
				if(e.keyCode==38){ // ARRIBA
					if(nthchild>1){
						nthchild--;
					}
					$('ul[rel="'+rand+'"] li a').removeClass('selected');
					elemento = $('ul[rel="'+rand+'"] li a[tabindex="'+nthchild+'"]');
					elemento.addClass("selected");
				}else if(e.keyCode==40){ // ABAJO
					if(nthchild<$('ul[rel="'+rand+'"] li:visible').size()){
						nthchild++;
					}
					$('ul[rel="'+rand+'"] li a').removeClass('selected');
					elemento = $('ul[rel="'+rand+'"] li a[tabindex="'+nthchild+'"]');
					elemento.addClass("selected");
				}
			});
			
			
			
		});
	};
})(jQuery);