import { Computer } from "./Computer.js";

export class Store {
    constructor(id, name, address, shelfSize, computerList) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.shelfSize = shelfSize;
        this.computerList = computerList;
    }

    drawMyOccupancy(host) {

        //Jedva napravljeno, nemam snagu da objasnjavam logiku iza ovog kroz komentare;
        //Kontejner za karticu prodavnice;
        let container = document.createElement('div');
        container.classList.add('occupancy-info-container');

        //Ime samog prodajnog mesta;
        let title = document.createElement('div');
        title.classList.add('occupancy-info-title');
        title.innerHTML = this.name;

        //Kontejner za graficki prikaz i za numericki prikaz popunjenosti prodavnice;
        let occupancyContainer = document.createElement('div');
        occupancyContainer.classList.add('occupancy-info-data');

        //Kontejner za graficki prikaz;
        let graphContainer = document.createElement('div');
        graphContainer.classList.add('occupancy-info-data-graph-container');

        //Za prikaz slobodnog prostora, prostire se 100%(width), zauzeti deo se crta preko njega;
        let graphFree = document.createElement('div');
        graphFree.classList.add('occupancy-info-data-graph-free');
        graphFree.innerHTML = '';
        graphFree.style.width = `${100}%`;

        //Za prikaz zauzetog prostora, crta se preko slobodnog prostora, pa deluje kao da se nesto ucitava;
        let graphOccupied = document.createElement('div');
        graphOccupied.classList.add('occupancy-info-data-graph-occupied');
        graphOccupied.innerHTML = '';
        graphOccupied.style.width = `${(100/this.shelfSize) * this.computerList.length}%`;
        console.log((100/this.shelfSize) * this.computerList.length);

        //Numericki prikaz zauzetosti prodajnog mesta;
        let counter = document.createElement('h2');
        counter.classList.add('simple-count-label');
        counter.innerHTML = `${this.computerList.length}/${this.shelfSize}`;

        //Dodavanje grafickih elementa na njihov kontejner;
        graphContainer.appendChild(graphOccupied);
        graphContainer.appendChild(graphFree);

        //Dodavanje grafickog i numerickog prikaza u jedan zajednicki kontejner;
        occupancyContainer.appendChild(graphContainer);
        occupancyContainer.appendChild(counter);

        //Dodavanje naziva prodajnog mesta i prikaza na karticu;
        container.appendChild(title);
        container.appendChild(occupancyContainer);

        //Dodavanje kartice na body/kontejner za prikaz statusa prodavnica;
        host.appendChild(container);
    }

    drawMyInfo(host) {
        //Kontejner za prikaz podataka prodavnice;
        let container = document.createElement('div')
        container.classList.add('store-info-container');
        
        //Ime prodavnice;
        let name = document.createElement('label');
        name.classList.add('store-info-container-name');
        name.innerHTML = this.name;

        //Adresa prodavnice;
        let addr = document.createElement('label');
        addr.classList.add('store-info-container-addr');
        addr.innerHTML = this.address;

        //Ukupan broj polica za racunare;
        let size = document.createElement('h3');
        size.classList.add('store-info-container-size');
        size.innerHTML = 'Shelf count: ' + this.shelfSize;

        //Dodavanje na odgovarajuci kontejner;
        container.appendChild(name);
        container.appendChild(addr);
        container.appendChild(size);

        host.appendChild(container);
    }

    //Crtanje kartica svih racunara koji su deo ove prodavnice na odgovarajuci kontejner;
    drawToCard(host) {
        this.computerList.forEach(s => {
            s.drawMyselfToCard(host);
        });
    }

}