using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models {
    public class Store {

        [Key]
        public int ID { get; set; } 
        /*Kljuc*/

        [StringLength(120)]
        [Required]
        public string StoreName { get; set; }
        /*Ime ove prodavnice?*/

        [StringLength(120)]
        [Required]
        public string StoreAddress { get; set; }
        /*Adresa na kojoj se nalazi ova prodavnica?*/

        [Range(10, 50)]
        [Required]
        public int ShelfSize { get; set; }
        /*Koliko racunara(razlicitih) moze da stane u prodavnicu?*/
        /*StoreComputer.SizeOfList()*/
        /*min 10, max 50*/

        public List<Shelf> StoreComputer { get; set; }
        /*Lista veze koja nam govori koji se sve racunari nalaze
        u ovoj specificnoj prodavnici?*/

    }
}