function init() {
	const markIcon = 'img/svg/map.png';
	const markIconColor = 'img/svg/map-color.png';
	var center = [55.75380038320217, 37.62071970898438];
	var myMap = new ymaps.Map('map2', {
		center: center,
		zoom: 10,
		controls: ['zoomControl']
	}),
		clusterer = new ymaps.Clusterer({
			preset: 'islands#invertedVioletClusterIcons',
			groupByCoordinates: false,
			clusterDisableClickZoom: true,
			clusterHideIconOnBalloonOpen: false,
			geoObjectHideIconOnBalloonOpen: false
		}),
		getPointData = function (i, t, p, time) {
			return {
				balloonContent: `<img src="${i}"><div class="h5">${t}</div><p>${p}</p><span> Режим работы:</span> <span>${time}</span>`
			};
		},
		getPointOptions = function () {
			return {
				hideIconOnBalloonOpen: false,
				iconLayout: 'default#image',
				iconImageHref: markIcon,
				// Размеры метки.

				iconImageSize: [30, 32],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-15, -32]
			};
		},
		points = [
			{ mark: [55.67455635081638, 37.64072341673275], i: '../img/@2x/haveStore.png"', t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'г. Москва, Каширское шоссе, дом 19, корпус 1', time: '10:00 — 22:00' },
			{ mark: [55.684072399488265, 37.55676825847164], i: '../img/@2x/haveStore.png"', t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'г. Москва, Каширское шоссе, дом 19, корпус 1', time: '10:00 — 22:00' },
			{ mark: [55.78843546026375, 37.656384548873845], i: '../img/@2x/haveStore.png"', t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'г. Москва, Каширское шоссе, дом 19, корпус 1', time: '10:00 — 22:00' },
			{ mark: [55.744522, 37.616378], i: '../img/@2x/haveStore.png"', t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'г. Москва, Каширское шоссе, дом 19, корпус 1', time: '10:00 — 22:00' },
			{ mark: [55.716733, 37.589988], i: '../img/@2x/haveStore.png"', t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'г. Москва, Каширское шоссе, дом 19, корпус 1', time: '10:00 — 22:00' },
		],
		geoObjects = [];

	for (var i = 0, len = points.length; i < len; i++) {
		let mark = points[i].mark;
		let markdata = getPointData(points[i].i, points[i].t, points[i].p, points[i].time);
		geoObjects[i] = new ymaps.Placemark(mark, markdata, getPointOptions());
		geoObjects[i].events
			.add('balloonopen', e => {
				var target = e.get('target');
				target.options.set('iconImageHref', markIconColor);
				target.options.set({ iconImageSize: [68, 74] });
				target.options.set({ iconImageOffset: [-34, -74] });
				$(".sOurStores__map-caption").html(`<div class="content">${target.properties.get('balloonContent')}</div><div class="closeButton"></div></div>`);
			})
			.add('balloonclose', (e) => {
				var target = e.get('target');
				target.options.set('iconImageHref', markIcon);
				target.options.set({ iconImageSize: [30, 32] });
				target.options.set({ iconImageOffset: [-15, -32] });
				$(".sOurStores__map-caption").html("");
			});


	}
	clusterer.options.set({
		gridSize: 80,
		clusterDisableClickZoom: true
	});
	clusterer.add(geoObjects);
	myMap.geoObjects.add(clusterer);
	myMap.setBounds(clusterer.getBounds(), {
		checkZoomRange: true
	});
	$(document).on('click', '.closeButton', function () {
		myMap.balloon.close()
		// $(document).
	});

	// myMap.behaviors.disable('scrollZoom');
	// //на мобильных устройствах... (проверяем по userAgent браузера)
	// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	// 	// ... отключаем перетаскивание карты
	// 	myMap.behaviors.disable('drag');
	// }
};
let mapShow = true;
$('.tabs__btn:nth-child(2)').bind('click', function () {
	//- myMap.container.fitToViewport();
	//- console.log(mapShow)
	if (mapShow == true) {
		ymaps.ready(init);
	}
	mapShow = false;
});