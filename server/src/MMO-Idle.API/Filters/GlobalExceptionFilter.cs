using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using MMOIdle.API.Models;

namespace MMOIdle.API.Filters;

/// <summary>
/// 全局异常处理过滤器
/// </summary>
public class GlobalExceptionFilter : IExceptionFilter
{
    private readonly ILogger<GlobalExceptionFilter> _logger;

    public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger)
    {
        _logger = logger;
    }

    public void OnException(ExceptionContext context)
    {
        // 记录异常日志
        _logger.LogError(context.Exception, "处理请求时发生异常");

        int statusCode = 500;
        string errorCode = "INTERNAL_SERVER_ERROR";

        // 根据异常类型返回不同的错误响应
        switch (context.Exception)
        {
            case ArgumentNullException _:
            case ArgumentException _:
                statusCode = 400;
                errorCode = "INVALID_ARGUMENT";
                break;
            case UnauthorizedAccessException _:
                statusCode = 401;
                errorCode = "UNAUTHORIZED";
                break;
            case KeyNotFoundException _:
                statusCode = 404;
                errorCode = "NOT_FOUND";
                break;
            case InvalidOperationException _:
                statusCode = 400;
                errorCode = "INVALID_OPERATION";
                break;
        }

        // 构建标准错误响应
        context.Result = new ObjectResult(new ApiErrorResponse
        {
            Code = statusCode,
            Success = false,
            ErrorCode = errorCode,
            Message = context.Exception.Message,
        })
        {
            StatusCode = statusCode
        };

        context.ExceptionHandled = true;
    }
}