//import { Type } from 'class-transformer'


export class Movies  {
  page! :  number;
  total_pages! : number;
  total_results! : number;


  //@Type(() => Movie)
  results! : Movie[]
}

export class Movie {
  adult?: boolean = false
  backdrop_path? : string = ""
  genres? : Genre[]
  id!: number
  original_language?: string = ""
  original_title?: string = ""
  overview? : string = ""
  popularity? : number = 0
  poster_path?: string = ""
  release_date?: string = ""
  title?: string = ""
  video?: boolean = false
  vote_average?: number = 0
  vote_count?: number = 0
  status?:string = ""

  production_companies! : ProductionCompanies[]
}

export class Genre {
  id? :string = ""
  name?:string = ""
}

export class ProductionCompanies {
  id? : string = ""
  logo_path?:string = ""
  name? : string = ""
  origin_country? : string = ""
}