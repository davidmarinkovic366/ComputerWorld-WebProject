using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Models;
using Microsoft.AspNetCore.Cors;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ComputerStoreController : ControllerBase
    {

        public ComputerStoreContext Context { get; set; }

        public ComputerStoreController(ComputerStoreContext context)
        {
            Context = context;
        }

        #region HttpPost

        //TODO: Ne koristi se, upotrebljeno samo za inicijalno pre rada sa bazom podataka!
        [Route("DodajTip")]
        [HttpPost]
        public async Task<ActionResult> DodajTip([FromBody] Tip tip) {
            if(String.IsNullOrEmpty(tip.ComponenaTip))
                return BadRequest("Niste uneli tip!");
            else {
                try {
                    Context.Types.Add(tip);
                    await Context.SaveChangesAsync();
                    return Ok($"Novi tip sa imenom {tip.ComponenaTip} je dodat sa id-jem: {tip.ID}");
                }
                catch(Exception ex) {
                    return BadRequest(ex.Message);
                }
            }
        }

        //TODO: Koristi se!
        [Route("DodajHardver/{name}/{tip}/{info}/{price}/{image}")]
        [HttpPost]
        public async Task<ActionResult> DodajHardver(string name, int tip, string info, int price, string image) {
            if(tip == 0 || String.IsNullOrEmpty(name) || String.IsNullOrEmpty(info) || String.IsNullOrEmpty(image) || price <= 0)
                return BadRequest("Niste uneli sve podatke!");
            else {

                var type = Context.Types.Where(p => p.ID == tip).FirstOrDefaultAsync();

                if(type == null) {
                    return BadRequest("Ovaj tip komponente ne postoji u bazi podataka!");
                }                
                else {
                    try {

                        Hardware nova = new Hardware();
                        nova.HardwareName = name;
                        nova.HardwareInfo = info;
                        nova.Image = "../Images/Hardware/" + image + ".png";
                        nova.HardwarePrice = price;
                        nova.TipID = tip;
                    
                        Context.Hardwares.Add(nova);
                        await Context.SaveChangesAsync();
                        return Ok("Novi hardver je dodat u bazu podataka!");
                    }   
                    catch(Exception ex) {
                        return BadRequest(ex.Message);
                    }
                }
            }
        }

        //TODO: Koristi se!
        [Route("DodajRacunar/{name}/{image}")]
        [HttpPost]
        public async Task<ActionResult> DodajRacunar(string name, string image) {
            if(String.IsNullOrEmpty(name) || String.IsNullOrEmpty(image))
                return BadRequest("Niste uneli sve podatke!");
            else {

                var comp = await Context.Computers
                                        .Where(p => p.ComputerName == name)
                                        .FirstOrDefaultAsync();
                
                if(comp != null) {
                    return BadRequest("Racunara sa datim imenom vec postoji u bazi podataka!");
                }
                else {

                    String pom = "../Images/Computer/";
                    pom += image;
                    pom += ".png";

                    Computer cmp = new Computer();
                    cmp.ComputerName = name;
                    cmp.Image = pom;

                    try {
                        Context.Computers.Add(cmp);
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno smo dodali racunar u bazu podataka!");
                    }
                    catch(Exception ex) {
                        return BadRequest(ex.Message);
                    }
                }
            }
        }

        //TODO: Koristi se! 
        [Route("DodajKomponentuRacunaru/{rac}/{hrdw}")]
        [HttpPost]
        public async Task<ActionResult> DodajKomponentuRacunaru(int rac = 0, int hrdw = 0) {
            // if(String.IsNullOrEmpty(rac) || String.IsNullOrEmpty(hrdw))
            if(rac == 0 || hrdw == 0)
                return BadRequest("Niste uneli racunar ili komponentu!");
            else {
                try {
                    var racunar = Context.Computers.Where(p => p.ID == rac).FirstOrDefault();
                    var hardver = Context.Hardwares.Where(p => p.ID == hrdw).FirstOrDefault();

                    if(racunar == null || hardver == null)
                        return BadRequest("Racunar ili hardver sa zadatim imenom ne postoje u listi!");
                    else {
                        Content c = new Content();
                        c.Computer = racunar;
                        c.Hardware = hardver;
                    
                        Context.Contents.Add(c);

                        racunar.ComputerHardware.Add(c);
                        racunar.ComputerPrice += hardver.HardwarePrice;
                        await Context.SaveChangesAsync();

                        return Ok(racunar);
                    }
                }
                catch(Exception ex) {
                    return BadRequest(ex.Message);
                }
            }
        }

        //TODO: Koristi se!
        [Route("DodajProdavnicu/{name}/{address}/{shelfSize}")]
        [HttpPost]
        public async Task<ActionResult> DodajProdavnicu(string name, string address, int shelfSize) {
            if(String.IsNullOrEmpty(name) || String.IsNullOrEmpty(address))
                return BadRequest("Niste uneli podatak o adresi ili imenu prodavnice!");
            if(shelfSize < 10 || shelfSize > 50)
                return BadRequest("Preveliki ili premali broj polica, molimo unesite ispravan broj! [10, 50]");
            else {
                bool prov = false;
                if(Context.Stores != null) {
                    var provera = Context.Stores.Where(p => p.StoreAddress == address).FirstOrDefault();
                    var proveraDruga = Context.Stores.Where(p => p.StoreName == name).FirstOrDefault();
                    if(provera != null || proveraDruga != null)
                        prov = true;
                }
                if(prov)
                    return BadRequest("Prodavnica vec postoji sa zadatim imenom ili na zadatoj adresi!");
                else {
                    try {

                        Store str = new Store();
                        str.StoreName = name;
                        str.StoreAddress = address;
                        str.ShelfSize = shelfSize;

                        Context.Stores.Add(str);
                        await Context.SaveChangesAsync();
                        return Ok($"Prodavnica sa imenom {str.StoreName} i kapacitetom od: {str.ShelfSize} je dodata na adresi: {str.StoreAddress} sa id-jem: {str.ID}");
                    }
                    catch(Exception ex) {
                        return BadRequest(ex.Message);
                    }
                }
            }
        }


        //TODO: Koristi se!
        [Route("DodajRacunarNaPolicu/{storeId}/{computerId}")]
        [HttpPost]
        public async Task<ActionResult> DodajRacunarNaPolicu(int storeId = 0, int computerId = 0) {
            if(storeId <= 0 || computerId <= 0)
                return BadRequest("Uneli ste nevalide podatke!");
            else {
                if(Context.Stores == null || Context.Computers == null)
                    return BadRequest("U bazi ne postoji ni jedan racunar ili prodavnica, a mozda i oba?");
                else {
                    Store prodavnica = await Context.Stores
                                            .Where(p => p.ID == storeId)
                                            .FirstOrDefaultAsync();

                    Computer racunar = await Context.Computers
                                         .Where(p => p.ID == computerId)
                                         .FirstOrDefaultAsync();

                    if(prodavnica == null || racunar == null)
                        return BadRequest("Navedeni racunar ili prodavnica se ne nalaze u bazi podataka!");
                    else {
                        //Ako nadjemo taj racunar u toj prodavnici, ne dodajemo ga ponovo!
                        var provera = await Context.Shelfs
                                                .Include(p => p.Computer)
                                                .Include(p => p.Store)
                                                .Where(p => p.Store.ID == storeId)
                                                .Where(p => p.Computer.ID == computerId)
                                                .FirstOrDefaultAsync();
                        
                        if(provera != null)
                            return BadRequest("Navedeni racunar se vec nalazi u prodavnici!");
                        else {
                            try {
                                Shelf sh = new Shelf();
                                sh.Computer = racunar;
                                sh.Store = prodavnica;

                                Context.Shelfs.Add(sh);

                                racunar.ComputerStore.Add(sh);
                                prodavnica.StoreComputer.Add(sh);
                                
                                await Context.SaveChangesAsync();

                                return Ok("Uspesno smo dodali racunar u prodavnicu!");
                            }
                            catch(Exception ex) {
                                return BadRequest(ex.Message);
                            }
                        }
                    }
                }
            }
        }


        #endregion


        #region HttpGet

        //TODO: Koristi se!
        [Route("VratiSavHardver")]
        [HttpGet]
        public ActionResult VratiSavHardver() {
            if(Context.Hardwares == null)
                return BadRequest("Niste dodali ni jedan hardver u bazu podataka!");
            else 
                return Ok(Context.Hardwares.ToList());
        }

        //TODO: Koristi se!
        [Route("VratiSveTipove")]
        [HttpGet]
        public ActionResult VratiSveTipove() {
            if(Context.Types == null)
                return BadRequest("Niste uneli ni jedan tip u bazu podataka!");
            else 
                return Ok(Context.Types.ToList());
        }

        //TODO: Koristi se!
        [Route("VratiSveOvogTipa/{tip}")]
        [HttpGet]
        public async Task<ActionResult> VratiSveOvogTipa(int tip = 0) {
            // if(String.IsNullOrEmpty(tip))
            if(tip == 0)
                return BadRequest("Niste uneli trazeni tip!");
            else if(Context.Hardwares == null)
                return BadRequest("Niste dodali ni jedan hardver u bazu podataka!");
            else {
                var t = await Context.Hardwares
                               .Where(p => p.TipID == tip)
                               .ToListAsync();

                if(t == null)
                    return BadRequest("Nema komponena ovog tipa u bazi podataka!");
                else {
                    try {
                        return Ok(t);
                    }
                    catch(Exception ex) {
                        return BadRequest(ex.Message);
                    }
                }
            }
        }

        //TODO: Koristi se!
        [Route("VratiSveRacunare")]
        [EnableCors("CORS")]
        [HttpGet]
        public ActionResult VratiSveRacunare() {
            if(Context.Computers == null)
                return BadRequest("Nazalost, nema racunara u bazi podataka!");
            else {
                var lista = Context.Computers
                            .Include(p => p.ComputerHardware)
                            .ThenInclude(p => p.Hardware);
                return Ok(lista);
            }
                ////////////////////////////////////////
        }

        //TODO: Koristi se!
        //FIXME: Valjda? 
        [Route("VratiSveOOvomRacunaru/{name}")]
        [HttpGet]
        public ActionResult VratiSveOOvomRacunaru(string name) {
            if(Context.Computers == null)
                return BadRequest("Nema racunara u bazi podataka!");
            else {
                var rac = Context.Computers
                          .Include(p => p.ComputerHardware)
                          .ThenInclude(p => p.Hardware);
                if(rac == null)
                    return BadRequest("Racunar sa ovim imenom se ne nalazi u bazi podataka!");
                else
                    return Ok(rac.Where(p => p.ComputerName == name).FirstOrDefault());
                // return Ok(Context.Computers.Where(p => p.ComputerName == name).FirstOrDefault());
            }
        }

        //FIXME: Sad pa ovo ne radi, napravili smo za racunar, vidi ovo nekako prepravi
        //Ili mozemo da vratimo sav hardver pa da u js izvlacimo podatke? 
        //FIXME: Popravljeno, sad radi!
        //TODO: Koristi se!
        [Route("VratiKomponenteRacunara/{computerId}")]
        [HttpGet]
        public async Task<ActionResult> VratiKomponenteRacunara(int computerId = 0) {
            if(computerId == 0)
                return BadRequest("Morate da izaberete racunar!");
            else {
                var comp = await Context.Contents
                                        .Include(p => p.Computer)
                                        .Include(p => p.Hardware)
                                        .Where(p => p.Computer.ID == computerId)
                                        .ToListAsync();

                if(comp == null)
                    return BadRequest("Navedeni racunar se ne nalazi u bazi podataka!");
                else {
                    //TODO: Pravimo string od naziva svih komponenta ovih racunara
                    try {
                        return Ok(comp.Select(p => 
                            new {
                                HardwareList = p.Hardware
                            }));
                    }
                    catch(Exception ex) {
                        return BadRequest(ex.Message);
                    }
                }
            }
        }

        //TODO: Koristi se!
        [Route("VratiHardverOvogRacunara/{hardw}")]
        [HttpGet]
        public async Task<ActionResult> VratiHardverOvogRacunara(int hardw = 0) {
            if(hardw == 0)
                return BadRequest("Niste izabrani ni jedan racunar!");
            else {
                var lista = await Context.Computers
                                         .Where(p => p.ID == hardw)
                                         .Include(p => p.ComputerHardware)
                                         .ThenInclude(p => p.Hardware)
                                         .ToListAsync();
                if(lista == null)
                    return BadRequest("Racunar nema hardvera!");
                else {
                    try {
                        return Ok(lista.Select(p =>
                                    new {
                                        Hardver = p.ComputerHardware
                                                   .Select(q => 
                                                        new {
                                                            hardver = q.Hardware
                                                        })
                                    }).ToList());
                    }
                    catch(Exception ex) {
                        return BadRequest(ex.Message);
                    }
                }
            }
        }

        //TODO: Koristi se!
        [Route("VratiSveProdavnice")]
        [HttpGet]
        public async Task<ActionResult> VratiSveProdavnice() {
            if(Context.Stores == null)
                return BadRequest("Nema prodavnica u bazi podatak!");
            else {
                var lista = await Context.Stores
                                   .Include(p => p.StoreComputer)
                                   .ThenInclude(p => p.Computer).ToListAsync();
                if(lista == null)
                    return BadRequest("Doslo je do neke greske?");
                else 
                    return Ok
                    (
                        lista.Select(p => 
                        new 
                            {
                                StoreID = p.ID,
                                StoreName = p.StoreName,
                                StoreAddress = p.StoreAddress,
                                ShelfSize = p.ShelfSize,
                                Racunari = p.StoreComputer
                                    .Where(q => q.Computer != null)
                                    .Select(q =>
                                    new 
                                        {
                                            ComputerName = q.Computer.ComputerName,
                                            ComputerPrice = q.Computer.ComputerPrice,
                                            ComputerId = q.Computer.ID,
                                            Image = q.Computer.Image
                                        })
                            }).ToList()
                    );
            }
        }

        //TODO: Koristi se!
        [Route("VratiSveRacunareProdavnice/{storeID}")]
        [HttpGet]
        public async Task<ActionResult> VratiSveRacunareProdavnice(int storeID) {
            if(storeID == 0)
                return BadRequest("Morate da izaberete prodavnicu!");
            else {
                var prvalista = await Context.Stores
                                             .Where(p => p.ID == storeID)
                                             .Include(p => p.StoreComputer)
                                             .ThenInclude(p => p.Computer)
                                             .ToListAsync();
                if(prvalista == null) {
                    return BadRequest("Nema racunara!");
                }
                else {
                    try {
                        return Ok(prvalista.Select(p => 
                            new {
                                Racunari = p.StoreComputer
                                            .Select(q =>
                                                new {
                                                    ComputerName = q.Computer.ComputerName,
                                                    ComputerPrice = q.Computer.ComputerPrice,
                                                    ComputerId = q.Computer.ID,
                                                    Image = q.Computer.Image
                                                    })
                            })
                        );
                    }
                    catch(Exception ex){
                        return BadRequest(ex.Message);
                    }
                }
            }
        }


        //Ovde sam promenio await i ToListAsync()
        //FIXME: Da li se koristi? 
        [Route("GdeMoguDaKupimOvajRacunar/{name}")]
        [HttpGet]
        public async Task<ActionResult> GdeMoguDaKupimOvajRacunar(string name) {
            if(String.IsNullOrEmpty(name))
                return BadRequest("Niste uneli potrebne podatke!");
            else {
                if(Context.Stores == null || Context.Computers == null)
                    return BadRequest("U bazi podataka nemamo informacija o racunarima ili o prodavnicama, ili nedostaju podaci za obe stavke?");
                else {
                    var lista = await Context.Computers
                                       .Include(p => p.ComputerStore)
                                       .ThenInclude(p => p.Store).ToListAsync();
                    var trazeni = lista.Where(p => p.ComputerName == name).FirstOrDefault();
                    if(trazeni == null)
                        return BadRequest("Nemamo podatke o racunaru cije ste ime uneli!");
                    else {
                        return Ok
                        (
                            trazeni.ComputerStore.Select(p =>
                            new {
                                Prodavnica = p.Store.StoreName,
                                Adresa = p.Store.StoreAddress,
                                Cena = p.Computer.ComputerPrice
                            }).ToList()
                        );
                    }
                }
            }
        }

        [Route("KojiJeHardverOvogRacunara/{name}")]
        [HttpGet]
        public async Task<ActionResult> KojiJeHardverOvogRacunara(string name) {
            if(String.IsNullOrEmpty(name))
                return BadRequest("Lose ste uneli podatke o racunaru!");
            else {
                if(Context.Computers == null)
                    return BadRequest("Nema racunara u bazi podataka!");
                else {
                    var lista = await Context.Computers
                                       .Include(p => p.ComputerHardware)
                                       .ThenInclude(p => p.Hardware)
                                       .ToListAsync();
                    var trazeni = lista.Where(p => p.ComputerName == name).FirstOrDefault();
                    if(trazeni == null)
                        return BadRequest("Trazeni racunar se ne nalazi u bazi podataka!");
                    else {
                        Tip t = new Tip();
                        return Ok
                        (
                            trazeni.ComputerHardware.Select( p => 
                            new {
                                NazivKomponente = p.Hardware.HardwareName,
                                CenaKomopnente = p.Hardware.HardwarePrice,
                                TipKomponente = (Context.Types.Where(q => q.ID == p.Hardware.TipID).FirstOrDefault()).ComponenaTip
                            }).ToList()
                        );
                    }
                }
            }
        }

        
        //TODO: Koristi se!
        [Route("VratiZauzetostSvihProdavnica")]
        [HttpGet]
        public async Task<ActionResult> VratiZauzetostSvihProdavnica() {
            if(Context.Stores == null) {
                return BadRequest("Nema prodavnica u nasoj bazi podataka!");
            }
            else {
                var lista = await Context.Stores.Include(p => p.StoreComputer).ToListAsync();
                
                //Iz nekog razloga mi ne dozvoljava da ucitam .Include(p => p.StoreComputer).ThenInclude(p => p.Shelf);

                return Ok(lista.Select( p => 
                    new {
                        Name = p.StoreName,
                        Shelfs = p.ShelfSize,
                        Occupied = p.StoreComputer.Count
                    }).ToList()
                );
            }
        }

        #endregion


        #region HttpPut(update)

        [Route("IzmeniCenuRacunara/{comp}/{newPrice}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniCenuRacunara(int comp = 0, int newPrice = 0) {
            if(comp == 0 || newPrice <= 0)
                return BadRequest("Jedan ili vise unetih podataka nisu ispravni!");
            else {
                try {
                    var racunar = await Context.Computers.Where(p => p.ID == comp).FirstOrDefaultAsync();
                    if(racunar == null)
                        return BadRequest("Racunar sa ovim imenom ne postoji u bazi podataka!");
                    else {
                        racunar.ComputerPrice = newPrice;
                        Context.Computers.Update(racunar);
                        await Context.SaveChangesAsync();

                        return Ok("Uspesno je promenjena cena racunara!\n" + racunar);
                    }
                }
                catch(Exception ex) {
                    return BadRequest(ex.Message);
                }
            }
        }

        [Route("IzmeniImeProdavnice/{id}/{newName}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniImeProdavnice(int id, string newName) {
            if(id <= 0 || String.IsNullOrWhiteSpace(newName))
                return BadRequest("Neispravni podaci!");
            else {
                var prod = await Context.Stores.Where(p => p.ID == id)
                                               .FirstOrDefaultAsync();
                if(prod == null)
                    return BadRequest("Navedena prodavnica se ne nalazi u bazi podataka!");
                else {
                    try {
                        prod.StoreName = newName;
                        Context.Stores.Update(prod);
                        await Context.SaveChangesAsync();

                        return Ok("Uspesno promenjeno ime prodavnice!");
                    }
                    catch(Exception ex) {
                        return BadRequest(ex.Message);
                    }
                }
            }
        }

        #endregion


        #region Delete

        //TODO: Koristi se!
        [Route("UkloniHardverIzRacunara/{computer}/{hardware}")]
        [HttpDelete]
        public async Task<ActionResult> UkloniHardverIzRacunara(int computer = 0, int hardware = 0) {
            if(computer == 0 || hardware == 0)
                return BadRequest("Niste ispravno uneli neki podatak!");
            else {
                try {
                    var veza = await Context.Contents
                                               .Where(p => p.Computer.ID == computer && p.Hardware.ID == hardware)
                                               .Include(p => p.Computer)
                                               .Include(p => p.Hardware)
                                               .FirstOrDefaultAsync();
                    var komponenta = await Context.Hardwares
                                                  .Where(p => p.ID == hardware)
                                                  .FirstOrDefaultAsync();
                    var racunar = await Context.Computers
                                               .Where(p => p.ID == computer)
                                               .FirstOrDefaultAsync();

                    if(racunar == null || komponenta == null || veza == null)
                        return BadRequest("Racunar ili ne postoji u bazi podataka, ili nema ni jednu komponentu!");
                    else {
                        racunar.ComputerPrice -= komponenta.HardwarePrice;
                        racunar.ComputerHardware.Remove(veza);
                        Context.Contents.Remove(veza);
                        await Context.SaveChangesAsync();

                        return Ok("Komponenta uspesno uklonjena iz racunara!");
                    }
                }
                catch(Exception ex) {
                    return BadRequest(ex.Message);
                }
            }
        }


        [Route("ObrisiProdavnicuZajednoSaPodacima/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiProdavnicuZajednoSaPodacima(int id = 0) {
            if(id <= 0) {
                return BadRequest("Navedena prodavnica ne postoji!");
            }
            else {
                var prod = await Context.Stores.Where(p => p.ID == id)
                                               .Include(p => p.StoreComputer)
                                               .ThenInclude(p => p.Computer)
                                               .FirstOrDefaultAsync();
                if(prod == null) {
                    return BadRequest("Navedena prodavnica se vise ne nalazi u nasoj bazi podataka!");
                }
                else {
                    //Hvatamo sve shelf-ove, da bi ih obrisali iz racunara!
                    var shelfList = await Context.Shelfs.Where(p => p.Store.ID == id)
                                                        .Include(p => p.Computer)
                                                        .ThenInclude(p => p.ComputerStore)
                                                        .ToListAsync();
                                               
                    if(shelfList == null) { //Ako prodavnica nema racunara?
                        try {
                            Context.Stores.Remove(prod);
                            await Context.SaveChangesAsync();

                            return Ok("Prodavnica uspesno obrisana!");
                        }
                        catch(Exception ex) {
                            return BadRequest(ex.Message);
                        }
                    }
                    else {  //Inace moramo i iz racunara da uklonimo vezu!
                        shelfList.ForEach(p => {
                            //Brisemo za sve racunare koji su ikada imali vezu prema ovoj prodavnici istu!
                            p.Computer.ComputerStore.Remove(p);
                            //Brisemo sve shelf-ove koje su bile vezane za ovu prodavnicu!
                            Context.Shelfs.Remove(p);
                        });

                        Context.Stores.Remove(prod);
                        await Context.SaveChangesAsync();

                        return Ok("Prodavnica uspesno obrisana!");
                    }
                }
            }
        }


        #endregion


    }
}
