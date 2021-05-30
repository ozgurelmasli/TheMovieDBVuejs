import axios, { AxiosRequestConfig } from "axios";


import { ServiceRequest } from "@/Service/ServiceLayer/ServiceModels";
import { plainToClass } from "class-transformer";


export default class Service {
  private api_Key  = '?api_key=40674bd02c63d8ba4824b1224fa2fb94'
  private baseURL  = 'https://api.themoviedb.org/3'

  async requestToServer(type : any ,request : ServiceRequest) : Promise<typeof type> {
    const serverRequest = this.convert(request)
    const response = await axios(serverRequest)
    const model = plainToClass(type, response.data)
    return model
  }
  private convert(request: ServiceRequest): AxiosRequestConfig {
    let url = this.baseURL + request.baseURLConfig.url + this.api_Key
    if (request.baseURLConfig.language)  {
      url += '&language=en-US'
    }else if (request.baseURLConfig.sorting){
      url += '&sort_by=' + request.sort
    }else if (request.baseURLConfig.query){
      url += '&query=' + request.query
    }
    if (request.baseURLConfig.page !== null && typeof request.baseURLConfig.page !== 'undefined'){
      url += '&page=' + request.baseURLConfig.page
    }
    console.log(url)
    return  {
      url : url,
      method : request.method,
      data : request.data
    }
  }
}

