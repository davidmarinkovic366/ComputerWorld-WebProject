using System.ComponentModel.DataAnnotations;

namespace Models {
    public class Tip {
   
        [Key]
        public int ID { get; set; }
        /*Kljuc*/

        [StringLength(30)]
        [Required]
        public string ComponenaTip { get; set; }
        /*Opis komponente, npr. Graficka, CPU, PSU...*/
    }
}