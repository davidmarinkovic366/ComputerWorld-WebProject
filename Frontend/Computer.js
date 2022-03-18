import { Hardware } from './Hardware.js';

export class Computer {
    constructor(id, name, price, hardwareList, computerImage) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.hardwareList = hardwareList;
        this.computerImage = computerImage;
    }

    drawCard(host) {

        //TODO: smatramo da je host onaj grid view, ili neki flex-box, videcemo
        //na njega samo dodajemo karte!
        //FIXME: mozda moramo da sve stavimo u neki div, videcemo zbog flex dizajna!
        //FIXME: ovo svakako ne radi nista jos uvek, moram da smislim sta da bude opis za 
        //racunare, mogu da uzmem imena svih komponenti, samo nzm da li su to komponente
        //ili moram da iz veze 'Content' izvlacim hardver pa iz njega ime komponente? 

        const mainCard = document.createElement('div');
        mainCard.classList.add('card-view-main');

        let name = document.createElement('h2');
        name.classList.add('card-view-header');
        name.innerHTML = this.name;

        let desc;
        this.hardwareList.forEach( s => {
            if(desc == null) {
                desc = desc + s.name;
            }
        });

        let description = document.createElement('h3');
        description.classList.add('card-viev-description');
    }

    drawMyselfToCard(host) {
        //FIXME: Dodaj cardContainer na host na kraju crtanja!!
        let listaHardvera = [];
        // console.log(this.id);
        console.log('Pozivamo vrati komponente racunara!' + this.id);
        
        fetch(`https://localhost:5001/ComputerStore/VratiKomponenteRacunara/${this.id}`, {
            method:"GET"
        })
        .then(p => {
            p.json().then(a => {
                a.forEach(b => {
                    console.log(b.hardwareList);
                    listaHardvera.push(b.hardwareList);
                })

                //Opis racunara je ustvari samo ime svih hardvera od kojih se sastoji!
                let description = null;
                listaHardvera.forEach(p => {
                    description += ' - ' + p.hardwareName;
                })
                console.log(description);
                
                //Div koji sluzi kao kontejner za crtanje karte ovog racunara
                let cardContainer = document.createElement('div');
                cardContainer.classList.add('main-card-item');

                //Slika racunara
                let image = document.createElement('img');
                image.classList.add('main-card-item-image');
                image.src = this.computerImage;

                //Naziv komponente/racunara
                let title = document.createElement('h2');
                title.classList.add('main-card-item-title');
                title.innerHTML = this.name;

                //Opis racunara/komponente
                let desc = document.createElement('h4');
                desc.classList.add('main-card-item-description');
                desc.innerHTML = description;

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
                    this.drawAddToCart();
                })
            })
        })


        // //Div koji sluzi kao kontejner za crtanje karte ovog racunara
        // let cardContainer = document.createElement('div');
        // cardContainer.classList.add('main-card-item');

        // let image = document.createElement('img');
        // image.classList.add('main-card-item-image');
        // image.src = this.computerImage;

        // let title = document.createElement('h2');
        // title.classList.add('main-card-item-title');
        // title.innerHTML = this.name;

        // let desc = document.createElement('h4');
        // desc.classList.add('main-card-item-description');
        // desc.innerHTML = this.
        
    }

    drawAddToCart() {
        //TODO: Uhvati cart menu
        //Ok, radi
        
        let deepCont = document.querySelector('.header-nav-cart-deep-container');

        // console.log(deepCont);

        //Ako prvi put dodajemo?
        if(deepCont == null) {
            
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
        //Card container
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('header-nav-cart-item');

        //Card image
        let image = document.createElement('img');
        image.classList.add('header-nav-cart-item-image');
        image.src = this.computerImage;

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