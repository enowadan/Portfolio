const imageButtons = [...document.querySelectorAll(".lightbox-trigger")];

if (imageButtons.length) {
  const lightbox = document.createElement("dialog");
  lightbox.className = "lightbox";
  lightbox.setAttribute("aria-label", "Image gallery");
  lightbox.innerHTML = `
    <button class="lightbox-control lightbox-close" type="button" aria-label="Close image">&times;</button>
    <button class="lightbox-control lightbox-previous" type="button" aria-label="Previous image">&#8249;</button>
    <img alt="" />
    <button class="lightbox-control lightbox-next" type="button" aria-label="Next image">&#8250;</button>
    <p class="lightbox-caption" aria-live="polite"></p>
  `;
  document.body.append(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".lightbox-caption");
  let activeIndex = 0;

  const showImage = (index) => {
    activeIndex = (index + imageButtons.length) % imageButtons.length;
    const button = imageButtons[activeIndex];
    const thumbnail = button.querySelector("img");
    lightboxImage.src = button.dataset.full || thumbnail.src;
    lightboxImage.alt = thumbnail.alt;
    caption.textContent = button.querySelector("span")?.textContent || thumbnail.alt;
  };

  imageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showImage(index);
      lightbox.showModal();
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.querySelector(".lightbox-previous").addEventListener("click", () => showImage(activeIndex - 1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => showImage(activeIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showImage(activeIndex - 1);
    if (event.key === "ArrowRight") showImage(activeIndex + 1);
  });
}