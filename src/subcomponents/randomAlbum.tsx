import type Album from "./albumInterface";
import list from "../assets/list.json";

import placeholderImg from "../assets/placeholder.gif"


export default async function getRandomAlbum() : Promise<Partial<Album>>{
    //Pick random album
    const randomIndex = Math.floor(Math.random() * list.length);
    const formatted : any = list[randomIndex].match(/^(.*?)\s*-\s*(.*?)\s*\((.*?)\)$/);

    //Get album preview
    const dbResponse = await fetch(`https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${formatted[1]}&a=${formatted[2]}`);
    console.log(dbResponse);
    const dbJSON = await dbResponse.json();
    
    return {
        full: list[randomIndex],
        artist:  formatted[1],
        title: formatted[2],
        year: formatted[3],
        genre: dbJSON.album ?  dbJSON.album[0].strGenre : "Unknown Genre",
        coverURL: dbJSON.album ? dbJSON.album[0].strAlbumThumb : placeholderImg
    }
}