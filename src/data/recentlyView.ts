import { Movie } from "./movie"

export let recentlyView:Movie[]

export class recentlyViewFilms{

    
static addToRecentlyViewed(film:Movie):boolean{

    let data=sessionStorage.getItem('recentlyViewFilms')
    recentlyView=JSON.parse(data? data : '[]') 
    recentlyView.push(film);
    sessionStorage.setItem('recentlyViewFilms',JSON.stringify(recentlyView)) 
    return true

}


static isItInRecentlyView(id:number):boolean{
    
    let data=sessionStorage.getItem('recentlyViewFilms')
    recentlyView=JSON.parse(data? data : '[]')
    if(recentlyView.find(elem=>elem.id===id)===undefined)
    {   
        return false
    }
    else
    {
        return true
    }
}

static drawRecentlyView(page: number) : Movie[]{
    
    return recentlyView.filter((mov, num) => num < page * 20 && num >= (page - 1) * 20)
    
}

static recentlyViewLength() : number {
    let data=sessionStorage.getItem('recentlyViewFilms')
    recentlyView=JSON.parse(data? data : '[]') 
    return recentlyView.length
}
}
