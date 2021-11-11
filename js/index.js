const modal = document.querySelector('.modal');
const modalCloseBtn = modal.querySelector('.modal__close-icon');
const sliders = document.querySelectorAll('.catalog__slider');
Array.from(sliders).forEach((item) => activateSlider(item));
const catalogCards = document.querySelectorAll('.catalog__item');
catalogCards.forEach((item) => initCardsHandler(item));
const showMore = document.querySelector('.catalog__show-more');
const videoModal = document.querySelector('.modal__video')
const videoCloseBtn = document.querySelector('.modal__video-close');
const videoPlay = document.querySelector('.video__play');

const handlerVideoModal = (e) => {
    e.preventDefault()
    videoModal.classList.toggle('modal__video_hidden');
}

videoCloseBtn.addEventListener('click', handlerVideoModal);
videoPlay.addEventListener('click', handlerVideoModal);


showMore.addEventListener("click", (e) => {
  e.preventDefault();
  const element = document.querySelector(".catalog__item.hidden");
  if (element) {
    element.classList.remove("hidden");
  } else {
    showMore.remove();
  }
});
// работа слайдера в каждой карточке
function activateSlider(item) {
  const slider = item;
  const sliderContent = slider.querySelector(".catalog__slider-content");
  const sliderItems = slider.querySelectorAll(".catalog__slider-item");
  const sliderPrevBtn = slider.querySelector(".catalog__slider-button_left");
  const sliderNextBtn = slider.querySelector(".catalog__slider-button_right");
  const sliderDots = slider.querySelectorAll('.catalog__slider-dot');
  const widthSlide = 312;
  sliderNextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    changeSlide(e, sliderItems, sliderContent, widthSlide, sliderNextBtn, sliderDots);
  });
  sliderPrevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    changeSlide(e, sliderItems, sliderContent, widthSlide, sliderNextBtn, sliderDots);
  });
}
const changeSlide = (
  e,
  sliderItems,
  sliderContent,
  widthSlide,
  sliderNextBtn,
  sliderDots
) => {
  // готовим активный слайд
  let activeSlide;
  // находим активный слайд
  Array.from(sliderItems).forEach((item, index) => {
    item.classList.contains("catalog__slider-item_active")
      ? (activeSlide = index)
      : "";
  });
  // проверяем куда хотели нажатьт < - >
  if (e.target === sliderNextBtn) {
    if (activeSlide + 1 < sliderItems.length) {
      // смещение слайда
      sliderContent.style.transform = `translateX(-${
        widthSlide * (activeSlide + 1)
      }px)`;
      // переопределяем новый активный слайд
      sliderItems[activeSlide].classList.remove("catalog__slider-item_active");
      sliderItems[activeSlide + 1].classList.add("catalog__slider-item_active");
      sliderDots[activeSlide].classList.remove('catalog__slider-dot_active');
      sliderDots[activeSlide + 1].classList.add('catalog__slider-dot_active');
      activeSlide++;
    } else {
      sliderContent.style.transform = `translateX(-${widthSlide * 0}px)`;
      sliderItems[activeSlide].classList.remove("catalog__slider-item_active");
      sliderItems[0].classList.add("catalog__slider-item_active");
      sliderDots[activeSlide].classList.remove('catalog__slider-dot_active');
      sliderDots[0].classList.add('catalog__slider-dot_active')
      activeSlide = 0;
    }
  } else {
    if (activeSlide !== 0) {
      sliderContent.style.transform = `translateX(-${
        widthSlide * (activeSlide - 1)
      }px)`;
      sliderItems[activeSlide].classList.remove("catalog__slider-item_active");
      sliderItems[activeSlide - 1].classList.add("catalog__slider-item_active");
      sliderDots[activeSlide].classList.remove('catalog__slider-dot_active')
      sliderDots[activeSlide - 1].classList.add('catalog__slider-dot_active')
      activeSlide--;
    } else {
      sliderContent.style.transform = `translateX(-${
        widthSlide * (activeSlide + sliderItems.length - 1)
      }px)`;
      sliderItems[activeSlide].classList.remove("catalog__slider-item_active");
      sliderItems[sliderItems.length - 1].classList.add(
        "catalog__slider-item_active"
      );
      sliderDots[activeSlide].classList.remove('catalog__slider-dot_active');
      sliderDots[sliderDots.length - 1].classList.add('catalog__slider-dot_active')
      activeSlide = sliderItems.length - 1;
    }
  }
};
// отвечает за закрытие открытие модального окна
const handleModal = (modal, card) => {
  modal.classList.toggle("modal_active");
  if (modal.classList.contains("modal_active")) {
    document.querySelector("body").style.overflow = "hidden";
    const obj = {
      nameCard: card.querySelector(".catalog__item-header").textContent,
      params: card.querySelector(".catalog__item-params").textContent,
      optionsList: Array.from(
        card.querySelectorAll(".catalog__options-item")
      ).filter((item) => {
        return item.querySelector(".catalog__options-checkbox_active") ? 1 : 0;
      }),
      rentTime: card.querySelector(".catalog__rent-item_active").textContent,
      totalPrice: card.querySelector(".catalog__amount").textContent,
    };
    setSettingsModal(modal, obj);
  } else {
    document.querySelector("body").style.overflow = "unset";
    setSettingsModal(modal, {
      nameCard: "",
      params: "",
      optionsList: "",
      rentTime: "",
      totalPrice: "",
    });
  }
};
// заполнение параметров модального окна
const setSettingsModal = (modal, params) => {
  const modalName = modal.querySelector(".modal__info-name");
  const modalInfo = modal.querySelector(".modal__info-data");
  const modalInfoCost = modal.querySelector(".modal__info-cost");
  const customSelect = modal.querySelector(".modal__info-time");
  const modalOptions = modal.querySelector(".modal__options");
  const modalTotalPrice = modal.querySelector(".modal__total-amount");
  modalName.textContent = params.nameCard;
  modalInfo.textContent = params.params;
  customSelect.textContent = params.rentTime;
  modalInfoCost.textContent = "17 000 ₽";
  modalTotalPrice.textContent = params.totalPrice;
  if (params.optionsList.length) {
    params.optionsList.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("modal__item");
      const spanName = document.createElement("span");
      spanName.classList.add("modal__item-name");
      spanName.textContent = item.querySelector(
        ".catalog__options-name"
      ).textContent;
      const spanPrice = document.createElement("span");
      spanPrice.classList.add("modal__item-price");
      spanPrice.textContent = item.querySelector(
        ".catalog__options-price"
      ).textContent;
      li.append(spanName);
      li.append(spanPrice);
      modalOptions.append(li);
    });
  } else {
    modalOptions.textContent = "";
  }
};
// закрытие модального кона
modalCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleModal(modal);
});

