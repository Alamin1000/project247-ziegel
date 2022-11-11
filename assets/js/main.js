
// GET HEIGHT OF HEADER IN ROOT AS VERIABLE ==========>
const headerArea = document.querySelector('.header-area')
let root = document.documentElement;
let height;
window.addEventListener('resize', ()=>{addHeaderHeight()})
window.addEventListener('load', ()=>{addHeaderHeight()})
function addHeaderHeight() {
	height = headerArea.clientHeight
	root.style.setProperty('--header-h', height + 'px')
}

//========== NICE SELECT ==========>
let selects = document.querySelectorAll('select')
selects.forEach(select => {	
	NiceSelect.bind( select);
});
//========== NICE SELECT// ==========>


// SMOOTH SCROLLBAR INIT ==========>
const scroller = document.querySelector('.scroller');
const bodyScrollBar = Scrollbar.init(scroller, {
    damping: .1
});
ScrollTrigger.scrollerProxy(".scroller", {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  }
});
bodyScrollBar.addListener(ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: scroller });
bodyScrollBar.addListener(({ offset }) => {  
  let y = offset.y
  if (y > 0) {
      headerArea.classList.add('sticky')
  }else{
      headerArea.classList.remove('sticky')
  }
});




// GSAP ANIMATIONS   ==========>

if (document.querySelector('.hero-area')) {  
  // hero content come up fade
  gsap.from('.hero-horiz', {
      autoAlpha: .5,
      scrollTrigger: {
          trigger: '.hero-horiz',
          start: 'top center',
          end: 'center center',
          scrub: 1,
      }
  })
  
  // hero content go left
  let heroHorizCont = gsap.utils.toArray(".hero-horiz .hero-content");
  const heroHorizTl = gsap.timeline({  
    defaults: {ease: 'none'},
    scrollTrigger: {
      trigger: ".hero-horiz",
      start: 'center center',
      end: () => "+=" + document.querySelector('.hero-horiz').clientWidth,    
      pin: true,
      scrub: 1,
    }
  })
  heroHorizTl.to(heroHorizCont, {
      xPercent: -100 * (heroHorizCont.length - 1),
  })
  heroHorizCont.forEach(element => {
    let itemTl = gsap.timeline()
    itemTl.to(element,{
          opacity: .1,
          scrollTrigger: {     
            containerAnimation: heroHorizTl,
            trigger: element,
            start: 'center center',
            end: 'right left',
            scrub: true,
          }
        })
        .fromTo(element,{opacity: 0}, {
          opacity: 1,
          scrollTrigger: {     
            containerAnimation: heroHorizTl,
            trigger: element,
            start: 'left right',
            end: 'center center',
            scrub: true,
          }
        })
  });
  
  
  
  // pin the hero video
  ScrollTrigger.create({
      trigger: '.hero-area',
      start: 'top top',
      end: 'bottom bottom',
      pin: '.hero-video',
  });
  gsap.to('.hero-video',{
    scale: .94,
    marginTop: -30,
    borderRadius: 30,
    scrollTrigger:{
      trigger: '.hero-area',
      start: 'bottom-=20 bottom-=20',
      end: 'bottom bottom',
      scrub: .5,
    }
  });
  
}



// FEATURE HORIZONTAL ANIMATIONS
if (document.querySelector('.feature-area')) {  
  let gsapnMedia = gsap.matchMedia();
  gsapnMedia.add("(min-width: 768px)", () => {

    let featureContents = gsap.utils.toArray(".feature-content");
    
    featureContents.forEach(content => {
      if (content.classList.contains('container')) {
        let style = content.currentStyle || window.getComputedStyle(content)
        let width = content.clientWidth + parseInt(style.paddingLeft) + parseInt(style.paddingRight)
        content.style.maxWidth = width + 'px';
      }
    });

    const featureContTl = gsap.timeline({  
      defaults: {ease: 'none'},
      scrollTrigger: {
        trigger: ".feature-scroller",
        start: 'center center',
        end: () => "+=" + document.querySelector('.feature-scroller').clientWidth,    
        pin: true,
        scrub: 1,
      }
    })
    featureContTl.to(featureContents, {
        xPercent: -100 * (featureContents.length - 1),
    })

    let featureVideo = document.querySelectorAll('.feature-video')
    featureVideo.forEach(vdo => {
      let parent = vdo.closest('.feature-bx')
      let paddingleft = parseInt(window.getComputedStyle(parent, null).getPropertyValue('padding-left'))
      gsap.to(vdo, {
        x: ()=> parent.clientWidth - paddingleft * 2 - vdo.clientWidth,
        scrollTrigger: {
          trigger: parent,
          start: ()=> vdo.clientWidth + ' right',
          end: 'center left',
          scrub: true,
          containerAnimation: featureContTl,
        }
      })
      
    });

  });
  gsapnMedia.add("(max-width: 768px)", () => {
    let featureShadowMaxY = document.querySelector('.feature-area').clientHeight - document.querySelector('.feature-top-shadow').clientHeight
    ScrollTrigger.create({
      trigger: '.feature-top-shadow',
      start: 'top top',
      pin: true,
      end: ()=> "+=" + featureShadowMaxY,
      pinSpacing: false,
    })
  });
}

