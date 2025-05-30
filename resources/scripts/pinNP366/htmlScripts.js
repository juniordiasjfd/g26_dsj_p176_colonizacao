(function(){const fontSizeBase = 72;
const oedCode = "K2W7vJcycrQgPN4C";

  const titleElement = document.getElementById(
    `npoed_infographic-title-${oedCode}`,
  );

  const isOverflown = ({
    clientWidth,
    clientHeight,
    scrollWidth,
    scrollHeight,
  }) => scrollWidth > clientWidth || scrollHeight > clientHeight;

  const resizeText = ({
    element,
    elements,
    minSize = 5,
    maxSize = 72,
    step = 1,
    unit = 'px',
  }) => {
    (elements || [element]).forEach(el => {
      let i = minSize;
      let overflow = false;

      const parent = el.parentNode;

      while (!overflow && i < maxSize) {
        el.style.fontSize = `${i}${unit}`;
        overflow = isOverflown(parent);

        if (!overflow) i += step;
      }

      el.style.fontSize = `${i - step}${unit}`;
    });
  };

  window.addEventListener('DOMContentLoaded', function () {
    const observer = new MutationObserver(() => {
      resizeText({element: titleElement});
    });
    const observerConfig = {
      attributes: false,
      childList: true,
      characterData: true,
    };

    observer.observe(titleElement, observerConfig);
    resizeText({element: titleElement});
  });

  window.addEventListener('resize', () => {
    setTimeout(() => {
      resizeText({
        element: titleElement,
      });
    }, 25);
  });
})();

(function(){const oedCode = "K2W7vJcycrQgPN4C";

  const infographicTitleContainer = document.getElementById(
    `npoed_infographic-title-container-${oedCode}`,
  );
  const pinArea = document.getElementById(
    `npoed_infographicpin-area-${oedCode}`,
  );
  if (infographicTitleContainer !== null) {
    const headerH = infographicTitleContainer.clientHeight;
    const dataset = infographicTitleContainer.dataset;

    if (dataset && dataset.isFloat === 'true') {
      if (pinArea !== null) {
      }
    } else {
      if (pinArea !== null) {
        pinArea.style.height = `calc(100% - ${headerH || 0}px)`;
        // pinArea.style.height = '100%';
      }
    }
  } else {
    if (pinArea) {
      pinArea.style.height = '100%';
    }
  }
})();

