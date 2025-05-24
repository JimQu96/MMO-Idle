using MediatR;
using MMO_Idle.Application.DTOs;

namespace MMOIdle.Application.GameItems.Queries;

public class ListGameItemsQuery : IRequest<List<GameItemDto>>
{
}