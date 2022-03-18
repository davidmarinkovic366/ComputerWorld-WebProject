using Microsoft.EntityFrameworkCore;

namespace Models {
    public class ComputerStoreContext : DbContext {

        public DbSet<Store> Stores { get; set; }
        public DbSet<Computer> Computers { get; set; }
        public DbSet<Hardware> Hardwares { get; set; }
        public DbSet<Tip> Types { get; set; }
        public DbSet<Shelf> Shelfs { get; set; }
        public DbSet<Content> Contents { get; set; }

        public ComputerStoreContext(DbContextOptions opt) : base(opt) {

        }


    }
}