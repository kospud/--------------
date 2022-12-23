import React from "react";
import { Tabs } from "@skbkontur/react-ui";
import { myFavouritesFilms } from "../data/favourites";
import { Movie } from "../data/movie";
import { recentlyViewFilms } from "../data/recentlyView";

interface HeaderPropos{
    currentFavouritePage: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
    setFavoritePage: React.Dispatch<React.SetStateAction<number>>
    //setRecentlyViewPage: React.Dispatch<React.SetStateAction<number>>
    setMaxPages: React.Dispatch<React.SetStateAction<number>>
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
    drawMovies: ()=>void
    searchValue: string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
    setActive: React.Dispatch<React.SetStateAction<string>>
    active: string
}

export const Header: React.FC<HeaderPropos>=({setPage,setFavoritePage,setMovies,setMaxPages,drawMovies,searchValue,setSearchValue,active,setActive,currentFavouritePage})=>{

  


    return(
        <header className="main-information" id="top">
        <div className="head-content">
          <a href="index.html" className="head-logotip"
            ><img src="logo.png" alt="Logo" className="logo"
          /></a>
          <Tabs value={active} onValueChange={setActive}>
          <Tabs.Tab id="top" onClick={()=>{ 
              //setPage(1); 
              drawMovies()
            }}> <p className="search">Топ фильмов</p>
          </Tabs.Tab>
          <Tabs.Tab id="favorites" onClick={()=>{
            setMaxPages(Math.ceil(myFavouritesFilms.favouriteLength() / 20))
            //setFavoritePage(1)
            setMovies(myFavouritesFilms.drawFavourites(currentFavouritePage))
        }}><p className="search">Избранное</p></Tabs.Tab>
          <Tabs.Tab id="recentlyView" onClick={()=>{
            setMaxPages(Math.ceil(recentlyViewFilms.recentlyViewLength() / 20))
            setMovies(recentlyViewFilms.drawRecentlyView(1))
        }}><p className="search">Последние просмотренные</p></Tabs.Tab>
          </Tabs>
          
          <form>
            <input type="text" className="head-discover" value={searchValue} placeholder="Поиск" onChange={(evt)=>{
              setSearchValue(evt.target.value)
              setPage(1)
              setActive('top')
              }}/>
          </form>
        </div>
      </header>
    )
}