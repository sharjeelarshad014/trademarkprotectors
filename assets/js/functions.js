var winWidth = $(window).width(),
popCls,
readHTMLFile,
ccount = 0;

$(function () {
	// Do after Page ready
	doOnReady();
});

$(window).on('load', function () {
	// Do after Page ready
	doOnLoad();
});

$(window).on('resize orientationchange', function () {
	// Do on resize
	doOnResize();
});

$(window).on('scroll', function () {
	// Do on scroll
	doOnScroll();
});

$(document).keyup(function (e) {
	if (e.keyCode == 27) {
		// Do on ESC press
	}
});

function doOnReady() {
	// OnReady Functions
	AOS.init();
	smoothScrolling();
	initHtmlReader();
	initCarousel('.js-slide1', 1, 1, false, false, false, 1000);
	initCarousel('.js-slide2', 5, 1, true, true, false, 1000);
	initCarousel('.js-slide3', 6, 1, true, true, true, 2000);
	initCarousalNavFor('.js-navforimg-slider', 1, '.js-novfortxt-slider', 1, false);
	headerFixed();
	parallaxeffect('.js-parallax');
	targetScroll();
	tabsInit();
	acordianInit();
	initTimer('.js-timer');
	changeToSvg();
	getCopyYear();
	checkviewport('.js-viewport');
	initEqualHeight();
	bindPopupEve();
	initToggleClass('.ac-hold','is--active','.pAc-hold');
	initMenuActive('.js-menu');
	initMobileMenuDropDown();
	showMoreless('.js-mkfootaccor', '.js-expand-btn', 8, 'li', 'Hide All', 'View More');
	$('body').on('click', '.js-menubtn:not(.is--active)', function () {
		sideMenuOpen();
	}).on('click', '.js-menubtn.is--active', function () {
		sideMenuClose();
	}).on('click', '.js-menuclose', function () {
		sideMenuClose();
	}).on('click touchstart', '.js-defaultOverlay', function () {
		sideMenuClose();
	}).on('click', '.js-dropdownbtn:not(.is--active)', function () {
        dropdownclose();
        dropdownopen($(this));
    }).on('click', '.js-dropdownbtn.is--active', function () {
        dropdownclose();
    }).on('click', function (e) {
        var gdd = $('.dropdown-box');
        if (!gdd.is(e.target) && gdd.has(e.target).length === 0) {
            dropdownclose();
        }
    }).on('click', '.js-menuOpen', function() {
		$('.js-menuOpen').toggleClass('is-open');
	});
}

function doOnLoad() {
	// OnLoad Functions
	AOS.init();
	headerFixed();
	changeToSvg();
	activeLink();
    initEqualHeight();
	checkviewport('.js-viewport');
	initHtmlAppender('.js-reanderhtml');
	$('.js-loaderscreen').fadeOut();
}

function doOnResize() {
	// OnResize Functions
	winWidth = $(window).width(), winHeight = $(window).height();
	initEqualHeight();
	targetScroll();
	initMenuActive('.js-menu');
	changeToSvg();
}

function doOnScroll() {
	// OnScroll Functions
	headerFixed();
	parallaxeffect('.js-parallax');
	checkviewport('.js-viewport');
	initMenuActive('.js-menu');
	initHtmlAppender('.js-reanderhtml');
}

function changeToSvg() {
	jQuery('img.js-tosvg').each(function () {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		jQuery.get(imgURL, function (data) {
			var $svg = jQuery(data).find('svg');
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}
			$svg = $svg.removeAttr('xmlns:a');
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			}
			$img.replaceWith($svg);
		}, 'xml');
	});
}

function sideMenuOpen() {
	$('.js-menubtn').addClass('is--active');
	$('.navigation').not('.is--open').addClass('is--open');
	$('body').addClass('is--menu');
}

function sideMenuClose() {
	$('.js-menubtn').removeClass('is--active');
	$('.navigation.is--open').removeClass('is--open');
	$('body').removeClass('is--menu');
}

