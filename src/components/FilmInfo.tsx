import { Modal, ModalHeader } from "@skbkontur/react-ui";
import React, { useEffect, useState } from "react";
import { filmsAPI, API_URL_SEARCH_BY_ID} from "../data/Api";
import { MovieInformation } from "../data/movie";
import { Movie } from "../data/movie";
import { Carousel } from "./Carousel";



export const FilmInfo:React.FC<{film:Movie,onClose:React.Dispatch<React.SetStateAction<boolean>>}>=({film,onClose})=>
{
    const typeToRus=(type:string)=>{
        if(type==='TV_SERIES')
        return 'ТВ-сериал'
        else if(type==='FILM')
        return 'Фильм'
        else
        return type
    }
    const [filmInfo,setFilmInfo]=useState<MovieInformation>()
    const [similars,setSimilars]=useState<Movie[]>([])

    function getFilmInfo(){
        filmsAPI.loadFilmInfo(film.id)
        .then((data)=>{
            const info:MovieInformation={
                movie: film, 
                type: data.type,
                countries: data.countries,
                year: data.year,
                filmLength: data.filmLength,
                slogan: data.slogan,
                description: data.description,
                ratingAge: data.ratingAgeLimits,
            }
            setFilmInfo(info)
        })
        .catch(error=>alert("error"))
      
        filmsAPI.loadFilms(`${API_URL_SEARCH_BY_ID}${film.id}/similars/`)
        .then((data)=>{
            
            const filmsList:Movie[]=[]
            console.log(data)
            data.items.forEach((film:any) => {
                filmsList.push({
                  id: film.filmId,
                  poster: film.posterUrlPreview,
                  name: film.nameRu,
                  genres: [],
                  rating: null
                })
            }) 
            setSimilars(filmsList)})
        .catch(error=>alert(error))
    } 
    useEffect(getFilmInfo,[])

    return(
        <Modal alignTop={true} onClose={()=>{onClose(false)}} width={900}>
        <ModalHeader>{filmInfo? filmInfo.movie.name : ''}</ModalHeader>
           
        {filmInfo? <div>
         <div className="film-info">
            <div className="film-info-content">
                <img
                src={filmInfo.movie.poster}
                alt={filmInfo.movie.name}
                />
                <div className="film-info-text">
                    <p className="film-info-p">Тип: {typeToRus(filmInfo.type)}</p>
                    <p className="film-info-p">Год: {filmInfo.year}</p>
                    <p className="film-info-p">Жанры: {filmInfo.movie.genres.map(genre=>genre.genre).toString()}</p>
                    <p className="film-info-p">Страны: {filmInfo.countries.map(country=>country.country).toString()}</p>
                    {filmInfo.movie.rating && <p className="film-info-p">Рейтинг: {filmInfo.movie.rating}</p>}
                    { filmInfo.filmLength && <p className="film-info-p">Длительность: {filmInfo.filmLength}</p>}
                    {filmInfo.ratingAge && <p className="film-info-p">Возрастное ограничение: {`${filmInfo.ratingAge.slice(3)}+`}</p>}
                    {filmInfo.slogan && <p className="film-info-p">Слоган: {filmInfo.slogan}</p>}
                    <p className="film-info-p">Описание:</p>
                    {filmInfo.description}
                </div>
                </div>
                   {Boolean(similars.length) &&
                   <div className="similars">
                        <div className="similars-cover"></div> 
                        <h1>Похожие:</h1>
                        <Carousel films={similars}/>      
                    </div> }
                </div> 
            
            
            </div>
            : ''}  
        </Modal>
       
    )
}

