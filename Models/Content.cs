using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models {
    public class Content {
       
        [Key]
        public int ID { get; set; } 
        /*Kljuc*/

        [JsonIgnore]
        public virtual Computer Computer { get; set; }
        /*O kom racunaru se radi?*/
        public virtual Hardware Hardware { get; set; }
        /*Koji hardver vezujemo za njega?*/

        /*Sve ovo vazi i obrnuto, odnosno, u kom racunaru
        se nalazi navedeni hardver, daje nam mogucnost da
        pretrazujemo racunare koji imaju specifican hardver,
        pa to mozemo da ispitamo ovom vezom!*/
    }
}