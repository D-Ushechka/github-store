import {ApiResponse, IApiStore, RequestParams, HTTPMethod} from "./types";
import { stringify } from "qs";

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {

        let url = this.baseUrl + params.endpoint;
        let body = null;
        let headers = { ...params.headers };

        if (params.method === HTTPMethod.GET) {
            url += '?' + stringify(params.data);
        }
        if (params.method === HTTPMethod.POST) {
            body = JSON.stringify(params.data);
            headers['Content-Type'] = 'text/plain;charset=UTF-8'
        }

        const response = await fetch(url, { method: params.method, headers, body });
        const data = await response.json();
        return {
            status: response.status,
            data,
            success: response.ok
        }
        
     }
}