using Microsoft.AspNetCore.SignalR;

namespace MMOIdle.API.Hubs
{
    public class GameHub : Hub
    {
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

        /// <summary>
        /// 客户端连接时触发（可选扩展）
        /// </summary>
        public override async Task OnConnectedAsync()
        {
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