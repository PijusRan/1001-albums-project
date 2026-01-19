import { useState } from 'react'
import './App.css'

import list from "./assets/list.json"
import placeholderImg from "./assets/placeholder.png"
import missingArt from "./assets/missingArt.png"


function App() {
    const [albumTitle, loadTitle] = useState("Press \"Generate\" to begin.")
	const [albumImg, loadCoverImg] = useState(placeholderImg)
	const [buttonDivCSS, setButtonDivCSS] = useState("buttonDiv");
	const [rateDivCSS, setRateDivCSS] = useState("rateDiv disable");

	async function generateAlbum(){
		//Pick random album
		const randomIndex = Math.floor(Math.random() * list.length);
		const album = list[randomIndex].match(/^(.*?)\s*-\s*(.*?)\s*\((.*?)\)$/);
		loadTitle(album[1] + " - " + album[2]);

		//Find cover
		const deezerResponse = await fetch(`https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${album[1]}&a=${album[2]}`);
		console.log(deezerResponse);
		const deezerJSON = await deezerResponse.json();
		
		//Load cover
		if(deezerJSON.album) loadCoverImg(deezerJSON.album[0].strAlbumThumb)
		else loadCoverImg(missingArt);
	}
	function rateFunction(){
		setButtonDivCSS("buttonDiv disable");
		setRateDivCSS("rateDiv");
	}
	function doneRating(){
		setButtonDivCSS("buttonDiv");
		setRateDivCSS("rateDiv disable");
	}

    return (
      <>
	  	<section className='albumSection'>
			<h2 className='albumHeader'>{albumTitle}</h2>
			<img src={albumImg} className="albumImg"/>
			<div className={buttonDivCSS}>
				<button onClick={generateAlbum} className='genButton'>GENERATE</button>
				<button onClick={rateFunction} className='rateButton'>RATE</button>
			</div>
			<div className={rateDivCSS}>
				<button onClick={doneRating}>SUBMIT</button>
			</div>

		</section>
        
      </>
    )
}

export default App
