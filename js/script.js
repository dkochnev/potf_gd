
$(function() {
	
	// fixing header
	
	header();

	$(window).on('scroll', header);
	
	function header() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > 0){
			$('header.header').addClass('sticky');
		} else {
			$('header.header').removeClass('sticky');
		}
	}
	
	// fixing nav-ctrl
	
	nav_ctrl();

	$(window).on('scroll', nav_ctrl);
	
	function nav_ctrl() {
		var scrollTop = $(window).scrollTop();
		var nav_ctrl = $('#about').offset().top;
		if (scrollTop > nav_ctrl){
			$('div.nav-ctrl').addClass('sticky');
		} else {
			$('div.nav-ctrl').removeClass('sticky');
		}
	}
	
	// menu
	
	$('header.header .btn').on('click', menu);
	
	function menu() {
		$('body').toggleClass('menu-open');
	}
	
	// nav
	
	var lastId,
		nav = $('nav.nav ul, footer.footer ul, .nav-ctrl ul'),
		navItems = nav.find('a'),
		scrollItems = navItems.map(function() {
			var item = $($(this).attr('href'));
			if (item.length) return item;
		});
	
	scrollRelation();
	
	$(window).on('scroll', scrollRelation);
	
	function scrollRelation() {
		var fromTop = $(this).scrollTop(),
			headerHeight = $('.header').height(),
			windowHeight = $(window).height(),
			windowWidth = $(window).width(),
			curr = scrollItems.map(function() {
				if ($(this).offset().top -($(this).attr('id') == 'contacts'?200:0) <= fromTop + headerHeight + ((windowHeight >= 480 && windowWidth >= 480 && windowWidth < 1440 && $(this).attr('id') != 'intro' && $(this).attr('id') != 'knowledge') ? 50 : 0))
					return this;
			});
		curr = curr[curr.length - 1];
		var id = curr && curr.length ? curr[0].id : '';

		if (lastId !== id) {
			lastId = id;
			navItems
				.parent()
				.removeClass('curr')
				.end()
				.filter('[href=#' + id + ']')
				.parent()
				.addClass('curr');

			$('header.header .section h2, header.header .extra > div')
				.removeClass('curr')
				.filter('[rel=' + id + ']')
				.addClass('curr');
		}
	}
	
	$('header.header .nav a, footer.footer a, .nav-ctrl a, header.header .top').click(function(e) {
		e.preventDefault();
		var href = $(this).attr('href'),
			headerHeight = 90,
			windowHeight = $(window).height(),
			windowWidth = $(window).width();

		if (windowWidth < 768) {
			headerHeight = 50;
		} else if (windowWidth >= 1440) {
			headerHeight = 110;
		}

		var offsetTop = (href === '#') ? 0 : $(href).offset().top - headerHeight - ((windowHeight >= 480 && windowWidth >= 480 && windowWidth < 1440 && href != '#intro' && href != '#knowledge' && href != '#about' && href != '#contacts') ? 49 : 0);

		if (href == '#intro' || href == '#about' || href == '#') {
			window.slider.setActiveSlide(0);
		}

		$('html, body')
			.stop()
			.animate({scrollTop: offsetTop}, 300);
		$('body').removeClass('menu-open');
	});
	
	// portfolio
	
	var $filter_ctrl = $('.extra div[rel=portfolio] div.filter-ctrl'),
		$new_filter_ctrl = $filter_ctrl.clone(true, true),
		$new_filter_links = $new_filter_ctrl.find('a'),
		$items = $('#portfolio > article').clone();

	$(document).on('click', '.b-portfolio-filter a', function (event) {
		event.preventDefault();
		var rel = $(this).attr('rel');

		setActiveFilter($('.b-portfolio-filter'), rel);
		setActiveFilter($new_filter_links, rel);

		applyFilter(rel);
	});

	function setActiveFilter ($filter, rel) {
		$filter
			.find('a')
			.removeClass('active');

		$filter
			.find('a[rel="' + rel + '"]')
			.addClass('active');
	}

	function applyFilter (selector) {
		var $filtered = null;

		if (selector.length) {
			$filtered = $items.filter(selector).clone();
		} else {
			$filtered = $items.clone();
		}

		$filtered.addClass('hidden');
		$('#portfolio article').addClass('hidden');

		setTimeout(function () {
			$('#portfolio')
				.empty()
				.append($filtered);

			setTimeout(function () {
				$('#portfolio article').removeClass('hidden');
				initHover();
			}, 10);
		}, 300);
	}

	function initHover () {
		$('#portfolio article').hover(function() {
				$(this).append($new_filter_ctrl);
			},
			function() {
				$new_filter_ctrl.detach();
			}
		);
	}

	initHover();
	
	// knowledge
	
	var sliderClients;
	var sliderClientsSettings = {
		pager: false,
		mode: 'fade',
		nextText: '',
		prevText: '',
		infiniteLoop: true,
		hideControlOnEnd: true
	};
	
	function fn_sliderClients() {
		sliderClients = $('#knowledge .list ul').bxSlider(sliderClientsSettings);
	};
	
	if ( $(window).width() < 480 ) {
		fn_sliderClients();
	} else if ( $(window).width() >= 480 ) {
		fn_sliderClients();
		sliderClients.destroySlider();
	};
	
	$(window).resize(function () {
		if ( $(window).width() < 480 ) {
			sliderClients.reloadSlider(sliderClientsSettings);
		} else if ( $(window).width() >= 480 ) {
			sliderClients.destroySlider();
		};
	});
	
	// feedback


	
	
	
	
	
	// map
	
	var map, marker;
	var coordinates = new google.maps.LatLng(40.6838513, -73.9728391);
	var mapCanvas = document.getElementById('map');
	
	function map_init() {
		var mapOptions = {
			scrollwheel: false,
			center: coordinates,
			zoom: 13,
			draggable: !('ontouchstart' in document.documentElement),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoomControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			}
		};
		map = new google.maps.Map(mapCanvas, mapOptions);
		map.panTo(coordinates);
		
		var markerOptions = {
			position: coordinates,
			map: map,
		};

		marker = new google.maps.Marker(markerOptions);
	}
	
	function map_center() {
		try {
			map.panTo(coordinates);
		}

		catch (event) {
			console.log('Map error: ', event);
		}
	}
	
	google.maps.event.addDomListener(window, 'load', map_init);
	google.maps.event.addDomListener(window, 'resize', map_center);

	// sliders

	var stepSlider = function () {
		var that = this;

		that.$slider = $('.b-steps-slides');
		that.$slides = that.$slider.children();
		that.activeSlide = 0;
		that.delta = 100;
		that.lastChangeTime = Date.now();
		that.oldScrollPos = $(window).scrollTop();

		$('.header .slider-ctrl a').on('click', function (event) {
			event.preventDefault();
			var index = $(this).data('slide-index');
			that.setActiveSlide(index);
		});

		that.setActiveSlide = function (index) {
			that.$slides
				.eq(index)
				.attr('data-active', 'true')
				.siblings()
				.attr('data-active', 'false');
			that.activeSlide = index;
			$('.header .slider-ctrl a')
				.removeClass('active')
				.eq(index)
				.addClass('active')
		};

		that.next = function () {
			if (that.activeSlide < (that.$slides.length - 1)) {
				that.setActiveSlide(++that.activeSlide);
			} else {
				that.setActiveSlide(0);
			}
		};

		that.prev = function () {
			if (that.activeSlide > 0) {
				that.setActiveSlide(--that.activeSlide);
			} else {
				that.setActiveSlide(that.$slides.length -1);
			}
		};

		that.onWheel = function (event) {
			var scrollPos = $(window).scrollTop(),
				offsetPos = that.$slides.offset().top,
				screenPos = scrollPos + 108 + ($(window).height() - 108) / 2,
				sliderPos = offsetPos + that.$slider.height() / 2,
				direction = -1;

			if (event.type === 'mousewheel') {
				direction = event.deltaY
			} else {
				if (that.oldScrollPos > $(window).scrollTop()) {
					direction = -1;
				} else if (that.oldScrollPos > $(window).scrollTop()) {
					direction = 1;
				}
			}
			that.oldScrollPos = $(window).scrollTop();

			if (Math.abs(screenPos - sliderPos) <= that.delta && (scrollPos + 108) >= offsetPos) {
				if (Math.abs(that.lastChangeTime - Date.now()) < 0) {
					return false;
				} else {
					if (direction > 0 && that.activeSlide > 0) {
						event.stopPropagation();
						event.preventDefault();
						that.lastChangeTime = Date.now();
						that.setActiveSlide(--that.activeSlide);
					} else if (direction < 0 && that.activeSlide < 2) {
						event.stopPropagation();
						event.preventDefault();
						that.lastChangeTime = Date.now();
						that.setActiveSlide(++that.activeSlide);
					}
				}
			}
		};

		that.touchInit = function () {
			$('html').addClass('touch');

			$('#about .control')
				.on('click', function () {
					console.log('test')
					if ($(this).hasClass('next')) {
						that.next();
					} else {
						that.prev()
					}
				});

			$('#about').on( "swipeleft", that.next);
			$('#about').on( "swiperight", that.prev);
		};

		if ($(window).width() >= 480) {
			$('body, html').on('mousewheel', that.onWheel);
		}

		$(window).resize(function () {
			if ($(window).width() >= 960) {
				$('body, html').on('mousewheel', that.onWheel);
			} else {
				$('body, html').off('mousewheel', that.onWheel);
			}
		});

		if ('ontouchstart' in document.documentElement)
			that.touchInit();
	};

	window.slider = new stepSlider();

	slider.setActiveSlide(0);
});