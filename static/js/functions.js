let unit_value = 0
let show_languages = false
let collapse_table_pin = false

let swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    freeMode: true,
    slidesPerView: 1,
    spaceBetween: 10,
});

function openModal(el) {
    unit_value = 1
    document.getElementById('unit-input').value = unit_value
    let food = el.getAttribute('data-food')
    let jsonString = food
        .replace(/OrderedDict\(/g, '')
        .replace(/\)$/, '')
        .trim();
    jsonString = jsonString.replace(/\bNone\b/g, 'null');
    jsonString = jsonString.replace(/\'/g, '"');
    jsonString = jsonString.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
    jsonParsing = JSON.parse(jsonString)
    let code_modal = document.getElementById('code_modal')
    let name_modal = document.getElementById('name_modal')
    let price_modal = document.getElementById('price_modal')
    let image_modal = document.getElementById('image_modal')
    let food_id_modal = document.getElementById('food_id_modal')
    let tmp_total_modal = document.getElementById('tmp_total_modal')
    let en_modal = document.getElementById('en_modal')
    let ja_modal = document.getElementById('ja_modal')
    let mm_modal = document.getElementById('mm_modal')
    if(code_modal) code_modal.innerHTML = jsonParsing.food_id
    if(name_modal) name_modal.innerHTML = jsonParsing.name
    if(price_modal) price_modal.innerHTML = jsonParsing.price
    if(food_id_modal) food_id_modal.innerHTML = jsonParsing.id
    if(en_modal) en_modal.innerHTML = jsonParsing.name
    if(ja_modal) ja_modal.innerHTML = jsonParsing.japan_name
    if(mm_modal) mm_modal.innerHTML = jsonParsing.myanmar_name
    if(image_modal) image_modal.setAttribute('src', jsonParsing.image)
    if(tmp_total_modal) tmp_total_modal.innerHTML = new Intl.NumberFormat('ja-JP').format(jsonParsing.price)
}

function openTab(el, index) {
    let buttons = document.getElementById('nav-categories').getElementsByTagName('button')
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('bg-orange-500', 'text-white');
        buttons[i].classList.add('btn-ghost', 'text-black', 'hover:text-orange-600');
    }
    if (!el.classList.contains('bg-orange-500')) {
        el.classList.add('bg-orange-500', 'text-white');
        el.classList.remove('btn-ghost', 'text-black', 'hover:text-orange-600');
    }
    swiper.slideTo(index)
}

function modifyUnit(type) {
    let input = document.getElementById('unit-input')
    let price = document.getElementById('price_modal')
    let tmp_total = document.getElementById('tmp_total_modal')
  
    if(type == 'decrement') {
        if(unit_value > 1) unit_value -= 1
    }
    else if(type == 'increment') unit_value += 1

    let sum = parseFloat(price.innerText) * parseFloat(unit_value)
    tmp_total.innerText = new Intl.NumberFormat('ja-JP').format(sum)
    input.value = unit_value
}

