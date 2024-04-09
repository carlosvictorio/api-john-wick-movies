const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = 3000

app.use(express.json())

const Filme = mongoose.model("filme", {
    name: String,
    release_date: Number,
    description: String,
    image: String
})

app.listen(port, () => {
    mongoose.connect("mongodb+srv://victorionogueira:NLTY8ekAPHYNf4pa@jk-movies.46ajmuv.mongodb.net/?retryWrites=true&w=majority")

    console.log(`app running on port ${port}`)
})

//CREATE
app.post('/', async (req, res) => {
    const filme = new Filme({
        name: req.body.name,
        release_date: req.body.release_date,
        description: req.body.description,
        image: req.body.image
    })

    await filme.save()

    res.send(filme)
})

//READ
app.get('/', async (req, res) => {
    const filme = await Filme.find()

    res.send(filme)
})

//UPDATE
app.put('/:id', async (req, res) => {
    const filme = await Filme.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        release_date: req.body.release_date,
        description: req.body.description,
        image: req.body.image
    }, {new: true})

    res.send(filme)
})

//DELETE
app.delete('/:id', async (req, res) => {
    const filme = await Filme.findByIdAndDelete(req.params.id)

    res.send(filme)
})