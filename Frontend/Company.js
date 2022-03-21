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

    //Metoda ca popunjavanje metoda dostupnih korisnicima;
    drawCompanyFunctionsMenu(host) {
        this.clearLeftMenu();

        let list = ['Stores', 'Computers', 'Hardware'];
        let selectList = [];
        let selectSubList = [];

        let list1 = ['Add Store', 'Add To Store', 'Show All Stores', 'Show Occupancy', 'Browse All Items', 'Change Name', 'Remove Store'];
        let list2 = ['Add Computer', 'Add Component', 'Computer Hardware', 'Change Price', 'Remove Component', 'Browse'];
        let list3 = ['Add Hardware', 'Browse'];
        let bigList = [list1, list2, list3];

        let menuItemsContainer = document.createElement('div');
        menuItemsContainer.classList.add('header-nav-sub-items-container');
        host.appendChild(menuItemsContainer);
        
        for(let i = 0; i < list.length; i++) {

            //Tekst naslova;
            let link = document.createElement('a');
            link.classList.add('header-nav-sub-item');
            link.innerHTML = list[i] + '<i class="ri-arrow-down-s-line"></i>';

            //Kontejner za naslov;
            let smallLink = document.createElement('a');
            smallLink.classList.add('header-nav-sub-items-small-link');

            //Dodavanje naslova na kontejner;
            smallLink.appendChild(link);

            //Kontejner za ovaj link i za dropdown listu;
            let smallNavDiv = document.createElement('div');
            smallNavDiv.classList.add('header-nav-sub-items-small-div');

            //Dodavanje linka;
            smallNavDiv.appendChild(smallLink);
            smallNavDiv.addEventListener('click', () => {

                //Da bi se oni koji su prethodno bili otvoreni zatvorili na klik nekog drugog;
                let openLists = document.querySelectorAll('.header-nav-sub-items-small-div');
                openLists.forEach(p => {
                    if(p !== smallNavDiv)
                        if(p.classList.contains('header-nav-sub-items-small-div-clicked'))
                            p.classList.remove('header-nav-sub-items-small-div-clicked');
                });

                //Za otvaranje i zatvaranje jednog istog;
                if(smallNavDiv.classList.contains('header-nav-sub-items-small-div-clicked'))
                    smallNavDiv.classList.remove('header-nav-sub-items-small-div-clicked');
                else
                    smallNavDiv.classList.add('header-nav-sub-items-small-div-clicked');


            });

            //Dodavanje dropdown liste - selectora za metode;
            let dropDownMenuItemList = document.createElement('div');
            dropDownMenuItemList.classList.add('header-nav-sub-sub-items-div');

            //Dodavanje jos jednog diva kao kontejner za sve linkove;
            let dropDownMenuItemListContainer = document.createElement('div');
            dropDownMenuItemListContainer.classList.add('header-nav-sub-sub-items-div-container');

            //Dodavanje kontejnera za upravljanje drop-down liste na originalni
            //koji treba da se pojavi samo na poziv;
            dropDownMenuItemList.appendChild(dropDownMenuItemListContainer);
            
            //Dodavanje drop-down liste na linkove;
            smallNavDiv.appendChild(dropDownMenuItemList);

            //TODO: Dodavanje sadrzaja samih dropdown listi;
            for(let j = 0;  j < bigList[i].length; j++) {
                
                //Link;
                let dropDownMenuItem = document.createElement('a');
                dropDownMenuItem.classList.add('header-nav-drop-down-item');

                //Sadrzaj samog linka;
                dropDownMenuItem.innerHTML = bigList[i][j] + '<i class="ri-arrow-drop-right-line"></i>';

                //Dodavanje linka u listu za metode;
                selectSubList.push(dropDownMenuItem);

                //TODO: Dodavanje linka u div na stranicu;
                dropDownMenuItemListContainer.appendChild(dropDownMenuItem);
            }

            menuItemsContainer.appendChild(smallNavDiv);
            selectList.push(smallLink);
        }

        //TODO: adding events to links in left menu;
        //TODO: Store method functions;

        //Dodavanje prodavnice u bazu podataka;
        selectSubList[0].addEventListener('click', () => {

            this.closeLeftMenu();
            this.clearAndRemove();

            //Kontejner za crtanje;
            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');

            //Dodavanje kontejnera za crtanje na main;
            this.container.appendChild(mainContainer);

            //Kontejner za sve input elemente, dodajem ga zato sto je vec stilizovan;
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            mainContainer.appendChild(inputContainerDiv);

            //Selektori input elementa;
            let inputList = [];

            let labelList = ['Store Name:', 'Store Address:', 'Shelf count:'];
            for(let i = 0; i < labelList.length; i++) {
                //FIXME: Obrisi komentar;
                /*<div class="small-input-div">
                    <label> </label>
                    <input> </input>
                </div> */

                //Kontejner za jednu labelu i jedan input element;
                let smallInputContainer = document.createElement('div');
                smallInputContainer.classList.add('small-input-div');

                //Labela;
                let label = document.createElement('label');
                label.classList.add('simple-label');
                label.innerHTML = labelList[i];

                //Input element;
                let inputEl = document.createElement('input');
                if( i === 2)
                    inputEl.type = 'number';
                else
                    inputEl.type = 'text';
                inputEl.classList.add('input-element');

                inputList.push(inputEl);

                //Dodavanje labele i input elementa na mali kontejner;
                smallInputContainer.appendChild(label);
                smallInputContainer.appendChild(inputEl);

                //Dodavanje malog kontejnera na veci;
                inputContainerDiv.appendChild(smallInputContainer);
            }

            //Dugme za aktiviranje eventa;
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Add' + '<i class="ri-add-fill"></i>';

            mainContainer.appendChild(button);

            button.addEventListener('click', () => {

                //Provere da li je sve uneseno se desavaju na backend-u;
                fetch(`https://localhost:5001/ComputerStore/DodajProdavnicu/${inputList[0].value}/${inputList[1].value}/${inputList[2].value}`,{
                    method:"POST"
                });
                
                //Za ciscenje svih input elementa nakon;
                inputList.forEach(e => {
                    e.value = '';
                });
                alert('Nova prodavnica je dodata!');
                
            });

        });

        //Funkcija za dodavanje racunara u prodavnicu;
        selectSubList[1].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            mainContainer.appendChild(inputContainerDiv);

            let labelList = ['Computer:', 'Store:'];

            //Lista selektora;
            let selectList = [];

            for(let i = 0; i < labelList.length; i++) {
                //Kontejner za labelu i select element;
                let smallInputContainer = document.createElement('div');
                smallInputContainer.classList.add('small-input-div');

                //Labela;
                let label = document.createElement('label');
                label.classList.add('simple-label');
                label.innerHTML = labelList[i];

                //Select element;
                let selectEl = document.createElement('select');
                selectEl.classList.add('simple-input-list');

                //Dodavanje selektora za select element na listu;
                selectList.push(selectEl);

                //Dodavanje sadrzaja na mali kontejner;
                smallInputContainer.appendChild(label);
                smallInputContainer.appendChild(selectEl);

                //Dodavanje malog kontejnera na veliki;
                inputContainerDiv.appendChild(smallInputContainer);
            }

            let computersList = [];
            fetch(`https://localhost:5001/ComputerStore/VratiSveRacunare`, {
                method:"GET"
            }).then(p => {
                p.json().then(computers => {
                    computers.forEach(computer => {
                        let comp = new Computer(computer.id, computer.computerName, computer.computerPrice, computer.computerHardware, computer.image);
                        computersList.push(comp);   
                    })
                    computersList.forEach(c => {
                        let opt = document.createElement('option');
                        opt.value = c.id;
                        opt.text = c.name;
                        selectList[0].appendChild(opt);
                    });

                    let storesList = [];
                    fetch(`https://localhost:5001/ComputerStore/VratiSveProdavnice`, {
                        method:"GET"
                    }).then(p => {
                        p.json().then(stores => {
                            stores.forEach(store => {
                                let str = new Store(store.storeID, store.storeName, store.storeAddress, store.shelfSize, store.racunari);
                                storesList.push(str);
                            })

                            storesList.forEach(s => {
                                let opt = document.createElement('option');
                                opt.value = s.id;
                                opt.text = s.name;
                                selectList[1].appendChild(opt);
                            });
                        })
                    })
                })
            })

            //Dugme za dodavanje eventa;
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Append' + '<i class="ri-add-fill"></i>';

            //Dodavanje dugmeta na kontejner;
            mainContainer.appendChild(button);

            //Event za dugme;
            button.addEventListener('click', () => {
                fetch(`https://localhost:5001/ComputerStore/DodajRacunarNaPolicu/${selectList[1].options[selectList[1].selectedIndex].value}/${selectList[0].options[selectList[0].selectedIndex].value}`, {
                    method:"POST"
                }).then(p => {
                    if(p.ok) {
                        p.text().then(function (text) {
                            alert('Uspesno! ' + text); 
                        });
                    }
                    else {
                        p.text().then(function (text) {
                            alert('Greska! ' + text); 
                        });
                    }
                });
            });
        });

        //Funkcija za prikaz svih instanci prodavnica u bazi podataka:
        selectSubList[2].addEventListener('click', () => {

            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Kontejner za odabir prodavnice po imenu i za dugme za potvrdu;
            let cont = document.createElement('div');
            cont.classList.add('main-container-occupancy');
            mainContainer.appendChild(cont);

            let storesList = [];

            fetch(`https://localhost:5001/ComputerStore/VratiSveProdavnice`, {
                method:"GET"
            }).then(p => {
                if(p.ok) {
                    p.json().then(stores => {
                        stores.forEach(store => {
                            let str = new Store(store.storeID, store.storeName, store.storeAddress, store.shelfSize, store.racunari);
                            storesList.push(str);
                        })
                        storesList.forEach(s => {
                            s.drawMyInfo(cont);
                        })
                    })
                }
                else {
                    p.text().then(function (text) {
                        alert('Greska! ' + text); 
                    });
                }
            });
        });

        //Funkcija prikazi zauzetost:
        selectSubList[3].addEventListener('click', () => {
            console.log('Show occupancy');
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Kontejner na koji crtamo zauzetost;
            let cont = document.createElement('div');
            cont.classList.add('main-container-occupancy');
            mainContainer.appendChild(cont);

            //Draw yourself to body!
            // this.storeList.forEach(q => {
            //     q.drawMyOccupancy(cont);
            // })

            fetch(`https://localhost:5001/ComputerStore/VratiSveProdavnice`, {
                method:"GET"
            }).then(p => {
                p.json().then(stores => {
                    stores.forEach(store => {
                        let str = new Store(store.storeID, store.storeName, store.storeAddress, store.shelfSize, store.racunari);
                        str.drawMyOccupancy(cont);
                    })
                })
            })
        });

        //Funkcija za prikaz svih racunara odredjene prodavnice;
        //Ne crtamo i hardver zato sto racunamo da je sav hadver dostupan u svim
        //Prodavnicama, a samo su racunari jedinstveni za svaku prodavnicu posebno;
        selectSubList[4].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Zato sto imamo puno elemenata, pa moramo nekako da ih 
            //prikazemo na velicinu ekrana, tj, morace da se crtaju do
            //dna ekrana pa i dalje;
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            mainContainer.appendChild(deepContainer);

            //Za odabir prodavnice cije stvari zelimo da crtamo;
            let inputContainer = document.createElement('div');
            inputContainer.classList.add('input-container-div');
            deepContainer.appendChild(inputContainer);

            //Kontejner za listu prodavnica i labelu;
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('small-input-div');
            inputContainer.appendChild(inputContainerDiv);

            //Labela;
            let label = document.createElement('label');
            label.classList.add('simple-label');
            label.innerHTML = 'Select store:'
            inputContainerDiv.appendChild(label);

            //Lista;
            let list = document.createElement('select');
            list.classList.add('simple-input-list');
            inputContainerDiv.appendChild(list);

            //Dodavanje opcija u listu;
            this.storeList.forEach(s => {
                let opt = document.createElement('option');
                opt.text = s.name;
                opt.value = s.id;
                list.appendChild(opt);
            })

            //Dugme za potvrdu;
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Browse' + '<i class="ri-search-2-line"></i>';
            inputContainer.appendChild(button);

            //Za crtanje 'kartica' na body;
            let browseContainer = document.createElement('div');
            browseContainer.classList.add('browse-container');
            browseContainer.classList.add('big-screen-bit-smaller-cards');
            deepContainer.appendChild(browseContainer);

            button.addEventListener('click', () => {

                //Za ciscenje podataka iz prethodno pretrazene prodavnice!
                if(browseContainer != null)
                while(browseContainer.firstChild)
                    browseContainer.removeChild(browseContainer.lastChild);

                //TODO: Ovo radi, vraca ID izabrane prodavnice;
                let chosenStore = list[list.selectedIndex].value;
                let storePtr;

                //Biramo prodavnicu;
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
                        //Crtamo sve racunare ove prodavnice na browseContainer;
                        newComputerList.forEach(s => {
                            s.drawMyselfToCard(browseContainer);
                        })
                    })
                })
            });
        });

        //FIXME: Dodajemo implementaciju, proveri za css takodje kako se ponasa
        //kad zavrsis!
        selectSubList[5].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Kontejner za sve input elemente;
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            mainContainer.appendChild(inputContainerDiv);

            let storeList = [];
            fetch(`https://localhost:5001/ComputerStore/VratiSveProdavnice`, {
                method:"GET"
            }).then(p => {
                p.json().then(stores => {
                    stores.forEach(store => {
                        let str = new Store(store.storeID, store.storeName, store.storeAddress, store.shelfSize, store.racunari);
                        storeList.push(str);
                    })
                    //Selektori za input element;
                    let inputElement = document.createElement('input');
                    inputElement.type = 'text';
                    inputElement.classList.add('input-element');
                    
                    //Selektor za listu;
                    let selectList = document.createElement('select');
                    selectList.classList.add('simple-input-list'); 

                    let labels = ['Chose store: ', 'New name: '];
                    let selectors = [selectList, inputElement];

                    for(let i = 0; i < labels.length; i++) {
                        //Kontejner za labelu & input element/listu;
                        let smallInputContainer = document.createElement('div');
                        smallInputContainer.classList.add('small-input-div');
            
                        inputContainerDiv.appendChild(smallInputContainer);

                        //Labela;
                        let label = document.createElement('label');
                        label.classList.add('simple-label');
                        label.innerHTML = labels[i];
                        
                        smallInputContainer.appendChild(label);
                        smallInputContainer.appendChild(selectors[i]);
                    }

                    //Popunjavanje elementa select liste;
                    storeList.forEach(s => {
                        let opt = document.createElement('option');
                        opt.text = s.name;
                        opt.value = s.id;
                        selectList.appendChild(opt);
                    })

                    let button = document.createElement('button');
                    button.classList.add('simple-button');
                    button.innerHTML = 'Change' + '<i class="fa-solid fa-arrows-rotate"></i>';

                    inputContainerDiv.appendChild(button);

                    button.addEventListener('click', () => {
                        // console.log(`Store: ${selectList.options[selectList.selectedIndex].text} with id: ${selectList.options[selectList.selectedIndex].value}`);
                        console.log(`New name: ${inputElement.value}`);
                        fetch(`https://localhost:5001/ComputerStore/IzmeniImeProdavnice/${selectList.options[selectList.selectedIndex].value}/${inputElement.value}`, {
                            method:"PUT"
                        }).then(p => {
                            if(!p.ok) {
                                //Ako je doslo do greske, odstampaj vracenu poruku;
                                p.text().then(function (text) {
                                    alert('Greska: ' + text); 
                                });
                            }
                            else {
                                alert('Uspesno smo promenili ime prodavnice!');
                            }
                        })
                    })

                })
            })
        });

        //Funkcija za brisanje prodavnice iz baze podataka;
        selectSubList[6].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Kontejner za sve input elemente;
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            mainContainer.appendChild(inputContainerDiv);

            //Kontejner za labelu i select listu
            let smallInputContainer = document.createElement('div');
            smallInputContainer.classList.add('small-input-div');
    
            inputContainerDiv.appendChild(smallInputContainer);

            let storeList = [];
            fetch(`https://localhost:5001/ComputerStore/VratiSveProdavnice`, {
                method:"GET"
            }).then(p => {
                p.json().then(stores => {
                    stores.forEach(store => {
                        let str = new Store(store.storeID, store.storeName, store.storeAddress, store.shelfSize, store.racunari);
                        storeList.push(str);
                    })

                    let label = document.createElement('label');
                    label.classList.add('simple-label');
                    label.innerHTML = 'Store for removing: ';

                    let selectEl = document.createElement('select');
                    selectEl.classList.add('simple-input-list');

                    storeList.forEach(s => {
                        let opt = document.createElement('option');
                        opt.text = s.name;
                        opt.value = s.id;
                        selectEl.appendChild(opt);
                    })

                    smallInputContainer.appendChild(label);
                    smallInputContainer.appendChild(selectEl);

                    let button = document.createElement('button');
                    button.classList.add('simple-button');
                    button.innerHTML = 'Remove' + '<i class="ri-delete-bin-line"></i>';

                    inputContainerDiv.appendChild(button);

                    button.addEventListener('click', () => {
                        fetch(`https://localhost:5001/ComputerStore/ObrisiProdavnicuZajednoSaPodacima/${selectEl.options[selectEl.selectedIndex].value}`, {
                            method:"DELETE"
                        }).then(p => {
                            if(!p.ok) {
                                //Ako je doslo do greske, odstampaj vracenu poruku;
                                p.text().then(function (text) {
                                    alert('Greska: ' + text); 
                                });
                            }
                            else {
                                alert('Uspesno smo obrisali prodavnicu!');
                            }
                        })
                    });
                })
            })
        });

        //Funkcija za dodavanje novog racunara;
        selectSubList[7].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Kontejner za sve input elemente;
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            mainContainer.appendChild(inputContainerDiv);

            //Selektori za input elemente;
            let selectList = [];
            let labelList = ['Name:', 'Image:'];
            for(let i = 0; i < labelList.length; i++) {
                
                //Kontejner za labelu & input element;
                let smallInputContainer = document.createElement('div');
                smallInputContainer.classList.add('small-input-div');
    
                inputContainerDiv.appendChild(smallInputContainer);

                //Labela;
                let label = document.createElement('label');
                label.classList.add('simple-label');
                label.innerHTML = labelList[i];

                smallInputContainer.appendChild(label);

                //Input element;
                let inputEl = document.createElement('input');
                inputEl.type = 'text';
                inputEl.classList.add('input-element');

                smallInputContainer.appendChild(inputEl);

                selectList.push(inputEl);
            }

            //Dugme za potvrdu dodavanja novog racunara u bazu podataka;
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Add' + '<i class="ri-add-fill"></i>';

            mainContainer.appendChild(button);

            button.addEventListener('click', () => {
                // console.log('Name: ' + selectList[0].value);
                // console.log('Image: ' + selectList[1].value);
                // console.log('../Images/Computer/RAZER R1 EDITION.png')

                //FIXME: Popravi, nesto ne radi oko slanja podataka, pogledaj i backend za svaki slucaj!
                //FIXME: Popravljeno, problem bio sto su se slali '/' i .png na kraju;
                fetch(`https://localhost:5001/ComputerStore/DodajRacunar/${selectList[0].value}/${selectList[1].value}`,{
                    method:"POST"
                }).then(p => {
                    if(!p.ok) {
                        //Ako je doslo do greske, odstampaj vracenu poruku;
                        p.text().then(function (text) {
                            alert('Greska: ' + text); 
                        });
                    }
                    else {
                        alert('Uspesno smo dodali racunar u bazu podataka!');
                    }
                })
            });
        });

        selectSubList[8].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            mainContainer.classList.add('make-me-flex-medium-and-up')
            this.container.appendChild(mainContainer);

            //Kontejner za odabir prdavnice po imenu i za dugme za potvrdu;
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            //Dodavanje kontejnera na body;
            mainContainer.appendChild(inputContainerDiv);

            //Selektori za input elemente, da ne bi pretrazivali po Id-ju elemente, 
            //A da je koliko-toliko automatizovano dodavanje elemnta;
            let selectList = [];
            let labelList = ['Type:', 'Hardware:', 'Computer:'];
            
            for(let i = 0; i < labelList.length; i++) {
                //Kontejner za labelu i za odabir element;
                let smallInputContainer = document.createElement('div');
                smallInputContainer.classList.add('small-input-div');
    
                inputContainerDiv.appendChild(smallInputContainer);

                //Labela;
                let label = document.createElement('label');
                label.classList.add('simple-label');
                label.innerHTML = labelList[i];

                smallInputContainer.appendChild(label);

                //Lista za odabir;
                let selectElement = document.createElement('select');
                selectElement.classList.add('simple-input-list');

                smallInputContainer.appendChild(selectElement);
                selectList.push(selectElement);

                inputContainerDiv.appendChild(smallInputContainer);
            }

            //Dugme za potvrdu;
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Add' + '<i class="ri-add-fill"></i>';

            inputContainerDiv.appendChild(button);

            //Slika komponente;
            let img = document.createElement('img');
            img.classList.add('component-body-image');
            mainContainer.appendChild(img);

            //Podaci o komponenti;
            let data = document.createElement('label');
            data.classList.add('simple-label');
            data.classList.add('add-padding-to-bottom');
            mainContainer.appendChild(data);

            button.addEventListener('click', () => {
                
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

        //Metoda za prikaz hardvera racunara;
        selectSubList[9].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Kontejner za prikaz svih kartica;
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            mainContainer.appendChild(deepContainer);

            //Kontejner za odabir prodavnice i dugme za potvrdu;
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            //Dodavanje kontejnera za prikaz na njegov kontejner;
            deepContainer.appendChild(inputContainerDiv);

            //Kontejner za labelu i listu opcija;
            let smallInputContainer = document.createElement('div');
            smallInputContainer.classList.add('small-input-div');

            inputContainerDiv.appendChild(smallInputContainer);

            //Labela;
            let label = document.createElement('label');
            label.classList.add('simple-label');
            label.innerHTML = 'Computer:';

            smallInputContainer.appendChild(label);

            //Lista opcija;
            let selectEl = document.createElement('select');
            selectEl.classList.add('simple-input-list');

            smallInputContainer.appendChild(selectEl);

            //Dugme za potvrdu;
            let button = document.createElement('button');
            button.classList.add('simple-button');
            button.innerHTML = 'Check' + '<i class="ri-question-mark"></i>';

            inputContainerDiv.appendChild(button);

            //Kontejner za crtanje malih kartica hardvera ovog racunara;
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
                                let komponenta = new Hardware(s.hardver.id, s.hardver.hardwareName, s.hardver.tipID, s.hardver.hardwareInfo, s.hardver.hardwarePrice, s.hardver.image);
                                listaKomponenti.push(komponenta);
                            })
                            //Cistimo kontejner od prethodnog stampanja;
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
            });

            //Dodavanje svih racunara koje prodaje ova kompanija na listu opcija;
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


        //Metoda za rucnu promenu cene racunara;
        selectSubList[10].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Kontejner za liste, labele, dugmice..
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            //Appending to body;
            mainContainer.appendChild(inputContainerDiv);

            let listComputers = [];
            fetch(`https://localhost:5001/ComputerStore/VratiSveRacunare`, {
                method:"GET"
            }).then(p => {
                p.json().then(computers => {
                    computers.forEach(computer => {
                        listComputers.push(computer);
                    })

                    //Kontejner za labelu i select listu;
                    let smallInputContainer = document.createElement('div');
                    smallInputContainer.classList.add('small-input-div');

                    inputContainerDiv.appendChild(smallInputContainer);

                    //Labela;
                    let label = document.createElement('label');
                    label.classList.add('simple-label');
                    label.innerHTML = 'Computer:';

                    smallInputContainer.appendChild(label);

                    //Opadajuca lista;
                    let selectEl = document.createElement('select');
                    selectEl.classList.add('simple-input-list');

                    smallInputContainer.appendChild(selectEl);

                    //Popunjavanje podataka opadajuce liste;
                    listComputers.forEach(s => {
                        let opt = document.createElement('option');
                        opt.text = s.computerName;
                        opt.value = s.id;
                        selectEl.appendChild(opt);
                    })

                    //Kontejner za labelu i input element
                    smallInputContainer = document.createElement('div');
                    smallInputContainer.classList.add('small-input-div');

                    inputContainerDiv.appendChild(smallInputContainer);

                    //Labela;
                    label = document.createElement('label');
                    label.classList.add('simple-label');
                    label.innerHTML = 'New Price:';

                    smallInputContainer.appendChild(label);

                    //Input element za novu cenu;
                    let inputEl = document.createElement('input');
                    inputEl.type = 'number';
                    inputEl.classList.add('input-element');

                    smallInputContainer.appendChild(inputEl);

                    //Dugme za potvrdu nove cene;
                    let button = document.createElement('button');
                    button.classList.add('simple-button');
                    button.innerHTML = 'Change' + '<i class="fa-solid fa-check"></i>';

                    inputContainerDiv.appendChild(button);

                    //Labela za prikaz treutne(stare) cene;
                    label = document.createElement('lable');
                    label.classList.add('old-price-label');
                    label.innerHTML = 'Old Price: ';

                    mainContainer.appendChild(label);

                    button.addEventListener('click', () => {
                        //FIXME: Popravi CORS-e da omogucis da se vrsi PUT 
                        //FIXME: Popravljeno!
                        fetch(`https://localhost:5001/ComputerStore/IzmeniCenuRacunara/${selectEl.options[selectEl.selectedIndex].value}/${inputEl.value}`, {
                            method:"PUT"
                        });
                    });

                    //Update labele cene racunara;
                    selectEl.addEventListener('click', () => {
                        label.innerHTML = 'Old Price: ' + listComputers[selectEl.selectedIndex].computerPrice + '<i class="ri-coins-line"></i>';
                    })
                })
            })
        });

        //Metoda za uklanjanje hardvera iz racunara;
        selectSubList[11].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Kontejner za prikaz kartica;
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            mainContainer.appendChild(deepContainer);

            //Kontejner za labele, input elemente, dugmice..
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');

            //Appending to body;
            deepContainer.appendChild(inputContainerDiv);

            let listComputers = [];
            fetch(`https://localhost:5001/ComputerStore/VratiSveRacunare`, {
            method:"GET"}).then(p => {
                p.json().then(computers => {
                    computers.forEach(computer => {
                        listComputers.push(computer);
                    })

                    //Kontejner za labelu i input element;
                    let smallInputContainer = document.createElement('div');
                    smallInputContainer.classList.add('small-input-div');

                    inputContainerDiv.appendChild(smallInputContainer);

                    //Labela;
                    let label = document.createElement('label');
                    label.classList.add('simple-label');
                    label.innerHTML = 'Computer:';

                    smallInputContainer.appendChild(label);

                    //Opadajuca lista;
                    let selectEl = document.createElement('select');
                    selectEl.classList.add('simple-input-list');

                    smallInputContainer.appendChild(selectEl);

                    //Popunjavanje opadajuce liste;
                    listComputers.forEach(s => {
                        let opt = document.createElement('option');
                        opt.text = s.computerName;
                        opt.value = s.id;
                        selectEl.appendChild(opt);
                    })

                    //Dugme za potvrdu pretrage;
                    let button = document.createElement('button');
                    button.classList.add('simple-button');
                    button.innerHTML = 'Show' + '<i class="ri-search-line"></i>';

                    inputContainerDiv.appendChild(button);

                    //Za stvarni prikaz svih kartica komponenta;
                    let browseContainer = document.createElement('div');
                    browseContainer.classList.add('browse-container');
                    deepContainer.appendChild(browseContainer);

                    button.addEventListener('click', () => {
                        //Lista komponenta ovog racunara;
                        let listHardwares = [];
                        fetch(`https://localhost:5001/ComputerStore/VratiHardverOvogRacunara/${selectEl.options[selectEl.selectedIndex].value}`, {
                        method:"GET"})
                        .then(p => {
                            p.json().then(hardwares => {
                                hardwares.forEach(hardware => {
                                    hardware.hardver.forEach(s => {
                                        let komponenta = new Hardware(s.hardver.id, s.hardver.hardwareName, s.hardver.tipID, s.hardver.hardwareInfo, s.hardver.hardwarePrice, s.hardver.image);
                                        listHardwares.push(komponenta);
                                    })
                                    //Cistimo kontejner od prethodnog stampanja;
                                    if(browseContainer.firstChild)
                                        while(browseContainer.firstChild)
                                            browseContainer.removeChild(browseContainer.lastChild);
                                    
                                    //TODO: ovo do sad radi lepo, imamo listu hardvera!
                                    listHardwares.forEach(s => {
                                        //FIXME: Isto kao i u prosloj, samo omoguci da se obavi DELETE! FIXME:
                                        //FIXME: Popravljeno!
                                        s.drawToCardForRemoving(browseContainer, selectEl.options[selectEl.selectedIndex].value);
                                    })
                                })
                            })
                        })
                    });
                })
            })
        });


        //Metoda za prikaz svih racunara koje prodaje ova kompanija;
        selectSubList[12].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Kontejner za prikaz kartica i select elemente;
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            mainContainer.appendChild(deepContainer);

            //Kontejner za prikaz kartica;
            let browseContainer = document.createElement('div');
            browseContainer.classList.add('browse-container');
            deepContainer.appendChild(browseContainer);

            //Lista svih racunara;
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

        //Metoda za dodavanje novog hardvera;
        selectSubList[13].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            //Glavni kontejner;
            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Kontejner za input;
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            deepContainer.classList.add('make-me-flex-medium-and-up');
            deepContainer.classList.add('add-padding-bottom-medium-and-up')
            mainContainer.appendChild(deepContainer);

            //Kontejner za labelu, select listu/input element i dugme;
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');
            inputContainerDiv.classList.add('input-div-two-in-row-flex');

            //Appending to body;
            deepContainer.appendChild(inputContainerDiv);

            let labelList = ['Name:', 'Type:', 'Info:', 'Price:', 'Image:'];
            let typesList = ['text', 'input', 'text', 'number', 'text'];

            //Da ne bi koristili querySelector, ovo je brze jer odmah imamo 
            //Pokazivac na trazenu komponentu;
            let selectList = [];
            let selectEl;

            for(let i = 0; i < labelList.length; i++) {
                //Kontejner za sve labele i input/select elemente;
                let smallInputContainer = document.createElement('div');
                smallInputContainer.classList.add('small-input-div');

                inputContainerDiv.appendChild(smallInputContainer);

                //Labela kao uputstvo sta da unesemo od podataka ovde;
                let label = document.createElement('label');
                label.classList.add('simple-label');
                label.innerHTML = labelList[i];

                //Svakako uvek ide labela pre inputa tako da nema potrebe da
                //dva puta ovo dodajemo!
                smallInputContainer.appendChild(label);

                //Sve su neke select liste osim drugog elementa koji dodajemo na body;
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

                            //Popunjavanje select lista;
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

        //Metoda za prikaz svog hardvera koji prodaje ova kompanija;
        selectSubList[14].addEventListener('click', () => {
            this.closeLeftMenu();
            this.clearAndRemove();

            //Glavni kontejner;
            let mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container-div');
            this.container.appendChild(mainContainer);

            //Kontejner za prikaz odabira filtera i samih kartica komponenta;
            let deepContainer = document.createElement('div');
            deepContainer.classList.add('deep-main-container');
            mainContainer.appendChild(deepContainer);

            //Kontejner za labelu i select element;
            let inputContainerDiv = document.createElement('div');
            inputContainerDiv.classList.add('input-container-div');
            //Appending to body
            deepContainer.appendChild(inputContainerDiv);

            //Za odabir komponente po tipu;
            let browseContainer = document.createElement('div');
            browseContainer.classList.add('browse-container');

            //Appending to body;
            deepContainer.appendChild(browseContainer);

            //Kontejner za laelu i select listu;
            let smallInputContainer = document.createElement('div');
            smallInputContainer.classList.add('small-input-div');

            inputContainerDiv.appendChild(smallInputContainer);

            //Labela;
            let label = document.createElement('label');
            label.classList.add('simple-label');
            label.innerHTML = 'Filter:';

            smallInputContainer.appendChild(label);

            //Lista tipova komponenti;
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

                    //Sve na dole je prikaz komponenta po zadatim kriterijumima, 
                    //Imamo mogucnost da ih filtriramo po tipu ili da 
                    //Prikazemo sve komponente odjednom;
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

    //Za zatvaranje levog menija nakon odabira metode!
    closeLeftMenu() {
        document.querySelector('.header-nav-sub').classList.remove('show-subMenu');
    }

    //Just read the name of function..
    clearAndRemove() {
        let pom = document.querySelector('.main-container-div');
        if(pom != null) {
            while(pom.firstChild)
                pom.removeChild(pom.lastChild);
            document.querySelector('.main-container').removeChild(pom);
        }
    }

    //Just read the name of function..
    clearAndDelete(host) {
        if(host != null) {
            while(host.firstChild)
                host.removeChild(host.lastChild);
            host.parentNode.removeChild(host);
        }
    }
}