import { useState } from 'react'
import './App.css'

import GenWindow from './components/genWindow.tsx';
import { Rating } from '@mui/material';

function App() {
	const [EntryHistory, setEntryHistory] = useState(JSON.parse(localStorage.getItem('entries')));
    
	return(
		<main>
			<GenWindow entryHistory={EntryHistory} setEntryHistory={setEntryHistory}/>
			<section className='History'>
				<h2>Listening History</h2>
				<figure className='histFigure'>
					{EntryHistory ? EntryHistory.map((entry, id) => {return(
						<figcaption className="entryItem" key={id}>
							<img src={entry.albumImage}/>
							<p>
								{entry.albumString}
								<br/>
								<Rating defaultValue={entry.rating} readOnly/>
							</p>
						</figcaption>
					)}) : <></>}
				</figure>
			</section>
		</main>
	)
}

export default App
