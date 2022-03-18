import { Store } from './Store.js';
import { Computer } from './Computer.js';
import { Hardware } from './Hardware.js';
import { Company } from './Company.js';

//////////TODO:<Fetch>TODO:
let storeList = [];
fetch("https://localhost:5001/ComputerStore/VratiSveProdavnice")
    .then(p => {
        p.json().then(prodavnice => {
            prodavnice.forEach(prodavnica => {
                // console.log(prodavnica);
                let pr = new Store(prodavnica.storeID, prodavnica.storeName, prodavnica.storeAddress, prodavnica.shelfSize, prodavnica.racunari);
                storeList.push(pr);
            })
        })
    })
console.log("Lista prodavnica: ");
console.log(storeList);

let computerList = [];
fetch("https://localhost:5001/ComputerStore/VratiSveRacunare")
    .then(p => {
        p.json().then(racunari => {
            racunari.forEach(racunar => {
                let r = new Computer(racunar.id, racunar.computerName, racunar.computerPrice, racunar.computerHardware, racunar.image);
                computerList.push(r);
            })
        })
    });
console.log("Lista racunara: ");
console.log(computerList);

let hardwareList = [];
fetch("https://localhost:5001/ComputerStore/VratiSavHardver")
    .then(p => {
        p.json().then(hardveri => {
            hardveri.forEach(hardver => {
                let h = new Hardware(hardver.id, hardver.hardwareName, hardver.tipID, hardver.hardwareInfo, hardver.hardwarePrice, hardver.image);
                hardwareList.push(h);
            });
        })
    })
console.log("Lista hardvera: ");
console.log(hardwareList);


let comp = new Company('ComputerWorld', storeList, computerList, hardwareList);
// console.log(comp);

//TODO: Main: TODO:

let img = document.createElement('img');
img.classList.add('body-image');
img.src = '../Images/Wallpapers/wallpaperflare.com_wallpaper.jpg';

document.body.appendChild(img);

const main = document.createElement('div');
main.classList.add('main-container');

comp.container = main;

// document.body.appendChild(main);

//TODO: Header TODO:

//TODO: Selectors: 

//Header
const header = document.createElement('header');
header.classList.add('header-bar');
header.id = 'header-bar';
document.body.appendChild(header);

//Body, between header and footer
document.body.appendChild(main);


//Navigation bar:
let navigation = document.createElement('nav');
navigation.classList.add('header-nav');
header.appendChild(navigation);

//For opening functons:
let subMenuButton = document.createElement('a');
subMenuButton.classList.add('header-nav-submenu');
subMenuButton.id = 'header-nav-submenu';
subMenuButton.innerHTML = '<i class="ri-menu-2-line"></i>';
navigation.appendChild(subMenuButton);

//For functions:
let subMenu = document.createElement('div');
subMenu.classList.add('header-nav-sub');
navigation.appendChild(subMenu);

// //For closing functions menu:
// let closeSubMenu = document.createElement('a');
// closeSubMenu.classList.add('header-sub-nav-close');
// closeSubMenu.innerHTML = '<i class="ri-close-line"></i>';
// subMenu.appendChild(closeSubMenu);

//Just a title:
let mainTitle = document.createElement('h2');
mainTitle.classList.add('header-nav-title');
mainTitle.id = 'header-nav-title';
mainTitle.innerHTML = 'ComputerWorld!';
navigation.appendChild(mainTitle);

//For showing items in cart:
let cartMenu = document.createElement('div');
cartMenu.classList.add('header-nav-cart');
navigation.appendChild(cartMenu);

// //For closing cart folder:
// let closeCartMenu = document.createElement('a');
// closeCartMenu.classList.add('header-sub-nav-close-cart');
// closeCartMenu.innerHTML = '<i class="ri-close-line"></i>';
// cartMenu.appendChild(closeCartMenu);

//For opening cart folder:
let shoppingCart = document.createElement('a');
shoppingCart.classList.add('header-nav-shopping');
shoppingCart.id = 'header-nav-shopping';
shoppingCart.innerHTML = '<i class="ri-shopping-cart-line"></i>';
navigation.appendChild(shoppingCart);


let footer = document.createElement('footer');
footer.classList.add('footer-bar');

let footerContainer = document.createElement('div');
footerContainer.classList.add('footer-bar-container');

let smallInfoLabel = document.createElement('h3');
smallInfoLabel.classList.add('small-info-label');
smallInfoLabel.innerHTML = 'About me:';

let socialInfo = document.createElement('div');
socialInfo.classList.add('footer-bar-conteiner-social-div');

let infoList = ['GitHub', 'Instagram', 'Facebook'];
let references = ['https://github.com/davidmarinkovic366', 'https://www.instagram.com/serdavidiii/', 'https://www.facebook.com/david.marinkovic00/']
let icons = ['<i class="ri-github-fill"></i>', '<i class="ri-instagram-line"></i>', '<i class="ri-facebook-circle-line"></i>'];
for(let i = 0; i < infoList.length; i++) {
    let a = document.createElement('a');
    a.classList.add('social-info-icon');
    a.innerHTML = icons[i];
    a.href = references[i];
    footerContainer.appendChild(a);
}

// footerContainer.appendChild(socialInfo);
footer.appendChild(smallInfoLabel);
footer.appendChild(footerContainer);
document.body.appendChild(footer);

//TODO: Event listeners: 

//FIXME: Show submenu folder: 
subMenuButton.addEventListener('click', () => {
    drawLeftMenu(subMenu);

    subMenu.classList.add('show-subMenu');
    cartMenu.classList.remove('show-cartMenu');
});

// //FIXME: Close submenu folder: 
// closeSubMenu.addEventListener('click', () => {
//     subMenu.classList.remove('show-subMenu');
// })

//FIXME: Show cart menu:
shoppingCart.addEventListener('click', () => {
    drawRightMenu(cartMenu);
    cartMenu.classList.add('show-cartMenu');
    subMenu.classList.remove('show-subMenu');
});

// //FIXME: Close cart menu:
// closeCartMenu.addEventListener('click', () => {
//     cartMenu.classList.remove('show-cartMenu');
// });


//TODO: Functions(draw?): 

// Draw left menu: 
function drawLeftMenu(host) {
    // clearHost(host);

    let closeBtn = document.querySelector('.header-sub-nav-close');
    if(closeBtn != null)
        closeBtn.remove();

    let closeSubMenu = document.createElement('a');
    closeSubMenu.classList.add('header-sub-nav-close');
    closeSubMenu.innerHTML = '<i class="ri-close-line"></i>';
    host.appendChild(closeSubMenu);

    closeSubMenu.addEventListener('click', () => {
        subMenu.classList.remove('show-subMenu');
    })

    comp.drawCompanyFunctionsMenu(subMenu);

}

//FIXME: Draw right menu start look:
function drawRightMenu(host) {
    // clearHost(host);
    let closeBtn = document.querySelector('.header-sub-nav-close-cart');
    if(closeBtn != null)
        closeBtn.remove();

    //For closing cart folder:
    let closeCartMenu = document.createElement('a');
    closeCartMenu.classList.add('header-sub-nav-close-cart');
    closeCartMenu.innerHTML = '<i class="ri-close-line"></i>';
    cartMenu.appendChild(closeCartMenu);

    closeCartMenu.addEventListener('click', () => {
        cartMenu.classList.remove('show-cartMenu');
    });
}

function clearHost(host) {
    while(host.lastChild)
        host.remove(host.lastChild);
}