
export class Hardware {
    constructor(id, name, tip, info, price, hardwareImage) {
        this.id = id;
        this.name = name;
        this.tip = tip;
        this.info = info;
        this.price = price;
        this.hardwareImage = hardwareImage;
    }

    //Ustvari je crtanje slike komponente na main-container;
    drawImageToExistingImage(host, data) {
        host.src = this.hardwareImage;
        data.innerHTML = this.info;
    }

    drawHardwareToCard(host) {

        //Kontejner kartice hardvera;
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('main-card-item');

        //Slika hardvera;
        let image = document.createElement('img');
        image.classList.add('main-card-item-image');
        image.src = this.hardwareImage;

        //Naziv komponente/racunara;
        let title = document.createElement('h2');
        title.classList.add('main-card-item-title');
        title.innerHTML = this.name;

        //Opis racunara/komponente;
        let desc = document.createElement('h4');
        desc.classList.add('main-card-item-description');
        desc.innerHTML = this.info;

        //Kontejner cenu i dugme;
        let subContainer = document.createElement('div');
        subContainer.classList.add('main-card-sub-container');

        //Cena hardvera;
        let price = document.createElement('label');
        price.classList.add('main-card-item-price');
        price.innerHTML = this.price + '<i class="ri-coins-line"></i>';

        //Dugme za dodavanje hardvera u cart meni;
        let button = document.createElement('button');
        button.classList.add('main-card-item-add-to-cart');
        button.innerHTML = 'Add' + '<i class="fa-solid fa-cart-arrow-down"></i>';

        subContainer.appendChild(price);
        subContainer.appendChild(button);

        //Dodavanje komponenta na karticu;
        cardContainer.appendChild(image);
        cardContainer.appendChild(title);
        cardContainer.appendChild(desc);
        cardContainer.appendChild(subContainer);

        host.appendChild(cardContainer);

        //Event za dodavanje kartice na cart meni;
        button.addEventListener('click', () => {
            this.drawToCart()
        })
    }

    drawToCardForRemoving(host, computerId) {
        //Kontejner na koji crtamo karticu;
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('main-card-item');

        //Slika hardvera;
        let image = document.createElement('img');
        image.classList.add('main-card-item-image');
        image.src = this.hardwareImage;

        //Naziv komponente/racunara;
        let title = document.createElement('h2');
        title.classList.add('main-card-item-title');
        title.innerHTML = this.name;

        //Opis racunara/komponente;
        let desc = document.createElement('h4');
        desc.classList.add('main-card-item-description');
        desc.innerHTML = this.info;

        //Kontejner za cenu i dugme;
        let subContainer = document.createElement('div');
        subContainer.classList.add('main-card-sub-container');

        //Cena hardvera;
        let price = document.createElement('label');
        price.classList.add('main-card-item-price');
        price.innerHTML = this.price + '<i class="ri-coins-line"></i>';

        //Dugme za dodavanje u korpu;
        let button = document.createElement('button');
        button.classList.add('header-nav-cart-item-remove');
        button.innerHTML = 'Remove' + '<i class="ri-delete-bin-line"></i>';

        button.addEventListener('click', () => {
            //Za brisanje sa body-ja;
            while(cardContainer.firstChild)
                cardContainer.removeChild(cardContainer.lastChild);
            cardContainer.parentNode.removeChild(cardContainer);

            //Za brisanje sa liste hardvera ovog racunara;
            //Uklanja samo spoj koji povezuje racunar i hardver - Contains;
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

        //Ako prvi put dodajemo;
        if(deepCont == null) {
            
            const cart = document.querySelector('.header-nav-cart');

            let deepContainer = document.createElement('div');
            deepContainer.classList.add('header-nav-cart-deep-container');
            cart.appendChild(deepContainer);

            this.drawSmallCard(deepContainer);

        }
        else {  //Inace samo dodajemo karticu;
            this.drawSmallCard(deepCont);
        }
    }

    drawSmallCard(host) {
        //Kontejner za karticu unutar cart meni-ja;
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('header-nav-cart-item');

        //Slika komponente;
        let image = document.createElement('img');
        image.classList.add('header-nav-cart-item-image');
        image.src = this.hardwareImage;

        //Ime komponente;
        let title = document.createElement('h2');
        title.classList.add('header-nav-cart-item-name');
        title.innerHTML = this.name;

        //Kontejner za cenu i dugme;
        let subContainer = document.createElement('div');
        subContainer.classList.add('header-nav-cart-item-subcontainer');

        //Cena komponente;
        let price = document.createElement('label');
        price.classList.add('header-nav-cart-item-price');
        price.innerHTML = this.price + '<i class="ri-coins-line"></i>';

        //Dugme za uklanjanje kartice komponente iz cart meni-ja;
        let button = document.createElement('button');
        button.classList.add('header-nav-cart-item-remove');
        button.innerHTML = 'Remove' + '<i class="ri-delete-bin-line"></i>';

        subContainer.appendChild(price);
        subContainer.appendChild(button);

        //Dodavanja komponenta na karticu;
        cardContainer.appendChild(image);
        cardContainer.appendChild(title);
        cardContainer.appendChild(subContainer);

        //Dodavanje kartice na cart meni;
        host.prepend(cardContainer);

        //Event za brisanje kartice iz cart meni-ja;
        button.addEventListener('click', () => {
            while(cardContainer.firstChild)
                cardContainer.removeChild(cardContainer.lastChild);
            host.removeChild(cardContainer);

            if(!host.firstChild)
                host.parentNode.removeChild(host);
        })
    }

}