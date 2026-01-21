import { useState } from 'react'
import './App.css'

import GenWindow from './components/genWindow.tsx';

function App() {
	const [EntryHistory, setEntryHistory] = useState(localStorage.getItem('entries'));
    
	return(
		<>
			<GenWindow entryHistory={EntryHistory} setEntryHistory={setEntryHistory}/>
		
		</>
	)
}

export default App
