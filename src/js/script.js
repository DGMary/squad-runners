$(document).ready(function () {
  let promoSwiper = new Swiper(".js-slider-races .swiper-container", {
    loop: false,
    watchOverflow: true,
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      400: {
        slidesPerView: 1.5,
        spaceBetween: 30,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 40,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 40,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    },
  });

  /* scroll to top */
  $(window).scroll(function () {
    if ($(this).scrollTop() > 80) {
      $('.header').addClass('fixed');
    } else {
      $('.header').removeClass('fixed');
    }
    if ($(this).scrollTop() > 220) {
      $('.back-to-top').fadeIn(500);
    } else {
      $('.back-to-top').fadeOut(500);
    }
  });
  // btn-up
  $(document).on('click', '.back-to-top', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500);
      return false;
  });

  burgerToggle();
  function burgerToggle() {
    let $body = $('body'),
        $bg = $('.bg');
  
    $(document).on('click', '.js-toggle-menu', function () {
      if ($(this).parents('body').hasClass('opened-burger')) {
        $(this).parents('body').removeClass('opened-burger');
        $bg.removeClass('active');
      } else {
        $(this).parents('body').addClass('opened-burger');
        $bg.addClass('active');
      }
    })
  
    $(document).on('click', '.bg', function () {
      if ($body.hasClass('opened-burger')) {
        $body.removeClass('opened-burger');
        $(this).removeClass('active');
      }
    });
  }
  
  $('.countdown').final_countdown();
});

$(window).on('resize', function () {
  let windowWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    $body = $('body'),
    $bg = $('.bg');

  if (windowWidth >= 769 && $body.hasClass('opened-burger')) {
    $body.removeClass('opened-burger');
    $bg.removeClass('active');
  }

}).trigger('resize');

function initCountdown() {
  $(".countdown").each(function () {
    $(this).countdown($(this).data("date"), function (event) {
      var days = $(this).data("days");

      $(this).html(
        event.strftime(
          `<div class="days timer">
              <span class="count">%D</span>
              <svg class="sc-gipzik eWSWRV"><path fill="none" stroke="#777" stroke-width="2" stroke-linejoin="round" d="M 59.904006939875586 5.0000837697691765 A 55 55 0 1 0 60 5"></path><path fill="none" stroke="#ffe928" stroke-width="10" stroke-linejoin="round" d="M 107.63139720814414 87.5 A 55 55 0 0 0 60 5"></path></svg>
              <span class="label"> ${days} </span>              
            </div>
            <div class="hours timer">
              <span class="count"> %H : </span>                          
            </div>
            <div class="minutes timer">
              <span class="count"> %M : </span>              
            </div>
            <div class="seconds timer">
              <span class="count"> %S </span>              
            </div>`
        )
      );
    });
  });
}