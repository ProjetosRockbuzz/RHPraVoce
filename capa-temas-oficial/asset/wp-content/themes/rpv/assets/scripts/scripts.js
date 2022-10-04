jQuery(function($){

	var xhr = null;
	var html_drop = $('.html-drop');
	const loading_drop = $('.loading-drop');
	const progress = $('.progress-loader');
	const fill = $('.fill');
    
    $('.bbp-author-link').attr("href", "javascript:void(0)");

	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	});

	// Chamada Menu Lateral
	$('.icon-hamburger, .close-button, .fill').click(function(){
		let icon_hamburger = $('.icon-hamburger');
		let close_button = $('.close-button');
		let menu_offside = $('.menu-lateral');

		icon_hamburger.toggleClass('active');

		if(icon_hamburger.hasClass('active')){
			menu_offside.animate({"right":"0"}, 700);
			fill.fadeIn(100);
		}else {
			menu_offside.animate({"right":"-100%"}, 700);
			fill.fadeOut(100);
		}
	});

	// Chamada do Menu Dropdown
	$('.main-nav li ul').hide().removeClass('fallback');
	$('.main-nav li.dropdw').hover(
		function () {
			
			let item = $(this);
			let title = $(this).children('a').text();
			let custom_title = $(this).data('custom_title');
			let descricao = $(this).data('descricao');
			let template = $(this).data('template');
			
			$('ul', this).stop().fadeIn(100);
			if(item.hasClass('icon')){
				$('.title-header-drop').text(custom_title);
				template = custom_title;
			}else {
				$('.title-header-drop').text(title);
			}
			$('.descricao-header-drop').text(descricao);

			xhr = $.ajax({
				url: wp.ajaxurl,
				type: 'GET',
				dataType: 'html',
				data: {
					template: template,
					action: 'get_drop_template'
				},
				beforeSend: function(){
					html_drop.html('');
					if(xhr != null){
						xhr.abort();
						xhr = null;
					}
				}
			})
			.done(function(response) {
				loading_drop.fadeOut(300, function(){
					html_drop.html(response);
				});
			});	
		},
		function () {
			// $('ul', this).stop().slideUp(200);
			$('ul', this).stop().fadeOut(150);
			html_drop.html('');
			loading_drop.fadeIn();
		}
	);

	$('.main-nav li.search-icon').click(function(e){
		e.preventDefault();
		$('.search-site').slideToggle(100);
	});

	$(document).on('click', '.main-nav-mobile li.main-nav-item', function(){
		let drop = $(this).children('.drop');

		$('li.main-nav-item').not($(this)).removeClass('active');
		$('.drop').hide(300);

		$(this).toggleClass('active');
		if($(this).hasClass('active')){
			drop.slideToggle(100);
		}
	});


	// Podcast
	$(document).on('click', '.episode', function(){
		
        let id = $(this).data('id');
		let episode = $(this).data('episode');
		let player = $('#player');
		let player_append = $('.player-append');
		let menu_offside = $('.menu-lateral');

		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			dataType: 'html',
			data: {
            	id: id,
				episode: episode,
				action: 'player_spotify'
			},
			beforeSend: function(){
				menu_offside.animate({"right":"-100%"}, 700);
				fill.fadeOut(100);
				progress.fadeIn(100);
			},
		})
		.done(function(response) {
			progress.fadeOut(100);
			player.animate({'bottom': '0'}, 500);
			player_append.html(response);
		});
		

	});

	// Close Podcast
	$(document).on('click', '#close-player', function(){
		$('#player').animate({'bottom': '-100%'}, 500);
		$('.player-append').html('');
	});

	// Carrega o Carrousel na tela
	$(document).ready(function(){
		let carousel_channel = $('.carousel-channel');
		let carousel_destaques = $('.carousel-destaques');
		let carousel_cases = $('.carousel-cases');
		let carousel_guiaRH = $('.carousel-guiaRH');
		let carousel_banners = $('.carousel-banners');
		let carousel_taxonomy_empresas = $('.carousel-taxonomy-empresas');
		let carousel_related_posts = $('.carousel-related-posts');
		let carousel_colunistas = $('.carousel-colunistas');

		carousel_channel.fadeIn(600);
		carousel_channel.owlCarousel({
		    loop: (($('.carousel-channel .slide').length / 2) > 6) ? true : false,
		    center: false,
		    lazyLoad: true,
		    items: 5,
		    margin: 60,
		    autoplay: true,
		    dots:false,
		    nav: true,
		    autoplayTimeout: 5000,
		    autoplayHoverPause: true,
			smartSpeed: 100,
			slideBy: 4,
		    responsive: {
		      0: {
		        items: 4
		      },
		      768: {
		        items: 6
			  },
			  1024: {
				items: 6
			  },
		      1170: {
		        items: 6
		      }
		    }
		});

		carousel_destaques.fadeIn(600);
		carousel_destaques.owlCarousel({
		    loop: true,
		    center: false,
		    lazyLoad: false,
		    items: 3,
		    margin: 30,
		    autoplay: true,
		    dots:true,
		    nav: true,
		    autoplayTimeout: 5000,
		    autoplayHoverPause: true,
			smartSpeed: 100,
			slideBy: 4,
		    responsive: {
		      0: {
		        items: 1,
		        nav: false,
		      },
		      768: {
		        items: 2
			  },
			  1024: {
				items: 2
			  },
		      1170: {
		        items: 3
		      }
		    }
		});

		carousel_banners.fadeIn(600);
		carousel_banners.owlCarousel({
		    loop: true,
		    center: false,
		    lazyLoad: false,
		    items: 1,
		    margin: 120,
		    autoplay: true,
		    dots:false,
		    nav: false,
		    autoplayTimeout: 5000,
			smartSpeed: 100,
			slideBy: 1,
		    responsive: {
		      0: {
		        items: 1
		      },
		      768: {
		        items: 1
			  },
			  1024: {
				items: 1
			  },
		      1170: {
		        items: 1
		      }
		    }
		});

		carousel_cases.fadeIn(600);
		carousel_cases.owlCarousel({
		    loop: true,
		    center: false,
		    lazyLoad: false,
		    items: 3,
		    margin: 20,
		    autoplay: true,
		    dots:true,
		    nav: true,
		    autoplayTimeout: 5000,
		    autoplayHoverPause: true,
			smartSpeed: 100,
			slideBy: 4,
		    responsive: {
		      0: {
		        items: 1
		      },
		      768: {
		        items: 3
			  },
			  1024: {
				items: 3
			  },
		      1170: {
		        items: 3
		      }
		    }
		});

		carousel_guiaRH.fadeIn(600);
		carousel_guiaRH.owlCarousel({
		    loop: true,
		    center: false,
		    lazyLoad: false,
		    items: 3,
		    margin: 120,
		    autoplay: true,
		    dots:true,
		    nav: true,
		    autoplayTimeout: 5000,
		    autoplayHoverPause: true,
			smartSpeed: 100,
			slideBy: 4,
		    responsive: {
		      0: {
		        items: 2
		      },
		      768: {
		        items: 3
			  },
			  1024: {
				items: 4
			  },
		      1170: {
		        items: 4
		      }
		    }
		});

		carousel_colunistas.fadeIn(600);
		carousel_colunistas.owlCarousel({
		    loop: true,
		    center: false,
		    lazyLoad: false,
		    items: 1,
		    margin: 120,
		    autoplay: true,
		    dots:true,
		    nav: false,
		    autoplayTimeout: 5000,
		    autoplayHoverPause: true,
			smartSpeed: 100,
			slideBy: 1,
		    responsive: {
		      0: {
		        items: 1
		      },
		      768: {
		        items: 1
			  },
			  1024: {
				items: 1
			  },
		      1170: {
		        items: 1
		      }
		    }
		});

		carousel_taxonomy_empresas.owlCarousel({
		    loop: true,
		    center: false,
		    lazyLoad: false,
		    items: 3,
		    margin: 20,
		    autoplay: true,
		    dots:true,
		    nav: true,
		    autoplayTimeout: 5000,
		    autoplayHoverPause: true,
			smartSpeed: 100,
			slideBy: 4,
		    responsive: {
		      0: {
		        items: 2
		      },
		      768: {
		        items: 3
			  },
			  1024: {
				items: 3
			  },
		      1170: {
		        items: 3
		      }
		    }
		});

		carousel_related_posts.owlCarousel({
		    loop: true,
		    center: false,
		    lazyLoad: false,
		    items: 3,
		    margin: 20,
		    autoplay: true,
		    dots:true,
		    nav: false,
		    autoplayTimeout: 5000,
		    autoplayHoverPause: true,
			smartSpeed: 100,
			slideBy: 4,
		    responsive: {
		      0: {
		        items: 2
		      },
		      768: {
		        items: 3
			  },
			  1024: {
				items: 3
			  },
		      1170: {
		        items: 3
		      }
		    }
		});
	});

	// Tags Trending
	$(document).on('click', '.tag', function(){
		let tag = $(this).data('tag');

		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			data: {
				tag: tag,
				action: 'set_tag_trending',
			},
			beforeSend: function(){
				progress.fadeIn(100);
			}
		})
		.done(function() {
			document.location.reload();
		});
		
	});

	// Post Types Trending
	$(document).on('click', '.post-types-trending', function(){
		let post_type = $(this).data('post');

		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			data: {
				post_type: post_type,
				action: 'set_post_type_trending',
			},
			beforeSend: function(){
				progress.fadeIn(100);
			}
		})
		.done(function() {
			document.location.reload();
		});
	});

	// Período Trending
	$(document).on('change', '.select-periodo', function(){
		let periodo = $(this).val();

		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			data: {
				periodo: periodo,
				action: 'set_periodo_trending',
			},
			beforeSend: function(){
				progress.fadeIn(100);
			}
		})
		.done(function() {
			document.location.reload();
		});
	});

	// Content Eventos
	$(document).on('click', '.evento', function(){
		let id = $(this).data('id');
		var loading = $('.progress-loader');

		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			data: {
				id: id,
				action: 'get_content_eventos',
			},
			beforeSend: function(){
				loading.fadeIn(100);
				$('.modal-eventos .append-content').html('');
			},
		})
		.done(function(response) {
			loading.fadeOut(100);
			$('.modal-eventos').fadeIn(400);
			$('.modal-eventos .append-content').html(response);
		});
	});

	// Se exister o parametro ?evento=id na URL, chame a modal de Eventos
	$(document).ready(function() {
		let get_param = window.location.search.substr(1);
		get_param = get_param.split("=");

		if(get_param[0] == "evento" && get_param[1] && get_param[1] != ""){
			let id = get_param[1];
			var loading = $('.progress-loader');

			$.ajax({
				url: wp.ajaxurl,
				type: 'GET',
				data: {
					id: id,
					action: 'get_content_eventos',
				},
				beforeSend: function(){
					loading.fadeIn(100);
					$('.modal-eventos .append-content').html('');
				},
			})
			.done(function(response) {
				loading.fadeOut(100);
				$('.modal-eventos').fadeIn(400);
				$('.modal-eventos .append-content').html(response);
			});
		}
		
	});

	// Close Modal Eventos
	$(document).on('click', '.close-modal-eventos, .btn-close-modal', function(){
		$('.modal-eventos').fadeOut(400);
		$('.modal-eventos .append-content').html('');
	});

	// Filtrar Eventos
	$(document).on('change', '.filtrar-eventos select', function(){
		let categoria_evento = $('.filtrar-eventos select[name=categoria-evento]').val();
		let mes_evento = $('.filtrar-eventos select[name=mes-evento]').val();

		$('.mais-eventos').fadeOut(500);
	
		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			data: {
				categoria_evento : categoria_evento,
				mes_evento : mes_evento,
				action: 'filtrar_eventos',
			},
			beforeSend: function(){
				progress.fadeIn(100);
				$('.row-eventos').html('');
			},
		})
		.done(function(response) {
			progress.fadeOut(100);
			$('.row-eventos').html(response);
		});
	});

	// Paginação Eventos
	$(document).on('click', '.mais-eventos', function(){
		var Obj = $(this);
		var page = Obj.data('page');
		var newPage = page+1;

		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			data: {
				page : page,
				action: 'pagination_eventos',
			},
			beforeSend: function(){
				progress.fadeIn(100);
			},
			success: function(){
				Obj.data('page', newPage);
			},
		})
		.done(function(response) {
			progress.fadeOut(100);
			if(response != 0){
				$('.row-eventos').append(response);
			}else {
				$('.row-eventos').append('<div class="alert alert-danger">Não existem mais eventos para exibir!</div>');
				$('.alert-danger').delay(2000).fadeOut(100);
			}
		});
	});

	// COLAB
	$(document).on('click', '.open-modal-colab', function(e){
		e.preventDefault();
		$('.modal-colab').fadeIn(200);
		if($('.modal-colab:visible')){
			$('body').css('overflow-y', 'hidden');
		}
	});

	$(document).on('click', '.close-modal-colab', function(e){
		e.preventDefault();
		$('.modal-colab').fadeOut(200);
		$('body').css('overflow-y', 'auto');
	});

	// Materiais
	$(document).on('submit', '.filtrar-materiais', function(e){
		e.preventDefault();
		let dados = $(this).serialize();

		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			data: {
				dados : dados,
				action: 'filtrar_materiais',
			},
			beforeSend: function(){
				progress.fadeIn(100);
			}
		})
		.done(function(response) {
			progress.fadeOut(100);
			$('.row-materiais').html(response);
		});
	});

	$(document).on('click', '.mais-materiais', function(){
		var Obj = $(this);
		var page = Obj.data('page');
		var newPage = page+1;

		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			data: {
				page : page,
				action: 'pagination_materiais',
			},
			beforeSend: function(){
				progress.fadeIn(100);
			},
			success: function(){
				Obj.data('page', newPage);
			},
		})
		.done(function(response) {
			// console.log(response);
			progress.fadeOut(100);
			if(response != 0){
				$('.row-materiais').append(response);
			}else {
				$('.row-materiais').append('<div class="alert alert-danger">Não existem mais materiais para exibir!</div>');
				$('.alert-danger').delay(2000).fadeOut(100);
			}
		});
	});

	$(document).on('click', '.guiarh .btn-pesquisa-avancada', function(){
		$('.pesquisa-avancada').slideToggle(300);
	});

	$(document).on('click', '.drop-guiarh .btn-pesquisa-avancada', function(){
		$('.pesquisa-avancada').slideToggle(300);
	});

	$(document).on('click', '.search-guiarh .btn-pesquisa-avancada', function(){
		$('.pesquisa-avancada').slideToggle(300);
	});

	// GUIARH
	$(document).on('click', '.btn-toggle-contato', function(){
		$('.modal-contato').slideToggle(200);
	});

	$(document).on('click', '.btn-send-form', function(){
		let inputs = $('.field');
		let send = null;

		$.each(inputs, function(index, el) {
			if(el.value == ''){
				$(this).css('border', '2px solid #F36F6F');
			}else {
				$(this).css('border', '2px solid #D6D6D6');
				send = true;
			}		
		});

		if(send != null){
			$('#form-contato-guiarh').submit((e)=>{
				e.preventDefault();

				var formdata = new FormData($('#form-contato-guiarh')[0]);
				formdata.append('action', 'send_contato_guiarh');

				$.ajax({
					url: wp.ajaxurl,
					type: 'POST',
					processData: false,
					contentType: false,
					data: formdata,
					beforeSend: function(){
						progress.fadeIn(100);
					},
				})
				.done(function(response) {
					progress.fadeOut(100);
					if(response == 200){
						$('.wrapper-modal-contato').append('<div style="font-size: 0.80rem;" class="mt-3 alert alert-success">Mensagem Enviada com Sucesso!</div>');
						alert('Mensagem Enviada com Sucesso!');
						setTimeout(function(){
							document.location.reload();
						},4000);
					}else {
						$('.wrapper-modal-contato').append('<div style="font-size: 0.80rem;" class="mt-3 alert alert-danger">Erro ao enviar Mensagem!</div>');
						
					}
				});
			});
		}
	});


	$(document).on('click', '.rate-notes li', function(e){
		e.preventDefault();
		let rate = $(this);
		let note = $(this).data('note');
		let id = $(this).data('id');

		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			data: {
				id: id,
				note: note,
				action: 'set_post_note'
			},
		})
		.done(function() {
			rate.attr('data-bs-original-title', 'Obrigado por votar!').tooltip("show");
			setTimeout(()=>{
				rate.tooltip("hide");
			}, 3000);
		});
		
	});
	
	function success_share_forum(){
		var popover = new bootstrap.Popover(document.querySelector('#share-forum'), {
		  container: 'body'
		});

		return popover;
	}

	// Share Fórum Topic
	$(document).on('click', '#share-forum', function(){
		let modal = $('.modal-share-forum');
		let btn_share = $('#btn-share');
		let btn_cancel_share = $('#btn-cancel-share');
		let content = $('.post-content').get()[0].innerHTML;
		let title = $('.title-post-single').text();

		modal.slideToggle(300);

		btn_cancel_share.click(function(event) {
			event.preventDefault();
			modal.slideUp(300);
		});

		btn_share.click(function(){
			$.ajax({
				url: wp.ajaxurl,
				type: 'POST',
				data: {
					title: title,
					content: content,
					action: 'share_topic_forum'
				},
				beforeSend: function(){
					progress.fadeIn(100);
				},
			})
			.done(function(response) {
				progress.fadeOut(100);
				modal.slideUp(300);
				let popover = success_share_forum();
				popover.show();
				setTimeout(()=>{
					popover.hide();
					document.location.reload();
				}, 2000);
			});
		});
	});


	// Login Fórum
	$(document).on('submit', '#form-login-forum', function(event){
		event.preventDefault();

		let form = $(this);
		let dados = form.serialize();
		let append_login = $('.append-alert-login');

		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			data: {
				dados: dados,
				action: 'login_forum'
			},
			beforeSend: function(){
				progress.fadeIn(100);
			},
		})
		.done(function(response) {
			progress.fadeOut(100);

			if (response == 'empty') {
				append_login.html('<div class="alert alert-danger">Campos Vazios!</div>');
			} else if(response == 'user_404') {
				append_login.html('<div class="alert alert-warning">Usuário não existe!</div>');
			} else if(response == '401') {
				append_login.html('<div class="alert alert-danger">Usuário ou Senha incorretos!</div>');
			} else {
				append_login.html('<div class="alert alert-success">Login Realizado!</div>');
				document.location.reload();
			}
		});
	});


	// Cadastro Fórum
	$(document).on('submit', '#form-cadastro-forum', function(event){
		event.preventDefault();

		let form = $(this);
		let dados = form.serialize();
		let append_error = $('.append-error-cadastro');
		let append_success = $('.append-success-cadastro');

		$.ajax({
			url: wp.ajaxurl,
			type: 'GET',
			data: {
				dados: dados,
				action: 'cadastro_forum'
			},
			beforeSend: function(){
				progress.fadeIn(100);
			},
		})
		.done(function(response) {
			progress.fadeOut(100);

			if (response == 'error_email') {
				append_error.fadeIn(100).html('E-mail inválido');
			} else if(response == 'error_password') {
				append_error.fadeIn(100).html('A senha tem menos de 8 caracteres');
			} else if(response == 'user_exists') {
				append_error.fadeIn(100).html('Este nome de usuário já existe!');
			} else if(response == 'email_exists') {
				append_error.fadeIn(100).html('Este E-mail já está sendo utilizado!');
			} else  {
				append_error.fadeOut(100);
				append_success.fadeIn(100).html('Cadastro realizado com sucesso! Você já pode fazer seu login!');
			}
		});
	});

	$(document).on('click', 'a.scroll[href^="#"]', function(e) {
	    var id = $(this).attr('href');

	    var $id = $(id);
	    if ($id.length === 0) {
	        return;
	    }
	    e.preventDefault();
	    var pos = $id.offset().top;
	    $('body, html').animate({scrollTop: pos});
	});

	$(document).ready(function(){
		$('.comment-body .reply').append('<a class="denounce-comment" href="#"><i class="fas fa-flag"></i> DENUNCIAR</a>');

		$('.denounce-comment').click(function(e){
			e.preventDefault();

			let id_comment = $(this).parent().parent();
			let comment = id_comment[0].innerText;

			$.ajax({
				url: wp.ajaxurl,
				type: 'GET',
				dataType: 'html',
				data: {
					comment: comment,
					action: 'denunciar_comentario'
				},
				beforeSend: function(){
					progress.fadeIn(100);
				},
			})
			.done(function() {
				progress.fadeOut(100);
				id_comment.append('<div class="alert alert-success">Sua denúncia foi enviada! A nossa equipe de moderadores irá analisar sua denúncia. Obrigado.</div>');
			});
			
		});
	});

});