// BRAND AREA WHITE BG ROUNDED
if (document.querySelector('.brand-area')) {  
  gsap.to('.brand-area', {
    scrollTrigger: {
      trigger: '.brand-area',
      start: 'bottom bottom',
      end: 'bottom center',
      scrub: .5,
    },
    borderRadius: '0 0 3em 3em',
    // marginBottom: '-3em',
  })
}


// HEADER COLOR INVERT ACCORDING TO BACKGROUND
function colorInvertHeader(selector, invert) {
  let header = document.querySelector('.header-area')
  let logoHeight = document.querySelector('.logo').clientHeight + 30
  if (invert) {
    ScrollTrigger.create({
      trigger: selector,
      start: ()=> -logoHeight + ' top',
      onEnter: ()=> header.classList.add('color-invert'),
      onLeaveBack: ()=> header.classList.remove('color-invert'),
    })
  }else{
    ScrollTrigger.create({
      trigger: selector,
      start: ()=> document.querySelector('.feature-top-shadow').clientHeight + ' top',
      onEnter: ()=> header.classList.remove('color-invert'),
      onLeaveBack: ()=> header.classList.add('color-invert'),
    })
  }
}

if (document.querySelector('.feature-area')) {  
  colorInvertHeader('.feature-area', true)
}
if (document.querySelector('.product-area')) {  
  colorInvertHeader('.product-area')
}





// applyLergestheight
window.addEventListener('load',()=>{
  applyLergestheight(document.querySelectorAll('.feature-bx'))
})
window.addEventListener('resize',()=>{
  applyLergestheight(document.querySelectorAll('.feature-bx'))
})
function applyLergestheight(items) {
  const itemheight = []
  items.forEach(item => {
    item.style.height = 'auto'
    itemheight.push(item.getBoundingClientRect().height)
  });
  items.forEach(item => {
    item.style.height = Math.max.apply(null, itemheight) + 'px'
  });
}

// BRAND SLIDER MOVING ANIMATIONS
const brandWrapper = document.querySelectorAll('.brand-slider-wrapper')
function brandMoving(show) {
  brandWrapper.forEach(wrap => {
    let slider = wrap.querySelector('.brand-slider')
    let slide = wrap.querySelectorAll('.brand-slide')
    let slideShow = show;
    let slideWidth = slider.clientWidth / slideShow
    let fullWidth = slideWidth * slide.length
    let timing = 1.8 * (slide.length - slideShow)
    slider.setAttribute('style', `--maxX: ${(fullWidth - slideWidth * slideShow)}px; width: ${fullWidth}px; --time: ${timing}s`)
  });
}
if (window.matchMedia("(min-width: 1200px)").matches) {
  brandMoving(7)
}else if (window.matchMedia("(min-width: 768px) and (max-width: 1199px)").matches) {
  brandMoving(5)
}else{
  brandMoving(2)
}

//  PRODUCT-SLIDER
let product = new Swiper('.product-slider-wrapper', {
  slidesPerView: 1,
  spaceBetween: '4%',
  speed: 1000,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    992: {
      slidesPerView: 3
    },
    768: {
      slidesPerView: 3,
    }
  }
})






// CORRENT MARKER POSITION
if (document.querySelector('.gsap-marker-scroller-start')) {    
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]'); 
  
    bodyScrollBar.addListener(({ offset }) => {  
      let y = offset.y
      gsap.set(markers, { marginTop: -y })
    });
}



