let domain_enpoint = "http://localhost:8000"

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
                return `<a href="#" onclick="openTab(${index})" class="nav-item ${index == 0 ? 'active' : ''}">${default_language == 'en' ? element.name : default_language == 'ja' ? element.japan_name : element.myanmar_name}</a>`
            })
            nav_id.innerHTML = html_nav.join('')
            document.querySelectorAll('.nav-item').forEach((item, index) => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelectorAll('.nav-item').forEach(nav => { nav.classList.remove('active'); });
                    this.classList.add('active');
                });
            });
            content_html = ''
            categories.map((element, index) => {
                content_html += `<div class="swiper-slide"><div class="grid-container">`
                if(element.foods.length > 0) {
                    element.foods.map((el, idx) => {
                        content_html += `<div class="trigger" 
                        data-name="${default_language == 'en' ? el.name : default_language == 'ja' ? el.japan_name : el.myanmar_name}"
                        data-price="${el.price}"
                        data-code="${el.food_id}"
                        data-image="${domain_enpoint+el.image}">
                            <img src="${domain_enpoint+el.image}" class="food-img">
                            <p class="food-text">${default_language == 'en' ? el.name : default_language == 'ja' ? el.japan_name : el.myanmar_name} <br> ${el.price} Yen</p>
                        </div>`
                    })
                } else {
                    content_html += `<div>
                        <div>Food not found</div>
                    </div>`
                }
                content_html += `</div></div>`
            })
            content_id.innerHTML = content_html
            var modal = document.querySelector(".modal");
            var triggers = document.querySelectorAll(".trigger");
            var closeButton = document.querySelector(".close-button");
            function toggleModal(e) {
                console.log(e)
                modal.classList.toggle("show-modal");
            }

            function windowOnClick(event) {
                if (event.target === modal) toggleModal()
            }
            
            // for (var i = 0, len = triggers.length; i < len; i++) {
            //     // triggers[i].addEventListener("click", toggleModal);
            //     triggers[i].addEventListener("click", () => {
            //         console.log(name)
            //         modal.classList.toggle("show-modal");
            //     });
            // }
            // console.log(triggers)
            [].forEach.call(triggers, (item, index) => {
                let name = item.getAttribute('data-name')
                let price = item.getAttribute('data-price')
                let code = item.getAttribute('data-code')
                let image = item.getAttribute('data-image')
                item.addEventListener("click", () => {
                    console.log(name)
                    document.getElementById('code_modal').innerHTML = code
                    document.getElementById('name_modal').innerHTML = name
                    document.getElementById('price_modal').innerHTML = price
                    document.getElementById('image_modal').setAttribute('src', image)
                    modal.classList.toggle("show-modal");
                });
            
            })
            closeButton.addEventListener("click", toggleModal);
            window.addEventListener("click", windowOnClick);
        }
    })
})