function tabsInit() {
    $('body').on('click', '.js-tab-link', function(e) {
        e.preventDefault();
        var $this = $(this);
        var targetId = $this.attr('data-tab-id');
        var tabsName = $this.attr('data-tab-name');
        $('[data-tab-name="'+tabsName+'"]').removeClass('is--active');
        // $this.addClass('is-active');
        $('[data-tab-id="'+targetId+'"][data-tab-name="'+tabsName+'"]').addClass('is--active');
        $('.tab-'+targetId+'[data-tab-name="'+tabsName+'"]').addClass('is--active');
    });
}

function acordianInit() {
    $('body').on('click','.js-accor-link:not(.is-active)',function(e) {
        e.preventDefault();
        var $this = $(this);
        var targetId = $this.attr('data-accor-id');
        var accorsName = $this.attr('data-accor-name');
        $('[data-accor-name="' + accorsName + '"]').removeClass('is-active');
        $('[data-accor-name="' + accorsName + '"]').parents('.accor-row').removeClass('open-acordian');
        $this.addClass('is-active');
        $this.parents('.accor-row').addClass('open-acordian');
        $this.parents('.accor-row').next('.accor-'+targetId).addClass('is-active');
    }).on('click','.js-accor-link.is-active',function(e) {
        e.preventDefault();
        var $this = $(this);
        var targetId = $this.attr('data-accor-id');
        $this.removeClass('is-active');
        $this.parents('.accor-row').removeClass('open-acordian');
        $this.parents('.accor-row').next('.accor-'+targetId).removeClass('is-active');
    });
}

function initCarousel(target, stshow, stscroll, centerstatus, dotstatus, autoPlay, slideSpeed) {
	var $target = $(target).not('.slick-initialized');
	$target.each(function (i, e) {
		var $e = $(e);
		var itemDesktop = $e.data('item-desktop');
		var itemIpadPro = $e.data('item-ipad-pro');
		var itemTablet = $e.data('item-tablet');
		var itemMobile = $e.data('item-mobile');
		var sliderArrows = $e.parents('.carousel-sec').find('.js-sliderArrows');
		var sliderDots = $e.parents('.carousel-sec').find('.js-sliderDots');
		var sliderArrowLeft = $e.parents('.carousel-sec').find('.js-sliderArrows').data('arrow-left');
		var sliderArrowsRight = $e.parents('.carousel-sec').find('.js-sliderArrows').data('arrow-right');
		var bannerPrev = '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><i class="'+sliderArrowLeft+'"></i></button>';
		var bannerNext = '<button class="slick-next slick-arrow" aria-label="Next" type="button"><i class="'+sliderArrowsRight+'"></i></button>';
		$e.slick({
			infinite: true,
			slidesToShow: stshow,
			slidesToScroll: stscroll,
			appendArrows: sliderArrows,
			appendDots: sliderDots,
			prevArrow: bannerPrev,
            nextArrow: bannerNext,
			centerMode: centerstatus,
			centerPadding: '60px',
			dots: dotstatus,
			autoplay: autoPlay,
			autoplaySpeed: 0,
			speed: slideSpeed,
			cssEase: 'linear',
			responsive: [{
				breakpoint: 1600,
				settings: {
					slidesToShow: itemDesktop
				}
			}, {
				breakpoint: 992,
				settings: {
					slidesToShow: itemIpadPro
				}
			}, {
				breakpoint: 768,
				settings: {
					slidesToShow: itemTablet
				}
			}, {
				breakpoint: 375,
				settings: {
					slidesToShow: itemMobile
					// arrows: false,
					// dots: true
				}
			}]
		});
	});
}

