using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Computers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ComputerName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ComputerPrice = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Computers", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Hardwares",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HardwareName = table.Column<int>(type: "int", maxLength: 100, nullable: false),
                    TipID = table.Column<int>(type: "int", nullable: false),
                    HardwareInfo = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    HardwarePrice = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hardwares", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Stores",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoreName = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    StoreAddress = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    ShelfSize = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stores", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ComponenaTip = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Contents",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ComputerID = table.Column<int>(type: "int", nullable: true),
                    HardwareID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contents", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Contents_Computers_ComputerID",
                        column: x => x.ComputerID,
                        principalTable: "Computers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Contents_Hardwares_HardwareID",
                        column: x => x.HardwareID,
                        principalTable: "Hardwares",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Shelfs",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ComputerID = table.Column<int>(type: "int", nullable: true),
                    StoreID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shelfs", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Shelfs_Computers_ComputerID",
                        column: x => x.ComputerID,
                        principalTable: "Computers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Shelfs_Stores_StoreID",
                        column: x => x.StoreID,
                        principalTable: "Stores",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contents_ComputerID",
                table: "Contents",
                column: "ComputerID");

            migrationBuilder.CreateIndex(
                name: "IX_Contents_HardwareID",
                table: "Contents",
                column: "HardwareID");

            migrationBuilder.CreateIndex(
                name: "IX_Shelfs_ComputerID",
                table: "Shelfs",
                column: "ComputerID");

            migrationBuilder.CreateIndex(
                name: "IX_Shelfs_StoreID",
                table: "Shelfs",
                column: "StoreID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contents");

            migrationBuilder.DropTable(
                name: "Shelfs");

            migrationBuilder.DropTable(
                name: "Types");

            migrationBuilder.DropTable(
                name: "Hardwares");

            migrationBuilder.DropTable(
                name: "Computers");

            migrationBuilder.DropTable(
                name: "Stores");
        }
    }
}
