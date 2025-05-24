using System;
using MMOIdle.Domain.Enums;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MMOIdle.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddLifeSkillAction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "life_skill_actions",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    type = table.Column<LifeSkillType>(type: "life_skill_type", nullable: false),
                    duration_seconds = table.Column<int>(type: "integer", nullable: false),
                    required_level = table.Column<int>(type: "integer", nullable: false),
                    resource_cost = table.Column<string>(type: "jsonb", nullable: true),
                    resource_yield = table.Column<string>(type: "jsonb", nullable: true),
                    experience_gain = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_life_skill_actions", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "life_skill_actions");
        }
    }
}
