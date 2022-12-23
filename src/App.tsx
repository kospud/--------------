import React, { useState, useEffect } from "react";
import './App.css'
import { Movie } from "./data/movie";
import { Movies } from "./components/Movies";
import {filmsAPI, API_URL_POPULAR, API_URL_SEARCH} from "./data/Api";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import {ThemeFactory, DEFAULT_THEME} from '@skbkontur/react-ui'
import AOS from 'aos'
import 'aos/dist/aos.css';






export default function App() {

    const myFlatTheme = ThemeFactory.create({ "pagingFontSize":"30px","pagingForwardLinkColor":"#ffd80e" }, DEFAULT_THEME);
    const[currentPage,setPage]=useState(1)
    const[searchValue,setSearchValue]=useState("")
    const[moviesList,setMovies]=useState<Movie[]>([])
    const[maxPages, setMaxPages] = useState(20)
    const [active, setActive] = useState('top')
    const [currentFavouritePage,setFavotitePage]=useState(1)
    const[currentRecentlyViewPage,setRecentlyViewPage]=useState(1)

    function drawMovies(){
      let url:string
      if(searchValue!=='')
        url=`${API_URL_SEARCH}${searchValue}&page=${currentPage}`
      else
        url=`${API_URL_POPULAR}${currentPage}`
        filmsAPI.loadFilms(url)
        .then((data)=>{
            const filmsList:Movie[]=[]
            data.films.forEach((film:any) => {
                filmsList.push({
                  id: film.filmId,
                  poster: film.posterUrlPreview,
                  name: film.nameRu,
                  genres: film.genres,
                  rating:film.rating
                })
            })
            setMaxPages(data.pagesCount);
            
            setMovies(filmsList)})
        .catch(error=>alert(error))
    }
   
     useEffect(drawMovies, [currentPage,searchValue])
    useEffect(() => {
      AOS.init({
        disable: false,
        startEvent: "DOMContentLoaded",
        initClassName: "aos-init",
        animatedClassName: "aos-animate",
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
      
        offset: 120,
        delay: 0,
        duration: 400,
        easing: "ease",
        once: false,
        mirror: false,
        anchorPlacement: "bottom-top",
      });
    }, [])
  
    
    return (
        <>
      <Header setPage={setPage} setFavoritePage={setFavotitePage} setMaxPages={setMaxPages} setMovies={setMovies} drawMovies={drawMovies} 
      searchValue={searchValue} setSearchValue={setSearchValue} active={active} setActive={setActive} currentFavouritePage={currentFavouritePage}/>
      <Movies movies={moviesList}/>
      { maxPages>1 && <Navigation currentPage={currentPage} setPage={setPage} currentFavouritePage={currentFavouritePage}
       setFavouritePage={setFavotitePage} maxPages={maxPages} active={active} setMovies={setMovies} myFlatTheme={myFlatTheme}
       currentRecentlyViewPage = {currentRecentlyViewPage} setRecentlyViewPage = {setRecentlyViewPage} />}
        </>
    );
}
