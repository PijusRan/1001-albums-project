// Libraries
import { useState, forwardRef } from 'react'
import { Rating } from '@mui/material'
import { motion } from "motion/react"
import "./genWindow.css"

// Subcomponents
import type Album from "./subcomponents/albumInterface"
import getRandomAlbum from './subcomponents/randomAlbum'
import Button from './subcomponents/button'

// Assets
import placeholderImg from "../assets/placeholder.png"

const GenWindow = forwardRef<HTMLDivElement, any>((props, ref) =>{

	// --- STATES ---
    const [AlbumData, loadAlbumData] : [Partial<Album>, Function]= useState(
		{title: "",
		 artist: "Press \"Generate\" to begin.",
		 year: ""}
	);
	const [titleOpacity, setTitleOpacity] = useState(100);
	const [albumImg, loadCoverImg] = useState(placeholderImg)
	const [rotation, setRotation] = useState(0);
	const [rateEnabled, setRateEnabled] = useState(false);
	const [ratingValue, setRatingVal] = useState(0);
	const [ratePressed, setRatePressed] = useState(false);

	// --- METHODS ---
	const delay = (ms : number) => new Promise(resolve => setTimeout(resolve, ms));

	async function generateAlbum(){
		// Rotate 90 degrees
		setRotation(90);
		setTitleOpacity(0);
		await delay(1000);
		
		// Change image at the midpoint of the rotation
		await loadAlbumData(await getRandomAlbum());
		loadCoverImg(AlbumData.coverURL ?? placeholderImg);
		await delay(1000);
		
		// Turn back
		setTitleOpacity(100);
		setRotation(0);
		
		//Enable rating
		setRateEnabled(true);
	}

	function changedStars(event: React.SyntheticEvent, value: number){
		setRatingVal(value);
	}

	function doneRating(){
		// Creates entry
		loadAlbumData({
			...AlbumData,
			rating: ratingValue,
			date: new Date().toISOString().split('T')[0]
		})
		

		// Check if list is empty
		var entryArray:Array<Object>= [];
		if(props.entryHistory==null){
			localStorage.setItem('entries', '[]');
			props.setEntryHistory([]);
		}

		// Add entry to list
		entryArray = JSON.parse(localStorage.getItem('entries') ?? "[]");
		entryArray.push(AlbumData);

		//Update storage
		props.setEntryHistory(entryArray);
		localStorage.setItem('entries', JSON.stringify(entryArray));

		// Return menu
		setRatePressed(false);
	}

    return (
        <motion.section ref={ref} className='albumSection' layout transition={{ duration: 3, ease: "easeOut"}}>
			<motion.img 
				src={albumImg} 
				className="albumImg"
				animate={{ rotateY: rotation }}
				transition={{ duration: 1, ease: "easeOut"}}
				onLoad={() => setRotation(0)}
			/>
            
            <motion.h1
				className='albumTitle' 
				animate={{ opacity: titleOpacity }}
				transition={{ duration: 1}}
			>
				{`${AlbumData.title} ` + (AlbumData.year ? `(${AlbumData.year})` : '')}
			</motion.h1>
            
			<motion.h2 
				className='albumArtist'
				animate={{ opacity: titleOpacity }}
				transition={{ duration: 1}}
			>
				{AlbumData.artist}
			</motion.h2>

			{
				ratePressed
				?
				<div className="rateDiv">
					<Rating size='large' onChange={changedStars} value={ratingValue} className='ratingStars'/>
					<Button text="Save" onClick={doneRating}/>
				</div>
				:
				<div className="buttonDiv">
					<Button text="Generate" onClick={generateAlbum}/>
					{rateEnabled && <Button text="Rate" onClick={()=>{ setRatePressed(true) }}/>}
				</div>
			}
        </motion.section>
    )
});

export default GenWindow;