using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using MMO_Idle.Application.DTOs;

namespace MMOIdle.API.Hubs
{
    public class GameHub : Hub
    {

        private Guid _characterId;

        /// <summary>
        /// 客户端调用此方法发送消息到所有连接客户端
        /// </summary>
        /// <param name="user">发送者标识</param>
        /// <param name="message">消息内容</param>
        public async Task SendMessage(string user, string message)
        {
            // 向所有客户端广播消息（客户端需监听"ReceiveMessage"事件）
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task StartAction(StartActionMessageDto startActionMessageDto)
        {

        }

        /// <summary>
        /// 客户端连接时触发（可选扩展）
        /// </summary>
        public override async Task OnConnectedAsync()
        {
            if (Context.GetHttpContext().Request.Query.TryGetValue("characterId", out var characterIdValue))
            {
                if (Guid.TryParse(characterIdValue, out var characterId))
                {
                    _characterId = characterId;
                }
                else
                {
                    Context.Abort();
                }
            }

            // 可在此处添加连接日志记录、用户关联等逻辑
            await base.OnConnectedAsync();
        }

        /// <summary>
        /// 客户端断开时触发（可选扩展）
        /// </summary>
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // 可在此处添加断开日志记录、资源清理等逻辑
            await base.OnDisconnectedAsync(exception);
        }
    }
}