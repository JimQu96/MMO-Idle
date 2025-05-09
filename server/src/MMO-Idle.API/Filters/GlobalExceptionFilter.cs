using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using MMOIdle.API.Models;

namespace MMOIdle.API.Filters;

/// <summary>
/// ȫ���쳣���������
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
        // ��¼�쳣��־
        _logger.LogError(context.Exception, "��������ʱ�����쳣");

        int statusCode = 500;
        string errorCode = "INTERNAL_SERVER_ERROR";

        // �����쳣���ͷ��ز�ͬ�Ĵ�����Ӧ
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

        // ������׼������Ӧ
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