//инициализация обработчиков cards
function initCardsHandler(item) {
  const catalogOptionsContent = item.querySelector(".catalog__options-content");
  const catalogRentTime = item.querySelector(".catalog__rent-time");
  let catalogAmount = item.querySelector(".catalog__amount");
  const catalogBtn = item.querySelector(".catalog__order-btn");

  catalogOptionsContent.addEventListener("click", (e) => {
    if (e.target.classList.contains("catalog__options-checkbox")) {
      e.target.classList.toggle("catalog__options-checkbox_active");
      if (e.target.classList.contains("catalog__options-checkbox_active")) {
        let price = e.target
          .closest(".catalog__options-item")
          .querySelector(".catalog__options-price")
          .textContent.replace(/[^0-9]/g, "");
        catalogAmount.textContent =
          +catalogAmount.textContent.replace(/[^0-9]/g, "") + +price + "₽";
      } else {
        let price = e.target
          .closest(".catalog__options-item")
          .querySelector(".catalog__options-price")
          .textContent.replace(/[^0-9]/g, "");
        catalogAmount.textContent =
          +catalogAmount.textContent.replace(/[^0-9]/g, "") - +price + "₽";
      }
    }
  });

  catalogRentTime.addEventListener("click", (e) => {
    if (e.target.classList.contains("catalog__rent-item")) {
      e.target.classList.toggle("catalog__rent-item_active");
      const rentItem = catalogRentTime.querySelectorAll(".catalog__rent-item");
      rentItem.forEach((item) => {
        if (
          item !== e.target &&
          item.classList.contains("catalog__rent-item_active")
        ) {
          item.classList.remove("catalog__rent-item_active");
        }
      });
    }
  });

  catalogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleModal(document.querySelector(".modal"), item);
  });
}



const mask = (selector) => {

    let setCursorPisition = (pos,elem) => {
        elem.focus();

        if(elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if(elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('charcter', pos);
            range.moveStart('charcter', pos);
            range.select();
        }
    }

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, (sym) => {
            return /[_\d]/.test(sym) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : sym;
        });

        if(event.type === 'blur') {
            if(this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPisition(this.value.length, this);
        }
    }

    let input = document.querySelector(selector);
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
}

mask('[name="phone"]');