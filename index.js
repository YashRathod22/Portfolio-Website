const heroSection = document.querySelector(".section-hero");

// ========================================
// creating a responsive navbar component
// ========================================

const mobile_nav = document.querySelector(".mobile-navbar-btn");
const headerElem = document.querySelector(".header");

mobile_nav.addEventListener("click", () => {
  headerElem.classList.toggle("active")
});

// ========================================
// creating a sticky responsive navbar component
// ========================================

const observer = new IntersectionObserver((entries) => {
  const ent = entries[0];
  // console.log(ent);
  !ent.isIntersecting
    ? document.body.classList.add("sticky")
    : document.body.classList.remove("sticky");
}, { root: null, threshold: 0 })

observer.observe(heroSection);

// ========================================
// creating a portfolio tabbed component
// ========================================

const p_btns = document.querySelector(".p-btns");
const p_btn = document.querySelectorAll(".p-btn");
const p_img_elem = document.querySelectorAll(".img-overlay");

p_btns.addEventListener("click", (e) => {
  const p_btn_clicked = e.target;
  console.log(p_btn_clicked);

  if (!p_btn_clicked.classList.contains("p-btn")) return;

  p_btn.forEach((curElem) => curElem.classList.remove("p-btn-active"));

  p_btn_clicked.classList.add("p-btn-active");

  // to find the number in data attr
  const btn_num = p_btn_clicked.dataset.btnNum; 
  console.log(btn_num);

  const img_active = document.querySelectorAll(`.p-btn--${btn_num}`);

  p_img_elem.forEach((curElem) => curElem.classList.add("p-image-not-acitve"));

  img_active.forEach((curElem) =>
    curElem.classList.remove("p-image-not-acitve")
  );
});

// swiper js code

new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const myJsMedia = (widthSize) => {
  if (widthSize.matches) {
    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
    });
  } else {
    new Swiper(".mySwiper", {
      slidesPerView: 2,
      spaceBetween: 30,
    });
  }
}

const widthSize = window.matchMedia("(max-width: 780px)");
// Call listener function at run time
myJsMedia(widthSize);

// Attach listener function on state change
widthSize.addEventListener('change', myJsMedia);

// Scroll to top button
const scrollElement = document.createElement("div");

const footerElement = document.querySelector(".section-footer");
scrollElement.classList.add("scrollTop-style");
scrollElement.innerHTML = `<ion-icon name="arrow-up" class="scroll-top"></ion-icon>`;

footerElement.after(scrollElement);

const scrollTop = () => {
  heroSection.scrollIntoView({ behavior: "smooth" })
}

scrollElement.addEventListener("click", scrollTop);


const workSection = document.querySelector(".section-work-data");
const workObserver = new IntersectionObserver((entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Animate numbers
  const counterNum = document.querySelectorAll(".counter-numbers");
  const speed = 200;

  counterNum.forEach((curElem) => {
    const updateNum = () => {
      const targetNumber = parseInt(curElem.dataset.number);
      // console.log(targetNumber);
      const initialNum = parseInt(curElem.innerText);
      // console.log(initialNum);
      const incrementNum = Math.trunc(targetNumber / speed);
      // console.log(incrementNum);

      if (initialNum < targetNumber) {
        curElem.innerText = `${initialNum + incrementNum}+`;
        setTimeout(updateNum, 10);
      }

    }

    updateNum();
  });

  observer.unobserve(workSection);

}, {
  root: null,
  threshold: 0,

});

workObserver.observe(workSection);