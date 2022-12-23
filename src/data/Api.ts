
const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
export const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
export const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
export const API_URL_SEARCH_BY_ID="https://kinopoiskapiunofficial.tech/api/v2.2/films/"



//Тут будет все, что связано с работой с API

export class filmsAPI{
  static async loadFilms(url:string){
    let response=await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    if(response.ok)
    {
    let jsonResponse=await response.json();
    return jsonResponse
    }
    throw new Error(response.statusText);
}
  static async loadFilmInfo(id:number){
    let url=`${API_URL_SEARCH_BY_ID}${id}`
    let response=await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    if(response.ok)
    {
    let jsonResponse=await response.json();
    return jsonResponse
    }
    throw new Error(response.statusText);
  }
}

