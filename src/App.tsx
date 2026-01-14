import { useState } from 'react'
import './App.css'

import list from "./assets/list.json"

function App() {
    const [album, loadAlbum] = useState("Press the button")

	function generateAlbum(){
		const randomIndex = Math.floor(Math.random() * list.length);
		loadAlbum(list[randomIndex])
	}

    return (
      <>
        <p>{album}</p>
		<button onClick={generateAlbum}>Generate</button>
      </>
    )
}

export default App
