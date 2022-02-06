import {ApiResponse, IApiStore, RequestParams} from "./types";
import { stringify } from "qs";

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        // TODO: Примите из параметров конструктора baseUrl
        // и присвойте его в this.baseUrl
        this.baseUrl = baseUrl;
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        // TODO: Напишите здесь код, который с помощью fetch будет делать запрос

        let url = params.endpoint + '?' + stringify(params.data);
        // if (params.method === "GET") {
        const response = await fetch(url, { headers: params.headers, method: params.method });
        const data = await response.json();
        return {
            status: response.status,
            data,
            success: response.ok
        }
        //}
     }
}