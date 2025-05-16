using System;
using MMOIdle.Domain.Enums;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MMOIdle.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSkillLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:equipment_slot", "accessory1,accessory2,back,chest,chisel,cookware,feet,fishing_rod,hammer,hands,head,hoe,knife,legs,main_hand,neck,needle_and_thread,off_hand,pickaxe,ring1,ring2,shoulder,shovel,sickle,waist,wrist")
                .Annotation("Npgsql:Enum:item_category", "chest,currency,feet,hammer,hands,head,legs,one_handed_sword,ore,pickaxe,shield,shoulder,waist,wrist")
                .Annotation("Npgsql:Enum:item_quality", "blue,gray,green,normal,orange,purple,rainbow,red,white")
                .Annotation("Npgsql:Enum:item_type", "consumable,currency,equipment,material,other")
                .Annotation("Npgsql:Enum:life_skill_type", "alchemy,blacksmithing,cooking,crafting,farming,fishing,gathering,hunting,mining,tailoring")
                .OldAnnotation("Npgsql:Enum:equipment_slot", "accessory1,accessory2,back,chest,chisel,cookware,feet,fishing_rod,hammer,hands,head,hoe,knife,legs,main_hand,neck,needle_and_thread,off_hand,pickaxe,ring1,ring2,shoulder,shovel,sickle,waist,wrist")
                .OldAnnotation("Npgsql:Enum:item_category", "chest,currency,feet,hammer,hands,head,legs,one_handed_sword,ore,pickaxe,shield,shoulder,waist,wrist")
                .OldAnnotation("Npgsql:Enum:item_quality", "blue,gray,green,normal,orange,purple,rainbow,red,white")
                .OldAnnotation("Npgsql:Enum:item_type", "consumable,currency,equipment,material,other");

            migrationBuilder.CreateTable(
                name: "character_skills",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    character_id = table.Column<Guid>(type: "uuid", nullable: false),
                    skill_type = table.Column<LifeSkillType>(type: "life_skill_type", nullable: false),
                    level = table.Column<int>(type: "integer", nullable: false),
                    experience = table.Column<int>(type: "integer", nullable: false),
                    last_updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_character_skills", x => x.id);
                    table.ForeignKey(
                        name: "fk_character_skills_characters_character_id",
                        column: x => x.character_id,
                        principalTable: "characters",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "skill_level_requirements",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    skill_type = table.Column<LifeSkillType>(type: "life_skill_type", nullable: true),
                    level = table.Column<int>(type: "integer", nullable: false),
                    required_experience = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_skill_level_requirements", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_character_skills_character_id",
                table: "character_skills",
                column: "character_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "character_skills");

            migrationBuilder.DropTable(
                name: "skill_level_requirements");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:equipment_slot", "accessory1,accessory2,back,chest,chisel,cookware,feet,fishing_rod,hammer,hands,head,hoe,knife,legs,main_hand,neck,needle_and_thread,off_hand,pickaxe,ring1,ring2,shoulder,shovel,sickle,waist,wrist")
                .Annotation("Npgsql:Enum:item_category", "chest,currency,feet,hammer,hands,head,legs,one_handed_sword,ore,pickaxe,shield,shoulder,waist,wrist")
                .Annotation("Npgsql:Enum:item_quality", "blue,gray,green,normal,orange,purple,rainbow,red,white")
                .Annotation("Npgsql:Enum:item_type", "consumable,currency,equipment,material,other")
                .OldAnnotation("Npgsql:Enum:equipment_slot", "accessory1,accessory2,back,chest,chisel,cookware,feet,fishing_rod,hammer,hands,head,hoe,knife,legs,main_hand,neck,needle_and_thread,off_hand,pickaxe,ring1,ring2,shoulder,shovel,sickle,waist,wrist")
                .OldAnnotation("Npgsql:Enum:item_category", "chest,currency,feet,hammer,hands,head,legs,one_handed_sword,ore,pickaxe,shield,shoulder,waist,wrist")
                .OldAnnotation("Npgsql:Enum:item_quality", "blue,gray,green,normal,orange,purple,rainbow,red,white")
                .OldAnnotation("Npgsql:Enum:item_type", "consumable,currency,equipment,material,other")
                .OldAnnotation("Npgsql:Enum:life_skill_type", "alchemy,blacksmithing,cooking,crafting,farming,fishing,gathering,hunting,mining,tailoring");
        }
    }
}
