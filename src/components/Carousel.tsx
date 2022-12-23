
import React from "react";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Film } from "./Movies";
import { Movie } from "../data/movie";

export const Carousel:React.FC<{films: Movie[]}>=({films})=>{

  
    const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: films.length>2? 3 : (films.length>1? 2 : 1),
    slidesToScroll: 1,
    centerMode: true,
    autoplay: films.length>3? true : false
    }
  
  return (
    <Slider {...settings}>
      {
        films.map(film=><Film movie={film}/>)
      }
      
    </Slider>
     
    )
}

