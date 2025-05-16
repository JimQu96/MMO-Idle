using Microsoft.EntityFrameworkCore;
using MMOIdle.Application.Accounts;
using MMOIdle.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MMOIdle.Application.Characters;
using MMOIdle.Domain.Enums;
using MMOIdle.API.Filters;
using MMOIdle.API.Hubs;
using MediatR;
using System.Reflection;
using MMOIdle.Application.Characters.Commands;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var allowedOrigins = configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder =>
        {
            builder.WithOrigins(allowedOrigins)
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers(
    options =>
    {
        // 添加全局异常处理过滤器
        options.Filters.Add<GlobalExceptionFilter>();
        // 添加响应格式化过滤器
        options.Filters.Add<ApiResponseFilterAttribute>();
    }
    );
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
        };
    });

// Add DbContext
builder.Services.AddDbContext<GameDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"), 
    o => o.MapEnum<ItemCategory>("item_category")
    .MapEnum<ItemType>("item_type")
    .MapEnum<EquipmentSlot>("equipment_slot")
    .MapEnum<ItemQuality>("item_quality")
    .MapEnum<LifeSkillType>("life_skill_type")
    ));

// Register Application Services
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<ICharacterEquipmentService, CharacterEquipmentService>();
// 添加SignalR服务注册
builder.Services.AddSignalR();

// 注册 MediatR
builder.Services.AddMediatR(typeof(AddCharacterCommand).Assembly);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigins");

// Add Authentication middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapHub<GameHub>("/hub");

app.MapControllers();

app.Run();
