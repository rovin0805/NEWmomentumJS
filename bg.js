const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `${imgNumber+1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function makeRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = makeRandom();
  paintImage(randomNumber);
}
init();