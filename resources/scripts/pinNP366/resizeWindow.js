function resize() {
  const aspectRatio = 16 / 9;
  // const windowW = window.innerWidth;
  // const windowH = window.innerHeight;
  const infographicContainerArea = document.querySelector(
    '#infographic-container-area',
  );
  const pageContainer = infographicContainerArea.parentNode;
  const windowW = pageContainer.getBoundingClientRect().width;
  const windowH = pageContainer.getBoundingClientRect().height;

  const maxRatioH = windowW / aspectRatio;

  if (windowH < maxRatioH) {
    const scale = windowH / infographicContainerArea.offsetHeight;
    infographicContainerArea.style.transform = `scale(${scale})`;
  } else {
    const scale = maxRatioH / infographicContainerArea.offsetHeight;
    infographicContainerArea.style.transform = `scale(${scale})`;
  }
}

window.addEventListener('resize', resize);
window.addEventListener('load', resize);
resize();
