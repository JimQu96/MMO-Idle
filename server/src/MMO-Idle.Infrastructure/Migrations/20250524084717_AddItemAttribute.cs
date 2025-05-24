using System.Text.Json;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MMOIdle.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddItemAttribute : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<JsonDocument>(
                name: "attributes",
                table: "game_items",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "sell_price",
                table: "game_items",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "attributes",
                table: "game_items");

            migrationBuilder.DropColumn(
                name: "sell_price",
                table: "game_items");
        }
    }
}
