import { useState, useRef, useEffect } from 'react'
import './App.css'

import GenWindow from './components/genWindow.tsx';
import HistWindow from './components/histWindow.tsx';

function App() {
	const [EntryHistory, setEntryHistory] = useState(JSON.parse(localStorage.getItem('entries')));

	const sourceRef = useRef<HTMLDivElement>(null);
  	const targetRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!sourceRef.current || !targetRef.current) return;
		const observer = new ResizeObserver(([entry]) => {
			targetRef.current!.style.height = `${entry.contentRect.height}px`;
		});
		observer.observe(sourceRef.current);
		return () => observer.disconnect();
	}, []);
    
	return(
		<main>
			<GenWindow ref={sourceRef} entryHistory={EntryHistory} setEntryHistory={setEntryHistory}/>
			<HistWindow  ref={targetRef} entryHistory={EntryHistory} setEntryHistory={setEntryHistory}/>
		</main>
	)
}

export default App
