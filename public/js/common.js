"use strict";

// const { default: Swiper } = require("swiper");

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
		$(document).on('click', "  .scroll-link", function () {
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
	getRange() {
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
	}
};
function stickyFilter() {
	let Sticky = new hcSticky('.sticky-filter', {
		stickTo: '.sGoods__col-filter', 
		top: 130,
		// bottomEnd: 70,
		// innerTop: 12,
		// offResolutions: [-1200],
		// mobileFirst: true,
		// 	responsive: {
		// 		992: {
		// 			disable: true
		// 		}
		// 	}
	});

}

const $ = jQuery;

function eventHandler() {

	stickyFilter()
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.getRange();
	// JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	JSCCommon.animateScroll();
	
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
		slidesPerView: 1,
		watchOverflow: true,
		spaceBetween: 35,
		breakpoints: {
			400: {
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

	$('.header--js').hcSticky({
    // stickTo: $('#content')
  });
	
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

	document.addEventListener('mouseup', (event) => {
		let modal = event.target.closest("   .moreInfo.active");  
		if (!modal) { 
			document.body.classList.remove("fixed3");
			$('.moreInfo').removeClass("active")
		};
		if (!modal) { 
			document.body.classList.remove("fixed3");
			$('.sCalculator__col-info').removeClass("active")
		};
	}, { passive: true });

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

	$('.sFilter__filterCloseBtn').click(function () {
		$('.sFilter__wrap').removeClass('active');
		$('.sGoods__btn-bottom').removeClass('active');
		document.body.classList.remove("fixed");
	});
	
	$(".sGoods__btn-bottom").click(function () {
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
	
	let textHidden = 'Все бренды';
	let textShow = 'Свернуть';

	$('.sGoods__brands-btn').click(function() {
		$(this).toggleClass('active');
		let text = this.querySelector('.sGoods__btn-text');
		text.innerHTML = (text.innerHTML == textHidden) 
			? textShow 
			: textHidden;
		$('.sGoods__col--js.active').slideUp(function() {
			$(this).removeClass('active');
		});
		$('.sGoods__col--js:hidden').slideDown(function() {
			$(this).addClass('active');
		});
	});


	let catalog = document.querySelector(".catalog-menu--js");
	let mobmnu = document.querySelector(" .menu-mobile--js");
	
	document.addEventListener("click", function (event) {
		let toggleCatalog = document.querySelectorAll(".catalog-toggle-js");
		
		let menutoggle = document.querySelector(".toggle-menu-mobile");
		let menutoggletarget =  event.target.closest(".toggle-menu-mobile.catalog-toggle-js");
		let target = event.target.closest(".catalog-toggle-js");
		
		let targetcatalog = event.target.closest(".catalog-menu--js.active");
		
		
		let col = $(".col-top-js");
		// let targetMobile = event.target.closest(".top-btns__btn");
		if (target) {
			if (target.classList.contains("top-btns__btn")) {
				event.preventDefault();
					
					catalog.classList.toggle('mobile-active');
					// target.classList.toggle('active');
					
				menutoggle.classList.toggle('toggle-menu-mobile--js');
				menutoggle.classList.toggle('on');
				menutoggle.classList.toggle('catalog-toggle-js');
			}
			catalog.classList.toggle('active');
			col.toggleClass('active');
			// target.classList.toggle('active');
			target.classList.remove('on');
			document.querySelector("body").classList.toggle('fixed-catalog');
			toggleCatalog.forEach(el => el.classList.toggle('active'))
		}
		if (menutoggletarget) {
			catalog.classList.remove('mobile-active');
			menutoggletarget.classList.add('toggle-menu-mobile--js');
			menutoggletarget.classList.remove('on');
			menutoggletarget.classList.remove('catalog-toggle-js');
		}
		// 	else if (!target && !targetcatalog && catalog.classList.contains("active")) {
		// 	catalog.classList.remove('active');
		// 	catalog.classList.remove('mobile-active');
		// 	document.querySelector("body").classList.remove('fixed-catalog');
		// 	toggleCatalog.forEach(el => el.classList.remove('active'))
			
		// }
	})

	function togglemobmenu(menu) {

		if (menu) {
			menu.addEventListener("click", function (event) {
			if (!this.classList.contains("mobile-active")) return;
			let link = event.target.closest(".menu-item-has-children>a")
			if (!link) return;
			event.preventDefault();
			console.log(link);
			let parent = link.parentElement;
			let subMenu = parent.querySelector(".sub-menu");
			
			let btnBack = document.createElement("li");
			btnBack.classList.add('catalog-menu-back')
			btnBack.innerHTML = link.innerText;
			
			subMenu.insertAdjacentElement('afterbegin', btnBack);
			
			btnBack.addEventListener("click", function () { 
				subMenu.classList.remove('active');
				document.querySelector(".overflowAll").classList.remove('overflowAll');
				setTimeout(() => {
					
					this.remove();
				}, 200);
			})
			// console.log(1);
			catalog.classList.add('overflowAll');
			subMenu.classList.add('active');
		})
	}
}
	function togglemobmenu2(menu) {

		if (menu) {
			menu.addEventListener("click", function (event) { 
			let link = event.target.closest(".menu-item-has-children>a")
			if (!link) return;
			event.preventDefault();
			console.log(link);
			let parent = link.parentElement;
			let subMenu = parent.querySelector(".sub-menu");
			
			let btnBack = document.createElement("li");
			btnBack.classList.add('catalog-menu-back')
			btnBack.innerHTML = link.innerText;
			
			subMenu.insertAdjacentElement('afterbegin', btnBack);
			
			btnBack.addEventListener("click", function () { 
				subMenu.classList.remove('active');
				document.querySelector(".overflowAll").classList.remove('overflowAll');
				setTimeout(() => {
					
					this.remove();
				}, 200);
			})
			// console.log(1);
			catalog.classList.add('overflowAll');
			subMenu.classList.add('active');
		})
	}
}

	togglemobmenu(catalog);
	togglemobmenu2(mobmnu);

	
	$('.checkout__btn-more-info').on('click', function () {
		$('.moreInfo').addClass('active');
		document.body.classList.add("fixed3");
	});
	
	$('.moreInfo__close-cross').on('click', function () {
		$('.moreInfo').removeClass('active');
		document.body.classList.remove("fixed3");
	});
	$('.moreInfo__slide-down').on('click', function () {
		$('.moreInfo').removeClass('active');
		document.body.classList.remove("fixed3");
	});

	$('.mobileInfo__btn').on('click', function () {
		$('.sCalculator__col-info').addClass('active');
		document.body.classList.add("fixed3");
	});
	
	$('.sCalculator__close-cross').on('click', function () {
		$('.sCalculator__col-info').removeClass('active');
		document.body.classList.remove("fixed3");
	});
	$('.sCalculator__slide-down').on('click', function () {
		$('.sCalculator__col-info').removeClass('active');
		document.body.classList.remove("fixed3");
	});


	// tabUnchor();
	
	// tabStep();

	$('.popUp span').on('click', function () {
		$('.popUp').hide();
	});

	let colorsInputs = document.querySelectorAll('#chose-color .custom-input__input');
	let selectedСolor = document.querySelectorAll('.sCardProduct__choseColor');
	for (const input of colorsInputs) {
		function setColor () {
			if (input.checked) {
				let color = input.getAttribute('style');
				let title = input.nextElementSibling.innerText;
				for (let i=0; i < selectedСolor.length; i++) {
					let selectedTitle = selectedСolor[i].querySelector('.h5');
					selectedСolor[i].setAttribute('style', color);
					selectedTitle.innerText = title;
				}
			}
		}
		// setColor();
		input.addEventListener('change', function() {
			setColor();
			for (let i=0; i < selectedСolor.length; i++) {
				selectedСolor[i].classList.add('active');
			}
		});
	}

	// Бургер в Лэндинге про текстиль

	const textileBurgers = document.querySelectorAll('.textile-menu__btn--js');
	const mainContent = document.querySelector('.main-content');
	const textileMenu = document.querySelector('.textile-menu');
	
	if (textileBurgers && mainContent && textileMenu) {
		for (const textileBurger of textileBurgers) {
			textileBurger.addEventListener('click', function(event) {
				textileMenu.classList.toggle("active");
				mainContent.classList.toggle("menu-active");
				[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed-scroll"));
				textileBurgers.forEach(el => el.classList.toggle("active"));
			});
		}
		document.body.addEventListener('click', function(event) {
			let toggle = event.target.closest('.textile-menu__btn--js');
			let menu = event.target.closest('.textile-menu.menu-active');
			if (!menu && !toggle) {
				textileMenu.classList.remove("active");
				mainContent.classList.remove("menu-active");
				[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed-scroll"));
				textileBurgers.forEach(el => el.classList.remove("active"));
			}
		});
	}

	// / Бургер в Лэндинге про текстиль

	// Проекты в слайдер

	const projectsSlide = document.querySelector('.sTextileProjects__swiper');
	let projectSwiper;
	function projectsSwiping() {
		if (window.innerWidth <= 576 && projectsSlide.dataset.mobile == 'false') {
			projectSwiper = new Swiper(projectsSlide, {
				slidesPerView: 1,
				spaceBetween: 10,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
				},
			});
			projectsSlide.dataset.mobile = 'true';
			// projectsSlide.update();
		}
		if (window.innerWidth > 576) {
			projectsSlide.dataset.mobile = 'false';
			if (projectsSlide.classList.contains('swiper-initialized')) {
				projectSwiper.destroy();
			}
		}
	}

	if (projectsSlide) {
		projectsSwiping();
	}
	window.addEventListener('resize', () => {
		if (projectsSlide) {
		projectsSwiping();
		}
	});

	// / Проекты в слайдер

	// Скролл по левому меню
	function tocPoss(element) {
		var rect = element.getBoundingClientRect();
		return rect.top - 20 <= 0
	}
	$(window).scroll(function () {
		$('.sCatalog--textile').each(function (index, element) {
			if (tocPoss(element)) {
				let toc_id = $(this).attr('id')
				console.log(toc_id);
				$('.textile-menu__link').each(function () {
					let toc_link = $(this).attr('href').replace('#', '')
					if (toc_link == toc_id) {
						$(this).addClass('active')
						$('.textile-menu__link').not(this).removeClass('active')
					}
				})
			}
		})
	})

	// leftMenu = document.querySelector('.textile-menu'),
	// leftMenuHeight = leftMenu.outerHeight(),
  //   // All list items
  //   menuItems = leftMenu.find("a"),
  //   // Anchors corresponding to menu items
  //   scrollItems = menuItems.map(function(){
  //     var item = $($(this).attr("href"));
  //     if (item.length) { return item; }
  //   });

	// // Bind click handler to menu items
	// // so we can get a fancy scroll animation
	// menuItems.click(function(e){
	// 	var href = $(this).attr("href"),
	// 			offsetTop = href === "#" ? 0 : $(href).offset().top-leftMenuHeight+1;
	// 	$('html, body').stop().animate({ 
	// 			scrollTop: offsetTop
	// 	}, 300);
	// 	e.preventDefault();
	// });
	// // Bind to scroll
	// $(window).scroll(function(){
	// 	// Get container scroll position
	// 	var fromTop = $(this).scrollTop()+leftMenuHeight;
		
	// 	// Get id of current scroll item
	// 	var cur = scrollItems.map(function(){
	// 		if ($(this).offset().top < fromTop)
	// 			return this;
	// 	});
	// 	// Get the id of the current element
	// 	cur = cur[cur.length-1];
	// 	var id = cur && cur.length ? cur[0].id : "";
		
	// 	if (lastId !== id) {
	// 			lastId = id;
	// 			// Set/remove active class
	// 			menuItems
	// 				.parent().removeClass("active")
	// 				.end().filter("[href='#"+id+"']").parent().addClass("active");
	// 	}                   
	// });
	// / Скролл по левому меню

	FilePond.registerPlugin(
		// encodes the file as base64 data
		FilePondPluginFileEncode,

		// validates the size of the file
		FilePondPluginFileValidateSize,

		// corrects mobile image orientation
		FilePondPluginImageExifOrientation,

		// previews dropped images
		FilePondPluginImagePreview
	);

	// Select the file input and use 
	// create() to turn it into a pond
	FilePond.create(
		document.querySelector('.filepond'),
		{
			// labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
			labelIdle: `Перетащите свой файл  <br> или загрузите`,
		}
	);

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

function tabUnchor(t=".tabs-main") {

	let tabMain = document.querySelectorAll(t);
	for (const iterator of tabMain) {
		
		iterator.addEventListener('click', function (el) {
			let btn = el.target.closest(".tabs-main__btn")
			if (!btn) return;
			el.preventDefault();
			let href = btn.getAttribute("href");
			let contentActive = this.querySelector(".tabs-main__content.active");
			contentActive.style.display = '';
			contentActive.classList.remove("active")
			$(href).fadeIn(function () {
				this.classList.add('active')
			})
		})
	}
}



function tabStep(t="#calc") {
	if(document.querySelector(t)) {

	
	let tabMain = document.querySelector(t); 
	tabMain.addEventListener('click', function (el) {
	
		let btn = el.target.closest(".page-head__item")
		if (!btn) return;
		el.preventDefault();
		let href = btn.dataset.step;
		let btnActive = this.querySelector(".page-head__item.active");
		
		btn.classList.add("active");
		btnActive.classList.remove("active");
		btnActive.classList.add("done");
		let contentActive = this.querySelector(".sCalculationType.active");
		contentActive.style.display = '';
		contentActive.classList.remove("active");

		$(href).fadeIn(function () {
			this.classList.add('active')
		})
	}) 

	let prevBtn = tabMain.querySelector(".checkout__back")
	let nextBtn = tabMain.querySelector(".checkout__btn.btn-primary")
	nextBtn.addEventListener("click", function () {
		let contentActive = tabMain.querySelector(".sCalculationType.active");
		let next = contentActive.nextElementSibling;
		if (next) {
			let btnActive = tabMain.querySelector(".page-head__item.active");
			let btnNext = btnActive.parentElement.nextElementSibling.querySelector(".page-head__item");

			if (next.previousElementSibling) {
				prevBtn.classList.remove("d-none")
			}
			else {
				prevBtn.classList.add("d-none")
				
			}
			contentActive.style.display = '';
			contentActive.classList.remove("active"); 

			btnActive.classList.remove("active"); 
			btnActive.classList.add("done"); 
			btnNext.classList.add("active"); 
			
			$(next).fadeIn(function () {
				this.classList.add('active')
			})
		}
	})
	
	prevBtn.addEventListener("click", function () {
		let contentActive = tabMain.querySelector(".sCalculationType.active");
		let prev = contentActive.previousElementSibling;

		
		if (prev) { 
			let btnActive = tabMain.querySelector(".page-head__item.active");
			let btnPrev = btnActive.parentElement.previousElementSibling.querySelector(".page-head__item");

			btnActive.classList.remove("active"); 
			btnActive.classList.add("done"); 
			btnPrev.classList.add("active"); 

			contentActive.style.display = '';
			contentActive.classList.remove("active"); 
			$(prev).fadeIn(function () {
				this.classList.add('active')
			})
		}
		if (!prev.previousElementSibling) {
			
			this.classList.add("d-none")
		}
	})
}
}

 
