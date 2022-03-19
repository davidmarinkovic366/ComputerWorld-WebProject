import { Hardware } from './Hardware.js';

export class Computer {
    constructor(id, name, price, hardwareList, computerImage) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.hardwareList = hardwareList;
        this.computerImage = computerImage;
    }

    //FIXME: Ovo je ostalo iz prethodnog projekta, mozes da obrises ako sve radi
    // drawCard(host) {

    //     const mainCard = document.createElement('div');
    //     mainCard.classList.add('card-view-main');

    //     let name = document.createElement('h2');
    //     name.classList.add('card-view-header');
    //     name.innerHTML = this.name;

    //     let desc;
    //     this.hardwareList.forEach( s => {
    //         if(desc == null) {
    //             desc = desc + s.name;
    //         }
    //     });

    //     let description = document.createElement('h3');
    //     description.classList.add('card-viev-description');
    // }

    drawMyselfToCard(host) {
        let listaHardvera = [];
        // console.log('Pozivamo vrati komponente racunara!' + this.id);
        
        fetch(`https://localhost:5001/ComputerStore/VratiKomponenteRacunara/${this.id}`, {
            method:"GET"
        })
        .then(p => {
            p.json().then(a => {
                a.forEach(b => {
                    console.log(b.hardwareList);
                    listaHardvera.push(b.hardwareList);
                })

                //FIXME: Probaj null da obrises
                //Opis racunara je ustvari samo ime svih hardvera od kojih se sastoji!;
                let description = null;
                listaHardvera.forEach(p => {
                    description += ' - ' + p.hardwareName;
                })
                console.log(description);
                
                //Div koji sluzi kao kontejner za crtanje karte ovog racunara;
                let cardContainer = document.createElement('div');
                cardContainer.classList.add('main-card-item');

                //Slika racunara;
                let image = document.createElement('img');
                image.classList.add('main-card-item-image');
                image.src = this.computerImage;

                //Naziv komponente/racunara;
                let title = document.createElement('h2');
                title.classList.add('main-card-item-title');
                title.innerHTML = this.name;

                //Opis racunara/komponente;
                let desc = document.createElement('h4');
                desc.classList.add('main-card-item-description');
                desc.innerHTML = description;

                //Kontejner za cenu i dugme;
                let subContainer = document.createElement('div');
                subContainer.classList.add('main-card-sub-container');

                //Cena;
                let price = document.createElement('label');
                price.classList.add('main-card-item-price');
                price.innerHTML = this.price + '<i class="ri-coins-line"></i>';

                //Dugme za dodavanja u korpu;
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
                    this.drawAddToCart();
                })
            })
        })
    }

    drawAddToCart() {
        //Hvatamo cart kontejner u koji crtamo 
        let deepCont = document.querySelector('.header-nav-cart-deep-container');

        //Ako prvi put dodajemo?
        if(deepCont == null) {
            
            //Inace, moramo da hvatamo roditeljski element, pa na njega da dodamo, 
            //Lakse je ovako jer se ovo samo jednom obavlja, da ne bi imali 100x hvatanje 
            //ovog kontejnera, pa onda hvatanje njegovog deteta;
            const cart = document.querySelector('.header-nav-cart');

            let deepContainer = document.createElement('div');
            deepContainer.classList.add('header-nav-cart-deep-container');
            cart.appendChild(deepContainer);

            this.drawSmallCard(deepContainer);

        }
        else {  //Inace samo dodajemo karticu!
            this.drawSmallCard(deepCont);
        }
    }

    drawSmallCard(host) {
        //Kontejner kartice
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('header-nav-cart-item');

        //Slika racunara
        let image = document.createElement('img');
        image.classList.add('header-nav-cart-item-image');
        image.src = this.computerImage;

        //Ime racunara
        let title = document.createElement('h2');
        title.classList.add('header-nav-cart-item-name');
        title.innerHTML = this.name;

        //Kontejner za cenu i za dugme za izbacivanje iz korpe
        let subContainer = document.createElement('div');
        subContainer.classList.add('header-nav-cart-item-subcontainer');

        //Cena racunara
        let price = document.createElement('label');
        price.classList.add('header-nav-cart-item-price');
        price.innerHTML = this.price + '<i class="ri-coins-line"></i>';

        //Dugme za brisanje 
        let button = document.createElement('button');
        button.classList.add('header-nav-cart-item-remove');
        button.innerHTML = 'Remove' + '<i class="ri-delete-bin-line"></i>';

        subContainer.appendChild(price);
        subContainer.appendChild(button);

        //Dodavanje na glavni kontejner kartice
        cardContainer.appendChild(image);
        cardContainer.appendChild(title);
        cardContainer.appendChild(subContainer);

        //Dodavanje na cart kontejner
        host.prepend(cardContainer);

        //Event za brisanje iz korpe 
        button.addEventListener('click', () => {
            while(cardContainer.firstChild)
                cardContainer.removeChild(cardContainer.lastChild);
            host.removeChild(cardContainer);

            if(!host.firstChild)
                host.parentNode.removeChild(host);
        })
    }


}