/*!
  * Bootstrap v5.0.0-beta1 (https://getbootstrap.com/)
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).bootstrap=e()}(this,(function(){"use strict";function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function e(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}function n(){return(n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}function i(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}var o,r,s=function(t){do{t+=Math.floor(1e6*Math.random())}while(document.getElementById(t));return t},a=function(t){var e=t.getAttribute("data-bs-target");if(!e||"#"===e){var n=t.getAttribute("href");e=n&&"#"!==n?n.trim():null}return e},l=function(t){var e=a(t);return e&&document.querySelector(e)?e:null},c=function(t){var e=a(t);return e?document.querySelector(e):null},u=function(t){if(!t)return 0;var e=window.getComputedStyle(t),n=e.transitionDuration,i=e.transitionDelay,o=Number.parseFloat(n),r=Number.parseFloat(i);return o||r?(n=n.split(",")[0],i=i.split(",")[0],1e3*(Number.parseFloat(n)+Number.parseFloat(i))):0},f=function(t){t.dispatchEvent(new Event("transitionend"))},d=function(t){return(t[0]||t).nodeType},h=function(t,e){var n=!1,i=e+5;t.addEventListener("transitionend",(function e(){n=!0,t.removeEventListener("transitionend",e)})),setTimeout((function(){n||f(t)}),i)},p=function(t,e,n){Object.keys(n).forEach((function(i){var o,r=n[i],s=e[i],a=s&&d(s)?"element":null==(o=s)?""+o:{}.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(r).test(a))throw new Error(t.toUpperCase()+': Option "'+i+'" provided type "'+a+'" but expected type "'+r+'".')}))},g=function(t){if(!t)return!1;if(t.style&&t.parentNode&&t.parentNode.style){var e=getComputedStyle(t),n=getComputedStyle(t.parentNode);return"none"!==e.display&&"none"!==n.display&&"hidden"!==e.visibility}return!1},m=function(){return function(){}},v=function(t){return t.offsetHeight},_=function(){var t=window.jQuery;return t&&!document.body.hasAttribute("data-bs-no-jquery")?t:null},b=function(t){"loading"===document.readyState?document.addEventListener("DOMContentLoaded",t):t()},y="rtl"===document.documentElement.dir,w=(o={},r=1,{set:function(t,e,n){void 0===t.bsKey&&(t.bsKey={key:e,id:r},r++),o[t.bsKey.id]=n},get:function(t,e){if(!t||void 0===t.bsKey)return null;var n=t.bsKey;return n.key===e?o[n.id]:null},delete:function(t,e){if(void 0!==t.bsKey){var n=t.bsKey;n.key===e&&(delete o[n.id],delete t.bsKey)}}}),E=function(t,e,n){w.set(t,e,n)},T=function(t,e){return w.get(t,e)},k=function(t,e){w.delete(t,e)},O=/[^.]*(?=\..*)\.|.*/,L=/\..*/,A=/::\d+$/,C={},D=1,x={mouseenter:"mouseover",mouseleave:"mouseout"},S=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function j(t,e){return e&&e+"::"+D++||t.uidEvent||D++}function N(t){var e=j(t);return t.uidEvent=e,C[e]=C[e]||{},C[e]}function I(t,e,n){void 0===n&&(n=null);for(var i=Object.keys(t),o=0,r=i.length;o<r;o++){var s=t[i[o]];if(s.originalHandler===e&&s.delegationSelector===n)return s}return null}function P(t,e,n){var i="string"==typeof e,o=i?n:e,r=t.replace(L,""),s=x[r];return s&&(r=s),S.has(r)||(r=t),[i,o,r]}function M(t,e,n,i,o){if("string"==typeof e&&t){n||(n=i,i=null);var r=P(e,n,i),s=r[0],a=r[1],l=r[2],c=N(t),u=c[l]||(c[l]={}),f=I(u,a,s?n:null);if(f)f.oneOff=f.oneOff&&o;else{var d=j(a,e.replace(O,"")),h=s?function(t,e,n){return function i(o){for(var r=t.querySelectorAll(e),s=o.target;s&&s!==this;s=s.parentNode)for(var a=r.length;a--;)if(r[a]===s)return o.delegateTarget=s,i.oneOff&&H.off(t,o.type,n),n.apply(s,[o]);return null}}(t,n,i):function(t,e){return function n(i){return i.delegateTarget=t,n.oneOff&&H.off(t,i.type,e),e.apply(t,[i])}}(t,n);h.delegationSelector=s?n:null,h.originalHandler=a,h.oneOff=o,h.uidEvent=d,u[d]=h,t.addEventListener(l,h,s)}}}function B(t,e,n,i,o){var r=I(e[n],i,o);r&&(t.removeEventListener(n,r,Boolean(o)),delete e[n][r.uidEvent])}var H={on:function(t,e,n,i){M(t,e,n,i,!1)},one:function(t,e,n,i){M(t,e,n,i,!0)},off:function(t,e,n,i){if("string"==typeof e&&t){var o=P(e,n,i),r=o[0],s=o[1],a=o[2],l=a!==e,c=N(t),u=e.startsWith(".");if(void 0===s){u&&Object.keys(c).forEach((function(n){!function(t,e,n,i){var o=e[n]||{};Object.keys(o).forEach((function(r){if(r.includes(i)){var s=o[r];B(t,e,n,s.originalHandler,s.delegationSelector)}}))}(t,c,n,e.slice(1))}));var f=c[a]||{};Object.keys(f).forEach((function(n){var i=n.replace(A,"");if(!l||e.includes(i)){var o=f[n];B(t,c,a,o.originalHandler,o.delegationSelector)}}))}else{if(!c||!c[a])return;B(t,c,a,s,r?n:null)}}},trigger:function(t,e,n){if("string"!=typeof e||!t)return null;var i,o=_(),r=e.replace(L,""),s=e!==r,a=S.has(r),l=!0,c=!0,u=!1,f=null;return s&&o&&(i=o.Event(e,n),o(t).trigger(i),l=!i.isPropagationStopped(),c=!i.isImmediatePropagationStopped(),u=i.isDefaultPrevented()),a?(f=document.createEvent("HTMLEvents")).initEvent(r,l,!0):f=new CustomEvent(e,{bubbles:l,cancelable:!0}),void 0!==n&&Object.keys(n).forEach((function(t){Object.defineProperty(f,t,{get:function(){return n[t]}})})),u&&f.preventDefault(),c&&t.dispatchEvent(f),f.defaultPrevented&&void 0!==i&&i.preventDefault(),f}},R=function(){function t(t){t&&(this._element=t,E(t,this.constructor.DATA_KEY,this))}return t.prototype.dispose=function(){k(this._element,this.constructor.DATA_KEY),this._element=null},t.getInstance=function(t){return T(t,this.DATA_KEY)},e(t,null,[{key:"VERSION",get:function(){return"5.0.0-beta1"}}]),t}(),W="alert",K=function(t){function n(){return t.apply(this,arguments)||this}i(n,t);var o=n.prototype;return o.close=function(t){var e=t?this._getRootElement(t):this._element,n=this._triggerCloseEvent(e);null===n||n.defaultPrevented||this._removeElement(e)},o._getRootElement=function(t){return c(t)||t.closest(".alert")},o._triggerCloseEvent=function(t){return H.trigger(t,"close.bs.alert")},o._removeElement=function(t){var e=this;if(t.classList.remove("show"),t.classList.contains("fade")){var n=u(t);H.one(t,"transitionend",(function(){return e._destroyElement(t)})),h(t,n)}else this._destroyElement(t)},o._destroyElement=function(t){t.parentNode&&t.parentNode.removeChild(t),H.trigger(t,"closed.bs.alert")},n.jQueryInterface=function(t){return this.each((function(){var e=T(this,"bs.alert");e||(e=new n(this)),"close"===t&&e[t](this)}))},n.handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},e(n,null,[{key:"DATA_KEY",get:function(){return"bs.alert"}}]),n}(R);H.on(document,"click.bs.alert.data-api",'[data-bs-dismiss="alert"]',K.handleDismiss(new K)),b((function(){var t=_();if(t){var e=t.fn[W];t.fn[W]=K.jQueryInterface,t.fn[W].Constructor=K,t.fn[W].noConflict=function(){return t.fn[W]=e,K.jQueryInterface}}}));var Q=function(t){function n(){return t.apply(this,arguments)||this}return i(n,t),n.prototype.toggle=function(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"))},n.jQueryInterface=function(t){return this.each((function(){var e=T(this,"bs.button");e||(e=new n(this)),"toggle"===t&&e[t]()}))},e(n,null,[{key:"DATA_KEY",get:function(){return"bs.button"}}]),n}(R);function U(t){return"true"===t||"false"!==t&&(t===Number(t).toString()?Number(t):""===t||"null"===t?null:t)}function F(t){return t.replace(/[A-Z]/g,(function(t){return"-"+t.toLowerCase()}))}H.on(document,"click.bs.button.data-api",'[data-bs-toggle="button"]',(function(t){t.preventDefault();var e=t.target.closest('[data-bs-toggle="button"]'),n=T(e,"bs.button");n||(n=new Q(e)),n.toggle()})),b((function(){var t=_();if(t){var e=t.fn.button;t.fn.button=Q.jQueryInterface,t.fn.button.Constructor=Q,t.fn.button.noConflict=function(){return t.fn.button=e,Q.jQueryInterface}}}));var Y={setDataAttribute:function(t,e,n){t.setAttribute("data-bs-"+F(e),n)},removeDataAttribute:function(t,e){t.removeAttribute("data-bs-"+F(e))},getDataAttributes:function(t){if(!t)return{};var e={};return Object.keys(t.dataset).filter((function(t){return t.startsWith("bs")})).forEach((function(n){var i=n.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),e[i]=U(t.dataset[n])})),e},getDataAttribute:function(t,e){return U(t.getAttribute("data-bs-"+F(e)))},offset:function(t){var e=t.getBoundingClientRect();return{top:e.top+document.body.scrollTop,left:e.left+document.body.scrollLeft}},position:function(t){return{top:t.offsetTop,left:t.offsetLeft}}},q={matches:function(t,e){return t.matches(e)},find:function(t,e){var n;return void 0===e&&(e=document.documentElement),(n=[]).concat.apply(n,Element.prototype.querySelectorAll.call(e,t))},findOne:function(t,e){return void 0===e&&(e=document.documentElement),Element.prototype.querySelector.call(e,t)},children:function(t,e){var n,i=(n=[]).concat.apply(n,t.children);return i.filter((function(t){return t.matches(e)}))},parents:function(t,e){for(var n=[],i=t.parentNode;i&&i.nodeType===Node.ELEMENT_NODE&&3!==i.nodeType;)this.matches(i,e)&&n.push(i),i=i.parentNode;return n},prev:function(t,e){for(var n=t.previousElementSibling;n;){if(n.matches(e))return[n];n=n.previousElementSibling}return[]},next:function(t,e){for(var n=t.nextElementSibling;n;){if(this.matches(n,e))return[n];n=n.nextElementSibling}return[]}},z="carousel",V=".bs.carousel",X={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},$={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},G={TOUCH:"touch",PEN:"pen"},Z=function(t){function o(e,n){var i;return(i=t.call(this,e)||this)._items=null,i._interval=null,i._activeElement=null,i._isPaused=!1,i._isSliding=!1,i.touchTimeout=null,i.touchStartX=0,i.touchDeltaX=0,i._config=i._getConfig(n),i._indicatorsElement=q.findOne(".carousel-indicators",i._element),i._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,i._pointerEvent=Boolean(window.PointerEvent),i._addEventListeners(),i}i(o,t);var r=o.prototype;return r.next=function(){this._isSliding||this._slide("next")},r.nextWhenVisible=function(){!document.hidden&&g(this._element)&&this.next()},r.prev=function(){this._isSliding||this._slide("prev")},r.pause=function(t){t||(this._isPaused=!0),q.findOne(".carousel-item-next, .carousel-item-prev",this._element)&&(f(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},r.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config&&this._config.interval&&!this._isPaused&&(this._updateInterval(),this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},r.to=function(t){var e=this;this._activeElement=q.findOne(".active.carousel-item",this._element);var n=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)H.one(this._element,"slid.bs.carousel",(function(){return e.to(t)}));else{if(n===t)return this.pause(),void this.cycle();var i=t>n?"next":"prev";this._slide(i,this._items[t])}},r.dispose=function(){t.prototype.dispose.call(this),H.off(this._element,V),this._items=null,this._config=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},r._getConfig=function(t){return t=n({},X,t),p(z,t,$),t},r._handleSwipe=function(){var t=Math.abs(this.touchDeltaX);if(!(t<=40)){var e=t/this.touchDeltaX;this.touchDeltaX=0,e>0&&this.prev(),e<0&&this.next()}},r._addEventListeners=function(){var t=this;this._config.keyboard&&H.on(this._element,"keydown.bs.carousel",(function(e){return t._keydown(e)})),"hover"===this._config.pause&&(H.on(this._element,"mouseenter.bs.carousel",(function(e){return t.pause(e)})),H.on(this._element,"mouseleave.bs.carousel",(function(e){return t.cycle(e)}))),this._config.touch&&this._touchSupported&&this._addTouchEventListeners()},r._addTouchEventListeners=function(){var t=this,e=function(e){t._pointerEvent&&G[e.pointerType.toUpperCase()]?t.touchStartX=e.clientX:t._pointerEvent||(t.touchStartX=e.touches[0].clientX)},n=function(e){t._pointerEvent&&G[e.pointerType.toUpperCase()]&&(t.touchDeltaX=e.clientX-t.touchStartX),t._handleSwipe(),"hover"===t._config.pause&&(t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout((function(e){return t.cycle(e)}),500+t._config.interval))};q.find(".carousel-item img",this._element).forEach((function(t){H.on(t,"dragstart.bs.carousel",(function(t){return t.preventDefault()}))})),this._pointerEvent?(H.on(this._element,"pointerdown.bs.carousel",(function(t){return e(t)})),H.on(this._element,"pointerup.bs.carousel",(function(t){return n(t)})),this._element.classList.add("pointer-event")):(H.on(this._element,"touchstart.bs.carousel",(function(t){return e(t)})),H.on(this._element,"touchmove.bs.carousel",(function(e){return function(e){e.touches&&e.touches.length>1?t.touchDeltaX=0:t.touchDeltaX=e.touches[0].clientX-t.touchStartX}(e)})),H.on(this._element,"touchend.bs.carousel",(function(t){return n(t)})))},r._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.key){case"ArrowLeft":t.preventDefault(),this.prev();break;case"ArrowRight":t.preventDefault(),this.next()}},r._getItemIndex=function(t){return this._items=t&&t.parentNode?q.find(".carousel-item",t.parentNode):[],this._items.indexOf(t)},r._getItemByDirection=function(t,e){var n="next"===t,i="prev"===t,o=this._getItemIndex(e),r=this._items.length-1;if((i&&0===o||n&&o===r)&&!this._config.wrap)return e;var s=(o+("prev"===t?-1:1))%this._items.length;return-1===s?this._items[this._items.length-1]:this._items[s]},r._triggerSlideEvent=function(t,e){var n=this._getItemIndex(t),i=this._getItemIndex(q.findOne(".active.carousel-item",this._element));return H.trigger(this._element,"slide.bs.carousel",{relatedTarget:t,direction:e,from:i,to:n})},r._setActiveIndicatorElement=function(t){if(this._indicatorsElement){for(var e=q.find(".active",this._indicatorsElement),n=0;n<e.length;n++)e[n].classList.remove("active");var i=this._indicatorsElement.children[this._getItemIndex(t)];i&&i.classList.add("active")}},r._updateInterval=function(){var t=this._activeElement||q.findOne(".active.carousel-item",this._element);if(t){var e=Number.parseInt(t.getAttribute("data-bs-interval"),10);e?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=e):this._config.interval=this._config.defaultInterval||this._config.interval}},r._slide=function(t,e){var n,i,o,r=this,s=q.findOne(".active.carousel-item",this._element),a=this._getItemIndex(s),l=e||s&&this._getItemByDirection(t,s),c=this._getItemIndex(l),f=Boolean(this._interval);if("next"===t?(n="carousel-item-start",i="carousel-item-next",o="left"):(n="carousel-item-end",i="carousel-item-prev",o="right"),l&&l.classList.contains("active"))this._isSliding=!1;else if(!this._triggerSlideEvent(l,o).defaultPrevented&&s&&l){if(this._isSliding=!0,f&&this.pause(),this._setActiveIndicatorElement(l),this._activeElement=l,this._element.classList.contains("slide")){l.classList.add(i),v(l),s.classList.add(n),l.classList.add(n);var d=u(s);H.one(s,"transitionend",(function(){l.classList.remove(n,i),l.classList.add("active"),s.classList.remove("active",i,n),r._isSliding=!1,setTimeout((function(){H.trigger(r._element,"slid.bs.carousel",{relatedTarget:l,direction:o,from:a,to:c})}),0)})),h(s,d)}else s.classList.remove("active"),l.classList.add("active"),this._isSliding=!1,H.trigger(this._element,"slid.bs.carousel",{relatedTarget:l,direction:o,from:a,to:c});f&&this.cycle()}},o.carouselInterface=function(t,e){var i=T(t,"bs.carousel"),r=n({},X,Y.getDataAttributes(t));"object"==typeof e&&(r=n({},r,e));var s="string"==typeof e?e:r.slide;if(i||(i=new o(t,r)),"number"==typeof e)i.to(e);else if("string"==typeof s){if(void 0===i[s])throw new TypeError('No method named "'+s+'"');i[s]()}else r.interval&&r.ride&&(i.pause(),i.cycle())},o.jQueryInterface=function(t){return this.each((function(){o.carouselInterface(this,t)}))},o.dataApiClickHandler=function(t){var e=c(this);if(e&&e.classList.contains("carousel")){var i=n({},Y.getDataAttributes(e),Y.getDataAttributes(this)),r=this.getAttribute("data-bs-slide-to");r&&(i.interval=!1),o.carouselInterface(e,i),r&&T(e,"bs.carousel").to(r),t.preventDefault()}},e(o,null,[{key:"Default",get:function(){return X}},{key:"DATA_KEY",get:function(){return"bs.carousel"}}]),o}(R);H.on(document,"click.bs.carousel.data-api","[data-bs-slide], [data-bs-slide-to]",Z.dataApiClickHandler),H.on(window,"load.bs.carousel.data-api",(function(){for(var t=q.find('[data-bs-ride="carousel"]'),e=0,n=t.length;e<n;e++)Z.carouselInterface(t[e],T(t[e],"bs.carousel"))})),b((function(){var t=_();if(t){var e=t.fn[z];t.fn[z]=Z.jQueryInterface,t.fn[z].Constructor=Z,t.fn[z].noConflict=function(){return t.fn[z]=e,Z.jQueryInterface}}}));var J="collapse",tt={toggle:!0,parent:""},et={toggle:"boolean",parent:"(string|element)"},nt=function(t){function o(e,n){var i;(i=t.call(this,e)||this)._isTransitioning=!1,i._config=i._getConfig(n),i._triggerArray=q.find('[data-bs-toggle="collapse"][href="#'+e.id+'"],[data-bs-toggle="collapse"][data-bs-target="#'+e.id+'"]');for(var o=q.find('[data-bs-toggle="collapse"]'),r=0,s=o.length;r<s;r++){var a=o[r],c=l(a),u=q.find(c).filter((function(t){return t===e}));null!==c&&u.length&&(i._selector=c,i._triggerArray.push(a))}return i._parent=i._config.parent?i._getParent():null,i._config.parent||i._addAriaAndCollapsedClass(i._element,i._triggerArray),i._config.toggle&&i.toggle(),i}i(o,t);var r=o.prototype;return r.toggle=function(){this._element.classList.contains("show")?this.hide():this.show()},r.show=function(){var t=this;if(!this._isTransitioning&&!this._element.classList.contains("show")){var e,n;this._parent&&0===(e=q.find(".show, .collapsing",this._parent).filter((function(e){return"string"==typeof t._config.parent?e.getAttribute("data-bs-parent")===t._config.parent:e.classList.contains("collapse")}))).length&&(e=null);var i=q.findOne(this._selector);if(e){var r=e.find((function(t){return i!==t}));if((n=r?T(r,"bs.collapse"):null)&&n._isTransitioning)return}if(!H.trigger(this._element,"show.bs.collapse").defaultPrevented){e&&e.forEach((function(t){i!==t&&o.collapseInterface(t,"hide"),n||E(t,"bs.collapse",null)}));var s=this._getDimension();this._element.classList.remove("collapse"),this._element.classList.add("collapsing"),this._element.style[s]=0,this._triggerArray.length&&this._triggerArray.forEach((function(t){t.classList.remove("collapsed"),t.setAttribute("aria-expanded",!0)})),this.setTransitioning(!0);var a="scroll"+(s[0].toUpperCase()+s.slice(1)),l=u(this._element);H.one(this._element,"transitionend",(function(){t._element.classList.remove("collapsing"),t._element.classList.add("collapse","show"),t._element.style[s]="",t.setTransitioning(!1),H.trigger(t._element,"shown.bs.collapse")})),h(this._element,l),this._element.style[s]=this._element[a]+"px"}}},r.hide=function(){var t=this;if(!this._isTransitioning&&this._element.classList.contains("show")&&!H.trigger(this._element,"hide.bs.collapse").defaultPrevented){var e=this._getDimension();this._element.style[e]=this._element.getBoundingClientRect()[e]+"px",v(this._element),this._element.classList.add("collapsing"),this._element.classList.remove("collapse","show");var n=this._triggerArray.length;if(n>0)for(var i=0;i<n;i++){var o=this._triggerArray[i],r=c(o);r&&!r.classList.contains("show")&&(o.classList.add("collapsed"),o.setAttribute("aria-expanded",!1))}this.setTransitioning(!0);this._element.style[e]="";var s=u(this._element);H.one(this._element,"transitionend",(function(){t.setTransitioning(!1),t._element.classList.remove("collapsing"),t._element.classList.add("collapse"),H.trigger(t._element,"hidden.bs.collapse")})),h(this._element,s)}},r.setTransitioning=function(t){this._isTransitioning=t},r.dispose=function(){t.prototype.dispose.call(this),this._config=null,this._parent=null,this._triggerArray=null,this._isTransitioning=null},r._getConfig=function(t){return(t=n({},tt,t)).toggle=Boolean(t.toggle),p(J,t,et),t},r._getDimension=function(){return this._element.classList.contains("width")?"width":"height"},r._getParent=function(){var t=this,e=this._config.parent;d(e)?void 0===e.jquery&&void 0===e[0]||(e=e[0]):e=q.findOne(e);var n='[data-bs-toggle="collapse"][data-bs-parent="'+e+'"]';return q.find(n,e).forEach((function(e){var n=c(e);t._addAriaAndCollapsedClass(n,[e])})),e},r._addAriaAndCollapsedClass=function(t,e){if(t&&e.length){var n=t.classList.contains("show");e.forEach((function(t){n?t.classList.remove("collapsed"):t.classList.add("collapsed"),t.setAttribute("aria-expanded",n)}))}},o.collapseInterface=function(t,e){var i=T(t,"bs.collapse"),r=n({},tt,Y.getDataAttributes(t),"object"==typeof e&&e?e:{});if(!i&&r.toggle&&"string"==typeof e&&/show|hide/.test(e)&&(r.toggle=!1),i||(i=new o(t,r)),"string"==typeof e){if(void 0===i[e])throw new TypeError('No method named "'+e+'"');i[e]()}},o.jQueryInterface=function(t){return this.each((function(){o.collapseInterface(this,t)}))},e(o,null,[{key:"Default",get:function(){return tt}},{key:"DATA_KEY",get:function(){return"bs.collapse"}}]),o}(R);H.on(document,"click.bs.collapse.data-api",'[data-bs-toggle="collapse"]',(function(t){"A"===t.target.tagName&&t.preventDefault();var e=Y.getDataAttributes(this),n=l(this);q.find(n).forEach((function(t){var n,i=T(t,"bs.collapse");i?(null===i._parent&&"string"==typeof e.parent&&(i._config.parent=e.parent,i._parent=i._getParent()),n="toggle"):n=e,nt.collapseInterface(t,n)}))})),b((function(){var t=_();if(t){var e=t.fn[J];t.fn[J]=nt.jQueryInterface,t.fn[J].Constructor=nt,t.fn[J].noConflict=function(){return t.fn[J]=e,nt.jQueryInterface}}}));var it="top",ot="bottom",rt="right",st="left",at=[it,ot,rt,st],lt=at.reduce((function(t,e){return t.concat([e+"-start",e+"-end"])}),[]),ct=[].concat(at,["auto"]).reduce((function(t,e){return t.concat([e,e+"-start",e+"-end"])}),[]),ut=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function ft(t){return t?(t.nodeName||"").toLowerCase():null}function dt(t){if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function ht(t){return t instanceof dt(t).Element||t instanceof Element}function pt(t){return t instanceof dt(t).HTMLElement||t instanceof HTMLElement}var gt={name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var n=e.styles[t]||{},i=e.attributes[t]||{},o=e.elements[t];pt(o)&&ft(o)&&(Object.assign(o.style,n),Object.keys(i).forEach((function(t){var e=i[t];!1===e?o.removeAttribute(t):o.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,n={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,n.popper),e.elements.arrow&&Object.assign(e.elements.arrow.style,n.arrow),function(){Object.keys(e.elements).forEach((function(t){var i=e.elements[t],o=e.attributes[t]||{},r=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:n[t]).reduce((function(t,e){return t[e]="",t}),{});pt(i)&&ft(i)&&(Object.assign(i.style,r),Object.keys(o).forEach((function(t){i.removeAttribute(t)})))}))}},requires:["computeStyles"]};function mt(t){return t.split("-")[0]}function vt(t){return{x:t.offsetLeft,y:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight}}function _t(t,e){var n,i=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(i&&((n=i)instanceof dt(n).ShadowRoot||n instanceof ShadowRoot)){var o=e;do{if(o&&t.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function bt(t){return dt(t).getComputedStyle(t)}function yt(t){return["table","td","th"].indexOf(ft(t))>=0}function wt(t){return((ht(t)?t.ownerDocument:t.document)||window.document).documentElement}function Et(t){return"html"===ft(t)?t:t.assignedSlot||t.parentNode||t.host||wt(t)}function Tt(t){if(!pt(t)||"fixed"===bt(t).position)return null;var e=t.offsetParent;if(e){var n=wt(e);if("body"===ft(e)&&"static"===bt(e).position&&"static"!==bt(n).position)return n}return e}function kt(t){for(var e=dt(t),n=Tt(t);n&&yt(n)&&"static"===bt(n).position;)n=Tt(n);return n&&"body"===ft(n)&&"static"===bt(n).position?e:n||function(t){for(var e=Et(t);pt(e)&&["html","body"].indexOf(ft(e))<0;){var n=bt(e);if("none"!==n.transform||"none"!==n.perspective||n.willChange&&"auto"!==n.willChange)return e;e=e.parentNode}return null}(t)||e}function Ot(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function Lt(t,e,n){return Math.max(t,Math.min(e,n))}function At(t){return Object.assign(Object.assign({},{top:0,right:0,bottom:0,left:0}),t)}function Ct(t,e){return e.reduce((function(e,n){return e[n]=t,e}),{})}var Dt={name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,n=t.state,i=t.name,o=n.elements.arrow,r=n.modifiersData.popperOffsets,s=mt(n.placement),a=Ot(s),l=[st,rt].indexOf(s)>=0?"height":"width";if(o&&r){var c=n.modifiersData[i+"#persistent"].padding,u=vt(o),f="y"===a?it:st,d="y"===a?ot:rt,h=n.rects.reference[l]+n.rects.reference[a]-r[a]-n.rects.popper[l],p=r[a]-n.rects.reference[a],g=kt(o),m=g?"y"===a?g.clientHeight||0:g.clientWidth||0:0,v=h/2-p/2,_=c[f],b=m-u[l]-c[d],y=m/2-u[l]/2+v,w=Lt(_,y,b),E=a;n.modifiersData[i]=((e={})[E]=w,e.centerOffset=w-y,e)}},effect:function(t){var e=t.state,n=t.options,i=t.name,o=n.element,r=void 0===o?"[data-popper-arrow]":o,s=n.padding,a=void 0===s?0:s;null!=r&&("string"!=typeof r||(r=e.elements.popper.querySelector(r)))&&_t(e.elements.popper,r)&&(e.elements.arrow=r,e.modifiersData[i+"#persistent"]={padding:At("number"!=typeof a?a:Ct(a,at))})},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},xt={top:"auto",right:"auto",bottom:"auto",left:"auto"};function St(t){var e,n=t.popper,i=t.popperRect,o=t.placement,r=t.offsets,s=t.position,a=t.gpuAcceleration,l=t.adaptive,c=function(t){var e=t.x,n=t.y,i=window.devicePixelRatio||1;return{x:Math.round(e*i)/i||0,y:Math.round(n*i)/i||0}}(r),u=c.x,f=c.y,d=r.hasOwnProperty("x"),h=r.hasOwnProperty("y"),p=st,g=it,m=window;if(l){var v=kt(n);v===dt(n)&&(v=wt(n)),o===it&&(g=ot,f-=v.clientHeight-i.height,f*=a?1:-1),o===st&&(p=rt,u-=v.clientWidth-i.width,u*=a?1:-1)}var _,b=Object.assign({position:s},l&&xt);return a?Object.assign(Object.assign({},b),{},((_={})[g]=h?"0":"",_[p]=d?"0":"",_.transform=(m.devicePixelRatio||1)<2?"translate("+u+"px, "+f+"px)":"translate3d("+u+"px, "+f+"px, 0)",_)):Object.assign(Object.assign({},b),{},((e={})[g]=h?f+"px":"",e[p]=d?u+"px":"",e.transform="",e))}var jt={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,n=t.options,i=n.gpuAcceleration,o=void 0===i||i,r=n.adaptive,s=void 0===r||r,a={placement:mt(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:o};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign(Object.assign({},e.styles.popper),St(Object.assign(Object.assign({},a),{},{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:s})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign(Object.assign({},e.styles.arrow),St(Object.assign(Object.assign({},a),{},{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1})))),e.attributes.popper=Object.assign(Object.assign({},e.attributes.popper),{},{"data-popper-placement":e.placement})},data:{}},Nt={passive:!0};var It={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,n=t.instance,i=t.options,o=i.scroll,r=void 0===o||o,s=i.resize,a=void 0===s||s,l=dt(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return r&&c.forEach((function(t){t.addEventListener("scroll",n.update,Nt)})),a&&l.addEventListener("resize",n.update,Nt),function(){r&&c.forEach((function(t){t.removeEventListener("scroll",n.update,Nt)})),a&&l.removeEventListener("resize",n.update,Nt)}},data:{}},Pt={left:"right",right:"left",bottom:"top",top:"bottom"};function Mt(t){return t.replace(/left|right|bottom|top/g,(function(t){return Pt[t]}))}var Bt={start:"end",end:"start"};function Ht(t){return t.replace(/start|end/g,(function(t){return Bt[t]}))}function Rt(t){var e=t.getBoundingClientRect();return{width:e.width,height:e.height,top:e.top,right:e.right,bottom:e.bottom,left:e.left,x:e.left,y:e.top}}function Wt(t){var e=dt(t);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function Kt(t){return Rt(wt(t)).left+Wt(t).scrollLeft}function Qt(t){var e=bt(t),n=e.overflow,i=e.overflowX,o=e.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+i)}function Ut(t,e){void 0===e&&(e=[]);var n=function t(e){return["html","body","#document"].indexOf(ft(e))>=0?e.ownerDocument.body:pt(e)&&Qt(e)?e:t(Et(e))}(t),i="body"===ft(n),o=dt(n),r=i?[o].concat(o.visualViewport||[],Qt(n)?n:[]):n,s=e.concat(r);return i?s:s.concat(Ut(Et(r)))}function Ft(t){return Object.assign(Object.assign({},t),{},{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Yt(t,e){return"viewport"===e?Ft(function(t){var e=dt(t),n=wt(t),i=e.visualViewport,o=n.clientWidth,r=n.clientHeight,s=0,a=0;return i&&(o=i.width,r=i.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=i.offsetLeft,a=i.offsetTop)),{width:o,height:r,x:s+Kt(t),y:a}}(t)):pt(e)?function(t){var e=Rt(t);return e.top=e.top+t.clientTop,e.left=e.left+t.clientLeft,e.bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,e.width=t.clientWidth,e.height=t.clientHeight,e.x=e.left,e.y=e.top,e}(e):Ft(function(t){var e=wt(t),n=Wt(t),i=t.ownerDocument.body,o=Math.max(e.scrollWidth,e.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),r=Math.max(e.scrollHeight,e.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),s=-n.scrollLeft+Kt(t),a=-n.scrollTop;return"rtl"===bt(i||e).direction&&(s+=Math.max(e.clientWidth,i?i.clientWidth:0)-o),{width:o,height:r,x:s,y:a}}(wt(t)))}function qt(t,e,n){var i="clippingParents"===e?function(t){var e=Ut(Et(t)),n=["absolute","fixed"].indexOf(bt(t).position)>=0&&pt(t)?kt(t):t;return ht(n)?e.filter((function(t){return ht(t)&&_t(t,n)&&"body"!==ft(t)})):[]}(t):[].concat(e),o=[].concat(i,[n]),r=o[0],s=o.reduce((function(e,n){var i=Yt(t,n);return e.top=Math.max(i.top,e.top),e.right=Math.min(i.right,e.right),e.bottom=Math.min(i.bottom,e.bottom),e.left=Math.max(i.left,e.left),e}),Yt(t,r));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function zt(t){return t.split("-")[1]}function Vt(t){var e,n=t.reference,i=t.element,o=t.placement,r=o?mt(o):null,s=o?zt(o):null,a=n.x+n.width/2-i.width/2,l=n.y+n.height/2-i.height/2;switch(r){case it:e={x:a,y:n.y-i.height};break;case ot:e={x:a,y:n.y+n.height};break;case rt:e={x:n.x+n.width,y:l};break;case st:e={x:n.x-i.width,y:l};break;default:e={x:n.x,y:n.y}}var c=r?Ot(r):null;if(null!=c){var u="y"===c?"height":"width";switch(s){case"start":e[c]=Math.floor(e[c])-Math.floor(n[u]/2-i[u]/2);break;case"end":e[c]=Math.floor(e[c])+Math.ceil(n[u]/2-i[u]/2)}}return e}function Xt(t,e){void 0===e&&(e={});var n=e,i=n.placement,o=void 0===i?t.placement:i,r=n.boundary,s=void 0===r?"clippingParents":r,a=n.rootBoundary,l=void 0===a?"viewport":a,c=n.elementContext,u=void 0===c?"popper":c,f=n.altBoundary,d=void 0!==f&&f,h=n.padding,p=void 0===h?0:h,g=At("number"!=typeof p?p:Ct(p,at)),m="popper"===u?"reference":"popper",v=t.elements.reference,_=t.rects.popper,b=t.elements[d?m:u],y=qt(ht(b)?b:b.contextElement||wt(t.elements.popper),s,l),w=Rt(v),E=Vt({reference:w,element:_,strategy:"absolute",placement:o}),T=Ft(Object.assign(Object.assign({},_),E)),k="popper"===u?T:w,O={top:y.top-k.top+g.top,bottom:k.bottom-y.bottom+g.bottom,left:y.left-k.left+g.left,right:k.right-y.right+g.right},L=t.modifiersData.offset;if("popper"===u&&L){var A=L[o];Object.keys(O).forEach((function(t){var e=[rt,ot].indexOf(t)>=0?1:-1,n=[it,ot].indexOf(t)>=0?"y":"x";O[t]+=A[n]*e}))}return O}function $t(t,e){void 0===e&&(e={});var n=e,i=n.placement,o=n.boundary,r=n.rootBoundary,s=n.padding,a=n.flipVariations,l=n.allowedAutoPlacements,c=void 0===l?ct:l,u=zt(i),f=u?a?lt:lt.filter((function(t){return zt(t)===u})):at,d=f.filter((function(t){return c.indexOf(t)>=0}));0===d.length&&(d=f);var h=d.reduce((function(e,n){return e[n]=Xt(t,{placement:n,boundary:o,rootBoundary:r,padding:s})[mt(n)],e}),{});return Object.keys(h).sort((function(t,e){return h[t]-h[e]}))}var Gt={name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,n=t.options,i=t.name;if(!e.modifiersData[i]._skip){for(var o=n.mainAxis,r=void 0===o||o,s=n.altAxis,a=void 0===s||s,l=n.fallbackPlacements,c=n.padding,u=n.boundary,f=n.rootBoundary,d=n.altBoundary,h=n.flipVariations,p=void 0===h||h,g=n.allowedAutoPlacements,m=e.options.placement,v=mt(m),_=l||(v===m||!p?[Mt(m)]:function(t){if("auto"===mt(t))return[];var e=Mt(t);return[Ht(t),e,Ht(e)]}(m)),b=[m].concat(_).reduce((function(t,n){return t.concat("auto"===mt(n)?$t(e,{placement:n,boundary:u,rootBoundary:f,padding:c,flipVariations:p,allowedAutoPlacements:g}):n)}),[]),y=e.rects.reference,w=e.rects.popper,E=new Map,T=!0,k=b[0],O=0;O<b.length;O++){var L=b[O],A=mt(L),C="start"===zt(L),D=[it,ot].indexOf(A)>=0,x=D?"width":"height",S=Xt(e,{placement:L,boundary:u,rootBoundary:f,altBoundary:d,padding:c}),j=D?C?rt:st:C?ot:it;y[x]>w[x]&&(j=Mt(j));var N=Mt(j),I=[];if(r&&I.push(S[A]<=0),a&&I.push(S[j]<=0,S[N]<=0),I.every((function(t){return t}))){k=L,T=!1;break}E.set(L,I)}if(T)for(var P=function(t){var e=b.find((function(e){var n=E.get(e);if(n)return n.slice(0,t).every((function(t){return t}))}));if(e)return k=e,"break"},M=p?3:1;M>0;M--){if("break"===P(M))break}e.placement!==k&&(e.modifiersData[i]._skip=!0,e.placement=k,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function Zt(t,e,n){return void 0===n&&(n={x:0,y:0}),{top:t.top-e.height-n.y,right:t.right-e.width+n.x,bottom:t.bottom-e.height+n.y,left:t.left-e.width-n.x}}function Jt(t){return[it,rt,ot,st].some((function(e){return t[e]>=0}))}var te={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,n=t.name,i=e.rects.reference,o=e.rects.popper,r=e.modifiersData.preventOverflow,s=Xt(e,{elementContext:"reference"}),a=Xt(e,{altBoundary:!0}),l=Zt(s,i),c=Zt(a,o,r),u=Jt(l),f=Jt(c);e.modifiersData[n]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:u,hasPopperEscaped:f},e.attributes.popper=Object.assign(Object.assign({},e.attributes.popper),{},{"data-popper-reference-hidden":u,"data-popper-escaped":f})}};var ee={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,n=t.options,i=t.name,o=n.offset,r=void 0===o?[0,0]:o,s=ct.reduce((function(t,n){return t[n]=function(t,e,n){var i=mt(t),o=[st,it].indexOf(i)>=0?-1:1,r="function"==typeof n?n(Object.assign(Object.assign({},e),{},{placement:t})):n,s=r[0],a=r[1];return s=s||0,a=(a||0)*o,[st,rt].indexOf(i)>=0?{x:a,y:s}:{x:s,y:a}}(n,e.rects,r),t}),{}),a=s[e.placement],l=a.x,c=a.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=c),e.modifiersData[i]=s}};var ne={name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,n=t.name;e.modifiersData[n]=Vt({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}};var ie={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,n=t.options,i=t.name,o=n.mainAxis,r=void 0===o||o,s=n.altAxis,a=void 0!==s&&s,l=n.boundary,c=n.rootBoundary,u=n.altBoundary,f=n.padding,d=n.tether,h=void 0===d||d,p=n.tetherOffset,g=void 0===p?0:p,m=Xt(e,{boundary:l,rootBoundary:c,padding:f,altBoundary:u}),v=mt(e.placement),_=zt(e.placement),b=!_,y=Ot(v),w="x"===y?"y":"x",E=e.modifiersData.popperOffsets,T=e.rects.reference,k=e.rects.popper,O="function"==typeof g?g(Object.assign(Object.assign({},e.rects),{},{placement:e.placement})):g,L={x:0,y:0};if(E){if(r){var A="y"===y?it:st,C="y"===y?ot:rt,D="y"===y?"height":"width",x=E[y],S=E[y]+m[A],j=E[y]-m[C],N=h?-k[D]/2:0,I="start"===_?T[D]:k[D],P="start"===_?-k[D]:-T[D],M=e.elements.arrow,B=h&&M?vt(M):{width:0,height:0},H=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},R=H[A],W=H[C],K=Lt(0,T[D],B[D]),Q=b?T[D]/2-N-K-R-O:I-K-R-O,U=b?-T[D]/2+N+K+W+O:P+K+W+O,F=e.elements.arrow&&kt(e.elements.arrow),Y=F?"y"===y?F.clientTop||0:F.clientLeft||0:0,q=e.modifiersData.offset?e.modifiersData.offset[e.placement][y]:0,z=E[y]+Q-q-Y,V=E[y]+U-q,X=Lt(h?Math.min(S,z):S,x,h?Math.max(j,V):j);E[y]=X,L[y]=X-x}if(a){var $="x"===y?it:st,G="x"===y?ot:rt,Z=E[w],J=Lt(Z+m[$],Z,Z-m[G]);E[w]=J,L[w]=J-Z}e.modifiersData[i]=L}},requiresIfExists:["offset"]};function oe(t,e,n){void 0===n&&(n=!1);var i,o,r=wt(e),s=Rt(t),a=pt(e),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(a||!a&&!n)&&(("body"!==ft(e)||Qt(r))&&(l=(i=e)!==dt(i)&&pt(i)?{scrollLeft:(o=i).scrollLeft,scrollTop:o.scrollTop}:Wt(i)),pt(e)?((c=Rt(e)).x+=e.clientLeft,c.y+=e.clientTop):r&&(c.x=Kt(r))),{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function re(t){var e=new Map,n=new Set,i=[];return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){n.has(t.name)||function t(o){n.add(o.name),[].concat(o.requires||[],o.requiresIfExists||[]).forEach((function(i){if(!n.has(i)){var o=e.get(i);o&&t(o)}})),i.push(o)}(t)})),i}var se={placement:"bottom",modifiers:[],strategy:"absolute"};function ae(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function le(t){void 0===t&&(t={});var e=t,n=e.defaultModifiers,i=void 0===n?[]:n,o=e.defaultOptions,r=void 0===o?se:o;return function(t,e,n){void 0===n&&(n=r);var o,s,a={placement:"bottom",orderedModifiers:[],options:Object.assign(Object.assign({},se),r),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},l=[],c=!1,u={state:a,setOptions:function(n){f(),a.options=Object.assign(Object.assign(Object.assign({},r),a.options),n),a.scrollParents={reference:ht(t)?Ut(t):t.contextElement?Ut(t.contextElement):[],popper:Ut(e)};var o,s,c=function(t){var e=re(t);return ut.reduce((function(t,n){return t.concat(e.filter((function(t){return t.phase===n})))}),[])}((o=[].concat(i,a.options.modifiers),s=o.reduce((function(t,e){var n=t[e.name];return t[e.name]=n?Object.assign(Object.assign(Object.assign({},n),e),{},{options:Object.assign(Object.assign({},n.options),e.options),data:Object.assign(Object.assign({},n.data),e.data)}):e,t}),{}),Object.keys(s).map((function(t){return s[t]}))));return a.orderedModifiers=c.filter((function(t){return t.enabled})),a.orderedModifiers.forEach((function(t){var e=t.name,n=t.options,i=void 0===n?{}:n,o=t.effect;if("function"==typeof o){var r=o({state:a,name:e,instance:u,options:i}),s=function(){};l.push(r||s)}})),u.update()},forceUpdate:function(){if(!c){var t=a.elements,e=t.reference,n=t.popper;if(ae(e,n)){a.rects={reference:oe(e,kt(n),"fixed"===a.options.strategy),popper:vt(n)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(t){return a.modifiersData[t.name]=Object.assign({},t.data)}));for(var i=0;i<a.orderedModifiers.length;i++)if(!0!==a.reset){var o=a.orderedModifiers[i],r=o.fn,s=o.options,l=void 0===s?{}:s,f=o.name;"function"==typeof r&&(a=r({state:a,options:l,name:f,instance:u})||a)}else a.reset=!1,i=-1}}},update:(o=function(){return new Promise((function(t){u.forceUpdate(),t(a)}))},function(){return s||(s=new Promise((function(t){Promise.resolve().then((function(){s=void 0,t(o())}))}))),s}),destroy:function(){f(),c=!0}};if(!ae(t,e))return u;function f(){l.forEach((function(t){return t()})),l=[]}return u.setOptions(n).then((function(t){!c&&n.onFirstUpdate&&n.onFirstUpdate(t)})),u}}var ce=le(),ue=le({defaultModifiers:[It,ne,jt,gt]}),fe=le({defaultModifiers:[It,ne,jt,gt,ee,Gt,ie,Dt,te]}),de=Object.freeze({__proto__:null,popperGenerator:le,detectOverflow:Xt,createPopperBase:ce,createPopper:fe,createPopperLite:ue,top:it,bottom:ot,right:rt,left:st,auto:"auto",basePlacements:at,start:"start",end:"end",clippingParents:"clippingParents",viewport:"viewport",popper:"popper",reference:"reference",variationPlacements:lt,placements:ct,beforeRead:"beforeRead",read:"read",afterRead:"afterRead",beforeMain:"beforeMain",main:"main",afterMain:"afterMain",beforeWrite:"beforeWrite",write:"write",afterWrite:"afterWrite",modifierPhases:ut,applyStyles:gt,arrow:Dt,computeStyles:jt,eventListeners:It,flip:Gt,hide:te,offset:ee,popperOffsets:ne,preventOverflow:ie}),he="dropdown",pe=new RegExp("ArrowUp|ArrowDown|Escape"),ge=y?"top-end":"top-start",me=y?"top-start":"top-end",ve=y?"bottom-end":"bottom-start",_e=y?"bottom-start":"bottom-end",be=y?"left-start":"right-start",ye=y?"right-start":"left-start",we={offset:0,flip:!0,boundary:"clippingParents",reference:"toggle",display:"dynamic",popperConfig:null},Ee={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string",popperConfig:"(null|object)"},Te=function(t){function o(e,n){var i;return(i=t.call(this,e)||this)._popper=null,i._config=i._getConfig(n),i._menu=i._getMenuElement(),i._inNavbar=i._detectNavbar(),i._addEventListeners(),i}i(o,t);var r=o.prototype;return r.toggle=function(){if(!this._element.disabled&&!this._element.classList.contains("disabled")){var t=this._element.classList.contains("show");o.clearMenus(),t||this.show()}},r.show=function(){if(!(this._element.disabled||this._element.classList.contains("disabled")||this._menu.classList.contains("show"))){var t=o.getParentFromElement(this._element),e={relatedTarget:this._element};if(!H.trigger(this._element,"show.bs.dropdown",e).defaultPrevented){if(!this._inNavbar){if(void 0===de)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");var n=this._element;"parent"===this._config.reference?n=t:d(this._config.reference)&&(n=this._config.reference,void 0!==this._config.reference.jquery&&(n=this._config.reference[0])),this._popper=fe(n,this._menu,this._getPopperConfig())}var i;if("ontouchstart"in document.documentElement&&!t.closest(".navbar-nav"))(i=[]).concat.apply(i,document.body.children).forEach((function(t){return H.on(t,"mouseover",null,(function(){}))}));this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.toggle("show"),this._element.classList.toggle("show"),H.trigger(t,"shown.bs.dropdown",e)}}},r.hide=function(){if(!this._element.disabled&&!this._element.classList.contains("disabled")&&this._menu.classList.contains("show")){var t=o.getParentFromElement(this._element),e={relatedTarget:this._element};H.trigger(t,"hide.bs.dropdown",e).defaultPrevented||(this._popper&&this._popper.destroy(),this._menu.classList.toggle("show"),this._element.classList.toggle("show"),H.trigger(t,"hidden.bs.dropdown",e))}},r.dispose=function(){t.prototype.dispose.call(this),H.off(this._element,".bs.dropdown"),this._menu=null,this._popper&&(this._popper.destroy(),this._popper=null)},r.update=function(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()},r._addEventListeners=function(){var t=this;H.on(this._element,"click.bs.dropdown",(function(e){e.preventDefault(),e.stopPropagation(),t.toggle()}))},r._getConfig=function(t){return t=n({},this.constructor.Default,Y.getDataAttributes(this._element),t),p(he,t,this.constructor.DefaultType),t},r._getMenuElement=function(){return q.next(this._element,".dropdown-menu")[0]},r._getPlacement=function(){var t=this._element.parentNode;if(t.classList.contains("dropend"))return be;if(t.classList.contains("dropstart"))return ye;var e="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return t.classList.contains("dropup")?e?me:ge:e?_e:ve},r._detectNavbar=function(){return null!==this._element.closest(".navbar")},r._getPopperConfig=function(){var t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{altBoundary:this._config.flip,rootBoundary:this._config.boundary}}]};return"static"===this._config.display&&(t.modifiers=[{name:"applyStyles",enabled:!1}]),n({},t,this._config.popperConfig)},o.dropdownInterface=function(t,e){var n=T(t,"bs.dropdown");if(n||(n=new o(t,"object"==typeof e?e:null)),"string"==typeof e){if(void 0===n[e])throw new TypeError('No method named "'+e+'"');n[e]()}},o.jQueryInterface=function(t){return this.each((function(){o.dropdownInterface(this,t)}))},o.clearMenus=function(t){if(!t||2!==t.button&&("keyup"!==t.type||"Tab"===t.key))for(var e=q.find('[data-bs-toggle="dropdown"]'),n=0,i=e.length;n<i;n++){var r=o.getParentFromElement(e[n]),s=T(e[n],"bs.dropdown"),a={relatedTarget:e[n]};if(t&&"click"===t.type&&(a.clickEvent=t),s){var l=s._menu;if(e[n].classList.contains("show"))if(!(t&&("click"===t.type&&/input|textarea/i.test(t.target.tagName)||"keyup"===t.type&&"Tab"===t.key)&&l.contains(t.target)))if(!H.trigger(r,"hide.bs.dropdown",a).defaultPrevented){var c;if("ontouchstart"in document.documentElement)(c=[]).concat.apply(c,document.body.children).forEach((function(t){return H.off(t,"mouseover",null,(function(){}))}));e[n].setAttribute("aria-expanded","false"),s._popper&&s._popper.destroy(),l.classList.remove("show"),e[n].classList.remove("show"),H.trigger(r,"hidden.bs.dropdown",a)}}}},o.getParentFromElement=function(t){return c(t)||t.parentNode},o.dataApiKeydownHandler=function(t){if(!(/input|textarea/i.test(t.target.tagName)?"Space"===t.key||"Escape"!==t.key&&("ArrowDown"!==t.key&&"ArrowUp"!==t.key||t.target.closest(".dropdown-menu")):!pe.test(t.key))&&(t.preventDefault(),t.stopPropagation(),!this.disabled&&!this.classList.contains("disabled"))){var e=o.getParentFromElement(this),n=this.classList.contains("show");if("Escape"===t.key)return(this.matches('[data-bs-toggle="dropdown"]')?this:q.prev(this,'[data-bs-toggle="dropdown"]')[0]).focus(),void o.clearMenus();if(n&&"Space"!==t.key){var i=q.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",e).filter(g);if(i.length){var r=i.indexOf(t.target);"ArrowUp"===t.key&&r>0&&r--,"ArrowDown"===t.key&&r<i.length-1&&r++,i[r=-1===r?0:r].focus()}}else o.clearMenus()}},e(o,null,[{key:"Default",get:function(){return we}},{key:"DefaultType",get:function(){return Ee}},{key:"DATA_KEY",get:function(){return"bs.dropdown"}}]),o}(R);H.on(document,"keydown.bs.dropdown.data-api",'[data-bs-toggle="dropdown"]',Te.dataApiKeydownHandler),H.on(document,"keydown.bs.dropdown.data-api",".dropdown-menu",Te.dataApiKeydownHandler),H.on(document,"click.bs.dropdown.data-api",Te.clearMenus),H.on(document,"keyup.bs.dropdown.data-api",Te.clearMenus),H.on(document,"click.bs.dropdown.data-api",'[data-bs-toggle="dropdown"]',(function(t){t.preventDefault(),t.stopPropagation(),Te.dropdownInterface(this,"toggle")})),H.on(document,"click.bs.dropdown.data-api",".dropdown form",(function(t){return t.stopPropagation()})),b((function(){var t=_();if(t){var e=t.fn[he];t.fn[he]=Te.jQueryInterface,t.fn[he].Constructor=Te,t.fn[he].noConflict=function(){return t.fn[he]=e,Te.jQueryInterface}}}));var ke={backdrop:!0,keyboard:!0,focus:!0},Oe={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean"},Le=function(t){function o(e,n){var i;return(i=t.call(this,e)||this)._config=i._getConfig(n),i._dialog=q.findOne(".modal-dialog",e),i._backdrop=null,i._isShown=!1,i._isBodyOverflowing=!1,i._ignoreBackdropClick=!1,i._isTransitioning=!1,i._scrollbarWidth=0,i}i(o,t);var r=o.prototype;return r.toggle=function(t){return this._isShown?this.hide():this.show(t)},r.show=function(t){var e=this;if(!this._isShown&&!this._isTransitioning){this._element.classList.contains("fade")&&(this._isTransitioning=!0);var n=H.trigger(this._element,"show.bs.modal",{relatedTarget:t});this._isShown||n.defaultPrevented||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),H.on(this._element,"click.dismiss.bs.modal",'[data-bs-dismiss="modal"]',(function(t){return e.hide(t)})),H.on(this._dialog,"mousedown.dismiss.bs.modal",(function(){H.one(e._element,"mouseup.dismiss.bs.modal",(function(t){t.target===e._element&&(e._ignoreBackdropClick=!0)}))})),this._showBackdrop((function(){return e._showElement(t)})))}},r.hide=function(t){var e=this;if((t&&t.preventDefault(),this._isShown&&!this._isTransitioning)&&!H.trigger(this._element,"hide.bs.modal").defaultPrevented){this._isShown=!1;var n=this._element.classList.contains("fade");if(n&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),H.off(document,"focusin.bs.modal"),this._element.classList.remove("show"),H.off(this._element,"click.dismiss.bs.modal"),H.off(this._dialog,"mousedown.dismiss.bs.modal"),n){var i=u(this._element);H.one(this._element,"transitionend",(function(t){return e._hideModal(t)})),h(this._element,i)}else this._hideModal()}},r.dispose=function(){[window,this._element,this._dialog].forEach((function(t){return H.off(t,".bs.modal")})),t.prototype.dispose.call(this),H.off(document,"focusin.bs.modal"),this._config=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},r.handleUpdate=function(){this._adjustDialog()},r._getConfig=function(t){return t=n({},ke,t),p("modal",t,Oe),t},r._showElement=function(t){var e=this,n=this._element.classList.contains("fade"),i=q.findOne(".modal-body",this._dialog);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0,i&&(i.scrollTop=0),n&&v(this._element),this._element.classList.add("show"),this._config.focus&&this._enforceFocus();var o=function(){e._config.focus&&e._element.focus(),e._isTransitioning=!1,H.trigger(e._element,"shown.bs.modal",{relatedTarget:t})};if(n){var r=u(this._dialog);H.one(this._dialog,"transitionend",o),h(this._dialog,r)}else o()},r._enforceFocus=function(){var t=this;H.off(document,"focusin.bs.modal"),H.on(document,"focusin.bs.modal",(function(e){document===e.target||t._element===e.target||t._element.contains(e.target)||t._element.focus()}))},r._setEscapeEvent=function(){var t=this;this._isShown?H.on(this._element,"keydown.dismiss.bs.modal",(function(e){t._config.keyboard&&"Escape"===e.key?(e.preventDefault(),t.hide()):t._config.keyboard||"Escape"!==e.key||t._triggerBackdropTransition()})):H.off(this._element,"keydown.dismiss.bs.modal")},r._setResizeEvent=function(){var t=this;this._isShown?H.on(window,"resize.bs.modal",(function(){return t._adjustDialog()})):H.off(window,"resize.bs.modal")},r._hideModal=function(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._showBackdrop((function(){document.body.classList.remove("modal-open"),t._resetAdjustments(),t._resetScrollbar(),H.trigger(t._element,"hidden.bs.modal")}))},r._removeBackdrop=function(){this._backdrop.parentNode.removeChild(this._backdrop),this._backdrop=null},r._showBackdrop=function(t){var e=this,n=this._element.classList.contains("fade")?"fade":"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className="modal-backdrop",n&&this._backdrop.classList.add(n),document.body.appendChild(this._backdrop),H.on(this._element,"click.dismiss.bs.modal",(function(t){e._ignoreBackdropClick?e._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===e._config.backdrop?e._triggerBackdropTransition():e.hide())})),n&&v(this._backdrop),this._backdrop.classList.add("show"),!n)return void t();var i=u(this._backdrop);H.one(this._backdrop,"transitionend",t),h(this._backdrop,i)}else if(!this._isShown&&this._backdrop){this._backdrop.classList.remove("show");var o=function(){e._removeBackdrop(),t()};if(this._element.classList.contains("fade")){var r=u(this._backdrop);H.one(this._backdrop,"transitionend",o),h(this._backdrop,r)}else o()}else t()},r._triggerBackdropTransition=function(){var t=this;if(!H.trigger(this._element,"hidePrevented.bs.modal").defaultPrevented){var e=this._element.scrollHeight>document.documentElement.clientHeight;e||(this._element.style.overflowY="hidden"),this._element.classList.add("modal-static");var n=u(this._dialog);H.off(this._element,"transitionend"),H.one(this._element,"transitionend",(function(){t._element.classList.remove("modal-static"),e||(H.one(t._element,"transitionend",(function(){t._element.style.overflowY=""})),h(t._element,n))})),h(this._element,n),this._element.focus()}},r._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;(!this._isBodyOverflowing&&t&&!y||this._isBodyOverflowing&&!t&&y)&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),(this._isBodyOverflowing&&!t&&!y||!this._isBodyOverflowing&&t&&y)&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},r._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},r._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=Math.round(t.left+t.right)<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},r._setScrollbar=function(){var t=this;if(this._isBodyOverflowing){q.find(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top").forEach((function(e){var n=e.style.paddingRight,i=window.getComputedStyle(e)["padding-right"];Y.setDataAttribute(e,"padding-right",n),e.style.paddingRight=Number.parseFloat(i)+t._scrollbarWidth+"px"})),q.find(".sticky-top").forEach((function(e){var n=e.style.marginRight,i=window.getComputedStyle(e)["margin-right"];Y.setDataAttribute(e,"margin-right",n),e.style.marginRight=Number.parseFloat(i)-t._scrollbarWidth+"px"}));var e=document.body.style.paddingRight,n=window.getComputedStyle(document.body)["padding-right"];Y.setDataAttribute(document.body,"padding-right",e),document.body.style.paddingRight=Number.parseFloat(n)+this._scrollbarWidth+"px"}document.body.classList.add("modal-open")},r._resetScrollbar=function(){q.find(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top").forEach((function(t){var e=Y.getDataAttribute(t,"padding-right");void 0!==e&&(Y.removeDataAttribute(t,"padding-right"),t.style.paddingRight=e)})),q.find(".sticky-top").forEach((function(t){var e=Y.getDataAttribute(t,"margin-right");void 0!==e&&(Y.removeDataAttribute(t,"margin-right"),t.style.marginRight=e)}));var t=Y.getDataAttribute(document.body,"padding-right");void 0===t?document.body.style.paddingRight="":(Y.removeDataAttribute(document.body,"padding-right"),document.body.style.paddingRight=t)},r._getScrollbarWidth=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},o.jQueryInterface=function(t,e){return this.each((function(){var i=T(this,"bs.modal"),r=n({},ke,Y.getDataAttributes(this),"object"==typeof t&&t?t:{});if(i||(i=new o(this,r)),"string"==typeof t){if(void 0===i[t])throw new TypeError('No method named "'+t+'"');i[t](e)}}))},e(o,null,[{key:"Default",get:function(){return ke}},{key:"DATA_KEY",get:function(){return"bs.modal"}}]),o}(R);H.on(document,"click.bs.modal.data-api",'[data-bs-toggle="modal"]',(function(t){var e=this,i=c(this);"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault(),H.one(i,"show.bs.modal",(function(t){t.defaultPrevented||H.one(i,"hidden.bs.modal",(function(){g(e)&&e.focus()}))}));var o=T(i,"bs.modal");if(!o){var r=n({},Y.getDataAttributes(i),Y.getDataAttributes(this));o=new Le(i,r)}o.show(this)})),b((function(){var t=_();if(t){var e=t.fn.modal;t.fn.modal=Le.jQueryInterface,t.fn.modal.Constructor=Le,t.fn.modal.noConflict=function(){return t.fn.modal=e,Le.jQueryInterface}}}));var Ae=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Ce=/^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,De=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,xe={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]};function Se(t,e,n){var i;if(!t.length)return t;if(n&&"function"==typeof n)return n(t);for(var o=(new window.DOMParser).parseFromString(t,"text/html"),r=Object.keys(e),s=(i=[]).concat.apply(i,o.body.querySelectorAll("*")),a=function(t,n){var i,o=s[t],a=o.nodeName.toLowerCase();if(!r.includes(a))return o.parentNode.removeChild(o),"continue";var l=(i=[]).concat.apply(i,o.attributes),c=[].concat(e["*"]||[],e[a]||[]);l.forEach((function(t){(function(t,e){var n=t.nodeName.toLowerCase();if(e.includes(n))return!Ae.has(n)||Boolean(t.nodeValue.match(Ce)||t.nodeValue.match(De));for(var i=e.filter((function(t){return t instanceof RegExp})),o=0,r=i.length;o<r;o++)if(n.match(i[o]))return!0;return!1})(t,c)||o.removeAttribute(t.nodeName)}))},l=0,c=s.length;l<c;l++)a(l);return o.body.innerHTML}var je="tooltip",Ne=new RegExp("(^|\\s)bs-tooltip\\S+","g"),Ie=new Set(["sanitize","allowList","sanitizeFn"]),Pe={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",container:"(string|element|boolean)",fallbackPlacements:"(null|array)",boundary:"(string|element)",customClass:"(string|function)",sanitize:"boolean",sanitizeFn:"(null|function)",allowList:"object",popperConfig:"(null|object)"},Me={AUTO:"auto",TOP:"top",RIGHT:y?"left":"right",BOTTOM:"bottom",LEFT:y?"right":"left"},Be={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",container:!1,fallbackPlacements:null,boundary:"clippingParents",customClass:"",sanitize:!0,sanitizeFn:null,allowList:xe,popperConfig:null},He={HIDE:"hide.bs.tooltip",HIDDEN:"hidden.bs.tooltip",SHOW:"show.bs.tooltip",SHOWN:"shown.bs.tooltip",INSERTED:"inserted.bs.tooltip",CLICK:"click.bs.tooltip",FOCUSIN:"focusin.bs.tooltip",FOCUSOUT:"focusout.bs.tooltip",MOUSEENTER:"mouseenter.bs.tooltip",MOUSELEAVE:"mouseleave.bs.tooltip"},Re=function(t){function o(e,n){var i;if(void 0===de)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");return(i=t.call(this,e)||this)._isEnabled=!0,i._timeout=0,i._hoverState="",i._activeTrigger={},i._popper=null,i.config=i._getConfig(n),i.tip=null,i._setListeners(),i}i(o,t);var r=o.prototype;return r.enable=function(){this._isEnabled=!0},r.disable=function(){this._isEnabled=!1},r.toggleEnabled=function(){this._isEnabled=!this._isEnabled},r.toggle=function(t){if(this._isEnabled)if(t){var e=this.constructor.DATA_KEY,n=T(t.delegateTarget,e);n||(n=new this.constructor(t.delegateTarget,this._getDelegateConfig()),E(t.delegateTarget,e,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(this.getTipElement().classList.contains("show"))return void this._leave(null,this);this._enter(null,this)}},r.dispose=function(){clearTimeout(this._timeout),H.off(this._element,this.constructor.EVENT_KEY),H.off(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler),this.tip&&this.tip.parentNode.removeChild(this.tip),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,this._popper&&this._popper.destroy(),this._popper=null,this.config=null,this.tip=null,t.prototype.dispose.call(this)},r.show=function(){var t=this;if("none"===this._element.style.display)throw new Error("Please use show on visible elements");if(this.isWithContent()&&this._isEnabled){var e=H.trigger(this._element,this.constructor.Event.SHOW),n=function t(e){if(!document.documentElement.attachShadow)return null;if("function"==typeof e.getRootNode){var n=e.getRootNode();return n instanceof ShadowRoot?n:null}return e instanceof ShadowRoot?e:e.parentNode?t(e.parentNode):null}(this._element),i=null===n?this._element.ownerDocument.documentElement.contains(this._element):n.contains(this._element);if(e.defaultPrevented||!i)return;var o=this.getTipElement(),r=s(this.constructor.NAME);o.setAttribute("id",r),this._element.setAttribute("aria-describedby",r),this.setContent(),this.config.animation&&o.classList.add("fade");var a="function"==typeof this.config.placement?this.config.placement.call(this,o,this._element):this.config.placement,l=this._getAttachment(a);this._addAttachmentClass(l);var c=this._getContainer();E(o,this.constructor.DATA_KEY,this),this._element.ownerDocument.documentElement.contains(this.tip)||c.appendChild(o),H.trigger(this._element,this.constructor.Event.INSERTED),this._popper=fe(this._element,o,this._getPopperConfig(l)),o.classList.add("show");var f,d,p="function"==typeof this.config.customClass?this.config.customClass():this.config.customClass;if(p)(f=o.classList).add.apply(f,p.split(" "));if("ontouchstart"in document.documentElement)(d=[]).concat.apply(d,document.body.children).forEach((function(t){H.on(t,"mouseover",(function(){}))}));var g=function(){var e=t._hoverState;t._hoverState=null,H.trigger(t._element,t.constructor.Event.SHOWN),"out"===e&&t._leave(null,t)};if(this.tip.classList.contains("fade")){var m=u(this.tip);H.one(this.tip,"transitionend",g),h(this.tip,m)}else g()}},r.hide=function(){var t=this;if(this._popper){var e=this.getTipElement(),n=function(){"show"!==t._hoverState&&e.parentNode&&e.parentNode.removeChild(e),t._cleanTipClass(),t._element.removeAttribute("aria-describedby"),H.trigger(t._element,t.constructor.Event.HIDDEN),t._popper&&(t._popper.destroy(),t._popper=null)};if(!H.trigger(this._element,this.constructor.Event.HIDE).defaultPrevented){var i;if(e.classList.remove("show"),"ontouchstart"in document.documentElement)(i=[]).concat.apply(i,document.body.children).forEach((function(t){return H.off(t,"mouseover",m)}));if(this._activeTrigger.click=!1,this._activeTrigger.focus=!1,this._activeTrigger.hover=!1,this.tip.classList.contains("fade")){var o=u(e);H.one(e,"transitionend",n),h(e,o)}else n();this._hoverState=""}}},r.update=function(){null!==this._popper&&this._popper.update()},r.isWithContent=function(){return Boolean(this.getTitle())},r.getTipElement=function(){if(this.tip)return this.tip;var t=document.createElement("div");return t.innerHTML=this.config.template,this.tip=t.children[0],this.tip},r.setContent=function(){var t=this.getTipElement();this.setElementContent(q.findOne(".tooltip-inner",t),this.getTitle()),t.classList.remove("fade","show")},r.setElementContent=function(t,e){if(null!==t)return"object"==typeof e&&d(e)?(e.jquery&&(e=e[0]),void(this.config.html?e.parentNode!==t&&(t.innerHTML="",t.appendChild(e)):t.textContent=e.textContent)):void(this.config.html?(this.config.sanitize&&(e=Se(e,this.config.allowList,this.config.sanitizeFn)),t.innerHTML=e):t.textContent=e)},r.getTitle=function(){var t=this._element.getAttribute("data-bs-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this._element):this.config.title),t},r.updateAttachment=function(t){return"right"===t?"end":"left"===t?"start":t},r._getPopperConfig=function(t){var e=this,i={name:"flip",options:{altBoundary:!0}};return this.config.fallbackPlacements&&(i.options.fallbackPlacements=this.config.fallbackPlacements),n({},{placement:t,modifiers:[i,{name:"preventOverflow",options:{rootBoundary:this.config.boundary}},{name:"arrow",options:{element:"."+this.constructor.NAME+"-arrow"}},{name:"onChange",enabled:!0,phase:"afterWrite",fn:function(t){return e._handlePopperPlacementChange(t)}}],onFirstUpdate:function(t){t.options.placement!==t.placement&&e._handlePopperPlacementChange(t)}},this.config.popperConfig)},r._addAttachmentClass=function(t){this.getTipElement().classList.add("bs-tooltip-"+this.updateAttachment(t))},r._getContainer=function(){return!1===this.config.container?document.body:d(this.config.container)?this.config.container:q.findOne(this.config.container)},r._getAttachment=function(t){return Me[t.toUpperCase()]},r._setListeners=function(){var t=this;this.config.trigger.split(" ").forEach((function(e){if("click"===e)H.on(t._element,t.constructor.Event.CLICK,t.config.selector,(function(e){return t.toggle(e)}));else if("manual"!==e){var n="hover"===e?t.constructor.Event.MOUSEENTER:t.constructor.Event.FOCUSIN,i="hover"===e?t.constructor.Event.MOUSELEAVE:t.constructor.Event.FOCUSOUT;H.on(t._element,n,t.config.selector,(function(e){return t._enter(e)})),H.on(t._element,i,t.config.selector,(function(e){return t._leave(e)}))}})),this._hideModalHandler=function(){t._element&&t.hide()},H.on(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler),this.config.selector?this.config=n({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},r._fixTitle=function(){var t=this._element.getAttribute("title"),e=typeof this._element.getAttribute("data-bs-original-title");(t||"string"!==e)&&(this._element.setAttribute("data-bs-original-title",t||""),!t||this._element.getAttribute("aria-label")||this._element.textContent||this._element.setAttribute("aria-label",t),this._element.setAttribute("title",""))},r._enter=function(t,e){var n=this.constructor.DATA_KEY;(e=e||T(t.delegateTarget,n))||(e=new this.constructor(t.delegateTarget,this._getDelegateConfig()),E(t.delegateTarget,n,e)),t&&(e._activeTrigger["focusin"===t.type?"focus":"hover"]=!0),e.getTipElement().classList.contains("show")||"show"===e._hoverState?e._hoverState="show":(clearTimeout(e._timeout),e._hoverState="show",e.config.delay&&e.config.delay.show?e._timeout=setTimeout((function(){"show"===e._hoverState&&e.show()}),e.config.delay.show):e.show())},r._leave=function(t,e){var n=this.constructor.DATA_KEY;(e=e||T(t.delegateTarget,n))||(e=new this.constructor(t.delegateTarget,this._getDelegateConfig()),E(t.delegateTarget,n,e)),t&&(e._activeTrigger["focusout"===t.type?"focus":"hover"]=!1),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState="out",e.config.delay&&e.config.delay.hide?e._timeout=setTimeout((function(){"out"===e._hoverState&&e.hide()}),e.config.delay.hide):e.hide())},r._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},r._getConfig=function(t){var e=Y.getDataAttributes(this._element);return Object.keys(e).forEach((function(t){Ie.has(t)&&delete e[t]})),t&&"object"==typeof t.container&&t.container.jquery&&(t.container=t.container[0]),"number"==typeof(t=n({},this.constructor.Default,e,"object"==typeof t&&t?t:{})).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),p(je,t,this.constructor.DefaultType),t.sanitize&&(t.template=Se(t.template,t.allowList,t.sanitizeFn)),t},r._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},r._cleanTipClass=function(){var t=this.getTipElement(),e=t.getAttribute("class").match(Ne);null!==e&&e.length>0&&e.map((function(t){return t.trim()})).forEach((function(e){return t.classList.remove(e)}))},r._handlePopperPlacementChange=function(t){var e=t.state;e&&(this.tip=e.elements.popper,this._cleanTipClass(),this._addAttachmentClass(this._getAttachment(e.placement)))},o.jQueryInterface=function(t){return this.each((function(){var e=T(this,"bs.tooltip"),n="object"==typeof t&&t;if((e||!/dispose|hide/.test(t))&&(e||(e=new o(this,n)),"string"==typeof t)){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t]()}}))},e(o,null,[{key:"Default",get:function(){return Be}},{key:"NAME",get:function(){return je}},{key:"DATA_KEY",get:function(){return"bs.tooltip"}},{key:"Event",get:function(){return He}},{key:"EVENT_KEY",get:function(){return".bs.tooltip"}},{key:"DefaultType",get:function(){return Pe}}]),o}(R);b((function(){var t=_();if(t){var e=t.fn[je];t.fn[je]=Re.jQueryInterface,t.fn[je].Constructor=Re,t.fn[je].noConflict=function(){return t.fn[je]=e,Re.jQueryInterface}}}));var We="popover",Ke=new RegExp("(^|\\s)bs-popover\\S+","g"),Qe=n({},Re.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),Ue=n({},Re.DefaultType,{content:"(string|element|function)"}),Fe={HIDE:"hide.bs.popover",HIDDEN:"hidden.bs.popover",SHOW:"show.bs.popover",SHOWN:"shown.bs.popover",INSERTED:"inserted.bs.popover",CLICK:"click.bs.popover",FOCUSIN:"focusin.bs.popover",FOCUSOUT:"focusout.bs.popover",MOUSEENTER:"mouseenter.bs.popover",MOUSELEAVE:"mouseleave.bs.popover"},Ye=function(t){function n(){return t.apply(this,arguments)||this}i(n,t);var o=n.prototype;return o.isWithContent=function(){return this.getTitle()||this._getContent()},o.setContent=function(){var t=this.getTipElement();this.setElementContent(q.findOne(".popover-header",t),this.getTitle());var e=this._getContent();"function"==typeof e&&(e=e.call(this._element)),this.setElementContent(q.findOne(".popover-body",t),e),t.classList.remove("fade","show")},o._addAttachmentClass=function(t){this.getTipElement().classList.add("bs-popover-"+this.updateAttachment(t))},o._getContent=function(){return this._element.getAttribute("data-bs-content")||this.config.content},o._cleanTipClass=function(){var t=this.getTipElement(),e=t.getAttribute("class").match(Ke);null!==e&&e.length>0&&e.map((function(t){return t.trim()})).forEach((function(e){return t.classList.remove(e)}))},n.jQueryInterface=function(t){return this.each((function(){var e=T(this,"bs.popover"),i="object"==typeof t?t:null;if((e||!/dispose|hide/.test(t))&&(e||(e=new n(this,i),E(this,"bs.popover",e)),"string"==typeof t)){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t]()}}))},e(n,null,[{key:"Default",get:function(){return Qe}},{key:"NAME",get:function(){return We}},{key:"DATA_KEY",get:function(){return"bs.popover"}},{key:"Event",get:function(){return Fe}},{key:"EVENT_KEY",get:function(){return".bs.popover"}},{key:"DefaultType",get:function(){return Ue}}]),n}(Re);b((function(){var t=_();if(t){var e=t.fn[We];t.fn[We]=Ye.jQueryInterface,t.fn[We].Constructor=Ye,t.fn[We].noConflict=function(){return t.fn[We]=e,Ye.jQueryInterface}}}));var qe="scrollspy",ze={offset:10,method:"auto",target:""},Ve={offset:"number",method:"string",target:"(string|element)"},Xe=function(t){function o(e,n){var i;return(i=t.call(this,e)||this)._scrollElement="BODY"===e.tagName?window:e,i._config=i._getConfig(n),i._selector=i._config.target+" .nav-link, "+i._config.target+" .list-group-item, "+i._config.target+" .dropdown-item",i._offsets=[],i._targets=[],i._activeTarget=null,i._scrollHeight=0,H.on(i._scrollElement,"scroll.bs.scrollspy",(function(t){return i._process(t)})),i.refresh(),i._process(),i}i(o,t);var r=o.prototype;return r.refresh=function(){var t=this,e=this._scrollElement===this._scrollElement.window?"offset":"position",n="auto"===this._config.method?e:this._config.method,i="position"===n?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),q.find(this._selector).map((function(t){var e=l(t),o=e?q.findOne(e):null;if(o){var r=o.getBoundingClientRect();if(r.width||r.height)return[Y[n](o).top+i,e]}return null})).filter((function(t){return t})).sort((function(t,e){return t[0]-e[0]})).forEach((function(e){t._offsets.push(e[0]),t._targets.push(e[1])}))},r.dispose=function(){t.prototype.dispose.call(this),H.off(this._scrollElement,".bs.scrollspy"),this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},r._getConfig=function(t){if("string"!=typeof(t=n({},ze,"object"==typeof t&&t?t:{})).target&&d(t.target)){var e=t.target.id;e||(e=s(qe),t.target.id=e),t.target="#"+e}return p(qe,t,Ve),t},r._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},r._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},r._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},r._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;){this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&(void 0===this._offsets[o+1]||t<this._offsets[o+1])&&this._activate(this._targets[o])}}},r._activate=function(t){this._activeTarget=t,this._clear();var e=this._selector.split(",").map((function(e){return e+'[data-bs-target="'+t+'"],'+e+'[href="'+t+'"]'})),n=q.findOne(e.join(","));n.classList.contains("dropdown-item")?(q.findOne(".dropdown-toggle",n.closest(".dropdown")).classList.add("active"),n.classList.add("active")):(n.classList.add("active"),q.parents(n,".nav, .list-group").forEach((function(t){q.prev(t,".nav-link, .list-group-item").forEach((function(t){return t.classList.add("active")})),q.prev(t,".nav-item").forEach((function(t){q.children(t,".nav-link").forEach((function(t){return t.classList.add("active")}))}))}))),H.trigger(this._scrollElement,"activate.bs.scrollspy",{relatedTarget:t})},r._clear=function(){q.find(this._selector).filter((function(t){return t.classList.contains("active")})).forEach((function(t){return t.classList.remove("active")}))},o.jQueryInterface=function(t){return this.each((function(){var e=T(this,"bs.scrollspy");if(e||(e=new o(this,"object"==typeof t&&t)),"string"==typeof t){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t]()}}))},e(o,null,[{key:"Default",get:function(){return ze}},{key:"DATA_KEY",get:function(){return"bs.scrollspy"}}]),o}(R);H.on(window,"load.bs.scrollspy.data-api",(function(){q.find('[data-bs-spy="scroll"]').forEach((function(t){return new Xe(t,Y.getDataAttributes(t))}))})),b((function(){var t=_();if(t){var e=t.fn[qe];t.fn[qe]=Xe.jQueryInterface,t.fn[qe].Constructor=Xe,t.fn[qe].noConflict=function(){return t.fn[qe]=e,Xe.jQueryInterface}}}));var $e=function(t){function n(){return t.apply(this,arguments)||this}i(n,t);var o=n.prototype;return o.show=function(){var t=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains("active")||this._element.classList.contains("disabled"))){var e,n=c(this._element),i=this._element.closest(".nav, .list-group");if(i){var o="UL"===i.nodeName||"OL"===i.nodeName?":scope > li > .active":".active";e=(e=q.find(o,i))[e.length-1]}var r=null;if(e&&(r=H.trigger(e,"hide.bs.tab",{relatedTarget:this._element})),!(H.trigger(this._element,"show.bs.tab",{relatedTarget:e}).defaultPrevented||null!==r&&r.defaultPrevented)){this._activate(this._element,i);var s=function(){H.trigger(e,"hidden.bs.tab",{relatedTarget:t._element}),H.trigger(t._element,"shown.bs.tab",{relatedTarget:e})};n?this._activate(n,n.parentNode,s):s()}}},o._activate=function(t,e,n){var i=this,o=(!e||"UL"!==e.nodeName&&"OL"!==e.nodeName?q.children(e,".active"):q.find(":scope > li > .active",e))[0],r=n&&o&&o.classList.contains("fade"),s=function(){return i._transitionComplete(t,o,n)};if(o&&r){var a=u(o);o.classList.remove("show"),H.one(o,"transitionend",s),h(o,a)}else s()},o._transitionComplete=function(t,e,n){if(e){e.classList.remove("active");var i=q.findOne(":scope > .dropdown-menu .active",e.parentNode);i&&i.classList.remove("active"),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}(t.classList.add("active"),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),v(t),t.classList.contains("fade")&&t.classList.add("show"),t.parentNode&&t.parentNode.classList.contains("dropdown-menu"))&&(t.closest(".dropdown")&&q.find(".dropdown-toggle").forEach((function(t){return t.classList.add("active")})),t.setAttribute("aria-expanded",!0));n&&n()},n.jQueryInterface=function(t){return this.each((function(){var e=T(this,"bs.tab")||new n(this);if("string"==typeof t){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t]()}}))},e(n,null,[{key:"DATA_KEY",get:function(){return"bs.tab"}}]),n}(R);H.on(document,"click.bs.tab.data-api",'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',(function(t){t.preventDefault(),(T(this,"bs.tab")||new $e(this)).show()})),b((function(){var t=_();if(t){var e=t.fn.tab;t.fn.tab=$e.jQueryInterface,t.fn.tab.Constructor=$e,t.fn.tab.noConflict=function(){return t.fn.tab=e,$e.jQueryInterface}}}));var Ge={animation:"boolean",autohide:"boolean",delay:"number"},Ze={animation:!0,autohide:!0,delay:5e3},Je=function(t){function o(e,n){var i;return(i=t.call(this,e)||this)._config=i._getConfig(n),i._timeout=null,i._setListeners(),i}i(o,t);var r=o.prototype;return r.show=function(){var t=this;if(!H.trigger(this._element,"show.bs.toast").defaultPrevented){this._clearTimeout(),this._config.animation&&this._element.classList.add("fade");var e=function(){t._element.classList.remove("showing"),t._element.classList.add("show"),H.trigger(t._element,"shown.bs.toast"),t._config.autohide&&(t._timeout=setTimeout((function(){t.hide()}),t._config.delay))};if(this._element.classList.remove("hide"),v(this._element),this._element.classList.add("showing"),this._config.animation){var n=u(this._element);H.one(this._element,"transitionend",e),h(this._element,n)}else e()}},r.hide=function(){var t=this;if(this._element.classList.contains("show")&&!H.trigger(this._element,"hide.bs.toast").defaultPrevented){var e=function(){t._element.classList.add("hide"),H.trigger(t._element,"hidden.bs.toast")};if(this._element.classList.remove("show"),this._config.animation){var n=u(this._element);H.one(this._element,"transitionend",e),h(this._element,n)}else e()}},r.dispose=function(){this._clearTimeout(),this._element.classList.contains("show")&&this._element.classList.remove("show"),H.off(this._element,"click.dismiss.bs.toast"),t.prototype.dispose.call(this),this._config=null},r._getConfig=function(t){return t=n({},Ze,Y.getDataAttributes(this._element),"object"==typeof t&&t?t:{}),p("toast",t,this.constructor.DefaultType),t},r._setListeners=function(){var t=this;H.on(this._element,"click.dismiss.bs.toast",'[data-bs-dismiss="toast"]',(function(){return t.hide()}))},r._clearTimeout=function(){clearTimeout(this._timeout),this._timeout=null},o.jQueryInterface=function(t){return this.each((function(){var e=T(this,"bs.toast");if(e||(e=new o(this,"object"==typeof t&&t)),"string"==typeof t){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t](this)}}))},e(o,null,[{key:"DefaultType",get:function(){return Ge}},{key:"Default",get:function(){return Ze}},{key:"DATA_KEY",get:function(){return"bs.toast"}}]),o}(R);return b((function(){var t=_();if(t){var e=t.fn.toast;t.fn.toast=Je.jQueryInterface,t.fn.toast.Constructor=Je,t.fn.toast.noConflict=function(){return t.fn.toast=e,Je.jQueryInterface}}})),{Alert:K,Button:Q,Carousel:Z,Collapse:nt,Dropdown:Te,Modal:Le,Popover:Ye,ScrollSpy:Xe,Tab:$e,Toast:Je,Tooltip:Re}}));

/**
 * Owl Carousel v2.3.4
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);