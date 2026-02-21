
import request from 'supertest'
import app from '../src/app.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.shortUrl.deleteMany({})
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('URL Shortener', () => {
  let createdId: number
  let createdCode: string

  it('POST /urls deve criar uma URL encurtada', async () => {
    const res = await request(app)
      .post('/urls')
      .send({ url: 'https://developer.mozilla.org/' })
      .expect(201)

    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('code')
    expect(res.body).toHaveProperty('short')
    createdId = res.body.id
    createdCode = res.body.code
  })

  it('GET /urls/:id deve retornar pelo ID', async () => {
    const res = await request(app).get(`/urls/${createdId}`).expect(200)
    expect(res.body.code).toBe(createdCode)
  })

  it('GET /codes/:code deve retornar pelo code', async () => {
    const res = await request(app).get(`/codes/${createdCode}`).expect(200)
    expect(res.body.id).toBe(createdId)
  })

  it('GET /urls?date=YYYY-MM-DD lista por data', async () => {
    const today = new Date().toISOString().slice(0, 10)
    const res = await request(app).get(`/urls?date=${today}`).expect(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })
})
