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
    if (request.baseURLConfig.queryType !== null && typeof request.baseURLConfig.queryType !== 'undefined'){
      let url = this.baseURL + request.baseURLConfig.url + this.api_Key

      url += (request.baseURLConfig.queryType.language)
        ? '&language=en-US'
        : request.baseURLConfig.queryType.sorting
          ? ('&sort_by=' + request.baseURLConfig.queryType.sortString)
          : ('&query=' + request.baseURLConfig.queryType.queryString)
      if (request.baseURLConfig.queryType.page !== null && typeof request.baseURLConfig.queryType.page !== 'undefined') {
        url += '&page=' + request.baseURLConfig.queryType.page
      }
      return  {
        url : url,
        method : request.method,
        data : request.data
      }
    }else if (request.baseURLConfig.utilityType !== null && typeof request.baseURLConfig.utilityType !== 'undefined'){
       let url = this.baseURL + request.baseURLConfig.url
      url += request.baseURLConfig.utilityType.params
      url += typeof request.baseURLConfig.utilityType.utility !== 'undefined' ? request.baseURLConfig.utilityType.utility + this.api_Key : this.api_Key
      return  {
        url : url,
        method : request.method,
        data : request.data
      }
    }else {
      console.log('undefined params')
      return  {
        url : '',
        method : request.method,
        data : request.data
      }
    }
  }
}

