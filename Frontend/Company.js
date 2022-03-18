import { Store } from "./Store.js";
import { Computer } from "./Computer.js";
import { Hardware } from "./Hardware.js";


export class Company {
    constructor(name, storeList, computerList, hardwareList) {
        this.name = name;
        this.storeList = storeList;
        this.computerList = computerList;
        this.hardwareList = hardwareList;
        this.container = null;
    }

    //FIXME: First options lists inside left menu(host/subMenu selector!) 
    drawCompanyFunctionsMenu(host) {
        
        this.clearLeftMenu();

        let list = ['Stores', 'Computers', 'Hardware'];
        let selectList = [];
        let selectSubList = [];

        let list1 = ['Add Store', 'Add To Store', 'Show All Stores', 'Show Occupancy', 'Browse All Items'];
        let list2 = ['Add Computer', 'Add Component', 'Computer Hardware', 'Change Price', 'Remove Component', 'Browse'];
        let list3 = ['Add Hardware', 'Browse'];
        let bigList = [list1, list2, list3];

        let menuItemsContainer = document.createElement('div');
        menuItemsContainer.classList.add('header-nav-sub-items-container');
        // menuItemsContainer.innerHTML = 'Data' + 'Jos nesto';
        host.appendChild(menuItemsContainer);
        
        for(let i = 0; i < list.length; i++) {

            //Tekst linka
            let link = document.createElement('a');
            link.classList.add('header-nav-sub-item');
            link.innerHTML = list[i] + '<i class="ri-arrow-down-s-line"></i>';

            //FIXME: Mozes da obrises ako lepo napravis za header-nav-sub-item da je centrirano
            //Slika strelice na dole
            // let linkButton = document.createElement('span');
            // linkButton.classList.add('header-nav-sub-item-arrow');
            // linkButton.innerHTML = '<i class="ri-arrow-down-s-line"></i>';

            //Kontejner za tekst i strelicu
            //Promenio sam da je 'a' umesto div, ako pravi problem vrati!
            //FIXME:
            let smallLink = document.createElement('a');
            smallLink.classList.add('header-nav-sub-items-small-link');

            //Dodavanje teksta i strelice u kontejner
            smallLink.appendChild(link);
            // smallLink.appendChild(linkButton);

            //Kontejner za ovaj link i za dropdown listu
            let smallNavDiv = document.createElement('div');
            smallNavDiv.classList.add('header-nav-sub-items-small-div');

            //Dodavanje linka
            smallNavDiv.appendChild(smallLink);
            smallNavDiv.addEventListener('click', () => {

                let openLists = document.querySelectorAll('.header-nav-sub-items-small-div');
                openLists.forEach(p => {
                    if(p !== smallNavDiv)
                        if(p.classList.contains('header-nav-sub-items-small-div-clicked'))
                            p.classList.remove('header-nav-sub-items-small-div-clicked');
                });

                if(smallNavDiv.classList.contains('header-nav-sub-items-small-div-clicked'))
                    smallNavDiv.classList.remove('header-nav-sub-items-small-div-clicked');
                else
                    smallNavDiv.classList.add('header-nav-sub-items-small-div-clicked');


            });

            //Dodavanje dropdown liste
            let dropDownMenuItemList = document.createElement('div');
            dropDownMenuItemList.classList.add('header-nav-sub-sub-items-div');

            //Dodavanje jos jednog diva kao kontejner za sve linkove!
            let dropDownMenuItemListContainer = document.createElement('div');
            dropDownMenuItemListContainer.classList.add('header-nav-sub-sub-items-div-container');
            // dropDownMenuItemListContainer.innerHTML = 'proba1223';

            //Dodavanje kontejnera za upravljanje drop-down liste na originalni
            //koji treba da se pojavi samo na poziv
            dropDownMenuItemList.appendChild(dropDownMenuItemListContainer);
            
            //Dodavanje drop-down liste na linkove
            smallNavDiv.appendChild(dropDownMenuItemList);

            //TODO: Dodavanje sadrzaja samih dropdown listi:

            for(let j = 0;  j < bigList[i].length; j++) {
                //Link
                let dropDownMenuItem = document.createElement('a');
                dropDownMenuItem.classList.add('header-nav-drop-down-item');

                //Sadrzaj samog linka
                dropDownMenuItem.innerHTML = bigList[i][j] + '<i class="ri-arrow-drop-right-line"></i>';

                //Dodavanje linka u listu za metode
                selectSubList.push(dropDownMenuItem);

                //TODO: Dodavanje linka u div na stranicu:
                dropDownMenuItemListContainer.appendChild(dropDownMenuItem);
            
            }

            // menuItemsContainer.appendChild(smallLink);
            menuItemsContainer.appendChild(smallNavDiv);
            selectList.push(smallLink);
        }

        //TODO: adding events to links in left menu:
        //TODO: Store method functions: 

        //Add store to database function:
        //Radi, gotovo!
        selectSubList[0].addEventListener('click', () => {
            console.log('Add store to database function');
            this.closeLeftMenu();
            this.clearAndRemove();

            //Container for drawing stuff on page
            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');

            this.container.appendChild(mainContainer);

            //Container for all input elements
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            mainContainer.appendChild(inputContainerDiv);

            let inputList = [];

            let labelList = ['Store Name:', 'Store Address:', 'Shelf count:'];
            for(let i = 0; i < labelList.length; i++) {
                /*<div>
                    <label> </label>
                    <input> </input>
                </div> */
                let smallInputContainer = document.createElement('div');
                smallInputContainer.classList.add('small-input-div');

                let label = document.createElement('label');
                // label.classList.add('simple-input-label');
                label.classList.add('simple-label');
                label.innerHTML = labelList[i];

                let inputEl = document.createElement('input');
                if( i === 2)
                    inputEl.type = 'number';
                else
                    inputEl.type = 'text';
                inputEl.classList.add('input-element');

                inputList.push(inputEl);

                //Adding elements in sub-container
                smallInputContainer.appendChild(label);
                smallInputContainer.appendChild(inputEl);

                //Adding sub-container to main container
                inputContainerDiv.appendChild(smallInputContainer);
            }

            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Add' + '<i class="ri-add-fill"></i>';

            mainContainer.appendChild(button);

            button.addEventListener('click', () => {
                console.log(`Uneta je prodavnica: ${inputList[0].value}.`);
                console.log(`Prodavnica se nalazi na adresi: ${inputList[1].value}.`);
                console.log(`Prodavnica ima: ${inputList[2].value} polica za racunare!`);
                
                //FIXME: Samo odkomentarisi, radi kako treba!
                //Provere da li je sve uneseno se desavaju na backend-u!
                // fetch(`https://localhost:5001/ComputerStore/DodajProdavnicu/${inputList[0].value}/${inputList[1].value}/${inputList[2].value}`,{
                //     method:"POST"
                // });
                
                inputList.forEach(e => {
                    e.value = '';
                });
                console.log('Dodato!');
                
            });

        });

        //FIXME: Add computer to store:
        //Dodajemo nesto sto postoji na nesto sto vec postoji, nema
        //potrebe da updejtujemo podatke, osim za prodavnice, 
        //mada, mozda bi i trebalo ako pretrazujemo veze? 
        //A mozemo i po vezama da pretrazujemo, bmk.
        selectSubList[1].addEventListener('click', () => {
            console.log('Add computer to store');
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            mainContainer.appendChild(inputContainerDiv);

            let labelList = ['Computer:', 'Store:'];

            let selectList = [];



            for(let i = 0; i < labelList.length; i++) {
                let smallInputContainer = document.createElement('div');
                smallInputContainer.classList.add('small-input-div');

                let label = document.createElement('label');
                // label.classList.add('simple-input-label');
                label.classList.add('simple-label');
                label.innerHTML = labelList[i];

                let inputEl = document.createElement('select');
                inputEl.classList.add('simple-input-list');

                selectList.push(inputEl);

                //Adding elements in sub-container
                smallInputContainer.appendChild(label);
                smallInputContainer.appendChild(inputEl);

                //Adding sub-container to main container
                inputContainerDiv.appendChild(smallInputContainer);
            }

            this.computerList.forEach(c => {
                let opt = document.createElement('option');
                opt.value = c.id;
                opt.text = c.name;
                selectList[0].appendChild(opt);
            });

            this.storeList.forEach(s => {
                let opt = document.createElement('option');
                opt.value = s.id;
                opt.text = s.name;
                selectList[1].appendChild(opt);
            }); 

            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Append' + '<i class="ri-add-fill"></i>';

            mainContainer.appendChild(button);

            button.addEventListener('click', () => {
                console.log(`Prodavnica: ${this.storeList[selectList[1].selectedIndex].name} & ${this.storeList[selectList[1].selectedIndex].id}`);
                console.log(`Racunar: ${this.computerList[selectList[0].selectedIndex].name} & ${this.computerList[selectList[0].selectedIndex].id}`);
            });

        });

        //FIXME: Show all stores with locations:
        selectSubList[2].addEventListener('click', () => {
            console.log('Show all stores with locations');
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Container for chosing store by name and button to confirm
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            //Appending to body
            mainContainer.appendChild(inputContainerDiv);

            let selectList = document.createElement('select');
            selectList.classList.add('simple-input-list');

            this.storeList.forEach(store => {
                let opt = document.createElement('option');
                opt.value = store.id;
                opt.text = store.name;
                selectList.appendChild(opt);
            });

            //Adding select list to body
            inputContainerDiv.appendChild(selectList);
            
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Check' + '<i class="ri-question-mark"></i>';

            inputContainerDiv.appendChild(button);

            button.addEventListener('click', () => {

                this.clearAndDelete(document.querySelector('.display-store-container'))

                //Id of selected store in list
                let storeId = this.storeList[selectList.selectedIndex].id;
                console.log(storeId);
                //For displaying store info and all computers inside chosen store
                let displayStore = document.createElement('div');
                displayStore.classList.add('display-store-container');

                mainContainer.appendChild(displayStore);

                //Chosing store by uniqueId in this.storeList
                let chosenStore;
                this.storeList.forEach( el => {
                    if(el.id == storeId)
                        chosenStore = el;
                });

                // console.log(chosenStore);

                //Container for address!
                let addr = document.createElement('h3');
                addr.classList.add('simple-info-label');
                addr.innerHTML = 'Address: ' + chosenStore.address;

                displayStore.appendChild(addr);

                let displayData = document.createElement('div');
                displayData.classList.add('display-store-container-data');
                
                //Popravljeno, ne mozemo odjednom da vratimo 2 objekta iz nekog
                //Razloga, iako sam siguran da nije dubina veca od 3, a kamo li
                //32, al ajde
                //FIXME: Popravljeno malo sutra, iz nekog razloga lepo mi stampa
                //vrednosti na konzolu kao niz, ali ne kao i pojedninacne..

                let newComputerList = [];
                fetch(`https://localhost:5001/ComputerStore/VratiSveRacunareProdavnice/${storeId}`, {
                    method:"GET"
                })
                .then(p => {
                    p.json().then(computers => {
                        computers.forEach(computer => {
                            // console.log(prodavnica);
                            computer.racunari.forEach(s => {
                                let comp = new Computer(s.computerId, s.computerName, s.computerPrice, null, s.image);
                                // comp.drawMyselfToCard()
                            })
                            // comp.name = computer.computerName;

                            
                            //For drawing data to info part of this method!
                            // comp.drawMyselfToStoreInfo(displayData);
                        })
                    })
                })
            })



        });

        //FIXME: Show occupancy:
        //Sve radi, sve ok
        selectSubList[3].addEventListener('click', () => {
            console.log('Show occupancy');
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            let cont = document.createElement('div');
            cont.classList.add('main-container-occupancy');
            mainContainer.appendChild(cont);

            //FIXME: Mozda cu morati da sve dodam na .input-container-div

            //Draw yourself to body!
            this.storeList.forEach(q => {
                q.drawMyOccupancy(cont);
            })

        });

        //FIXME: Pazi sad, ovo dugacko zeznuto
        selectSubList[4].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Zato sto imamo puno elemenata, pa moramo nekako da ih 
            //prikazemo na velicinu ekrana, tj, morace da se crtaju do
            //dna ekrana pa i dalje
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            mainContainer.appendChild(deepContainer);

            //Za odabir prodavnice cije stvari zelimo da crtamo
            let inputContainer = document.createElement('div');
            inputContainer.classList.add('input-container-div');
            deepContainer.appendChild(inputContainer);

            //Container za listu prodavnica i labelu
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('small-input-div');
            inputContainer.appendChild(inputContainerDiv);

            //Labela
            let label = document.createElement('label');
            label.classList.add('simple-label');
            label.innerHTML = 'Select store:'
            inputContainerDiv.appendChild(label);

            //Lista
            let list = document.createElement('select');
            list.classList.add('simple-input-list');
            inputContainerDiv.appendChild(list);

            //Dodavanje opcija u listu
            this.storeList.forEach(s => {
                let opt = document.createElement('option');
                opt.text = s.name;
                opt.value = s.id;
                list.appendChild(opt);
            })

            //Dugme za potvrdu 
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Browse' + '<i class="ri-search-2-line"></i>';
            inputContainer.appendChild(button);

            //Za crtanje 'kartica' na body
            let browseContainer = document.createElement('div');
            browseContainer.classList.add('browse-container');
            browseContainer.classList.add('big-screen-bit-smaller-cards');
            deepContainer.appendChild(browseContainer);


            //FIXME: Proveri za racunare sa back-end-a da dobijes podatke, 
            //sakako mozes i odavde sa this.storeList[i].computerList da izuces,
            //ali mozda i to bude zeznuto!
            button.addEventListener('click', () => {

                //Za ciscenje podataka iz prethodno pretrazene prodavnice!
                if(browseContainer != null)
                while(browseContainer.firstChild)
                    browseContainer.removeChild(browseContainer.lastChild);

                //TODO: Ovo radi, vraca ID izabrane prodavnice
                //Ajde da probam iz ovih listi, pa kako bude!
                //Lista prodavnica sadrzi i listu svih racunara i njihove id-jeve
                let chosenStore = list[list.selectedIndex].value;
                let storePtr;

                //Biramo prodavnicu
                let newComputerList = [];
                fetch(`https://localhost:5001/ComputerStore/VratiSveRacunareProdavnice/${chosenStore}`, {
                    method:"GET"
                })
                .then(p => {
                    p.json().then(computers => {
                        console.log(computers);
                        computers.forEach(computer => {
                            computer.racunari.forEach(s => {
                                let comp = new Computer(s.computerId, s.computerName, s.computerPrice, null, s.image);
                                newComputerList.push(comp);
                            })
                        })
                        console.log(newComputerList);
                        newComputerList.forEach(s => {
                            s.drawMyselfToCard(browseContainer);
                        })
                    })
                })

            });

        });

        selectSubList[5].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Container for chosing store by name and button to confirm
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            //Appending to body
            mainContainer.appendChild(inputContainerDiv);

            //Label & Input line
            // let smallInputContainer = document.createElement('div');
            // smallInputContainer.classList.add('small-input-div');

            // inputContainerDiv.appendChild(smallInputContainer);

            let selectList = [];
            let labelList = ['Name:', 'Image:'];
            for(let i = 0; i < labelList.length; i++) {
                
                //Label & Input line
                let smallInputContainer = document.createElement('div');
                smallInputContainer.classList.add('small-input-div');
    
                inputContainerDiv.appendChild(smallInputContainer);

                //Label
                let label = document.createElement('label');
                label.classList.add('simple-label');
                label.innerHTML = labelList[i];

                smallInputContainer.appendChild(label);

                //Input
                let inputEl = document.createElement('input');
                inputEl.type = 'text';
                inputEl.classList.add('input-element');

                smallInputContainer.appendChild(inputEl);

                selectList.push(inputEl);
            }
            // //Label
            // let label = document.createElement('label');
            // label.classList.add('simple-label');
            // label.innerHTML = 'Name of new computer:';

            // smallInputContainer.appendChild(label);

            // //Input
            // let inputEl = document.createElement('input');
            // inputEl.type = 'text';
            // inputEl.classList.add('input-element');

            // smallInputContainer.appendChild(inputEl);

            //Button
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Add' + '<i class="ri-add-fill"></i>';

            mainContainer.appendChild(button);

            button.addEventListener('click', () => {
                // console.log('NAme' + selectList[0].value);
                // console.log('Image' + selectList[1].value);
                // console.log('../Images/Computer/RAZER R1 EDITION.png')

                //FIXME: Popravi, nesto ne radi oko slanja podataka, pogledaj i backend za svaki slucaj!
                // fetch(`https://localhost:5001/ComputerStore/DodajRacunar/${selectList[0].value}/${selectList[1].value}`,{
                //     method:"POST"
                // });
            });
        });

        selectSubList[6].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            mainContainer.classList.add('make-me-flex-medium-and-up')
            this.container.appendChild(mainContainer);

            //Container for chosing store by name and button to confirm
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            //Appending to body
            mainContainer.appendChild(inputContainerDiv);

            let selectList = [];
            let labelList = ['Type:', 'Hardware:', 'Computer:'];
            
            for(let i = 0; i < labelList.length; i++) {
                //Label & Input line
                let smallInputContainer = document.createElement('div');
                smallInputContainer.classList.add('small-input-div');
    
                inputContainerDiv.appendChild(smallInputContainer);

                //Label
                let label = document.createElement('label');
                label.classList.add('simple-label');
                label.innerHTML = labelList[i];

                smallInputContainer.appendChild(label);

                //Dropdown list
                let selectElement = document.createElement('select');
                selectElement.classList.add('simple-input-list');

                smallInputContainer.appendChild(selectElement);
                selectList.push(selectElement);

                inputContainerDiv.appendChild(smallInputContainer);
            }

            //Button for confirm
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Add' + '<i class="ri-add-fill"></i>';

            inputContainerDiv.appendChild(button);

            //Image of component
            let img = document.createElement('img');
            img.classList.add('component-body-image');
            mainContainer.appendChild(img);

            let data = document.createElement('label');
            data.classList.add('simple-label');
            data.classList.add('add-padding-to-bottom');
            mainContainer.appendChild(data);

            button.addEventListener('click', () => {
                // console.log(selectList[0].options[selectList[0].selectedIndex].value);
                let hardw = selectList[1].options[selectList[1].selectedIndex].value;
                let comp = selectList[2].options[selectList[2].selectedIndex].value;

                fetch(`https://localhost:5001/ComputerStore/DodajKomponentuRacunaru/${comp}/${hardw}`, {
                    method:"POST"
                });
            })

            let computersList = [];
            fetch('https://localhost:5001/ComputerStore/VratiSveRacunare', {
                method:"GET"
            }).then(p => {
                p.json().then(computers => {
                    computers.forEach(computer => {
                        computersList.push(computer);
                    })
                    computersList.forEach(s => {
                        let opt = document.createElement('option');
                        opt.text = s.computerName;
                        opt.value = s.id;
                        selectList[2].appendChild(opt);
                    })
                })
            })

            let typesList = [];
            fetch(`https://localhost:5001/ComputerStore/VratiSveTipove`, {
                method:"GET"
            }).then(p => {
                p.json().then(types => {
                    types.forEach(type => {
                        typesList.push(type);
                    })
                    typesList.forEach(s => {
                        // console.log(s);
                        let opt = document.createElement('option');
                        opt.text = s.componenaTip;
                        opt.value = s.id;
                        selectList[0].appendChild(opt);
                    })

                    selectList[0].addEventListener('click', () => {
                        let listaHardvera = [];
                        console.log(selectList[0].options[selectList[0].selectedIndex].value);
                        fetch(`https://localhost:5001/ComputerStore/VratiSveOvogTipa/${selectList[0].options[selectList[0].selectedIndex].value}`, {
                            method:"GET"
                        }).then(p => {
                            p.json().then(hardwares => {
                                hardwares.forEach(hardware => {
                                    listaHardvera.push(hardware);
                                })
                                while(selectList[1].firstChild)
                                    selectList[1].removeChild(selectList[1].lastChild);

                                console.log(listaHardvera);
                                listaHardvera.forEach(s => {
                                    let opt = document.createElement('option');
                                    opt.text = s.hardwareName;
                                    opt.value = s.id;
                                    selectList[1].appendChild(opt);
                                })
                                selectList[1].addEventListener('click', () => {
                                    let pom = listaHardvera[selectList[1].selectedIndex];
                                    let hardver = new Hardware(null, null, null, pom.hardwareInfo, pom.hardwarePrice, pom.image);

                                    hardver.drawImageToExistingImage(img, data);
                                })
                            })
                        })
                    })
                })
            })
        });

        selectSubList[7].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Container for browsing cards
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            mainContainer.appendChild(deepContainer);

            //Container for chosing store by name and button to confirm
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            //Appending to body
            deepContainer.appendChild(inputContainerDiv);

            //For label and select list
            let smallInputContainer = document.createElement('div');
            smallInputContainer.classList.add('small-input-div');

            inputContainerDiv.appendChild(smallInputContainer);

            //Label
            let label = document.createElement('label');
            label.classList.add('simple-label');
            label.innerHTML = 'Computer:';

            smallInputContainer.appendChild(label);

            //Drop-down list
            let selectEl = document.createElement('select');
            selectEl.classList.add('simple-input-list');

            smallInputContainer.appendChild(selectEl);

            //Button
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Check' + '<i class="ri-question-mark"></i>';

            inputContainerDiv.appendChild(button);

            let browseContainer = document.createElement('div');
            browseContainer.classList.add('browse-container');
            deepContainer.appendChild(browseContainer);

            button.addEventListener('click', () => {
                let listaKomponenti = [];
                fetch(`https://localhost:5001/ComputerStore/VratiHardverOvogRacunara/${selectEl.options[selectEl.selectedIndex].value}`, {
                    method:"GET"
                }).then(p => {
                    p.json().then(hardwares => {
                        hardwares.forEach(hardware => {
                            hardware.hardver.forEach(s => {
                                // console.log(s);
                                let komponenta = new Hardware(s.hardver.id, s.hardver.hardwareName, s.hardver.tipID, s.hardver.hardwareInfo, s.hardver.hardwarePrice, s.hardver.image);
                                listaKomponenti.push(komponenta);
                            })
                            //Cistimo kontejner od prethodnog stampanja!
                            if(browseContainer.firstChild)
                                while(browseContainer.firstChild)
                                    browseContainer.removeChild(browseContainer.lastChild);
                            
                            //TODO: ovo do sad radi lepo, imamo listu hardvera!
                            listaKomponenti.forEach(s => {
                                s.drawHardwareToCard(browseContainer);
                            })
                        })
                    })
                })
                // console.log(selectEl.options[selectEl.selectedIndex].value);
            });

            let computersList = [];
            fetch('https://localhost:5001/ComputerStore/VratiSveRacunare', {
                method:"GET"
            }).then(p => {
                p.json().then(computers => {
                    computers.forEach(computer => {
                        computersList.push(computer);
                    })
                    computersList.forEach(s => {
                        let opt = document.createElement('option');
                        opt.text = s.computerName;
                        opt.value = s.id;
                        selectEl.appendChild(opt);
                    })
                })
            })
        });

        selectSubList[8].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            //Appending to body
            mainContainer.appendChild(inputContainerDiv);

            let listComputers = [];
            fetch(`https://localhost:5001/ComputerStore/VratiSveRacunare`, {
                method:"GET"
            }).then(p => {
                p.json().then(computers => {
                    computers.forEach(computer => {
                        listComputers.push(computer);
                    })

                    //For label and select list
                    let smallInputContainer = document.createElement('div');
                    smallInputContainer.classList.add('small-input-div');

                    inputContainerDiv.appendChild(smallInputContainer);

                    //Label
                    let label = document.createElement('label');
                    label.classList.add('simple-label');
                    label.innerHTML = 'Computer:';

                    smallInputContainer.appendChild(label);

                    //Drop-down list
                    let selectEl = document.createElement('select');
                    selectEl.classList.add('simple-input-list');

                    smallInputContainer.appendChild(selectEl);

                    listComputers.forEach(s => {
                        let opt = document.createElement('option');
                        opt.text = s.computerName;
                        opt.value = s.id;
                        selectEl.appendChild(opt);
                    })

                    smallInputContainer = document.createElement('div');
                    smallInputContainer.classList.add('small-input-div');

                    inputContainerDiv.appendChild(smallInputContainer);

                    //Label
                    label = document.createElement('label');
                    label.classList.add('simple-label');
                    label.innerHTML = 'New Price:';

                    smallInputContainer.appendChild(label);

                    //New Price input:
                    let inputEl = document.createElement('input');
                    inputEl.type = 'number';
                    inputEl.classList.add('input-element');

                    smallInputContainer.appendChild(inputEl);

                    //Button
                    let button = document.createElement('button');
                    button.classList.add('simple-button');
                    button.innerHTML = 'Change' + '<i class="fa-solid fa-check"></i>';

                    inputContainerDiv.appendChild(button);

                    label = document.createElement('lable');
                    label.classList.add('old-price-label');
                    label.innerHTML = 'Old Price: ';

                    mainContainer.appendChild(label);

                    button.addEventListener('click', () => {
                        //FIXME: Popravi CORS-e da omogucis da se vrsi PUT 
                        fetch(`https://localhost:5001/ComputerStore/IzmeniCenuRacunara/${selectEl.options[selectEl.selectedIndex].value}/${inputEl.value}`, {
                            method:"PUT"
                        });
                    });

                    selectEl.addEventListener('click', () => {
                        label.innerHTML = 'Old Price: ' + listComputers[selectEl.selectedIndex].computerPrice + '<i class="ri-coins-line"></i>';
                    })
                })
            })
        });

        selectSubList[9].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Container for browsing cards
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            mainContainer.appendChild(deepContainer);

            //For label, select list and button
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            //Appending to body
            deepContainer.appendChild(inputContainerDiv);

            let listComputers = [];
            fetch(`https://localhost:5001/ComputerStore/VratiSveRacunare`, {
            method:"GET"}).then(p => {
                p.json().then(computers => {
                    computers.forEach(computer => {
                        listComputers.push(computer);
                    })

                    let smallInputContainer = document.createElement('div');
                    smallInputContainer.classList.add('small-input-div');

                    inputContainerDiv.appendChild(smallInputContainer);

                    //Label
                    let label = document.createElement('label');
                    label.classList.add('simple-label');
                    label.innerHTML = 'Computer:';

                    smallInputContainer.appendChild(label);

                    //Drop-down list
                    let selectEl = document.createElement('select');
                    selectEl.classList.add('simple-input-list');

                    smallInputContainer.appendChild(selectEl);

                    listComputers.forEach(s => {
                        let opt = document.createElement('option');
                        opt.text = s.computerName;
                        opt.value = s.id;
                        selectEl.appendChild(opt);
                    })

                    let button = document.createElement('button');
                    button.classList.add('simple-button');
                    button.innerHTML = 'Show' + '<i class="ri-search-line"></i>';

                    inputContainerDiv.appendChild(button);

                    let browseContainer = document.createElement('div');
                    browseContainer.classList.add('browse-container');
                    deepContainer.appendChild(browseContainer);

                    button.addEventListener('click', () => {
                        let listHardwares = [];
                        fetch(`https://localhost:5001/ComputerStore/VratiHardverOvogRacunara/${selectEl.options[selectEl.selectedIndex].value}`, {
                        method:"GET"})
                        .then(p => {
                            p.json().then(hardwares => {
                                hardwares.forEach(hardware => {
                                    hardware.hardver.forEach(s => {
                                        // console.log(s);
                                        let komponenta = new Hardware(s.hardver.id, s.hardver.hardwareName, s.hardver.tipID, s.hardver.hardwareInfo, s.hardver.hardwarePrice, s.hardver.image);
                                        listHardwares.push(komponenta);
                                    })
                                    //Cistimo kontejner od prethodnog stampanja!
                                    if(browseContainer.firstChild)
                                        while(browseContainer.firstChild)
                                            browseContainer.removeChild(browseContainer.lastChild);
                                    
                                    //TODO: ovo do sad radi lepo, imamo listu hardvera!
                                    listHardwares.forEach(s => {
                                        //FIXME: Isto kao i u prosloj, samo omoguci da se obavi DELETE! FIXME:
                                        s.drawToCardForRemoving(browseContainer, selectEl.options[selectEl.selectedIndex].value);
                                    })
                                })
                            })
                        })
                    });
                })
            })
        });

        //FIXME: Radi, samo prepravi kad se sve komponente skinu iz korpe
        //FIXME: da opet moze da se crta, sve okej ovako izgleda
        selectSubList[10].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Container for browsing cards
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            mainContainer.appendChild(deepContainer);

            let browseContainer = document.createElement('div');
            browseContainer.classList.add('browse-container');
            deepContainer.appendChild(browseContainer);

            let computersList = [];
            fetch('https://localhost:5001/ComputerStore/VratiSveRacunare', {
            method:"GET"}).then(p => {
                p.json().then(computers => {
                    computers.forEach(computer => {
                        console.log(computer);
                        let comp = new Computer(computer.id, computer.computerName, computer.computerPrice, null, computer.image);
                        computersList.push(comp);
                    })
                    console.log(computersList);
                    computersList.forEach(s => {
                        s.drawMyselfToCard(browseContainer);
                    })
                })
            })
        });

        //FIXME: Dovrsi samo za ove hardver metode, ne moras sve, ima vec
        //FIXME: dovoljno, i vidi za css sa onim razlicitim dimenzijama
        //FIXME: ekrana da radi!
        selectSubList[11].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            //Main container
            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //For scroll on input
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            deepContainer.classList.add('make-me-flex-medium-and-up');
            deepContainer.classList.add('add-padding-bottom-medium-and-up')
            mainContainer.appendChild(deepContainer);

            //For label, select list/input and button
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');
            inputContainerDiv.classList.add('input-div-two-in-row-flex');

            //Appending to body
            deepContainer.appendChild(inputContainerDiv);

            let labelList = ['Name:', 'Type:', 'Info:', 'Price:', 'Image:'];
            let typesList = ['text', 'input', 'text', 'number', 'text'];

            //Da ne bi koristili querySelector, ovo je brze jer odmah imamo 
            //Pokazivac na trazenu komponentu
            let selectList = [];
            let selectEl;

            for(let i = 0; i < labelList.length; i++) {
            //For all label and input combination!
                let smallInputContainer = document.createElement('div');
                smallInputContainer.classList.add('small-input-div');

                inputContainerDiv.appendChild(smallInputContainer);

                //Labela kao uputstvo sta da unesemo od podataka ovde
                let label = document.createElement('label');
                label.classList.add('simple-label');
                label.innerHTML = labelList[i];

                //Svakako uvek ide labela pre inputa tako da nema potrebe da
                //dva puta ovo dodajemo!
                smallInputContainer.appendChild(label);

                if(i == 1) {
                    let typesList = [];
                    fetch(`https://localhost:5001/ComputerStore/VratiSveTipove`, {
                        method:"GET"
                    }).then(p => {
                        p.json().then(types => {
                            types.forEach(type => {
                                typesList.push(type);
                            })
                            selectEl = document.createElement('select');
                            selectEl.classList.add('simple-input-list');

                            typesList.forEach(s => {
                                let opt = document.createElement('option');
                                opt.text = s.componenaTip;
                                opt.value = s.id;
                                selectEl.appendChild(opt);
                            })

                            //Cuvanje 'pokazivaca' na ovu komponentu
                            // selectList[i] = selectEl;
                            smallInputContainer.appendChild(selectEl);
                        })
                    })
                }
                else {
                    let inputEl = document.createElement('input');
                    inputEl.classList.add('input-element');
                    inputEl.type = typesList[i];

                    //Cuvanje 'pokazivaca' na ovu komponentu
                    selectList.push(inputEl);

                    smallInputContainer.appendChild(inputEl);

                }

            }

            //Dugme za potvrdu kreiranja nove komponente
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Add' + '<i class="ri-add-line"></i>';

            inputContainerDiv.appendChild(button);


            button.addEventListener('click', () => {
                console.log(`Name: ${selectList[0].value}`);
                console.log(`Tip: ${selectEl.options[selectEl.selectedIndex].text} i sifra: ${selectEl.options[selectEl.selectedIndex].value}`);
                console.log(`Info: ${selectList[1].value}`);
                console.log(`Price: ${selectList[2].value}`);
                console.log(`Image src: ${selectList[3].value}`);
                fetch(`https://localhost:5001/ComputerStore/DodajHardver/${selectList[0].value}/${selectEl.options[selectEl.selectedIndex].value}/${selectList[1].value}/${selectList[2].value}/${selectList[3].value}`, {
                    method:"POST"
                });
            })

        });

        selectSubList[12].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            //Main container
            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Container for browsing cards
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            mainContainer.appendChild(deepContainer);

            //For label, select list and button
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');
            //Appending to body
            deepContainer.appendChild(inputContainerDiv);

            //For chosing components by type
            let browseContainer = document.createElement('div');
            browseContainer.classList.add('browse-container');
            //Appending to body
            deepContainer.appendChild(browseContainer);

            //For label and select list
            let smallInputContainer = document.createElement('div');
            smallInputContainer.classList.add('small-input-div');

            inputContainerDiv.appendChild(smallInputContainer);

            let label = document.createElement('label');
            label.classList.add('simple-label');
            label.innerHTML = 'Filter:';

            smallInputContainer.appendChild(label);

            let typesList = [];
            fetch(`https://localhost:5001/ComputerStore/VratiSveTipove`, {
                method:"GET"
            }).then(p => {
                p.json().then(types => {
                    types.forEach(type => {
                        typesList.push(type);
                    })
                    let selectEl = document.createElement('select');
                    selectEl.classList.add('simple-input-list');

                    smallInputContainer.appendChild(selectEl);

                    let option = document.createElement('option');
                    option.text = 'All Components';
                    option.value = 0;

                    selectEl.appendChild(option);

                    typesList.forEach(s => {
                        let opt = document.createElement('option');
                        opt.text = s.componenaTip;
                        opt.value = s.id;
                        selectEl.appendChild(opt);
                    })


                    selectEl.addEventListener('click', () => {

                        let hardwaresList = [];

                        //Cistimo prethodnu pretragu!
                        while(browseContainer.firstChild)
                            browseContainer.removeChild(browseContainer.lastChild);

                        //Da li se trazu svi racunari?
                        if(selectEl.options[selectEl.selectedIndex].value == 0) {
                            fetch(`https://localhost:5001/ComputerStore/VratiSavHardver`, {
                            method:"GET"}).then(p => {
                                p.json().then(hardwares => {
                                    hardwares.forEach(hardver => {
                                        let h = new Hardware(hardver.id, hardver.hardwareName, hardver.tipID, hardver.hardwareInfo, hardver.hardwarePrice, hardver.image);
                                        hardwaresList.push(h);
                                    })
                                    hardwaresList.forEach(s => {
                                        s.drawHardwareToCard(browseContainer);
                                    })
                                })
                            })
                        }
                        else {
                            // let hardwaresList = [];
                            fetch(`https://localhost:5001/ComputerStore/VratiSveOvogTipa/${selectEl.options[selectEl.selectedIndex].value}`, {
                            method:"GET"}).then(p => {
                                p.json().then(hardwares => {
                                    hardwares.forEach(hardver => {
                                        let h = new Hardware(hardver.id, hardver.hardwareName, hardver.tipID, hardver.hardwareInfo, hardver.hardwarePrice, hardver.image);
                                        hardwaresList.push(h);
                                    })
                                    hardwaresList.forEach(s => {
                                        s.drawHardwareToCard(browseContainer);
                                    })
                                })
                            })
                        }
                    })
                })
            })

            // let hardwaresList = [];
            // fetch(`https://localhost:5001/ComputerStore/VratiSavHardver`, {
            // method:"GET"}).then(p => {
            //     p.json().then(hardwares => {
            //         hardwares.forEach(hardver => {
            //             let h = new Hardware(hardver.id, hardver.hardwareName, hardver.tipID, hardver.hardwareInfo, hardver.hardwarePrice, hardver.image);
            //             hardwaresList.push(h);
            //         })
            //         hardwaresList.forEach(s => {
            //             s.drawHardwareToCard(browseContainer);
            //         })

            //     })
            // })


        });


    }

    //Just read the name of function..
    clearLeftMenu() {
        let pom = document.querySelector('.header-nav-sub-items-container');
        if(pom != null) {
            while(pom.firstChild) {
                pom.removeChild(pom.lastChild);
            }
            pom.remove();
        }
    }

    //For closing left menu on function call!
    closeLeftMenu() {
        document.querySelector('.header-nav-sub').classList.remove('show-subMenu');
    }

    clearAndRemove() {
        let pom = document.querySelector('.main-container-div');
        if(pom != null) {
            while(pom.firstChild)
                pom.removeChild(pom.lastChild);
            document.querySelector('.main-container').removeChild(pom);
        }
    }

    clearAndDelete(host) {
        if(host != null) {
            while(host.firstChild)
                host.removeChild(host.lastChild);
            host.parentNode.removeChild(host);
        }
    }
}