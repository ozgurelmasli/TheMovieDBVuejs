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
  language : boolean,
  sorting : boolean,
  query:boolean,
  page?:number
}
export interface ServiceRequest {
  baseURLConfig : ServiceBaseURLConfig,
  method : Method,
  data? : any

  query? : string,
  sort? : string
}