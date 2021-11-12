var rentAmount = {
  '1 час': 2000,
  '2 часа': 4000,
  '3 часа': 6000,
  '5 часов': 10000,
  'выставка 2 дня': 13000,
  'выставка 3 дня': 17000
}
const modal = document.querySelector(".modal");
const modalCloseBtn = modal.querySelector(".modal__close-icon");
const sliders = document.querySelectorAll(".catalog__slider");
Array.from(sliders).forEach((item) => activateSlider(item));
const catalogCards = document.querySelectorAll(".catalog__item");
catalogCards.forEach((item) => initCardsHandler(item));
const showMore = document.querySelector(".catalog__show-more");
const videoModal = document.querySelector(".modal__video");
const videoCloseBtn = document.querySelector(".modal__video-close");
const videoPlay = document.querySelector(".video__play");
const modalIframe = document.querySelector(".modal__video-iframe");
const linkIframeVideo = "https://www.youtube.com/embed/21qNxnCS8WU?controls=0";

const handlerVideoModal = (e) => {
  e.preventDefault();
  videoModal.classList.toggle("modal__video_hidden");
  if (!videoModal.classList.contains("modal__video_hidden")) {
    modalIframe.src = linkIframeVideo;
    document.querySelector("body").style.overflow = "hidden";
  } else {
    modalIframe.src = '';
    document.querySelector("body").style.overflow = "unset";
  }
};

videoCloseBtn.addEventListener("click", handlerVideoModal);
videoPlay.addEventListener("click", handlerVideoModal);

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
  const sliderDots = slider.querySelectorAll(".catalog__slider-dot");
  const widthSlide = 312;
  sliderNextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    changeSlide(
      e,
      sliderItems,
      sliderContent,
      widthSlide,
      sliderNextBtn,
      sliderDots
    );
  });
  sliderPrevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    changeSlide(
      e,
      sliderItems,
      sliderContent,
      widthSlide,
      sliderNextBtn,
      sliderDots
    );
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
      sliderDots[activeSlide].classList.remove("catalog__slider-dot_active");
      sliderDots[activeSlide + 1].classList.add("catalog__slider-dot_active");
      activeSlide++;
    } else {
      sliderContent.style.transform = `translateX(-${widthSlide * 0}px)`;
      sliderItems[activeSlide].classList.remove("catalog__slider-item_active");
      sliderItems[0].classList.add("catalog__slider-item_active");
      sliderDots[activeSlide].classList.remove("catalog__slider-dot_active");
      sliderDots[0].classList.add("catalog__slider-dot_active");
      activeSlide = 0;
    }
  } else {
    if (activeSlide !== 0) {
      sliderContent.style.transform = `translateX(-${
        widthSlide * (activeSlide - 1)
      }px)`;
      sliderItems[activeSlide].classList.remove("catalog__slider-item_active");
      sliderItems[activeSlide - 1].classList.add("catalog__slider-item_active");
      sliderDots[activeSlide].classList.remove("catalog__slider-dot_active");
      sliderDots[activeSlide - 1].classList.add("catalog__slider-dot_active");
      activeSlide--;
    } else {
      sliderContent.style.transform = `translateX(-${
        widthSlide * (activeSlide + sliderItems.length - 1)
      }px)`;
      sliderItems[activeSlide].classList.remove("catalog__slider-item_active");
      sliderItems[sliderItems.length - 1].classList.add(
        "catalog__slider-item_active"
      );
      sliderDots[activeSlide].classList.remove("catalog__slider-dot_active");
      sliderDots[sliderDots.length - 1].classList.add(
        "catalog__slider-dot_active"
      );
      activeSlide = sliderItems.length - 1;
    }
  }
};

document.querySelector('.modal__form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleModal(document.querySelector('.modal', ''))
})