// BUTTON EFFECT ==========>
const siteBtn = document.querySelectorAll('.site-btn')
siteBtn.forEach(btn => {
  let span = document.createElement('SPAN')
  btn.appendChild(span)
  let parentOffset = btn.getBoundingClientRect()
	btn.addEventListener('mouseenter', (e)=>{
    parentOffset = btn.getBoundingClientRect()
    btnShapePostion(parentOffset, e)
	})
	btn.addEventListener('mouseout', (e)=>{
    parentOffset = btn.getBoundingClientRect()
    btnShapePostion(parentOffset, e)
	})
  function btnShapePostion(parentOffset, e) {
    relX = e.pageX - parentOffset.left,
    relY = e.pageY - parentOffset.top;
    span.style.left = relX + 'px'
    span.style.top = relY + 'px'
  }
});

// OFFSET MENU LINK ANIMATION 
const menuLinkAnimation = document.querySelectorAll('.offset-menu .mainmenu li')
menuLinkAnimation.forEach((link, index) => {
  link.style.transition = .5 + index / 4 + 's ease'
});


//========== HEADER SEARCH ==========>
const headerSeach = document.querySelector('.header-search')
headerSeach.addEventListener('click', ()=>{
  if (!headerSeach.classList.contains('active')) {
    headerSeach.classList.add('active')
  }
})
window.addEventListener('click', (e)=>{
  let target = e.target;
  if (!target.closest('.header-search')) {
    headerSeach.classList.remove('active')
  }
})

//========== HEADER SEARCH// ==========>

//========== OFFSET MENU ==========>
let bars = document.querySelectorAll('.bar')
bars.forEach(btn => {
  btn.addEventListener('click', ()=>{
    let wrap = document.querySelector('.offset-menu')
    wrap.classList.toggle('active')
    for (let i = 0; i < bars.length; i++) {
      bars[i].classList.toggle('active')
    }
  })
});
window.addEventListener('click', (e)=>{
  let target = e.target
  if (!target.closest('.bar') && !target.closest('.offset-menu')) {
    let wrap = document.querySelector('.offset-menu')
    wrap.classList.remove('active')
    for (let i = 0; i < bars.length; i++) {
      bars[i].classList.remove('active')
    }
  }
})
//========== OFFSET MENU// ==========>

//========== PRELOADER ==========>
const preloader = document.querySelector('.preloader')
window.addEventListener("load", ()=>{
	preloader.classList.add('hidden')
  
  gsap.from('.hero-content-1 .section-content > *', {
      y: 50,
      scale: .7,
      rotationX: -45, 
      duration: 1,
      stagger: .05,
    }
  )
})
//========== PRELOADER// ==========>


// FOLLOW MOUSE POITER CIRCLE ==========>
document.addEventListener('DOMContentLoaded', () => {
    let mousePosX = 0,
        mousePosY = 0,
        mouseCircle = document.getElementById('mouse-circle');

    document.onmousemove = (e) => {
        mousePosX = e.clientX;
        mousePosY = e.clientY;
    }
    window.onmouseover = (e) => {
      mouseCircle.classList.add('entered')
      if (e.target.closest('a, button, input, .nice-select')) {
        mouseCircle.classList.add('entered-sm')
      }
    }
    window.onmouseout = (e) => {
      mouseCircle.classList.remove('entered')
      if (!e.target.closest('a, button, input, .nice-select')) {
        mouseCircle.classList.remove('entered-sm')
      }
    }

    let delay = 5,
        revisedMousePosX = 0,
        revisedMousePosY = 0;


    function delayMouseFollow() {
        requestAnimationFrame(delayMouseFollow);

        revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
        revisedMousePosY += (mousePosY - revisedMousePosY) / delay; 

        mouseCircle.style.left = revisedMousePosX + 'px';
        mouseCircle.style.top = revisedMousePosY + 'px';
    }
    delayMouseFollow();
});
  

// custom tab
const popupCate = document.querySelectorAll('.popup-cate')
tabFunc(document.querySelectorAll('.popup-btn'), popupCate)
function tabFunc(tabLinks, tabs) {
  tabLinks.forEach((link, index) => {
    link.addEventListener('click', ()=>{
      for (let i = 0; i < tabLinks.length; i++) {
        tabs[i].classList.remove('active')
        tabs[index].classList.add('active')
      }
    })
  });
}


// DROPDOWN 
const dropdown = document.querySelectorAll('.dropdown')
dropdown.forEach(el => {
  el.addEventListener('mouseover', ()=>{
    el.classList.add('active')
  })
  el.addEventListener('mouseout', ()=>{
    el.classList.remove('active')
  })
});



