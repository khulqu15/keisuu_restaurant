let show_languages = false
let collapse_table_pin = false
let is_full = false

function exitFromRestaurant() {
  sessionStorage.removeItem('foods')
  sessionStorage.removeItem('ordered')
  sessionStorage.removeItem('credentials')
  sessionStorage.removeItem('language')
  sessionStorage.removeItem('checkout')
  window.location.href = 'https://google.com'
}

function getTableData() {
  let credentials = JSON.parse(sessionStorage.getItem('credentials'))
  if(credentials == null || credentials == undefined || credentials.status == 'error') {
    console.log('Create Credential')
    fetch(domain_enpoint+'/api/1/table', {
      headers: {
        'Accept': 'application/json'
      },
    }).then((response) => { return response.json() })
    .then((data) => {
      is_full = data.status == 'error' ? true : false
      console.log(is_full)
      sessionStorage.setItem('credentials', JSON.stringify(data))
      if(is_full) {
        // document.getElementById('full_modal').click()
      } else {
        let table_number = parseInt(data.table.number)
        document.getElementById('table-pin-content').classList.remove('hidden')
        document.getElementById('table_number').innerText = table_number < 10 ? '0'+table_number.toString() : table_number.toString()
      }
    })
  } else {
    let table_number = parseInt(credentials.table.number)
    document.getElementById('table-pin-content').classList.remove('hidden')
    document.getElementById('table_number').innerText = table_number < 10 ? '0'+table_number.toString() : table_number.toString()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let ordered = JSON.parse(sessionStorage.getItem('ordered'))
  let foods_ordered = JSON.parse(sessionStorage.getItem('foods_ordered'))
  if((ordered != null || ordered != undefined) && (foods_ordered != null || foods_ordered != undefined)) {
    document.getElementById('exit_modal_btn').classList.add('hidden')
  }
  getTableData()
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
  fetch(domain_enpoint+'/api/admin/translation/', {
    headers: {
        'Accept': 'application/json'
    }
    })
    .then((response) => { return response.json() })
    .then((data) => {
        let menu_footer = document.getElementById('menu')
        let checkout_footer = document.getElementById('checkout')
        let language_footer = document.getElementById('language')
        let call_footer = document.getElementById('call')
        let table_content = document.getElementById('table-content')
        let number_of_order_content = document.getElementById('number_of_order-content')
        let add_to_order_list_content = document.getElementById('add_to_order_list-content') 
        let your_receipt_content = document.getElementById('your_receipt_content')
        let food_header = document.getElementById('quantity-header')
        let quantity_header = document.getElementById('price-header')
        let price_header = document.getElementById('menu-header')
        let tax_header = document.getElementById('tax-header')
        let total_header = document.getElementById('total-header')
        let food_cart = document.getElementById('food-cart')
        let your_order_list = document.getElementById('your_order_list')
        let total_item_content = document.getElementById('total_item_content')
        let total_price_content = document.getElementById('total_price_content')
        let submit = document.getElementById('submit')

        let default_language = sessionStorage.getItem('language') || 'en'
        let languages = data.data
        if(menu_footer) menu_footer.innerHTML = default_language == 'en' ? languages[3].english : default_language == 'ja' ? languages[3].japan : languages[3].myanmar
        if(checkout_footer) checkout_footer.innerHTML = default_language == 'en' ? languages[4].english : default_language == 'ja' ? languages[4].japan : languages[4].myanmar
        if(language_footer) language_footer.innerHTML = default_language == 'en' ? languages[5].english : default_language == 'ja' ? languages[5].japan : languages[5].myanmar
        if(call_footer) call_footer.innerHTML = default_language == 'en' ? languages[6].english : default_language == 'ja' ? languages[6].japan : languages[6].myanmar
        if(table_content) table_content.innerHTML = default_language == 'en' ? languages[7].english : default_language == 'ja' ? languages[7].japan : languages[7].myanmar
        if(number_of_order_content) number_of_order_content.innerHTML = default_language == 'en' ? languages[8].english : default_language == 'ja' ? languages[8].japan : languages[8].myanmar
        if(add_to_order_list_content) add_to_order_list_content.innerHTML = default_language == 'en' ? languages[9].english : default_language == 'ja' ? languages[9].japan : languages[9].myanmar
        if(food_header) food_header.innerHTML = default_language == 'en' ? languages[1].english : default_language == 'ja' ? languages[1].japan : languages[1].myanmar
        if(quantity_header) quantity_header.innerHTML = default_language == 'en' ? languages[2].english : default_language == 'ja' ? languages[2].japan : languages[2].myanmar
        if(price_header) price_header.innerHTML = default_language == 'en' ? languages[3].english : default_language == 'ja' ? languages[3].japan : languages[3].myanmar
        if(your_receipt_content) your_receipt_content.innerHTML = default_language == 'en' ? languages[10].english : default_language == 'ja' ? languages[10].japan : languages[10].myanmar
        if(tax_header) tax_header.innerHTML = default_language == 'en' ? languages[11].english : default_language == 'ja' ? languages[11].japan : languages[11].myanmar
        if(total_header) total_header.innerHTML = default_language == 'en' ? languages[12].english : default_language == 'ja' ? languages[12].japan : languages[12].myanmar
        if(food_cart) food_cart.innerHTML = default_language == 'en' ? languages[13].english : default_language == 'ja' ? languages[13].japan : languages[13].myanmar
        if(your_order_list) your_order_list.innerHTML = default_language == 'en' ? languages[14].english : default_language == 'ja' ? languages[14].japan : languages[14].myanmar
        sessionStorage.setItem('checkout', JSON.stringify(languages[15]))
        if(total_item_content) total_item_content.innerHTML = default_language == 'en' ? languages[16].english : default_language == 'ja' ? languages[16].japan : languages[16].myanmar
        if(total_price_content) total_price_content.innerHTML = default_language == 'en' ? languages[17].english : default_language == 'ja' ? languages[17].japan : languages[17].myanmar
        if(submit) submit.innerHTML = default_language == 'en' ? languages[18].english : default_language == 'ja' ? languages[18].japan : languages[18].myanmar
    })
})

function changeLang(lang) {
    sessionStorage.setItem('language', lang)
    window.location.reload()
}

function exitRestaurant() {
  sessionStorage.removeItem('credentials')
  sessionStorage.removeItem('foods')
  sessionStorage.removeItem('checkout')
  window.location.href = 'https://google.com'
}