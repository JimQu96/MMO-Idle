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
using MMOIdle.Application.Characters.Commands;
using MMOIdle.Application.Profiles;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var allowedOrigins = configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder =>
        {
            builder.WithOrigins(allowedOrigins!)
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
        // ���ȫ���쳣���������
        options.Filters.Add<GlobalExceptionFilter>();
        // �����Ӧ��ʽ��������
        options.Filters.Add<ApiResponseFilterAttribute>();
    }
    );
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    // ���ȫ�ְ�ȫҪ��
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});
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
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidAudience = configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!))
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
// ���SignalR����ע��
builder.Services.AddSignalR();

// ע�� MediatR
builder.Services.AddMediatR(typeof(AddCharacterCommand).Assembly);

// ע�� AutoMapper
builder.Services.AddAutoMapper(typeof(ApplicationProfile));

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
