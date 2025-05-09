namespace MMOIdle.API.Models;

/// <summary>
/// API��Ӧ������
/// </summary>
public abstract class ApiResponseBase
{
    /// <summary>
    /// HTTP״̬��
    /// </summary>
    public int Code { get; set; }

    /// <summary>
    /// �������
    /// </summary>
    public bool Success { get; set; }

    /// <summary>
    /// ��Ϣ
    /// </summary>
    public string? Message { get; set; }
}

/// <summary>
/// �����ݵ�API��Ӧ
/// </summary>
/// <typeparam name="T">��������</typeparam>
public class ApiResponse<T> : ApiResponseBase
{
    /// <summary>
    /// ��Ӧ����
    /// </summary>
    public T? Data { get; set; }
}

/// <summary>
/// ������Ӧ
/// </summary>
public class ApiErrorResponse : ApiResponseBase
{
    /// <summary>
    /// �������
    /// </summary>
    public string? ErrorCode { get; set; }
}
