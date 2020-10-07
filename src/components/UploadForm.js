import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import ReactDOM from 'react-dom'

const root = document.querySelector('#root')

const UploadForm = ({ setUpload }) => {
    let [fileObject, setFiles] = useState()
    let reader = new FileReader()

    const handleChange = (e) => {
        let temp = e.target.files[0]
        console.log('file(s) selected : ', temp)
        if (temp) {
            if (!temp.name.match(/\.(jpg|jpeg|png)$/)) {
                setFiles()
                alert('Please select a valid image.')
                return false
            }
            reader.onload = (e) => {
                const img = new Image()
                img.onload = () => {
                    console.log('Image content loaded.')
                }
                img.onerror = () => {
                    setFiles()
                    alert('Invalid image content.')
                    return false
                }
                img.src = e.target.result
            }
            reader.readAsDataURL(temp)
            setFiles(temp)
        } else {
            alert('No file selected.')
        }
    }

    const handleSubmit = () => {
        if (fileObject) {
            console.log('uploaded file :', fileObject)
            setUpload(fileObject)
        } else {
            alert('No file to be uploaded.')
        }
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