// отвечает за закрытие открытие модального окна
const handleModal = (modal, card) => {

  modal.classList.toggle("modal_active");
  if (modal.classList.contains("modal_active")) {
    document.querySelector("body").style.overflow = "hidden";
    let rent;
    Object.keys(rentAmount).map((key) => {
      if(card.querySelector(".catalog__rent-item_active").textContent === key) {
        rent = rentAmount[key];
      }
    })
    const obj = {
      nameCard: card.querySelector(".catalog__item-header").textContent,
      params: card.querySelector(".catalog__item-params").textContent,
      rentTimePrice: 15000 + rent,
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
    const select = document.querySelector('.select_is-active')
    if(select) {
      select.classList.remove('select_is-active');
    }
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
  const customSelect = modal.querySelector(".select__current");
  const modalOptions = modal.querySelector(".modal__options");
  const modalTotalPrice = modal.querySelector(".modal__total-amount");
  modalName.textContent = params.nameCard;
  modalInfo.textContent = params.params;
  customSelect.textContent = params.rentTime;
  modalInfoCost.textContent = params.rentTimePrice + ' Р';
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

  const changeAmountCard = (itemText, value) => {
    var activeAmount = +catalogAmount.textContent.replace(/[^0-9]/g, "");
    if(value === 'add') {
      Object.keys(rentAmount).map((key) => {
        if(key === itemText) {
          activeAmount = activeAmount + rentAmount[itemText];
          catalogAmount.textContent = activeAmount + " ₽";
        }
      });
    } else if ( value === 'delete'){
      Object.keys(rentAmount).map((key) => {
        if(key === itemText) {
          activeAmount = activeAmount - rentAmount[itemText];
          catalogAmount.textContent = activeAmount + " ₽";
        }
      });
    }
  }

  catalogRentTime.addEventListener('click', (e) => {
    if (e.target.classList.contains('catalog__rent-item')) {
      if(!e.target.classList.contains('catalog__rent-item_active')) {
        const rentItem = catalogRentTime.querySelectorAll(".catalog__rent-item");
        rentItem.forEach((item) => {
          if ( item !== e.target && item.classList.contains("catalog__rent-item_active") ) {
            changeAmountCard(item.textContent, 'delete')
            item.classList.remove("catalog__rent-item_active");
          } else if ( item === e.target && !item.classList.contains('catalog__rent-item_active') ){
            changeAmountCard(item.textContent, 'add');
            item.classList.add("catalog__rent-item_active");
          }
        });
      }
    }
  })

  changeAmountCard(item.querySelector('.catalog__rent-item_active').textContent, 'add');

  catalogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleModal(document.querySelector(".modal"), item);
  });
}

const mask = (selector) => {
  let setCursorPisition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();

      range.collapse(true);
      range.moveEnd("charcter", pos);
      range.moveStart("charcter", pos);
      range.select();
    }
  };

  function createMask(event) {
    let matrix = "+7 (___) ___ __ __",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");

    if (def.length >= val.length) {
      val = def;
    }

    this.value = matrix.replace(/./g, (sym) => {
      return /[_\d]/.test(sym) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : sym;
    });

    if (event.type === "blur") {
      if (this.value.length == 2) {
        this.value = "";
      }
    } else {
      setCursorPisition(this.value.length, this);
    }
  }

  let input = document.querySelector(selector);
  input.addEventListener("input", createMask);
  input.addEventListener("focus", createMask);
  input.addEventListener("blur", createMask);
};

mask('[name="phone"]');




let select = function () {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');
  selectHeader.forEach((item) => {
    item.addEventListener('click', selectToggle);
  })

  let currentAmount;

  selectItem.forEach((item) => {
    item.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    currentAmount = this.querySelector('.select__current').textContent;
    this.parentElement.classList.toggle('select_is-active');
  }

  function selectChoose() {
    let text = this.textContent;
    let select = this.closest('.select');
    let currentText = select.querySelector('.select__current');
    if(this.closest('.select__rent-time')) {
      const modalPrice = document.querySelector('.modal__total-amount');
      const modalItemCost = document.querySelector('.modal__info-cost')
      Object.keys(rentAmount).map((key) => {
        if(key === text) {
          modalPrice.textContent = modalPrice.textContent.replace(/[^0-9]/g, "") - rentAmount[currentAmount] + rentAmount[text] + ' ₽';
          modalItemCost.textContent = +modalItemCost.textContent.replace(/[^0-9]/g, "") - rentAmount[currentAmount] + rentAmount[text] + ' ₽';
        }
      })
    }
    currentText.textContent = text;
    select.classList.remove('select_is-active');
    
  }
};

select();