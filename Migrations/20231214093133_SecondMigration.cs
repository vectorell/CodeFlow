using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace testreact.Migrations
{
    /// <inheritdoc />
    public partial class SecondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "title",
                table: "EntrieItems",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "syntax",
                table: "EntrieItems",
                newName: "Syntax");

            migrationBuilder.RenameColumn(
                name: "examples",
                table: "EntrieItems",
                newName: "Examples");

            migrationBuilder.RenameColumn(
                name: "tag",
                table: "EntrieItems",
                newName: "Subject");

            migrationBuilder.AddColumn<string>(
                name: "Field",
                table: "EntrieItems",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Field",
                table: "EntrieItems");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "EntrieItems",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Syntax",
                table: "EntrieItems",
                newName: "syntax");

            migrationBuilder.RenameColumn(
                name: "Examples",
                table: "EntrieItems",
                newName: "examples");

            migrationBuilder.RenameColumn(
                name: "Subject",
                table: "EntrieItems",
                newName: "tag");
        }
    }
}
