using System.ComponentModel.DataAnnotations;

namespace Models {
    public class Hardware {

        [Key]
        public int ID { get; set; }
        /*Kljuc*/

        [StringLength(100)]
        [Required]
        public string HardwareName { get; set; }   
        /*npr. Nvidia RTX 2080 Super Ti*/
        
        [Required]
        public int TipID { get; set; }
        /*Kog tipa je hardver?*/

        [StringLength(120)]
        [Required]
        public string HardwareInfo { get; set; }   
        /*String za informacije, npr. 12Gb GDDR6 256bit 1024CUDA...*/

        public string Image { get; set; }
        /*Slika komponente koja se nalazi na serveru (putanja do nje)*/

        [Required]
        public int HardwarePrice { get; set; }
        /*Koliko kosta ovaj hardver?*/



        

    }
}