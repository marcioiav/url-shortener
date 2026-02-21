
import app from './app.js'
import { BASE_URL } from './env.js'

const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
  console.log(`URL Shortener rodando em ${BASE_URL} (porta ${port})`)
})
