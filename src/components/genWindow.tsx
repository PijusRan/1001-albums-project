import { useState, forwardRef } from 'react'
import { Rating } from '@mui/material'
import "./genWindow.css"

import list from "../assets/list.json"
import placeholderImg from "../assets/placeholder.png"
import missingArt from "../assets/missingArt.png"



const GenWindow = forwardRef<HTMLDivElement, any>((props, ref) =>{
    const [AlbumData, loadAlbumData] = useState([null, "", "Press \"Generate\" to begin." , null])
	const [albumImg, loadCoverImg] = useState(placeholderImg)
	const [buttonDivCSS, setButtonDivCSS] = useState("buttonDiv");
	const [rateButtonCSS, setRateButtonCSS] = useState("rateButton disable");
	const [rateDivCSS, setRateDivCSS] = useState("rateDiv disable");
	const [ratingValue, setRatingVal] = useState(0);
	
	async function generateAlbum(){
		//Pick random album
		const randomIndex = Math.floor(Math.random() * list.length);
		let album:Array<string> | null;
		album = list[randomIndex].match(/^(.*?)\s*-\s*(.*?)\s*\((.*?)\)$/);
		loadAlbumData(album);
		
		//Find cover
		const dbResponse = await fetch(`https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${album[1]}&a=${album[2]}`);
		console.log(dbResponse);
		const dbJSON = await dbResponse.json();
		
		//Load cover AND TITLE
		if(dbJSON.album) loadCoverImg(dbJSON.album[0].strAlbumThumb)
		else loadCoverImg(missingArt);

		//Enable rating
		setRateButtonCSS("rateButton");
	}

	function rateFunction(){
		setButtonDivCSS("buttonDiv disable");
		setRateDivCSS("rateDiv");
	}
	function changedStars(event: React.SyntheticEvent, value: number | null){
		setRatingVal(value);
	}
	function doneRating(){
		// Creates entry
		const albumEntry = {
			"albumString": AlbumData[0],
			"albumImage": albumImg,
			"rating": ratingValue,
			"date": new Date().toISOString().split('T')[0]
		}

		// Check if list is empty
		var entryArray:Array<Object>= [];
		if(props.entryHistory==null){
			localStorage.setItem('entries', '[]');
			props.setEntryHistory([]);
		}

		// Add entry to list
		entryArray = JSON.parse(localStorage.getItem('entries'));
		entryArray.push(albumEntry);

		//Update storage
		props.setEntryHistory(entryArray);
		localStorage.setItem('entries', JSON.stringify(entryArray));

		setButtonDivCSS("buttonDiv");
		setRateDivCSS("rateDiv disable");
	}

    return (
        <section ref={ref} className='albumSection'>
            <img src={albumImg} className="albumImg"/>
            <h1 className='albumTitle'>{`${AlbumData[2]} ` + (AlbumData[3] ? `(${AlbumData[3]})` : '')} </h1>
            <h2 className='albumArtist'>{AlbumData[1]}</h2>

            <div className={buttonDivCSS}>
                <button onClick={generateAlbum} className='genButton'>Generate</button>
                <button onClick={rateFunction} className={rateButtonCSS}>Rate</button>
            </div>
            <div className={rateDivCSS}>
                <Rating size='large' onChange={changedStars} value={ratingValue} className='ratingStars'/>
                <button onClick={doneRating} className='saveButton'>Save</button>
            </div>
        </section>
    )
});

export default GenWindow;