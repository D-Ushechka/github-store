// Перечисление методов HTTP-запроса
export enum HTTPMethod {
    // TODO: заполнить
    GET = "GET",
    POST = "POST",
}

// Параметры запроса
export type RequestParams<ReqT> = {
    method: HTTPMethod; // Метод запроса, GET или POST
    endpoint: string; // API-endpoint, на который делается запрос
    headers: Record<string, string>; // Объект с передаваемыми HTTP-заголовками

    /**
     * Объект с данными запроса.
     * - Для GET-запроса данные превращаются в query-строку и добавляются в endpoint
     * - Для POST-запроса данные преобразуются к формату JSON и добавляются в тело запроса (необязательное требование)
     */
    data: ReqT;
}

// Перечисление статусов ответа
enum StatusHTTP {
    // TODO: заполнить
    status100 = 100,
    status101,
    status102,
    status103,
    status200 = 200, 
    status201,
    status202,
    status203,
    status204, 
    status205,
    status206,
    status300 = 300,
    status301,
    status303,
    status304,
    status305,
    status306,
    status307,
    status308,
    status400 = 400,
    status401,
    status403,
    status404,
    status405,
    status406,
    status407,
    status408,
    status409,
    status410,
    status411,
    status412,
    status413,
    status414,
    status415,
    status416,
    status417,
    status500 = 500,
    status501,
    status503,
    status504,
    status505,
}

// Ответ API
export type ApiResponse<SuccessT, ErrorT> =
    | {
    success: true;
    data: SuccessT;
    status: StatusHTTP;
}
    | {
    success: false;
    data: ErrorT;
    status: StatusHTTP;
};

// Интерфейс для класса, с помощью которого можно делать запросы к API
export interface IApiStore {
    // базовый url для выполнения запросов. TODO: указать url GitHub API в классе ApiStore
    readonly baseUrl: string;

    // Метод, с помощью которого делается запрос. TODO: реализовать в классе ApiStore
    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>>
}