function initCarousalNavFor(target, slideShowFor, targetNavFor, slideShowNav, centerStatus) {
    var $target = $(target).not('.slick-initialized');
    var $targetNav = $(targetNavFor).not('.slick-initialized');
    $target.on('init', function (event, slick, direction) {
        console.log(slick.currentSlide + 1, slick.$slides.length);
    });
    $target.each(function (i,e) {
		var $e = $(e);
		var sliderArrows = $e.parents('.carousel-navfor').find('.js-sliderArrows');
		var sliderArrowLeft = sliderArrows.data('arrow-left');
		var sliderArrowsRight = sliderArrows.data('arrow-right');
		var bannerPrev = '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><i class="' + sliderArrowLeft + '"></i></button>';
		var bannerNext = '<button class="slick-next slick-arrow" aria-label="Next" type="button"><i class="' + sliderArrowsRight + '"></i></button>';
        $e.slick({
            slidesToShow: slideShowFor,
            slidesToScroll: 1,
            appendArrows: sliderArrows,
            prevArrow: bannerPrev,
            nextArrow: bannerNext,
            dots: false,
            fade: true,
            asNavFor: targetNavFor,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }, {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    });
    $targetNav.each(function (i,e) {
		var $e = $(e);
        $e.slick({
            slidesToShow: slideShowNav,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            asNavFor: target,
            centerMode: centerStatus,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }, {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    });
    $target.on('afterChange', function (event, slick, direction) {
        console.log(slick.currentSlide + 1, slick.$slides.length);
        var slickCurrentSlide = slick.currentSlide + 1;
        var slickTotal = slick.$slides.length;
        $('.js-count-text').text('Video ' + slickCurrentSlide + ' of ' + slickTotal);
    });
}

function headerFixed() {
    var scroll = $(window).scrollTop();
	var headerht = $('.header').outerHeight();
	if (scroll > headerht) {
		$('.js-fixed').addClass("sticky-header");
	} else {
		$('.js-fixed').removeClass("sticky-header");
	}
}

function parallaxeffect(target){
	$(target).css('background-position', "-" + (1920 - $(window).width()) / 2 + "px " + -(Math.max(document.body.scrollTop, document.documentElement.scrollTop) / 4) + "px");
}

function targetScroll() {
    $('[data-scrollbtn]').on('click',function () {
		var t = $(this).data('scrollbtn'),
			o = $('[data-scrolltarget='+t+']'),
			oTop = 0;
		if(winWidth < 992){
			oTop = o.attr('data-md-ofsettop');
		} else {
			oTop = o.attr('data-ofsettop');
		}
		if(oTop){
			$('html,body').stop().animate({
				scrollTop: o.offset().top - oTop
			}, 500, 'swing');
		} else {
			$('html,body').stop().animate({
				scrollTop: o.offset().top
			}, 500, 'swing');
		}
	});
}

function initTimer(target){
	var self = $(target);
	if(self.length){
		if (self.isInViewport()) {
			if(ccount == 0){
				self.countTo();
			}
			ccount = 1;
		}
	}
}

function activeLink(){
	var currentUrl = window.location.pathname;
	$('[href="'+currentUrl+'"]').parent('li').siblings().removeClass('is--active');
	$('[href="'+currentUrl+'"]').parent('li').addClass('is--active');
}

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function checkviewport(target){
	var $target = $(target);
	$target.each(function (i, ele) {
		var $ele = $(ele);
		if ($ele.isInViewport()){
			$ele.addClass('isOnScreen');
		} else {
			$ele.removeClass('isOnScreen');
		}
	});
}

function getCopyYear() {
    var copyright = new Date().getFullYear();
    $(".copyrightyear").text(copyright);
}

function openPopup(target) {
    var popnam = target;
    popCls = popnam.substring(1, popnam.length);
    $('body').addClass(popCls);
    $('html').addClass('popup-is-active');
    $(target).show();
    $(target).closest('.c-popup').show();
    setTimeout(function() {
        $(target).addClass('active');
        $(target).closest('.c-popup').addClass('popup--open');
    }, 10);
}

function closePopup() {
    $('body').removeClass(popCls);
    if ($('.c-popup .active').length) {
        // Close Popup
        $('.c-popup .active').removeClass('active');
        $('.c-popup').removeClass('popup--open');
        setTimeout(function() {
            $('.c-popup .popup').hide();
            $('.c-popup').hide();
            $('html').removeClass('popup-is-active');
        }, 310);
    }
}

// function closePopup() {
// 	if ($('.c-popup.popup--open').length) {
// 		$('body').removeClass(popCls);
// 		$('.'+popCls).removeClass('active');
// 		console.log(popCls);
//         // Close Popup
//         //$('.c-popup .active').removeClass('active');
//         $('.c-popup').removeClass('popup--open');
//         setTimeout(function() {
//             $('.c-popup .popup').hide();
//             $('.c-popup').hide();
//             $('html').removeClass('popup-is-active');
//         }, 310);
//     }
// }

function closeSelfPopup(target) {
    var self = $(target.currentTarget); 
    $('body').removeClass(popCls);
    self.parent('.popup').removeClass('active');
    setTimeout(function() {
        self.parent('.popup').hide();
        if($('.popup').hasClass('active') == false){
            $('.c-popup').removeClass('popup--open');
            $('.c-popup').hide();
            $('html').removeClass('popup-is-active');
        }
    },310);
}

function bindPopupEve() {
    // Popup Open
    $('.js-popup-link').on('click', function(e) {
        e.preventDefault();
        if ($(this).data('popup')) {
            var target = $(this).data('popup');
        } else {
            var target = $(this).attr('href');
        }
        openPopup(target);
        ChangeToSvg();
    });
    // Popup Close
    $('.js-close-popup').on('click', function(e) {
        e.preventDefault();
        closePopup();
    });
    $('.js-close-selfpopup').on('click', function(e) {
        e.preventDefault();
        closeSelfPopup(e);
    });
}

function dropdownopen(target) {
    $('body').addClass('is--dropdown');
    $(target).addClass('is--active');
    $(target).parent('.dropdown-box').addClass('show-dd');
}

function dropdownclose() {
    $('body').removeClass('is--dropdown');
    $('.js-dropdownbtn').removeClass('is--active');
    $('.js-dropdownbtn').parent('.dropdown-box').removeClass('show-dd');
}

function initEqualHeight(){
    $('.js-eqRow').each(function(){  
        var highestBox = 0;
        $('.js-eqColumn', this).each(function(){
            var htmlString = $( this ).html();
            $(this).height('auto');
            if($(this).height() > highestBox) 
                highestBox = $(this).height(); 
        });  
        $('.js-eqColumn',this).height(highestBox);
    }); 
}

function initToggleClass(targrt,tClass,tParent){
    $('body').on('click',targrt,function(){
        var self = $(this);
		self.parents(tParent).toggleClass(tClass);
        self.toggleClass(tClass);
    });
}

function initMenuActive(target) {
	var sections = $('[data-scrolltarget]'),
		nav = $(target),
		nav_height = nav.outerHeight(),
		sec_pos = $(this).scrollTop(),
		oTop = 0,
		top,
		bottom,
		winWidth = $(window).width();
	sections.each(function(i,e) {
		var $e = $(e);
		if(winWidth < 992){
			oTop = $e.attr('data-md-ofsettop');
		} else {
			oTop = $e.attr('data-ofsettop');
		}
		if(oTop){
			top = $e.offset().top - (nav_height + parseInt(oTop));
		} else {
			top = $e.offset().top - nav_height;
		}
		bottom = top + $e.outerHeight();
		if (sec_pos >= top && sec_pos <= bottom) {
			nav.find('li').removeClass('is--active');
			sections.removeClass('is--oTop');
			$e.addClass('is--oTop');
			nav.find('[data-scrollbtn="'+$e.attr('data-scrolltarget')+'"]').parent('li').addClass('is--active');
		}
	});
}

function initMobileMenuDropDown(){
	$('body').on('click','.js-mbddbtn:not(.is--active)',function(){
		$this = $(this);
		$this.addClass('is--active');
		$this.parents('.navigation').find('.dropdown-main').removeClass('dd--show');
		$this.parent('li').find('.dropdown-main').addClass('dd--show');
	}).on('click','.js-mbddbtn.is--active',function(){
		$this = $(this);
		$this.removeClass('is--active');
		$this.parent('li').find('.dropdown-main').removeClass('dd--show');
	});
}

function initHtmlReader(){
	readHTMLFile = function(url){
		var toReturn;
		$.ajax({
			url: url,
			async: false
		}).done(function(data){
			toReturn = data;
		});
		return toReturn;
	};
}

function initHtmlAppender(target){
	var $target = $(target);
	if($target.attr('data-htmlreander')){
		if(readHTMLFile != undefined){
			$.appSection = function(url){
				fileContent = readHTMLFile(url);
				initAppendFile(fileContent, url);
			};
			$target.each(function (i, ele){
				var $ele = $(ele);
				if ($ele.isInViewport()){
					var htmlreander = $ele.attr('data-htmlreander');
					if(htmlreander != ''){
						$.appSection(htmlreander);
						$ele.attr('data-htmlreander','');
					}
				}
			});
		}
	}
}

function initAppendFile(content, target){
	$('[data-htmlreander="'+target+'"]').append(content);
	$('[data-htmlreander="'+target+'"] > div,[data-htmlreander="'+target+'"] > section').unwrap();
	setTimeout(function(){
		// initCarousel('.js-slide1', 3, 1, false, false);
	},100);
}

function showMoreless(target, targetbtn, show, find, htxt, stxt){
	var $target = $(target);
	$target.find(find).each((i,e)=>{
		var $e = $(e);
		$e.hide();
		if($e.index() < show){
			$e.slice(0, show).show();
		}
	});
	$target.find(targetbtn).attr('data-exp-total-count', show);
    $('body').on('click',targetbtn+':not(.hideall)' ,function (e) {
		var self = $(this);
		var exptotalcount = 0;
		var showmore = self.data('expand-count');
		exptotalcount = parseInt(self.attr('data-exp-total-count'));
		var fndlth = self.parents(target);
		fndlth.each((o,p)=>{
			if(fndlth.find(find+':hidden').length <= showmore){
				var x=exptotalcount;
				e.preventDefault();
				x = x+fndlth.find(find+':hidden').length;
				self.attr('data-exp-total-count',x);
				fndlth.find(find).slice(0, x).slideDown();
				self.find('span').text(htxt);
				self.addClass('hideall');
			} else {
				var x=exptotalcount;
				e.preventDefault();
				x = x+showmore;
				self.attr('data-exp-total-count',x);
				fndlth.find(find).slice(0, x).slideDown();
				self.find('span').text(stxt);
			}
		});
    }).on('click',targetbtn+'.hideall' ,function (e) {
		var self = $(this);
		var fndlth = self.parents(target);
		fndlth.find(find).each((i,e)=>{
			var $e = $(e);
			$e.hide();
			if($e.index() < show){
				$e.slice(0, show).show();
			}
		});
		self.attr('data-exp-total-count', show);
		self.removeClass('hideall');
		self.find('span').text(stxt);
	});
}

function smoothScrolling() {
	var scrollSpeed = 900; // Higher number for slower scroll
    var scrollDuration = 1000; // Duration for the scroll animation

    // Mouse wheel smooth scroll
    $(window).on("mousewheel DOMMouseScroll", function (event) {
        // Prevent default scrolling
        event.preventDefault();

        // Determine the scrolling direction
        var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
        var scrollTop = $(window).scrollTop();
        var finalScroll = scrollTop - (delta * scrollSpeed / 120);

        // Smooth scroll animation
        $("html, body").stop().animate({
            scrollTop: finalScroll
        }, scrollDuration, "easeOutCubic"); // Easing function for smooth scroll
    });
}
	