(function(){const buttonPosition = "bottom-right";
const oedCode = "K2W7vJcycrQgPN4C";
const modalText = "<p tabindex='0' style='font-family: var(--fontFamilySubtitleBold); font-weight: 600; margin: 0;'>Créditos</p><p>Mapa Brasil publicado na obra <em>De Navegações e Viagens</em>, de Giacomo Gastaldi e Giovanni Battista Ramusio. Xilogravura aquarelada à mão sobre papel, 1556.<br>Reprodução/Biblioteca Digital de Cartografia Histórica da USP</p>";
const btnId = "npoed_credits-button-K2W7vJcycrQgPN4C";

  const creditButton = document.getElementById(btnId);
  function reposCreditsBtn() {
    if (buttonPosition === 'top-right') {
      const title = document.getElementById(
        `npoed_infographic-title-container-${oedCode}`,
      );
      let topPos = 16;
      if (title) {
        // const titleH = title.getBoundingClientRect().height;
        topPos = 100;
      }

      creditButton.style.top = topPos + 16 + 'px';
    } else {
      const legend = document.getElementById(
        `npoed_infographic-legend-${oedCode}`,
      );
      let botPos = 16;
      if (legend) {
        const legendH = legend.getBoundingClientRect().height;
        botPos = legendH + 16;
      }

      creditButton.style.bottom = botPos + 'px';
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    reposCreditsBtn();

    creditButton.addEventListener('click', () => {
      const modalId = `npoed_modal-${oedCode}`;
      const modal = document.getElementById(modalId);
      const modalBody = modal.querySelector('.npoed_modal-body');
      const modalContent = modal.querySelector('.npoed_content-of-modal');

      modalContent.innerHTML = modalText;
      modalBody.style.padding = '0 .25rem 2rem .25rem';
      modal.addEventListener('npoed.modal.close', () => {
        modalBody.style.padding = '';
      });
      window.npoed.switchModal(modalId);
    });
  });

  window.addEventListener('resize', reposCreditsBtn);
})();


  class CustomPin extends HTMLElement {
    constructor() {
      super();

      const title = this.dataset.title;
      const content = this.dataset.content;
      const oedCode = this.dataset.oedcode;

      let modalContent = content;
      if (title)
        modalContent =
          `<h1 tabindex='0' class="npoed_modal-content-title">${title}</h1>` +
          content;

      const button = this.querySelector('button');
      const modalId = `npoed_modal-${oedCode}`;
      button.addEventListener('click', () => {
        const modal = document.getElementById(modalId);
        const contentOfModal = modal.querySelector('.npoed_content-of-modal');

        if (contentOfModal !== null) {
          contentOfModal.innerHTML = modalContent;
          window.npoed.switchModal(modalId);
        }
      });
    }
  }
  class ZoomImg extends HTMLElement {
    isInsideModal = false;
    #modalParent;
    #modalContent;
    #originalImage;

    constructor() {
      super();
      const self = this;

      const img = self.querySelector('img');
      img.classList.add('npoed_cursor-zoom');
      img.setAttribute('tabindex', '0');

      self.#originalImage = img;
      self.isInsideModal = self.getIsInsideModal(img);
      self.#modalParent = self.getModalParent(img);

      if (self.isInsideModal) {
        self.#modalContent =
          self.#modalParent.querySelector('.npoed_modal-body').innerHTML;
      }

      function onclickImg(e) {
        const backdropZoomImg = document.getElementById(
          'npoed_zoom-img-backdrop',
        );
        if (backdropZoomImg) {
          backdropZoomImg.parentNode.removeChild(backdropZoomImg); // ????
        }

        self.isInsideModal && self.#modalParent.close();

        const clone = img.cloneNode(true);
        const dialog = document.createElement('dialog');
        const closeBtn = document.createElement('button');
        const backdrop = document.createElement('div');

        dialog.setAttribute('id', 'npoed_modal-zoomimg');
        dialog.setAttribute('aria-label', 'imagem clicada com zoom aplicado');
        Object.assign(dialog.style, {
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          boxSizing: 'border-box',
          border: 'none',
        });

        closeBtn.setAttribute('role', 'button');
        closeBtn.setAttribute('tabindex', '0');
        closeBtn.setAttribute('accesskey', 'esc');
        closeBtn.setAttribute('id', 'npoed_btn-close-zoom-img');
        closeBtn.setAttribute(
          'aria-label',
          'Botão circular com fundo branco e com X no meio que indica fechar modal',
        );
        Object.assign(closeBtn.style, {
          zIndex: 99999,
          position: 'absolute',
          right: '35px',
          top: '35px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-3 -3 22 22' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e")`,
          backgroundColor: '#fff',
          backgroundSize: '38px 38px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          padding: '8px',
          cursor: 'pointer',
          border: '1px solid black',
        });

        backdrop.setAttribute('id', 'npoed_zoom-img-backdrop');
        Object.assign(backdrop.style, {
          zIndex: 99998,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(9 9 16 / 81%)',
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2% 4%',
          boxSizing: 'border-box',
        });

        clone.setAttribute('id', 'npoed_clone-imgae-full-wide');
        clone.setAttribute('tabindex', '0');
        clone.classList.remove('npoed_cursor-zoom');
        Object.assign(clone.style, {
          maxHeight: '100%',
          maxWidth: '100%',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        });

        backdrop.appendChild(closeBtn);
        backdrop.appendChild(clone);
        dialog.appendChild(backdrop);
        document.body.appendChild(dialog);

        window.npoed.switchModal(dialog.getAttribute('id'));

        dialog.addEventListener('close', () => {
          self.closeDialog(dialog);
        });

        closeBtn.addEventListener('click', () => {
          self.closeDialog(dialog);
        });
      }

      img.addEventListener('click', onclickImg);
    }

    getIsInsideModal(elm) {
      while (elm !== null) {
        if (elm.classList.contains('npoed_modal')) {
          return true;
        }
        elm = elm.parentElement;
      }
      return false;
    }

    getModalParent(elm) {
      while (elm !== null) {
        if (elm.classList.contains('npoed_modal')) {
          return elm;
        }
        elm = elm.parentElement;
      }
      return null;
    }

    closeDialog(_dialog) {
      if (_dialog && _dialog.parentNode) {
        _dialog.parentNode.removeChild(_dialog); // ????
      }

      const modalParent = this.#modalParent;
      const modalContent = this.#modalContent;
      const originalImg = this.#originalImage;

      function onOpeningModal() {
        modalParent.querySelector('.npoed_modal-body').innerHTML = modalContent;
        modalParent.removeEventListener('npoed.modal.opening', onOpeningModal);
      }

      function onOpenModal() {
        const mi = modalParent.querySelector(
          `img[src="${originalImg.getAttribute('src')}"]`,
        );
        setTimeout(() => {
          if (mi) mi.focus();
          modalParent.removeEventListener('npoed.modal.open', onOpenModal);
        }, 20);
      }

      if (this.isInsideModal) {
        modalParent.addEventListener('npoed.modal.opening', onOpeningModal);

        modalParent.addEventListener('npoed.modal.open', onOpenModal);
        window.npoed.switchModal(modalParent.getAttribute('id'));
      }
    }
  }

  customElements.define('custom-pin', CustomPin);
  customElements.define('zoom-img', ZoomImg);


(function(){const oedCode = "K2W7vJcycrQgPN4C";

  if (!window.npoed) window.npoed = {};

  Reflect.set(window.npoed, 'switchModal', modalId => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (modal.open) {
      modal.dispatchEvent(
        new Event('npoed.modal.closing', {
          bubbles: true,
          composed: true,
        }),
      );
      modal.classList.add('closing');
      setTimeout(() => {
        modal.classList.remove('closing');
        modal.close();
        modal.dispatchEvent(
          new Event('npoed.modal.close', {
            bubbles: true,
            composed: true,
          }),
        );
      }, 315);
    } else {
      modal.showModal();
      modal.classList.add('opening');
      modal.dispatchEvent(
        new Event('npoed.modal.opening', {
          bubbles: true,
          composed: true,
        }),
      );
      setTimeout(() => {
        modal.classList.remove('opening');
        modal.dispatchEvent(
          new Event('npoed.modal.open', {
            bubbles: true,
            composed: true,
          }),
        );
      }, 520);
    }
  });
})();

(function(){const customId = "npoed_modal-K2W7vJcycrQgPN4C";

  const modal = document.getElementById(customId);
  window.onclick = function (event) {
    if (event.target == modal) {
      window.npoed.switchModal(customId);
    }
  };
})();

