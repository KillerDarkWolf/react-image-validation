import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import UploadForm from './components/UploadForm'
import axios from 'axios'

const root = document.querySelector('#root')

const App = () => {
    let [upload, setUpload] = useState()

    useEffect(() => {
        if (upload) {
            console.log('making upload request...')
            setUpload()
        }
    }, [upload])

    return (
        <div>
            <UploadForm setUpload={setUpload} />
        </div>
    )
}

export default App
