
export interface Movie{

    id:number;
    poster:string;
    name:string;
    genres: {genre: string}[];
    rating: string | null;
}

export interface MovieInformation{
    movie: Movie;
    type: string;
    countries: {country: string}[]
    year: number;
    filmLength: number;
    slogan: string;
    description: string;
    ratingAge: string;
}