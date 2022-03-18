
export class Hardware {
    constructor(id, name, tip, info, price, hardwareImage) {
        this.id = id;
        this.name = name;
        this.tip = tip;
        this.info = info;
        this.price = price;
        this.hardwareImage = hardwareImage;
    }

    drawImageToExistingImage(host, data) {
        host.src = this.hardwareImage;
        data.innerHTML = this.info;
    }

    drawHardwareToCard(host) {
        //Hardware card
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('main-card-item');

        //Slika hardvera
        let image = document.createElement('img');
        image.classList.add('main-card-item-image');
        image.src = this.hardwareImage;

        //Naziv komponente/racunara
        let title = document.createElement('h2');
        title.classList.add('main-card-item-title');
        title.innerHTML = this.name;

        //Opis racunara/komponente
        let desc = document.createElement('h4');
        desc.classList.add('main-card-item-description');
        desc.innerHTML = this.info;

        //Container for price and button
        let subContainer = document.createElement('div');
        subContainer.classList.add('main-card-sub-container');

        //Computer price
        let price = document.createElement('label');
        price.classList.add('main-card-item-price');
        price.innerHTML = this.price + '<i class="ri-coins-line"></i>';

        //Button for adding to cart!
        let button = document.createElement('button');
        button.classList.add('main-card-item-add-to-cart');
        button.innerHTML = 'Add' + '<i class="fa-solid fa-cart-arrow-down"></i>';

        subContainer.appendChild(price);
        subContainer.appendChild(button);

        cardContainer.appendChild(image);
        cardContainer.appendChild(title);
        cardContainer.appendChild(desc);
        cardContainer.appendChild(subContainer);

        host.appendChild(cardContainer);

        button.addEventListener('click', () => {
            this.drawToCart()
        })
    }

    drawToCardForRemoving(host, computerId) {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('main-card-item');

        //Slika hardvera
        let image = document.createElement('img');
        image.classList.add('main-card-item-image');
        image.src = this.hardwareImage;

        //Naziv komponente/racunara
        let title = document.createElement('h2');
        title.classList.add('main-card-item-title');
        title.innerHTML = this.name;

        //Opis racunara/komponente
        let desc = document.createElement('h4');
        desc.classList.add('main-card-item-description');
        desc.innerHTML = this.info;

        //Container for price and button
        let subContainer = document.createElement('div');
        subContainer.classList.add('main-card-sub-container');

        //Computer price
        let price = document.createElement('label');
        price.classList.add('main-card-item-price');
        price.innerHTML = this.price + '<i class="ri-coins-line"></i>';

        //Button for adding to cart!
        let button = document.createElement('button');
        button.classList.add('header-nav-cart-item-remove');
        button.innerHTML = 'Remove' + '<i class="ri-delete-bin-line"></i>';

        button.addEventListener('click', () => {
            //Remove from body
            while(cardContainer.firstChild)
                cardContainer.removeChild(cardContainer.lastChild);
            cardContainer.parentNode.removeChild(cardContainer);

            //Call delete method to backend
            fetch(`https://localhost:5001/ComputerStore/UkloniHardverIzRacunara/${computerId}/${this.id}`, {
                method:"DELETE"
            });
        })

        subContainer.appendChild(price);
        subContainer.appendChild(button);

        cardContainer.appendChild(image);
        cardContainer.appendChild(title);
        cardContainer.appendChild(desc);
        cardContainer.appendChild(subContainer);

        host.appendChild(cardContainer);
    }

    drawToCart(){
        let deepCont = document.querySelector('.header-nav-cart-deep-container');

        //Ako prvi put dodajemo
        if(deepCont == null) {
            
            const cart = document.querySelector('.header-nav-cart');

            let deepContainer = document.createElement('div');
            deepContainer.classList.add('header-nav-cart-deep-container');
            cart.appendChild(deepContainer);
            // cart.appendChild(confirmBtn);

            this.drawSmallCard(deepContainer);

        }
        else {  //Inace samo dodajemo karticu

            this.drawSmallCard(deepCont);
        }
    }

    drawSmallCard(host) {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('header-nav-cart-item');

        //Card image
        let image = document.createElement('img');
        image.classList.add('header-nav-cart-item-image');
        image.src = this.hardwareImage;

        //Component name
        let title = document.createElement('h2');
        title.classList.add('header-nav-cart-item-name');
        title.innerHTML = this.name;

        //Subcontainer for price and remove btn
        let subContainer = document.createElement('div');
        subContainer.classList.add('header-nav-cart-item-subcontainer');

        //Computer price
        let price = document.createElement('label');
        price.classList.add('header-nav-cart-item-price');
        price.innerHTML = this.price + '<i class="ri-coins-line"></i>';

        //Remove btn
        let button = document.createElement('button');
        button.classList.add('header-nav-cart-item-remove');
        button.innerHTML = 'Remove' + '<i class="ri-delete-bin-line"></i>';

        subContainer.appendChild(price);
        subContainer.appendChild(button);

        //Adding items to small card
        cardContainer.appendChild(image);
        cardContainer.appendChild(title);
        cardContainer.appendChild(subContainer);

        //Adding card to cart container
        host.prepend(cardContainer);

        button.addEventListener('click', () => {
            while(cardContainer.firstChild)
                cardContainer.removeChild(cardContainer.lastChild);
            host.removeChild(cardContainer);

            if(!host.firstChild)
                host.parentNode.removeChild(host);
        })
    }

}