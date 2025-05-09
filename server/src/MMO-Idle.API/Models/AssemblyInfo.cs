namespace MMOIdle.API.Models;

/// <summary>
/// API响应基础类
/// </summary>
public abstract class ApiResponseBase
{
    /// <summary>
    /// HTTP状态码
    /// </summary>
    public int Code { get; set; }

    /// <summary>
    /// 操作结果
    /// </summary>
    public bool Success { get; set; }

    /// <summary>
    /// 消息
    /// </summary>
    public string? Message { get; set; }
}

/// <summary>
/// 带数据的API响应
/// </summary>
/// <typeparam name="T">数据类型</typeparam>
public class ApiResponse<T> : ApiResponseBase
{
    /// <summary>
    /// 响应数据
    /// </summary>
    public T? Data { get; set; }
}

/// <summary>
/// 错误响应
/// </summary>
public class ApiErrorResponse : ApiResponseBase
{
    /// <summary>
    /// 错误代码
    /// </summary>
    public string? ErrorCode { get; set; }
}
