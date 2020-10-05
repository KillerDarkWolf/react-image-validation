import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import ReactDOM from 'react-dom'

const root = document.querySelector('#root')

const UploadForm = ({ setUpload }) => {
    let [filesArray, setFiles] = useState()

    const handleChange = (e) => {
        let temp = e.target.files
        console.log('file(s) selected : ', e.target.files[0])
        setFiles([...temp])
    }

    const handleSubmit = () => {
        console.log('uploaded file array :', filesArray)
        setUpload(filesArray)
    }

    return (
        <div className="uploadForm">
            <Form>
                <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input
                        type="file"
                        id="exampleFile"
                        onChange={handleChange}
                    />
                    <FormText color="muted">
                        Select file(s) to be uploaded.
                    </FormText>
                </FormGroup>
                <Button onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    )
}

export default UploadForm
