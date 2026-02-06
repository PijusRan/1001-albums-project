import { useState } from 'react'
import './App.css'

import GenWindow from './components/genWindow.tsx';
import HistWindow from './components/histWindow.tsx';

function App() {
	const [EntryHistory, setEntryHistory] = useState(JSON.parse(localStorage.getItem('entries')));
    
	return(
		<main>
			<GenWindow entryHistory={EntryHistory} setEntryHistory={setEntryHistory}/>
			<HistWindow entryHistory={EntryHistory} setEntryHistory={setEntryHistory}/>
		</main>
	)
}

export default App
