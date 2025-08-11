// Lightweight video hover/tap behavior for project cards
// Expected HTML structure per card:
// <div class="project-card" data-video="videos/demo.mp4" data-poster="images/poster.webp">
//   <img class="project-poster" src="images/poster.webp" alt="..." loading="lazy" />
//   <button class="play-overlay" aria-label="Play preview" hidden></button>
// </div>
(function initProjectVideoCards() {
  function makeVideoEl(src, poster) {
    var v = document.createElement('video');
    v.src = src;
    if (poster) v.poster = poster;
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = 'none';
    v.setAttribute('aria-hidden', 'true');
    v.style.width = '100%';
    v.style.height = '100%';
    v.style.objectFit = 'cover';
    return v;
  }

  function wireCard(card) {
    var src = card.getAttribute('data-video');
    var poster = card.getAttribute('data-poster');
    if (!src) return;

    var posterImg = card.querySelector('.project-poster');
    var video;

    function ensureVideo() {
      if (!video) {
        video = makeVideoEl(src, poster);
        posterImg && posterImg.replaceWith(video);
      }
      return video;
    }

    var isTouch = matchMedia('(hover: none)').matches;

    if (!isTouch) {
      card.addEventListener('mouseenter', function () {
        var v = ensureVideo();
        v.play().catch(function () {});
      });
      card.addEventListener('mouseleave', function () {
        if (video) { video.pause(); try { video.currentTime = 0; } catch (_) {} }
      });
    } else {
      var tapped = false;
      card.addEventListener('click', function (e) {
        if (!tapped) {
          tapped = true;
          var v = ensureVideo();
          v.play().catch(function () {});
          setTimeout(function(){ tapped = false; }, 800);
        } else {
          // Second tap can be used to open details if wired by page
          card.dispatchEvent(new CustomEvent('project:open', { bubbles: true }));
        }
      });
    }
  }

  function init() {
    document.querySelectorAll('.project-card[data-video]').forEach(wireCard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


