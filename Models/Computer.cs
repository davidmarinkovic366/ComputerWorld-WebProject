using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models {
    public class Computer {

        [Key]
        public int ID { get; set; }                     
        /*Kljuc*/
        
        [StringLength(100)]
        [Required]
        public string ComputerName { get; set; }        
        /*Ime racunara*/

        public int ComputerPrice { get; set; }          
        /*Cena, uprate pri svakom dodavanju komponente!*/

        public List<Content> ComputerHardware { get; set; }
        /*Lista komponenta koje se nalaze u ovom racunaru*/

        public List<Shelf> ComputerStore { get; set; }
        /*Lista prodavnica u kojima se moze naci ovaj racunar*/

        public string Image { get; set; }
        /*Slika racunara koja se nalazi na serveru (putanja do nje)*/

    }
}