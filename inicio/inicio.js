let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let thumbnails = document.querySelectorAll(".thumbnail .item");

// config param
let countItem = items.length;
let itemActive = 0;

// event next click
next.onclick = function () {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
};

//event prev click
prev.onclick = function () {
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider();
};

// auto run slider
let refreshInterval = setInterval(() => {
  next.click();
}, 10000);

function showSlider() {
  // remove item active old
  let itemActiveOld = document.querySelector(".slider .list .item.active");
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
  itemActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");

  // active new item
  items[itemActive].classList.add("active");
  thumbnails[itemActive].classList.add("active");

  // clear auto time run slider
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 10000);
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});

function toggleHeaderClass() {
  var header = document.getElementById("header");
  header.classList.toggle("bg-gray-950", window.scrollY > 0);
}

// Ejecutar la función inmediatamente al cargar la página
toggleHeaderClass();

// Y también en cada evento de desplazamiento
window.addEventListener("scroll", toggleHeaderClass);

document.querySelectorAll(".card-wrap").forEach((cardWrap) => {
  cardWrap.addEventListener("mousemove", handleMouseMove);
  cardWrap.addEventListener("mouseenter", handleMouseEnter);
  cardWrap.addEventListener("mouseleave", handleMouseLeave);

  function handleMouseMove(e) {
    const card = cardWrap.querySelector(".card");
    const cardBg = cardWrap.querySelector(".card-bg");
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    const rX = (y / height) * 5;
    const rY = (x / width) * -5;
    card.style.transform = `rotateY(${rY}deg) rotateX(${rX}deg)`;

    const tX = (x / width) * -5;
    const tY = (y / height) * -5;
    cardBg.style.transform = `translateX(${tX}px) translateY(${tY}px)`;
  }

  function handleMouseEnter() {
    clearTimeout(cardWrap.mouseLeaveDelay);
  }

  function handleMouseLeave() {
    const card = cardWrap.querySelector(".card");
    const cardBg = cardWrap.querySelector(".card-bg");
    cardWrap.mouseLeaveDelay = setTimeout(() => {
      card.style.transform = "rotateY(0deg) rotateX(0deg)";
      cardBg.style.transform = "translateX(0px) translateY(0px)";
    }, 100);
  }
});

// Nueva sección

document.addEventListener("click", (e) => {
  let handle;
  if (e.target.matches(".new-handle")) {
    handle = e.target;
  } else {
    handle = e.target.closest(".new-handle");
  }
  if (handle != null) onHandleClick(handle);
});

const throttleProgressBar = throttle(() => {
  document.querySelectorAll(".new-progress-bar").forEach(calculateProgressBar);
}, 250);

window.addEventListener("resize", throttleProgressBar);

document.querySelectorAll(".new-progress-bar").forEach(calculateProgressBar);

function calculateProgressBar(progressBar) {
  progressBar.innerHTML = "";
  const slider = progressBar.closest(".new-row").querySelector(".new-slider");
  const itemCount = slider.children.length;
  const itemsPerScreen = parseInt(
    getComputedStyle(slider).getPropertyValue("--items-per-screen")
  );
  let sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);

  if (sliderIndex >= progressBarItemCount) {
    slider.style.setProperty("--slider-index", progressBarItemCount - 1);
    sliderIndex = progressBarItemCount - 1;
  }

  for (let i = 0; i < progressBarItemCount; i++) {
    const barItem = document.createElement("div");
    barItem.classList.add("new-progress-item");
    if (i === sliderIndex) {
      barItem.classList.add("active");
    }
    progressBar.append(barItem);
  }
}

function onHandleClick(handle) {
  const progressBar = handle
    .closest(".new-row")
    .querySelector(".new-progress-bar");
  const slider = handle.closest(".new-container").querySelector(".new-slider");
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  const progressBarItemCount = progressBar.children.length;
  if (handle.classList.contains("new-left-handle")) {
    if (sliderIndex - 1 < 0) {
      slider.style.setProperty("--slider-index", progressBarItemCount - 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[progressBarItemCount - 1].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index", sliderIndex - 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[sliderIndex - 1].classList.add("active");
    }
  }

  if (handle.classList.contains("new-right-handle")) {
    if (sliderIndex + 1 >= progressBarItemCount) {
      slider.style.setProperty("--slider-index", 0);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[0].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index", sliderIndex + 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[sliderIndex + 1].classList.add("active");
    }
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}
