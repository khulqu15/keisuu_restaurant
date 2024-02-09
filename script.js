/*
 number increase/decrease 
*/

function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  value > 5 ? value = 5 : '';
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('number').value = value;
}

/*
Check Out
*/
document.querySelectorAll('.orderedFood').forEach(orderedFood => {
  const decreaseButton = orderedFood.querySelector('.decrease');
  const increaseButton = orderedFood.querySelector('.increase');
  const quantityField = orderedFood.querySelector('.quantity');

  if(decreaseButton) {
    decreaseButton.addEventListener('click', () => {
      let quantity = parseInt(quantityField.value, 10);
      if (quantity > 1) {
        quantityField.value = quantity - 1;
      } else {
        orderedFood.style.display = 'none';
      }
    });
  }

  if(increaseButton) {
    increaseButton.addEventListener('click', () => {
      let quantity = parseInt(quantityField.value, 10);
      if (quantity < 5) {
        quantityField.value = quantity + 1;
      }
    });
  }
});

/*Swiper*/
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  freeMode: true, // allows for free scroll without fixed positions
  slidesPerView: 1,
  spaceBetween: 10,
});

function openTab(index) {
  swiper.slideTo(index);
}

document.querySelectorAll('.nav-item').forEach((item, index) => {
  item.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    document.querySelectorAll('.nav-item').forEach(nav => {
      nav.classList.remove('active'); // Remove active from all nav items
    });
    this.classList.add('active'); // Add active to the clicked nav item
  });
});


/*
function highlightActiveTab(activeIndex) {
  // Remove the 'active' class from all tabs
  document.querySelectorAll('.navbar .nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Add the 'active' class to the tab at the activeIndex position
  const navItems = document.querySelectorAll('.navbar .nav-item');
  if (navItems[activeIndex]) {
    navItems[activeIndex].classList.add('active');
  }
}

// Add event listener to Swiper for when the slide changes
swiper.on('slideChange', function () {
  highlightActiveTab(swiper.activeIndex);
});

// Call highlightActiveTab initially in case the first tab isn't the default
highlightActiveTab(swiper.activeIndex);
*/