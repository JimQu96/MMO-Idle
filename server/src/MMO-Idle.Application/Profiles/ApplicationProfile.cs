using AutoMapper;
using MMO_Idle.Application.DTOs;
using MMOIdle.Domain.Entities; 

namespace MMOIdle.Application.Profiles;

public class ApplicationProfile : Profile
{
    public ApplicationProfile()
    {
        CreateMap<GameItem, GameItemDto>();
    }
}