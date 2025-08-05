$(document).ready(function () {
  $(function () {
    const $track = $('.carousel-track');
    const $slides = $('.carousel-slide');
    const $dotsContainer = $('.carousel-dots');
    let currentIndex = 0;
    const totalSlides = $slides.length;
    let autoPlayInterval;

    // Create dots
    $slides.each((i) => {
      $dotsContainer.append(`<div class="dot" data-index="${i}"></div>`);
    });
    const $dots = $('.dot');
    $dots.eq(0).addClass('active');

    function goToSlide(index) {
      const offset = index * 100;
      $track.css('transform', `translateX(-${offset}%)`);
      $dots.removeClass('active').eq(index).addClass('active');
      currentIndex = index;
    }

    $dots.on('click', function () {
      goToSlide($(this).data('index'));
    });

    function autoPlay() {
      autoPlayInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % totalSlides;
        goToSlide(nextIndex);
      }, 3000);
    }

    autoPlay();

    // Swipe Support
    let startX = 0;
    let isSwiping = false;

    $('#carousel')
      .on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
        isSwiping = true;
        clearInterval(autoPlayInterval);
      })
      .on('touchmove', function (e) {
        if (!isSwiping) return;
        const touchX = e.originalEvent.touches[0].clientX;
        const diff = startX - touchX;

        if (Math.abs(diff) > 50) {
          isSwiping = false;
          if (diff > 0) {
            // Swipe left
            goToSlide((currentIndex + 1) % totalSlides);
          } else {
            // Swipe right
            goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
          }
        }
      })
      .on('touchend', function () {
        autoPlay(); // resume autoplay
      });
  });
  });