function exitFromRestaurant() {
    sessionStorage.removeItem('foods')
    sessionStorage.removeItem('ordered')
    sessionStorage.removeItem('credentials')
    sessionStorage.removeItem('language')
    sessionStorage.removeItem('checkout')
    window.location.href = 'https://google.com'
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('language-button').addEventListener('click', () => {
        let jp_content = document.getElementById('jp-lang')
        let en_content = document.getElementById('en-lang')
        let mm_content = document.getElementById('mm-lang')
        show_languages = !show_languages
        if(show_languages) {
          jp_content.classList.remove('opacity-0', 'bottom-0', 'right-32')
          en_content.classList.remove('opacity-0', 'bottom-0', 'right-32')
          mm_content.classList.remove('opacity-0', 'bottom-0', 'right-32')
          jp_content.classList.add('opacity-100', 'bottom-16', 'right-32')
          en_content.classList.add('opacity-100', 'bottom-16', 'right-48')
          mm_content.classList.add('opacity-100', 'bottom-28', 'right-[10rem]')
        } else {
          jp_content.classList.remove('opacity-100', 'bottom-16', 'right-32')
          en_content.classList.remove('opacity-100', 'bottom-16', 'right-48')
          mm_content.classList.remove('opacity-100', 'bottom-28', 'right-[10rem]')
          jp_content.classList.add('opacity-0', 'bottom-0', 'right-32')
          en_content.classList.add('opacity-0', 'bottom-0', 'right-32')
          mm_content.classList.add('opacity-0', 'bottom-0', 'right-32')
        }
    })
    document.getElementById('table-pin-button').addEventListener('click', () => {
        let table_content = document.getElementById('table-pin-content')
        let table_arrow_icon = document.getElementById('table-pin-button-icon')
        collapse_table_pin = !collapse_table_pin
        if(collapse_table_pin) {
            table_content.classList.remove('bottom-16', 'absolute')
            table_content.classList.add('bottom-0', 'fixed')
            table_arrow_icon.classList.add('rotate-180')
        } else {
            table_content.classList.add('bottom-16', 'absolute')
            table_content.classList.remove('bottom-0', 'fixed')
            table_arrow_icon.classList.remove('rotate-180')
        }
    })
    let checkCart = JSON.parse(sessionStorage.getItem('foods'))
    if(checkCart != null || checkCart != undefined) {
        if(checkCart.length > 0 && checkCart) {
            let food_cart_button = document.getElementById('food-cart-button')
            let notify_div = document.createElement('div')
            let content_cart = `<div id="count_cart" class="absolute -right-1 -top-1 w-6 h-6 rounded-xl flex items-center justify-center bg-red-500 border-2 border-white">${checkCart.length}</div>`
            notify_div.innerHTML = content_cart
            if(food_cart_button) food_cart_button.append(notify_div)
        }
    }
    let orderButton = document.getElementById('add_to_order_list-content')
    if(orderButton) {
        orderButton.addEventListener('click', () => {
            let tmp_total = document.getElementById('tmp_total_modal')
            let price_modal = document.getElementById('price_modal')
            let name_modal = document.getElementById('name_modal')
            let code_modal = document.getElementById('code_modal')
            let unit_value_input = document.getElementById('unit-input')
            let image_modal = document.getElementById('image_modal')
            let food_id = document.getElementById('food_id_modal')
            let ja = document.getElementById('ja_modal')
            let en = document.getElementById('en_modal')
            let mm = document.getElementById('mm_modal')
            
            let localData = JSON.parse(sessionStorage.getItem('foods')) || []
            let data = {
              total: tmp_total.innerText+'.00',
              price: price_modal.innerText,
              name: name_modal.innerText,
              unit: unit_value_input.value,
              code: code_modal.innerText,
              en: en.innerText,
              ja: ja.innerText,
              mm: mm.innerText,
              id: food_id.innerText,
              image: image_modal.getAttribute('src')
            }
            if(localData.length > 0) {
              let checkExistingData = localData.find((item) => item.id == food_id.innerText)
              if(checkExistingData) {
                let findIndex = localData.findIndex((item) => item.id == food_id.innerText)
                if(findIndex != null || findIndex != undefined) {
                  let unit = parseInt(localData[findIndex].unit) 
                  let price = parseFloat(localData[findIndex].price) 
                  unit += parseInt(unit_value_input.value)
                  localData[findIndex].total = price * unit
                  localData[findIndex].unit = unit
                }
              } else {
                localData.push(data)
              }
            } else {
              localData.push(data)
            }
            unit_value_input.value = 1
            unit_value = 1
            sessionStorage.setItem('foods', JSON.stringify(localData))
            if(localData.length > 0) {
              let count_cart = document.getElementById('count_cart')
              if(count_cart) count_cart.innerText = localData.length
              else {
                let food_cart_button = document.getElementById('food-cart-button')
                let notify_div = document.createElement('div')
                let content_cart = `<div id="count_cart" class="absolute -right-1 -top-1 w-6 h-6 rounded-xl flex items-center justify-center bg-red-500 border-2 border-white">${localData.length}</div>`
                notify_div.innerHTML = content_cart
                if(food_cart_button) food_cart_button.append(notify_div)
              }
            }
            document.getElementById('item_modal').click()
        })
    }
})