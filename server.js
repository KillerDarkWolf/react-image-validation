const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// handle storage using multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})
let upload = multer({ storage: storage })

// handle single file upload
app.post('/uploadfile', upload.single('dataFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        return res.status(400).send({ message: 'Please upload a file.' })
    }
    return res.send({ message: 'File uploaded successfully.', file })
})

// handle multiple file upload
app.post(
    '/uploadmultifile',
    upload.array('dataFiles', 10),
    (req, res, next) => {
        const files = req.files
        if (!files || (files && files.length === 0)) {
            return res.status(400).send({ message: 'Please upload a file.' })
        }
        return res.send({ message: 'File uploaded successfully.', files })
    }
)

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
