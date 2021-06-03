import { Method } from "axios";


export enum ServerURLs {
  topRatedMovies    = '/movie/top_rated',
  discoverMovies    = '/discover/movie',
  popularMovies     = '/movie/popular',
  upcomingMovies    = '/movie/upcoming',
  latestMovies      = '/movie/latest',

  search  = "/search/movie",
  movieDetail = '/movie/'
}

export enum ServerImageURLs {
  w500              = "https://image.tmdb.org/t/p/w500/",
  w250              =  "https://image.tmdb.org/t/p/w250/"
}

interface ServiceBaseURLConfig {
  url : ServerURLs,
  queryType? : ServiceQueryType,
  utilityType? : ServiceUtilityQueriesType
}

interface ServiceQueryType {
  language : boolean,
  sorting : boolean,
  customQuery : boolean,
  page?:number

  queryString? : string,
  sortString? : string
}
interface ServiceUtilityQueriesType {
  params : string
  utility? : string
}


export interface ServiceRequest {
  baseURLConfig : ServiceBaseURLConfig,
  method : Method,
  data? : any
}