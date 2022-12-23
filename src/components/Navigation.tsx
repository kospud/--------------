import React from "react";
import { myFavouritesFilms } from "../data/favourites";
import { Movie } from "../data/movie";
import {ThemeContext, Paging} from '@skbkontur/react-ui'
import { Theme } from "@skbkontur/react-ui/cjs/lib/theming/Theme";
import { recentlyViewFilms } from "../data/recentlyView";


interface NavigationProps{
    currentPage: number,
    currentFavouritePage: number
    currentRecentlyViewPage : number
    setPage: React.Dispatch<React.SetStateAction<number>>
    setFavouritePage:React.Dispatch<React.SetStateAction<number>>
    setRecentlyViewPage:React.Dispatch<React.SetStateAction<number>>
    maxPages: number
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
    active: string
    myFlatTheme: Readonly<Theme & {
      pagingFontSize: string;
      pagingForwardLinkColor: string;
  }>
}

export const Navigation: React.FC<NavigationProps>=({currentPage,setPage, currentFavouritePage, setFavouritePage,maxPages,setMovies,active, myFlatTheme,currentRecentlyViewPage,setRecentlyViewPage})=>{



    return(
      <div className="bot">
      <ThemeContext.Provider value={myFlatTheme}>
        <Paging activePage={ active !=='favorites' ? active !== 'recentlyView' ? currentPage : currentRecentlyViewPage : currentFavouritePage} 
        pagesCount = {active !=='favorites' ? active !== 'recentlyView'? (maxPages > 20 ? 20 : maxPages) : Math.floor(recentlyViewFilms.recentlyViewLength() / 20) + 1 : Math.floor(myFavouritesFilms.favouriteLength() / 20) + 1}
        onPageChange={(number) =>{
          if(active==='favorites'){
            setFavouritePage(number)
            setMovies(myFavouritesFilms.drawFavourites(number));
          }
          else if(active === 'recentlyView'){
            setRecentlyViewPage(number)
            setMovies(recentlyViewFilms.drawRecentlyView(number));
          }
          else
            setPage(number);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
        }} >
          
        </Paging>
        </ThemeContext.Provider>
      </div>
    )

}