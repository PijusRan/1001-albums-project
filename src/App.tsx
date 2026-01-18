import { useState } from 'react'
import './App.css'

import list from "./assets/list.json"
import placeholderImg from "./assets/placeholder.png"


function App() {
    const [albumTitle, loadTitle] = useState("Press \"Generate\" to begin.")
	const [albumCover, loadCover] = useState(placeholderImg)
	async function generateAlbum(){
		const randomIndex = Math.floor(Math.random() * list.length);
		const album = list[randomIndex].match(/^(.*?)\s*-\s*(.*?)\s*\((.*?)\)$/);
		loadTitle(album[1] + " - " + album[2]);

		//let responseTitle = formatForResponse(albumTitle);
		const deezerResponse = await fetch(`https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${album[1]}&a=${album[2]}`);
		console.log(deezerResponse);
		const deezerJSON = await deezerResponse.json();
		if(deezerJSON.album) loadCover(deezerJSON.album[0].strAlbumThumb)
		else loadCover(placeholderImg);
	}

    return (
      <>
	  	<section className='albumSection'>
			<h2 className='albumHeader'>{albumTitle}</h2>
			<img src={albumCover} className='albumImg'/>
			<button onClick={generateAlbum} className='genButton'>Generate</button>
		</section>
        
      </>
    )
}

export default App
