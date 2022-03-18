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

        let container = document.createElement('div');
        container.classList.add('occupancy-info-container');

        let title = document.createElement('div');
        title.classList.add('occupancy-info-title');
        title.innerHTML = this.name;

        let occupancyContainer = document.createElement('div');
        occupancyContainer.classList.add('occupancy-info-data');

        let graphContainer = document.createElement('div');
        graphContainer.classList.add('occupancy-info-data-graph-container');

        let graphFree = document.createElement('div');
        graphFree.classList.add('occupancy-info-data-graph-free');
        graphFree.innerHTML = '';
        graphFree.style.width = `${100}%`;

        let graphOccupied = document.createElement('div');
        graphOccupied.classList.add('occupancy-info-data-graph-occupied');
        graphOccupied.innerHTML = '';
        graphOccupied.style.width = `${(100/this.shelfSize) * this.computerList.length}%`;
        console.log((100/this.shelfSize) * this.computerList.length);
        // graphOccupied.style.height = '1rem';

        let counter = document.createElement('h2');
        counter.classList.add('simple-count-label');
        counter.innerHTML = `${this.computerList.length}/${this.shelfSize}`;

        graphContainer.appendChild(graphOccupied);
        graphContainer.appendChild(graphFree);

        occupancyContainer.appendChild(graphContainer);
        occupancyContainer.appendChild(counter);

        container.appendChild(title);
        container.appendChild(occupancyContainer);

        host.appendChild(container);
    }

    drawToCard(host) {
        this.computerList.forEach(s => {
            s.drawMyselfToCard(host);
        });
    }

}