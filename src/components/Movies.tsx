import React, { useState } from "react";
import { Movie } from "../data/movie";
import {myFavouritesFilms} from '../data/favourites'
import { FilmInfo } from "./FilmInfo";
import { recentlyViewFilms } from "../data/recentlyView";



//Компонент отвечает за отрисовку фильмов


export const Film: React.FC<{movie: Movie;}> = ({movie}) =>
{  
  function getClassByRate(vote: string | null) {
  if (parseFloat(vote? vote : '0') >= 7) {
    return "green";
  } else if (parseFloat(vote? vote : '0') > 5) {
    return "orange";
  } else {
    return "red";
  }
}

  const [favourite,setFavourite]=useState(myFavouritesFilms.isItFavourite(movie.id))
  const ratingClass=`movie__average movie__average--${getClassByRate(movie.rating)}`
  const [clicked,setClicked]=useState(false)
  
    return(
      <> 
        <div className="movie" data-aos = "fade-in">
        
        <div className="movie__cover-inner" onClick={()=>{
          setClicked(true); 
          console.log(recentlyViewFilms.isItInRecentlyView(movie.id));
          if(!recentlyViewFilms.isItInRecentlyView(movie.id))
            recentlyViewFilms.addToRecentlyViewed(movie)}}>
        <img
          src={movie.poster}
          className="movie__cover"
          alt={movie.name}
        />
        <div className="movie__cover--darkened"></div>
      </div>
      <div className="movie__info">
        <div className="movie__title">{movie.name} </div>
        <div className="movie__category">{movie.genres.map(genre=>`${genre.genre} `)}
        {
          movie.rating && <div className={ratingClass}>{movie.rating}</div>
        } 
      </div>
      <input type="checkbox" className="favorite-chk" checked={favourite} title={favourite? 'Убрать из избранного' : 'Добавить в избранное'} 
      onChange={(evt)=>{
        evt.target.checked===true ? 
         setFavourite(myFavouritesFilms.addToFavourites(movie)) :  setFavourite(myFavouritesFilms.deleteFromFovourites(movie))}}/>
        </div> 
      {
        clicked && <FilmInfo onClose={setClicked} film={movie}/>
      }
      
    </div>
    </> 
    );
};


export const Movies: React.FC<{movies: Movie[];}>=({movies})=>
{
    return(
      <div className="container">
        <div className="movies">
        {movies.map((mov) => (<Film key={mov.id.toString()} movie={mov}/>))}
        </div>
      </div>
    )
    
}
