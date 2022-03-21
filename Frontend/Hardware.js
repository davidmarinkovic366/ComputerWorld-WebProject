
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
            }).then(p => {
                if(p.ok) {
                    alert('Komponenta uspesno uklonjena iz racunara!');
                }
                else {
                    alert('Doslo je do greske!');
                }
            })
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
            console.log('Poziva mene, dodaje se i deepContainer');
            
            const cart = document.querySelector('.header-nav-cart');

            let deepContainer = document.createElement('div');
            deepContainer.classList.add('header-nav-cart-deep-container');
            cart.appendChild(deepContainer);

            let confirmButton = document.createElement('button');
            confirmButton.classList.add('confirm-button');
            confirmButton.innerHTML = 'Confirm?';
            deepContainer.appendChild(confirmButton);

            this.drawSmallCard(deepContainer);
            

            confirmButton.addEventListener('click', () => {
                //Za automatsko zatvaranje cart-menija
                deepContainer.parentNode.classList.remove('show-cartMenu');

                if(document.querySelector('.screen-form') != null) {
                    console.log('Vec je otvoreno!');
                }
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