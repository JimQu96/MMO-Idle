using Microsoft.EntityFrameworkCore;
using MMOIdle.Domain.Entities;

namespace MMOIdle.Infrastructure.Persistence;

public class GameDbContext : DbContext
{
    public DbSet<Account> Accounts { get; set; } = null!;
    public DbSet<Character> Characters { get; set; } = null!;

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
            //entity.ToTable("accounts");
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
        });
    }
}