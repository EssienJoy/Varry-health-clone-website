import { faqData, professionData, baseReview } from "./modules.js";


// Render professionData
const renderProfessionalData = function () {
  const taglist = document.querySelector('.tag-list');

  const markup = professionData.map(
    data => `
    <li>${data}</li>
    `
  ).join('');;
  taglist.insertAdjacentHTML('afterbegin', markup);
};

renderProfessionalData();


// Professions

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  const scrollers = document.querySelectorAll(".scroller");
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });

  });
}


// Reviews 
const renderReviewsData = function () {
  const reviewsData = Array.from({ length: 10 }, (_, i) => ({
    ...baseReview,
    user: `${baseReview.user}`
  }));

  const reviewBoxes = document.querySelectorAll('.review-box');

  const markup = reviewsData
    .map(
      data => `
      <li class="box">
        <p>${data.review}</p>
        <div class="profile-div">
          <img class="profile-image" src="${data.image}" />
          <p>${data.user}</p>
        </div>
      </li>`
    )
    .join('');


  reviewBoxes.forEach(box => {
    box.insertAdjacentHTML('afterbegin', markup);
  });
};

renderReviewsData();


// Render FAQ data
const renderFaqData = function () {
  const markup = faqData
    .map(
      data => `
      <div class="faq">
        <div class="faq-icon">
          <h3>${data.question}</h3>

          <svg class="minus-svg hidden" xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#f">
            <path d="M280-440h400v-80H280v80Z" />
          </svg>

          <svg class="plus-svg" xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#f">
          <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Z" />
          </svg>
          </div>
          
          <p class="faq-answer hidden">${data.answer}</p>
          <hr />
          </div>
          `
    )
    .join('');
  const faqContainer = document.querySelector('.box2-faq');
  faqContainer.insertAdjacentHTML('afterbegin', markup);

  faqContainer.addEventListener('click', function (e) {
    const clickedFAQ = e.target.closest('.faq');
    if (!clickedFAQ) return;

    const answer = clickedFAQ.querySelector('.faq-answer');
    const minusSvg = clickedFAQ.querySelector('.minus-svg');
    const plusSvg = clickedFAQ.querySelector('.plus-svg');

    const isHidden = answer.classList.contains('hidden');

    if (isHidden) {
      answer.classList.remove('hidden');
      gsap.fromTo(answer,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onComplete() {
            answer.style.height = "auto";
          }
        }
      );
    } else {
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete() {
          answer.classList.add('hidden');
        }
      });
    }

    minusSvg.classList.toggle('hidden');
    plusSvg.classList.toggle('hidden');
  });

};

renderFaqData();


const activateAnimation = function () {

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(".popup",
    { opacity: 0, y: "3rem" },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back.out",
      stagger: 0.2
    }
  );


  const heroImage = document.getElementById("hero-image");

  heroImage.addEventListener("load", () => {
    gsap.to(heroImage, {
      y: "-6rem",
      duration: 3,
      ease: "power3.inOut",
      yoyo: true,
      repeat: -1
    });
  });

  if (heroImage.complete) {
    heroImage.dispatchEvent(new Event("load"));
  }



  document.querySelectorAll('section').forEach(section => {


    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        toggleActions: "play none none none",
      },
      y: "5rem",
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  });

};

activateAnimation();



// GSDevTools.create();
