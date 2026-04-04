// Libraries
import { useState, useEffect, forwardRef } from 'react'
import { Rating } from '@mui/material'
import { motion } from "motion/react"
import "./genWindow.css"

// Subcomponents
import type Album from "../subcomponents/albumInterface"
import getRandomAlbum from '../subcomponents/randomAlbum'
import Button from '../subcomponents/button'
import Window from '../subcomponents/window'

// Assets
import placeholderImg from '../assets/placeholder.gif';

const GenWindow = forwardRef<HTMLDivElement, any>((props, ref) =>{

	// --- STATES ---
    const [AlbumData, loadAlbumData] : [Partial<Album>, Function]= useState(
		{title: "Press \"Generate\" to begin.",
		 artist: "",
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

	useEffect(() => {
		let lastAlbum:Partial<Album> = JSON.parse(localStorage.getItem('lastAlbum') ?? "{}");
		if(lastAlbum.title){
			renderAlbum(lastAlbum);
			setRateEnabled(true);
		}
  	}, []);

	async function generateAlbum(){
		const newAlbum = await getRandomAlbum();
		renderAlbum(newAlbum);
		localStorage.setItem('lastAlbum', JSON.stringify(newAlbum));
		
		//Enable rating
		setRateEnabled(true);
		setRatingVal(0);
	}

	async function renderAlbum(album : Partial<Album>){
		// Rotate 90 degrees
		setRotation(90);
		setTitleOpacity(0);
		await delay(1000);
		
		// Change image at the midpoint of the rotation
		loadAlbumData(album);
		loadCoverImg(album.coverURL ?? placeholderImg);
		await delay(1000);
		
		// Turn back
		setTitleOpacity(100);
		setRotation(0);
	}

	async function changedStars(event: React.SyntheticEvent, value: number){
		await setRatingVal(value);
	}

	function doneRating(){
		// Creates entry
		const completedEntry : Album = {
			...AlbumData,
			rating: ratingValue,
			dateRated: new Date().toISOString().split('T')[0]
		};

		// Add entry to list
		let entryArray = JSON.parse(localStorage.getItem('entries') ?? "[]");
    	entryArray.push(completedEntry);

		//Update storage
		props.setEntryHistory(entryArray);
		localStorage.setItem('entries', JSON.stringify(entryArray));

		// Return menu
		setRatePressed(false);
	}

    return (
        <Window ref={ref} className='albumSection'>
			
			<motion.img 
				src={albumImg} 
				className='albumImg'
				animate={{ rotateY: rotation }}
				transition={{ duration: 1, ease: "easeOut"}}
				onLoad={() => setRotation(0)}
			/>
			
            <div className='albumDataDiv'>
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
			</div>
            

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
        </Window>
    )
});

export default GenWindow;