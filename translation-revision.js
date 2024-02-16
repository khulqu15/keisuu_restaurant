let domain_enpoint = "https://restaurant-order-dev.keisuu.net"


function openTab(index) {
    swiper.slideTo(index);
}

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    freeMode: true, // allows for free scroll without fixed positions
    slidesPerView: 1,
    spaceBetween: 10,
});

String.prototype.slugify = function (separator = "-") {
    return this
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, separator);
};

document.addEventListener('DOMContentLoaded', function() {
    let default_language = sessionStorage.getItem('language')
    if(default_language == null || default_language == undefined) {
        default_language = 'en'
        sessionStorage.setItem('language', 'en')
    }
    fetch(domain_enpoint+'/api/1/foods/home/', {
        headers: {
            'Accept': 'application/json',
        }
    })
    .then((response) => { return response.json()})
    .then((data) => {
        let nav_id = document.getElementById('nav-categories')
        let content_id = document.getElementById('food-list')
        let categories = data.data
        if(categories && nav_id) {
            let html_nav = categories.map((element, index) => {
                return `<button onclick="openTab(${index})" class="nav-item btn btn-sm ${index == 0 ? 'bg-orange-500 text-white' : 'btn-ghost hover:text-orange-600'}">${default_language == 'en' ? element.name : default_language == 'ja' ? element.japan_name : element.myanmar_name}</button>`
            })
            nav_id.innerHTML = html_nav.join('')
            document.querySelectorAll('.nav-item').forEach((item, index) => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelectorAll('.nav-item').forEach(nav => { 
                        nav.classList.add('btn-ghost', 'hover:text-orange-600'); 
                        nav.classList.remove('bg-orange-500', 'text-white'); 
                    });
                    this.classList.remove('btn-ghost', 'hover:text-orange-600'); 
                    this.classList.add('bg-orange-500', 'text-white'); 
                });
            });
            let content_html = ''
            categories.map((element, index) => {
                content_html += `<div class="swiper-slide w-full"><div class="grid p-3 lg:grid-cols-3 grid-cols-2 gap-2 w-full">`
                if(element.foods.length > 0) {
                    element.foods.map((el, idx) => {
                        content_html += `<div class="w-full h-48 rounded-xl bg-black relative overflow-hidden w-full">`
                        content_html += `<label for="${el.status == 'available' ? 'item_modal' : 'out_of_stock_modal'}" class="modal-trigger"
                        data-name="${default_language == 'en' ? el.name : default_language == 'ja' ? el.japan_name : el.myanmar_name}"
                        data-en="${el.name}"
                        data-ja="${el.japan_name}"
                        data-mm="${el.myanmar_name}"
                        data-price="${el.price}"
                        data-code="${el.food_id}"
                        data-id="${el.id}"
                        data-image="${domain_enpoint+el.image}">`
                        console.log(el.status)
                        if(el.status != 'available') {
                            content_html += `<div class="absolute right-2 top-0 z-[15]">
                                <img src="img/sold.png" class="w-16"/>
                            </div>`
                        }
                        content_html += `<img src="${domain_enpoint+el.image}" alt="Food" class="w-full cursor-pointer h-full object-cover object-center transition-all ${el.status == 'available' ? 'hover:scale-110 hover:opacity-60' : 'opacity-30'}">`
                        content_html += `<div class="absolute top-0 left-0">`
                        content_html += `<h3 class="font-bold text-lg bg-orange-500 text-white inline-block px-3 rounded-xl ${el.status != 'available' ? 'opacity-60' : ''}">${el.food_id}</h3>`
                        content_html += `</div>`
                        content_html += `<div class="absolute left-0 bottom-0 w-full bg-black/70 text-white text-sm p-2 ${el.status != 'available' ? 'opacity-60' : ''}">`
                        content_html += `<div class="font-semibold mb-1">${default_language == 'en' ? el.name : default_language == 'ja' ? el.japan_name : el.myanmar_name}</div>`
                        content_html += `<div class="text-xs">${el.price} Yen</div>`
                        content_html += `</div></label></div>`
                    })
                } else {
                    content_html += `<div class="flex justify-center w-full col-span-3">
                        <div class="flex w-full bg-red-500 text-white gap-x-3 items-center p-3 rounded-xl">
                            <span class="nonicons--not-found-16"></span>
                            <span>Food not found</span>
                        </div>
                    </div>`
                }
                content_html += `</div></div>`
            })
            if(content_id) content_id.innerHTML = content_html
            var triggers = document.querySelectorAll(".modal-trigger");
            [].forEach.call(triggers, (item, index) => {
                let name = item.getAttribute('data-name')
                let price = item.getAttribute('data-price')
                let code = item.getAttribute('data-code')
                let food_id = item.getAttribute('data-id')
                let image = item.getAttribute('data-image')
                let en = item.getAttribute('data-en')
                let ja = item.getAttribute('data-ja')
                let mm = item.getAttribute('data-mm')
                let code_modal = document.getElementById('code_modal')
                let name_modal = document.getElementById('name_modal')
                let price_modal = document.getElementById('price_modal')
                let image_modal = document.getElementById('image_modal')
                let food_id_modal = document.getElementById('food_id_modal')
                let tmp_total_modal = document.getElementById('tmp_total_modal')
                let en_modal = document.getElementById('en_modal')
                let ja_modal = document.getElementById('ja_modal')
                let mm_modal = document.getElementById('mm_modal')
                item.addEventListener("click", () => {
                    if(code_modal) code_modal.innerHTML = code
                    if(name_modal) name_modal.innerHTML = name
                    if(price_modal) price_modal.innerHTML = price
                    if(food_id_modal) food_id_modal.innerHTML = food_id
                    if(en_modal) en_modal.innerHTML = en
                    if(ja_modal) ja_modal.innerHTML = ja
                    if(mm_modal) mm_modal.innerHTML = mm
                    if(image_modal) image_modal.setAttribute('src', image)
                    if(tmp_total_modal) tmp_total_modal.innerHTML = new Intl.NumberFormat('ja-JP').format(price)
                });
            })
        }
    })
})