import { useState, forwardRef, useRef } from 'react'
import { Rating } from '@mui/material'
import { AnimatePresence, motion, translateAxis } from "motion/react"
import "./genWindow.css"

import list from "../assets/list.json"
import placeholderImg from "../assets/placeholder.png"
import missingArt from "../assets/missingArt.png"



const GenWindow = forwardRef<HTMLDivElement, any>((props, ref) =>{
    const [AlbumData, loadAlbumData] = useState([null, "", "Press \"Generate\" to begin." , null])
	const [titleOpacity, setTitleOpacity] = useState(100);
	const [albumImg, loadCoverImg] = useState(placeholderImg)
	const [rotation, setRotation] = useState(0);
	const [buttonDivCSS, setButtonDivCSS] = useState("buttonDiv");
	const [rateButtonCSS, setRateButtonCSS] = useState("rateButton disable");
	const [rateDivCSS, setRateDivCSS] = useState("rateDiv disable");
	const [ratingValue, setRatingVal] = useState(0);
	const albumImgRef = useRef(null);

	async function generateAlbum(){
		//Pick random album
		const randomIndex = Math.floor(Math.random() * list.length);

		//Check if album has been reviewed already
		let history = props.entryHistory;
		const exists = history.find(entry => entry.albumString === list[randomIndex]);
		if(exists){
			generateAlbum();
			return;
		}

		//Create album preview
		let album:Array<string> | null;
		album = list[randomIndex].match(/^(.*?)\s*-\s*(.*?)\s*\((.*?)\)$/);

		//Find cover
		const dbResponse = await fetch(`https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${album[1]}&a=${album[2]}`);
		console.log(dbResponse);
		const dbJSON = await dbResponse.json();
		
		//Load cover AND TITLE

		// Rotate 90 degrees
		setRotation(90);
		setTitleOpacity(0);
		
		// Change image at the midpoint of the rotation
		setTimeout(() => {
			if(dbJSON.album) loadCoverImg(dbJSON.album[0].strAlbumThumb)
			else loadCoverImg(missingArt);

			loadAlbumData(album);
			setTitleOpacity(100);
		}, 1000); // Half of the 300ms animation duration
		
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
        <motion.section ref={ref} className='albumSection' layout transition={{ duration: 3, ease: "easeOut"}}>
			<motion.img src={albumImg}  ref={albumImgRef} className="albumImg"
			animate={{ rotateY: rotation }}
        	transition={{ duration: 1, ease: "easeOut"}}
			onLoad={() => setRotation(0)}
			/>
            
            <motion.h1 className='albumTitle' 
				animate={{ opacity: titleOpacity }}
				transition={{ duration: 1}}
			>{`${AlbumData[2]} ` + (AlbumData[3] ? `(${AlbumData[3]})` : '')}</motion.h1>
            
			<motion.h2 className='albumArtist'
				animate={{ opacity: titleOpacity }}
				transition={{ duration: 1}}
			>{AlbumData[1]}</motion.h2>

            <div className={buttonDivCSS}>
                <motion.button 
					onClick={generateAlbum} className='genButton'
					whileHover={{backgroundColor:"#2F2F32"}}
					whileTap={{backgroundColor:"#000000"}}
				>Generate</motion.button>
                <motion.button 
					onClick={rateFunction} className={rateButtonCSS}
					whileHover={{backgroundColor:"#1F1F22"}}
					whileTap={{backgroundColor:"#000000"}}
				>Rate</motion.button>
            </div>

            <div className={rateDivCSS}>
                <Rating size='large' onChange={changedStars} value={ratingValue} className='ratingStars'/>
                <motion.button 
					onClick={doneRating} className='saveButton'
					whileHover={{backgroundColor:"#1F1F22"}}
					whileTap={{backgroundColor:"#000000"}}
				>Save</motion.button>
            </div>
        </motion.section>
    )
});

export default GenWindow;