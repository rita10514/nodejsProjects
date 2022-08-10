const express = require('express')
const membersRouter = require('./routers/membersRouter')
const moviesRouter = require('./routers/moviesRouter')
const subsRouter = require('./routers/subsRouter')

const membersBL = require('./Modules/membersBL')
const moviesBL = require('./Modules/moviesBL')

const membersMongo = require('./DALs/membersMongo')
const moviesMongo = require('./DALs/moviesMongo')

membersMongo.count({}, function( err, count){
    if(count === 0){
        membersBL.initiateMembers()
    }
})

moviesMongo.count({}, function( err, count){
    if(count === 0){
        moviesBL.initiateMovies()
    }
})

let app = express()

require('./configs/database')

app.use(express.json())

app.use("/api/members", membersRouter)
app.use("/api/movies", moviesRouter)
app.use("/api/subs", subsRouter)

app.listen(8000)