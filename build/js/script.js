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
  $('.user-list').length && getInfo();
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


function getInfo() {
  const request = new Request('https://squad-runners.in.ua/api/users/all');
  const myList = document.querySelector('.user-list');
  myList.classList.add('loader');
  fetch(request)
  .then(response => {
    
    if (response.status === 200) {      
      return response.json();      
    } else {
      throw new Error('Что-то пошло не так на API сервере.');
    }
  })
  .then(response => {
    myList.classList.remove('loader');
    for (var i = 0; i < 10; i++) {
      var listItem = document.createElement('li');
      listItem.classList.add('user-item');
      listItem.innerHTML = `<a class="user-link" href="/users/642/info">
                            <div class="user-info">
                              <span class="user-index">${i+1}</span>
                              <div class="user-img">
                                <img src="${response[i].avatar}">
                              </div>
                              <span>${response[i].fullname}</span>
                              <span class="user-team">${response[i].teamName}</span>
                            </div>
                            <span class="user-distance">${response[i].kilometersThisMonth}<span>км</span></span>
                          </a>`
      myList.appendChild(listItem);
    }
  }).catch(error => {
    console.error(error);
  });
}