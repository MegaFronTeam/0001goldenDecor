"use strict";
const JSCCommon = { 
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() { 
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		// document.addEventListener('mouseup', (event) => {
		// 	let container = event.target.closest(".menu-mobile--js.active"); // (1)
		// 	let link = event.target.closest(".menu-mobile .menu a"); // (1)
		// 	let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
		// 	if (!container && !toggle) this.closeMenu();
		// }, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+9(999)999-99-99", showMaskOnHover: false}).mask(InputTel);
		let InputNumber = [].slice.call(document.querySelectorAll('.number-js'));
		InputNumber.forEach(element => element.setAttribute("pattern", "[+][0-9]{4}"));
		Inputmask({"mask":"9999", showMaskOnHover: false}).mask(InputNumber);
	}, 
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}, 
	// makeDDGroup() {
	// 	let parents = document.querySelectorAll('.dd-group-js');
	// 	for (let parent of parents) {
	// 		if (parent) {
	// 			// childHeads, kind of funny))
	// 			let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
	// 			$(ChildHeads).click(function () {
	// 				let clickedHead = this;

	// 				$(ChildHeads).each(function () {
	// 					if (this === clickedHead) {
	// 						//parent element gain toggle class, style head change via parent
	// 						$(this.parentElement).toggleClass('active');
	// 						$(this.parentElement).find('.dd-content-js').slideToggle(function () {
	// 							$(this).toggleClass('active');
	// 						});
	// 					}
	// 					else {
	// 						$(this.parentElement).removeClass('active');
	// 						$(this.parentElement).find('.dd-content-js').slideUp(function () {
	// 							$(this).removeClass('active');
	// 						});
	// 					}
	// 				});

	// 			});
	// 		}
	// 	}
	// },
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	// JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	const headerBlockSlider = new Swiper('.headerBlock__slider--js', {  
		loop: true,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	const sOneShopSlider = new Swiper('.sOneShop__slider--js', {
		slidesPerView: 'auto',
		loop: true,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	const sCatalogSlider = new Swiper('.sCatalog__slider--js, .sBlog__slider--js', {  
		slidesPerView: 'auto',
		watchOverflow: true, 
		// resistance: false, 
		// shortSwipes: false, 
		// allowTouchMove: false, 
		// touchMoveStopPropagation: true, 
		// virtualTranslate: true, 
		// touchStartPreventDefault: false, 
		// slideToClickedSlide: true, 
		// uniqueNavElements: false, 
		spaceBetween: 24,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		// breakpoints: { 
		// 	768: {
		// 		spaceBetween: 40
		// 	}
		// }
	});

	const menuSlider = new Swiper('.menu-slider--js', {  
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 24
	});

	const sStoresSlider = new Swiper('.sStores__slider--js', {  
		slidesPerView: 2,
		watchOverflow: true,
		spaceBetween: 35,
		breakpoints: {
			640: {
				slidesPerView: 2
			},
			1024: {
				slidesPerView: 3
			},
		},
	});

	const sContentSlider = new Swiper('.sContent__slider--js', {  
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 40,
		breakpoints: {
			640: {
				slidesPerView: 2
			},
			1024: {
				slidesPerView: 3
			},
		},
	});

	const pageHeadSlider = new Swiper('.page-head__slider--js', {  
		slidesPerView: "auto",
		freeMode: true,
		spaceBetween: 0
	});

	$(".footer__link-more").click(function () {
		$(".hidden-block").slideDown();
		$(".footer__link-more").hide();
	});

	$('.header').hcSticky({
    // stickTo: $('#content')
  });
	// $('.sGoods__reset-filter--js').hcSticky({
	// 	stickTo: $('.sGoods__col-filter'),
	// 	bottom: 0,
	// 	bottomEnd: 70,
  //   innerTop: 12,
  //   offResolutions: [-1200]     
	// 	// mobileFirst: true,
	// 		// responsive: {
	// 		// 	992: {
	// 		// 		disable: true
	// 		// 	}
	// 		// }
  // });

	const convertImages = (query, callback) => {
		const images = document.querySelectorAll(query);

		images.forEach(image => {
			fetch(image.src)
				.then(res => res.text())
				.then(data => {
					const parser = new DOMParser();
					const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

					if (image.id) svg.id = image.id;
					if (image.className) svg.classList = image.classList;

					image.parentNode.replaceChild(svg, image);
				})
				.then(callback)
				.catch(error => console.error(error))
		});
	};

	convertImages('.img-svg');

	$(".search-toggle--js, .search-block__close").click(function () {
		$(this).toggleClass("active")
		$('.searchBlock-wrap--js').toggleClass("active")
	})

	document.addEventListener('mouseup', (event) => {
		let container2 = event.target.closest("   .searchBlock-wrap--js.active"); 
		let container3 = event.target.closest(" .search-toggle--js.active"); 
		if (!container2 && !container3) { 
			$(' .searchBlock-wrap--js.active').removeClass('active')
			$(".search-toggle--js.active").removeClass('active'); 
			};
	}, { passive: true });



	$(document).on("click", '.input-btn--password-toggle ', function () {
		var x = this.parentElement.querySelector(".form-control");
		if (x.type === "password") {
			this.classList.add("show")
			x.type = "text";
		} else {
			this.classList.remove("show")
			x.type = "password";
		}
	})

	// custom modal
	$(document).on("click", '.link-modal-custom-js  ', function (e) {
		e.preventDefault();
		var x = this.hash;
		document.body.classList.add("fixed2");
		$(x).addClass("active")
	})
	$(document).on("click", '.toggle-menu-mobile--2js ', function (e) {
		e.preventDefault(); 
		document.body.classList.remove("fixed2");
		$('.modal-custom').removeClass("active")
	})
	
	
	document.addEventListener('mouseup', (event) => {
		let modal = event.target.closest("   .modal-custom.active");  
		if (!modal) { 
			document.body.classList.remove("fixed2");
			$('.modal-custom').removeClass("active")
		};
	}, { passive: true });
	// /custom modal



	$(document).on("change, input" , ".form-control", function () {
		if (this.value != '' || this.value != this.defaultValue) {
				$(this).parents('.form-group').find(`.input-clear--js`).addClass("active")
			}
			else {
			$(this).parents('.form-group').find(`.input-clear--js`).removeClass("active")
			
		}
	})
	$(document).on("click" , ".input-clear--js ", function () {
		$(this).removeClass("active")
			$(this).parents('.form-group').find(`.form-control`).val('')
		
	})

		// var Sticky =new hcSticky('.checkou', {
		
	// });

	// $('.checkout').hcSticky({
		
  // });
	var sProductSliderThumbs = new Swiper(".sProductSlider__slider-thumbs--js", {
		loop: true,
		spaceBetween: 8,
		slidesPerView: 4,
		watchSlidesProgress: true,
		breakpoints: {
			768: {
				spaceBetween: 16,
			},
			992: {
				direction: "vertical",
				slidesPerView: '4',
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
				watchOverflow: true,
			},
		}
	});
	var sProductSlider = new Swiper(".sProductSlider__slider--js", {
		loop: true,
		spaceBetween: 0,
		slidesPerView: 1,
		watchSlidesProgress: true,
		thumbs: {
			swiper: sProductSliderThumbs,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		}
	});

	$('.sCardProduct__btn').on("click", function() {
		$('.sCardProduct__wrapBtn').addClass('d-block');
		$('.sCardProduct__btn').addClass('d-none');
	});

	$(".dd-head-js").click(function () {
		$(this).toggleClass("active").next().slideToggle();
	})

	var $range = $(".js-range-slider");
	var $inputFrom = $(".js-input-from");
	var $inputTo = $(".js-input-to");
	var instance;
	var min = 0;
	var max = 20000;
	var from = 0;
	var to = 0;
	
	$range.ionRangeSlider({
			skin: "round",
			type: "double",
			min: min,
			max: max,
			from: 890,
			to: 18090,
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs
	});
	instance = $range.data("ionRangeSlider");
	
	function updateInputs (data) {
			from = data.from;
			to = data.to;
	
			$inputFrom.prop("value", from);
			$inputTo.prop("value", to);
	}
	
	$inputFrom.on("change", function () {
			var val = $(this).prop("value");
			console.log(val);
			// validate
			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}
			instance.update({
				from: val
			});
			$(this).prop("value", val);
		});
	
	$inputTo.on("change", function () {
		var val = $(this).prop("value");
		// validate
		if (val < from) {
				val = from;
		} else if (val > max) {
				val = max;
		}
		instance.update({
				to: val
		});
		$(this).prop("value", val);
	});

	$('.sFilter__filterCloseBtn').click(function () {
		$('.sFilter__wrap').removeClass('active');
		$('.sFilter__btn').removeClass('active');
		document.body.classList.remove("fixed");
	});
	
	$(".sFilter__btn").click(function () {
		$('.sFilter__wrap').addClass('active');
		// $(this).toggleClass("active").next().slideToggle();
		document.body.classList.add("fixed");
	})





// Получаем нужный элемент
	var element = document.querySelectorAll('.sCardProduct__col-buy .sCardProduct__contentBtn');
	var element2 = document.querySelectorAll('.sCardProduct__contentWrap .sCardProduct__contentBtn');
	var element3 = document.querySelectorAll('.sFilter__btn');
	
	var Visible = function (target, cl) {
		// Все позиции элемента
		var targetPosition = {
				top: window.pageYOffset + target.getBoundingClientRect().top,
				left: window.pageXOffset + target.getBoundingClientRect().left,
				right: window.pageXOffset + target.getBoundingClientRect().right,
				bottom: window.pageYOffset + target.getBoundingClientRect().bottom
			},
			// Получаем позиции окна
			windowPosition = {
				top: window.pageYOffset,
				left: window.pageXOffset,
				right: window.pageXOffset + document.documentElement.clientWidth,
				bottom: window.pageYOffset + document.documentElement.clientHeight
			};
	
		if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
			targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
			targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
			targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
			// Если элемент полностью видно, то запускаем следующий код
		 $(".checkout").removeClass(cl)
		} else {
			$(".checkout").addClass(cl)
			// Если элемент не видно, то запускаем этот код
			// console.clear();
		};
		if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
			targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
			targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
			targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
			// Если элемент полностью видно, то запускаем следующий код
		 $(".sGoods__btn-bottom").removeClass(cl)
		} else {
			$(".sGoods__btn-bottom").addClass(cl)
			// Если элемент не видно, то запускаем этот код
			// console.clear();
		};
	};

	if (element) {
		element.forEach((el) => { 
			// Запускаем функцию при прокрутке страницы
			window.addEventListener('scroll', function() {
				Visible (el, 'active');
			}, { passive: true });
						Visible(el, 'active'); 
		}) 
	}
	
	if (element2) {
		element2.forEach((el) => { 
			// Запускаем функцию при прокрутке страницы
			window.addEventListener('scroll', function() {
				Visible (el, 'active2');
			}, { passive: true });
						Visible(el, 'active2');
		}) 
	}
	if (element3) {
		element3.forEach((el) => { 
			// Запускаем функцию при прокрутке страницы
			window.addEventListener('scroll', function() {
				Visible (el, 'active active2');
			}, { passive: true });
						Visible(el, 'active active2'); 
		}) 
	}
	
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

 
