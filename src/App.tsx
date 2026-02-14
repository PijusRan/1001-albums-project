import { useState, useRef, useEffect } from 'react'
import Grainient from './assets/Grainient';
import './App.css'

import GenWindow from './components/genWindow.tsx';
import HistWindow from './components/histWindow.tsx';
import DetailsWindow from './components/detailsWindow.tsx';

function App() {
	const [EntryHistory, setEntryHistory] = useState(JSON.parse(localStorage.getItem('entries')));


	const sourceRef = useRef<HTMLDivElement>(null);
  	const [histHeight, setHistHeight] = useState(`0`);
	useEffect(() => {
		if (!sourceRef.current) return;
		const observer = new ResizeObserver(([entry]) => {
			setHistHeight(`${entry.contentRect.height}px`);
		});
		observer.observe(sourceRef.current);
		return () => observer.disconnect();
	}, []);

	const [detailsOpen, setDetailsOpen] = useState(false);
    function openDetails(){
        setDetailsOpen(true);
    }
	function closeDetails(){
		setDetailsOpen(false);
	}
    
	return(
		<main>
			
			<Grainient
				color1="#0F0F12"
				color2= "#03DAC6"
				color3="#B19EEF"
				grainAmount={0.05}
			/>

			<GenWindow ref={sourceRef} entryHistory={EntryHistory} setEntryHistory={setEntryHistory}/>
			<HistWindow  sectionH={histHeight} entryHistory={EntryHistory} setEntryHistory={setEntryHistory} openDetails={openDetails}/>
			{detailsOpen && <DetailsWindow entryHistory={EntryHistory} setEntryHistory={setEntryHistory} closeDetails={closeDetails}/>}
		</main>
	)
}

export default App
