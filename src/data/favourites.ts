import { Movie } from "./movie"
import { Toast } from "@skbkontur/react-ui"
//Тут будет работа с LocalStorage для реализации добавления в избранное


export let favourites:Movie[]

export class myFavouritesFilms{

    
static addToFavourites(film:Movie):boolean{
   
    let data=localStorage.getItem('favouritesFilms')
    favourites=JSON.parse(data? data : '[]')  
    favourites.push(film);
    localStorage.setItem('favouritesFilms',JSON.stringify(favourites))
    //alert(`Фильм "${film.name}" добавлен в избранное`)
    Toast.push(`Фильм "${film.name}" добавлен в избранное`)
    setTimeout(Toast.close, 1000)
    return true

}

static deleteFromFovourites(film:Movie):boolean{
    
    let data=localStorage.getItem('favouritesFilms')
    favourites=JSON.parse(data? data : '[]')
    let index=0
    for(index;index<favourites.length;index++)
    {
        if(favourites[index].id===film.id)
        break
    }

    favourites=[...favourites.slice(0, index), ...favourites.slice(index + 1)]
    localStorage.setItem('favouritesFilms',JSON.stringify(favourites))
    Toast.push(`Фильм "${film.name}" удален из избранного`)
    setTimeout(Toast.close, 1000)
    return false
}

static isItFavourite(id:number):boolean{
    
    let data=localStorage.getItem('favouritesFilms')
    favourites=JSON.parse(data? data : '[]')
    if(favourites.find(elem=>elem.id===id)===undefined)
    {   
        return false
    }
    else
    {
        return true
    }
}

static drawFavourites(page: number) : Movie[]{
    
    return favourites.filter((mov, num) => num < page * 20 && num >= (page - 1) * 20)
    
}

static favouriteLength() : number {
    return favourites.length
}
}
