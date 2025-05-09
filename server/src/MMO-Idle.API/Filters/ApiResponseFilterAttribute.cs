using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using MMOIdle.API.Models;

namespace MMOIdle.API.Filters;

public class ApiResponseFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuted(ActionExecutedContext context)
    {
        // �����쳣������쳣��ר�ŵ��쳣����������
        if (context.Exception != null)
            return;

        // ����HTTP 204��������Ӧ
        if (context.Result is NoContentResult)
            return;

        // �����Ѹ�ʽ���Ľ��
        if (context.Result is ObjectResult objectResult &&
            objectResult.Value is ApiResponseBase)
            return;

        // ͳһ��װ��Ӧ���
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