
import express from 'express'
import urlsRouter from './routes/urls.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()
app.use(express.json())

app.use(urlsRouter)
app.use(errorHandler)

export default app
