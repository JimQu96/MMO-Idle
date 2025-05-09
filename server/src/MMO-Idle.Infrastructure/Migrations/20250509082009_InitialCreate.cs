using System;
using MMOIdle.Domain.Enums;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MMO_Idle.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:equipment_slot", "accessory1,accessory2,back,chest,chisel,cookware,feet,fishing_rod,hammer,hands,head,hoe,knife,legs,main_hand,neck,needle_and_thread,off_hand,pickaxe,ring1,ring2,shoulder,shovel,sickle,waist,wrist")
                .Annotation("Npgsql:Enum:item_category", "chest,currency,feet,hammer,hands,head,legs,one_handed_sword,ore,pickaxe,shield,shoulder,waist,wrist")
                .Annotation("Npgsql:Enum:item_quality", "blue,gray,green,normal,orange,purple,rainbow,red,white")
                .Annotation("Npgsql:Enum:item_type", "consumable,currency,equipment,material,other");

            migrationBuilder.CreateTable(
                name: "accounts",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    password_hash = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    last_login_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_active = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_accounts", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "game_items",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    type = table.Column<ItemType>(type: "item_type", nullable: false),
                    category = table.Column<ItemCategory>(type: "item_category", nullable: false),
                    quality = table.Column<ItemQuality>(type: "item_quality", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    icon = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_game_items", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "characters",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    @class = table.Column<int>(name: "class", type: "integer", nullable: false),
                    level = table.Column<int>(type: "integer", nullable: false),
                    experience = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    last_login_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    account_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_characters", x => x.id);
                    table.ForeignKey(
                        name: "fk_characters_accounts_account_id",
                        column: x => x.account_id,
                        principalTable: "accounts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "character_backpacks",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    character_id = table.Column<Guid>(type: "uuid", nullable: false),
                    item_id = table.Column<long>(type: "bigint", nullable: false),
                    quantity = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_character_backpacks", x => x.id);
                    table.ForeignKey(
                        name: "fk_character_backpacks_characters_character_id",
                        column: x => x.character_id,
                        principalTable: "characters",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_character_backpacks_game_items_item_id",
                        column: x => x.item_id,
                        principalTable: "game_items",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "character_equipments",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    character_id = table.Column<Guid>(type: "uuid", nullable: false),
                    slot = table.Column<EquipmentSlot>(type: "equipment_slot", nullable: false),
                    item_id = table.Column<long>(type: "bigint", nullable: false),
                    equipped_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_character_equipments", x => x.id);
                    table.ForeignKey(
                        name: "fk_character_equipments_characters_character_id",
                        column: x => x.character_id,
                        principalTable: "characters",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_character_equipments_game_items_item_id",
                        column: x => x.item_id,
                        principalTable: "game_items",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "ix_accounts_user_name",
                table: "accounts",
                column: "user_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_character_backpacks_character_id",
                table: "character_backpacks",
                column: "character_id");

            migrationBuilder.CreateIndex(
                name: "ix_character_backpacks_item_id",
                table: "character_backpacks",
                column: "item_id");

            migrationBuilder.CreateIndex(
                name: "ix_character_equipments_character_id",
                table: "character_equipments",
                column: "character_id");

            migrationBuilder.CreateIndex(
                name: "ix_character_equipments_item_id",
                table: "character_equipments",
                column: "item_id");

            migrationBuilder.CreateIndex(
                name: "ix_characters_account_id",
                table: "characters",
                column: "account_id");

            migrationBuilder.CreateIndex(
                name: "ix_characters_name",
                table: "characters",
                column: "name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "character_backpacks");

            migrationBuilder.DropTable(
                name: "character_equipments");

            migrationBuilder.DropTable(
                name: "characters");

            migrationBuilder.DropTable(
                name: "game_items");

            migrationBuilder.DropTable(
                name: "accounts");
        }
    }
}
