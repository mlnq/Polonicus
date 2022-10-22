using Microsoft.EntityFrameworkCore.Migrations;

namespace Polonicus_API.Migrations
{
    public partial class ChronicleImagePath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ImagePath",
                table: "Chronicles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Chronicles");
        }
    }
}
