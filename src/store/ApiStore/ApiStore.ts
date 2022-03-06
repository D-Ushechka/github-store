import { stringify } from 'qs';

import { ApiResponse, IApiStore, RequestParams, HTTPMethod } from './types';

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getRequestData<ReqT>(
    params: RequestParams<ReqT>
  ): [string, RequestInit] {
    let url = this.baseUrl + params.endpoint;

    const req: RequestInit = {};

    if (params.method === HTTPMethod.GET) {
      url += '?' + stringify(params.data);
    }
    if (params.method === HTTPMethod.POST) {
      req.method = params.method;
      req.body = JSON.stringify(params.data);
      req.headers = { ...params.headers };
      req.headers['Content-Type'] = 'text/plain;charset=UTF-8';
    }

    return [url, req];
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    const response = await fetch(...this.getRequestData(params));
    const data = await response.json();
    return {
      status: response.status,
      data,
      success: response.ok,
    };
  }
}
