import { Hardware } from './Hardware.js';

export class Computer {
    constructor(id, name, price, hardwareList, computerImage) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.hardwareList = hardwareList;
        this.computerImage = computerImage;
    }

    drawMyselfToCard(host) {
        let listaHardvera = [];
        
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
                let description = '';
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
        //Hvatamo cart kontejner u koji crtamo;
        //Mora querySelector zato sto crtam komponente na vise elementa na stranici;
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

            let buy = document.querySelector('.confirm-button');
            if(buy != null)
                buy.remove();

            let confirmButton = document.createElement('button');
            confirmButton.classList.add('confirm-button');
            confirmButton.innerHTML = 'Confirm?';
            deepContainer.appendChild(confirmButton);

            this.drawSmallCard(deepContainer);

            
            confirmButton.addEventListener('click', () => {
                //Za automatsko zatvaranje cart-menija
                deepContainer.parentNode.classList.remove('show-cartMenu');

                if(document.querySelector('.screen-form') != null)
                    console.log('Vec je aktivirano!');
                else {

                    //Za otkazivanje kupovine
                    let closeBtn = document.createElement('a');
                    closeBtn.classList.add('close-form-button');
                    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

                    //Za uklanjanje forme za potvrdu iz body-ja
                    closeBtn.addEventListener('click', () => {
                        this.removeForm(screenForm);
                    })

                    //Forma koja zauzima ceo ekran
                    let screenForm = document.createElement('div');
                    screenForm.classList.add('screen-form');

                    document.body.appendChild(screenForm);
                    
                    //Forma za potvrdu kupovine:
                    let form = document.createElement('div');
                    form.classList.add('confirm-form');
                    
                    screenForm.appendChild(closeBtn);
                    screenForm.appendChild(form);

                    let labels = ['First Name:', 'Last Name:', 'Address:', 'Credit card num:', 'Phone number:'];
                    let inputList = [];

                    for(let i = 0; i < labels.length; i++) {
                        //Za input i labelu:
                        let smallerInputContainer = document.createElement('div');
                        smallerInputContainer.classList.add('smaller-input-container');

                        //Labela:
                        let label = document.createElement('label');
                        label.classList.add('smaller-label');
                        label.innerHTML = labels[i];

                        //Input:
                        let inputEl = document.createElement('input');
                        inputEl.classList.add('form-input');

                        inputList.push(inputEl);
                        
                        if(i < 3)
                            inputEl.type = 'text';
                        else 
                            inputEl.type = 'number';
                        
                        smallerInputContainer.appendChild(label);
                        smallerInputContainer.appendChild(inputEl);

                        form.appendChild(smallerInputContainer);
                    }

                    let button = document.createElement('button');
                    button.classList.add('form-confirm-button');
                    button.innerHTML = 'Confirm purchase' + '<i class="fa-solid fa-check-double"></i>';
                    form.appendChild(button);

                    button.addEventListener('click', () => {
                        //Provera da li su svi elementi popunjeni
                        if(inputList[0].value == '' ||  inputList[1].value == '' ||  inputList[2].value == '' ||  inputList[3].value == '' || inputList[4].value == '')
                            alert('Niste uneli sve podatke!');
                        else {
                            //Ispisivanje poruke, SMS bi trebao da posalje neki automat na osnovu unesenih podataka, barem je takva ideja
                            alert(`Uspesno ste potvrdili kupovinu!\nUskoro cete dobiti poruku za validaciju transakcije na broju: ${inputList[4].value}\nHvala vam na ukazanom poverenju!`);
                            //Uklanjanje forme i ciscenje cart-menija, jer smo zavrsili sa kupovinom
                            this.removeForm(screenForm);
                            this.clearCart(deepContainer);
                        }
                    })
                }
            });
        }
        else {  //Inace samo dodajemo karticu!
            this.drawSmallCard(deepCont);
        }
    }

    drawSmallCard(host) {
        //Kontejner kartice;
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('header-nav-cart-item');

        //Slika racunara;
        let image = document.createElement('img');
        image.classList.add('header-nav-cart-item-image');
        image.src = this.computerImage;

        //Ime racunara;
        let title = document.createElement('h2');
        title.classList.add('header-nav-cart-item-name');
        title.innerHTML = this.name;

        //Kontejner za cenu i za dugme za izbacivanje iz korpe;
        let subContainer = document.createElement('div');
        subContainer.classList.add('header-nav-cart-item-subcontainer');

        //Cena racunara;
        let price = document.createElement('label');
        price.classList.add('header-nav-cart-item-price');
        price.innerHTML = this.price + '<i class="ri-coins-line"></i>';

        //Dugme za brisanje; 
        let button = document.createElement('button');
        button.classList.add('header-nav-cart-item-remove');
        button.innerHTML = 'Remove' + '<i class="ri-delete-bin-line"></i>';

        subContainer.appendChild(price);
        subContainer.appendChild(button);

        //Dodavanje na glavni kontejner kartice;
        cardContainer.appendChild(image);
        cardContainer.appendChild(title);
        cardContainer.appendChild(subContainer);

        //Dodavanje na cart kontejner;
        host.prepend(cardContainer);

        //Event za brisanje iz korpe ;
        button.addEventListener('click', () => {
            while(cardContainer.firstChild)
                cardContainer.removeChild(cardContainer.lastChild);
            host.removeChild(cardContainer);

            if(host.childElementCount == 1) {
                host.removeChild(host.firstChild);
                host.parentNode.removeChild(host);
            }
        })
    }

    removeForm(host) {
        while(host.firstChild)
            host.removeChild(host.lastChild);
        document.body.removeChild(host);
    }

    clearCart(host) {
        //Cistimo sve cart-iteme
        while(host.firstChild)
            host.removeChild(host.lastChild);
        
        //Brisemo deep-container svakako
        host.parentNode.removeChild(host);
    }

}