using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using MMOIdle.API.Models;

namespace MMOIdle.API.Filters;

public class ApiResponseFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuted(ActionExecutedContext context)
    {
        // 处理异常情况，异常由专门的异常过滤器处理
        if (context.Exception != null)
            return;

        // 处理HTTP 204无内容响应
        if (context.Result is NoContentResult)
            return;

        // 处理已格式化的结果
        if (context.Result is ObjectResult objectResult &&
            objectResult.Value is ApiResponseBase)
            return;

        // 统一包装响应结果
        var statusCode = 200;
        object responseValue = null;

        switch (context.Result)
        {
            case OkObjectResult okObjectResult:
                responseValue = okObjectResult.Value;
                break;
            case CreatedResult createdResult:
                statusCode = 201;
                responseValue = createdResult.Value;
                break;
            case BadRequestObjectResult badRequestResult:
                statusCode = 400;
                responseValue = badRequestResult.Value;
                break;
            case NotFoundResult _:
                statusCode = 404;
                break;
            case ForbidResult _:
                statusCode = 403;
                break;
            case UnauthorizedResult _:
                statusCode = 401;
                break;
        }

        context.Result = new ObjectResult(new ApiResponse<object>
        {
            Code = statusCode,
            Success = statusCode >= 200 && statusCode < 300,
            Data = responseValue,
            Message = statusCode >= 200 && statusCode < 300 ? "success" : "failed"
        })
        {
            StatusCode = statusCode
        };
    }
}