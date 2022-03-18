using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models {
    public class Shelf {

        [Key]
        public int ID { get; set; } 
        /*Kljuc*/

        [JsonIgnore]
        public virtual Computer Computer { get; set; }
        /*O kom racunaru se radi?*/
        public virtual Store Store { get; set; }
        /*U kojoj prodavnici se taj racunar nalazi?*/
        
        /*Sve ovo vazi i obrnuto, odnosno, o kojoj prodavnici
        se radi i koji racunar se nalazi u njoj?*/
    }
}