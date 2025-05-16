using Microsoft.EntityFrameworkCore;
using MMOIdle.Domain.Entities;
using MMOIdle.Domain.Entities;

namespace MMOIdle.Infrastructure.Persistence;

public class GameDbContext : DbContext
{
    public DbSet<Account> Accounts { get; set; } = null!;
    public DbSet<Character> Characters { get; set; } = null!;
    public DbSet<CharacterBackpack> CharacterBackpacks { get; set; } = null!;
    public DbSet<CharacterEquipment> CharacterEquipments { get; set; } = null!;
    public DbSet<GameItem> GameItems { get; set; } = null!;
    public DbSet<CharacterSkill> CharacterSkills { get; set; } = null!;
    public DbSet<SkillLevelRequirement> SkillLevelRequirements { get; set; } = null!;

    public GameDbContext(DbContextOptions<GameDbContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSnakeCaseNamingConvention();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Account configurations
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.UserName).IsUnique();
            entity.Property(e => e.UserName).IsRequired().HasMaxLength(50);
            entity.Property(e => e.PasswordHash).IsRequired();
        });

        // Character configurations
        modelBuilder.Entity<Character>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Name).IsUnique();
            entity.Property(e => e.Name).IsRequired().HasMaxLength(50);

            // Relationship with Account
            entity.HasOne(e => e.Account)
                  .WithMany(a => a.Characters)
                  .HasForeignKey(e => e.AccountId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(e => e.CharacterSkills)
                  .WithOne(a => a.Character)
                  .HasForeignKey(e => e.CharacterId)
                  .HasPrincipalKey(e => e.Id);

            entity.HasMany(e => e.CharacterBackpacks)
                  .WithOne(a => a.Character)
                  .HasForeignKey(e => e.CharacterId)
                  .HasPrincipalKey(e => e.Id);

            entity.HasMany(e => e.CharacterEquipments)
                  .WithOne(a => a.Character)
                  .HasForeignKey(e => e.CharacterId)
                  .HasPrincipalKey(e => e.Id);

        });

        modelBuilder.Entity<CharacterBackpack>(entity =>
        {
            entity.HasKey(e => e.Id);

            // Relationship with Character
            entity.HasOne(b => b.Character)
               .WithMany(x => x.CharacterBackpacks)
               .HasForeignKey(b => b.CharacterId)
               .OnDelete(DeleteBehavior.NoAction);

            entity.HasOne(b => b.GameItem)
               .WithMany()
               .HasForeignKey(b => b.ItemId)
               .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<CharacterEquipment>(entity =>
        {
            entity.HasKey(e => e.Id);

            // Relationship with Character
            entity.HasOne(b => b.Character)
               .WithMany(x => x.CharacterEquipments)
               .HasForeignKey(b => b.CharacterId)
               .OnDelete(DeleteBehavior.NoAction);

            entity.HasOne(b => b.Item)
               .WithMany()
               .HasForeignKey(b => b.ItemId)
               .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<GameItem>(entity =>
        {
            entity.HasKey(e => e.Id);
        });

        modelBuilder.Entity<CharacterSkill>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(b => b.Character)
               .WithMany(x => x.CharacterSkills)
               .HasForeignKey(b => b.CharacterId)
               .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<SkillLevelRequirement>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Level).IsRequired();
            entity.Property(e => e.RequiredExperience).IsRequired();
        });
    }
}