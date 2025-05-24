using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MMO_Idle.Application.DTOs;
using MMOIdle.Infrastructure.Persistence;

namespace MMOIdle.Application.GameItems.Queries;

public class ListGameItemsQueryHandler : IRequestHandler<ListGameItemsQuery, List<GameItemDto>>
{
    private readonly GameDbContext _context;
    private readonly IMapper _mapper;

    public ListGameItemsQueryHandler(GameDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<GameItemDto>> Handle(ListGameItemsQuery request, CancellationToken cancellationToken)
    {
        var gameItems = await _context.GameItems.OrderBy(x => x.Id).ToListAsync(cancellationToken);
        return _mapper.Map<List<GameItemDto>>(gameItems);
    }
}