// POPUP TAB CHANGE WITH FORM CONDITION
popupCate.forEach( cate => {
  let backBtn = cate.querySelector('.back-btn')
  let nextBtn = cate.querySelector('.next-btn')
  let tabs = cate.querySelectorAll('.popup-tab')
  let allInput = cate.querySelectorAll('input')
  let form = cate.querySelector('form')
  let counter = 0;

  backBtn.addEventListener('click', ()=>{
      counter--
      changePopupbx(counter)
  })
  nextBtn.addEventListener('click', ()=>{    

      if (filledInput(counter)) {
        if (counter >= tabs.length - 2) {
          form.submit();
          setTimeout(() => {
            cate.classList.remove('active')
          }, 2500);
        }
        counter++
        changePopupbx(counter)
      }

  } )

  allInput.forEach(input => {
    input.addEventListener('input', ()=>{
      input.classList.remove('error')
    })
  });

  function changePopupbx(counter) {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active')
    }
    if (counter <= 0) {
      backBtn.classList.remove('active')
    }else if(counter >= tabs.length - 1){      
      backBtn.classList.remove('active')
      nextBtn.classList.remove('active')
    }else{  
      backBtn.classList.add('active')
    }

    tabs[counter].classList.add('active')
  }

  function filledInput(counter) {
    let valid = true;
    let tab = tabs[counter]
    let inputs = tab.querySelectorAll('input')
    inputs.forEach(input => {      
      let value = input.type != 'checkbox' ? input.value : input.checked
      if (value == "" || !value) {
        input.classList.add('error')
        valid = false
      }else{
        input.classList.remove('error')
      }
    });
    return valid
  }

} )

function tabFuncNext(tabLinks, tabs) {
  tabLinks.forEach((link, index) => {
    link.addEventListener('click', ()=>{
      for (let i = 0; i < tabLinks.length; i++) {
        tabs[i].classList.remove('active')
        tabs[index + 1].classList.add('active')
      }
    })
  });
}

// popup open  
let popupWrap = document.querySelector('.popup-box')
const popupBtn = document.querySelectorAll('.popup-btn')
popupBtn.forEach(btn => {
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    popupWrap.classList.add('active')
  })
});
window.addEventListener('click', (e)=>{
  let target = e.target;
  if (!target.closest('.popup-box') && !target.closest('.popup-btn')) {
    popupWrap.classList.remove('active')
  }
})


// MAP
function initMap() {
  const center = { lat: 28.104071, lng: -15.4173549 };
  const image = "https://ziegel.laravelthewebartisan.com/images/map_pin.png";
  const mapOptions = {
      zoom: 16,
      gestureHandling: "cooperative",

      center: new google.maps.LatLng(center.lat,  center.lng),
      styles : [ //https://mapstyle.withgoogle.com/
          {
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#212121"
                  }
              ]
          },
          {
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#757575"
                  }
              ]
          },
          {
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "color": "#212121"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#757575"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#9e9e9e"
                  }
              ]
          },
          {
              "featureType": "administrative.land_parcel",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#bdbdbd"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#757575"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#181818"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#616161"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "color": "#1b1b1b"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#2c2c2c"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#8a8a8a"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#373737"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#3c3c3c"
                  }
              ]
          },
          {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#4e4e4e"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#616161"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#757575"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#3d3d3d"
                  }
              ]
          }
      ]
  };
  const map = new google.maps.Map(
      document.getElementById("map"),
      mapOptions
  );
  const marker = new google.maps.Marker({
      position: {
          lat: center.lat,
          lng: center.lng,
      },
      map: map,
      icon: image
  });

      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('localization'),
        {
            // https://developers.google.com/maps/documentation/places/web-service/supported_types
            types: ['administrative_area_level_2', 'administrative_area_level_1'],
            componentRestrictions: {'country': ['ES']},
            fields: ['place_id', 'address_components', 'name', 'geometry']  
        }
      );

      autocomplete = new google.maps.places.Autocomplete(
        document.querySelector('.autocomplete'),
        {
            // https://developers.google.com/maps/documentation/places/web-service/supported_types
            types: ['administrative_area_level_2', 'administrative_area_level_1'],
            componentRestrictions: {'country': ['ES']},
            fields: ['place_id', 'address_components', 'name', 'geometry']
        }
      );

  // autocomplete.addListener('place_changed', onPlaceChanged);
          }