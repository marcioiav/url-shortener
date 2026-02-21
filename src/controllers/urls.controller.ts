
import type { Request, Response } from 'express'
import { createShortUrl, getById, getByCode, listByDate } from '../services/urls.service.js'
import { BASE_URL } from '../env.js'

export async function postShorten(req: Request, res: Response) {
  const { url } = req.body
  const created = await createShortUrl(url)
  return res.status(201).json({
    id: created.id,
    code: created.code,
    original: created.original,
    short: `${BASE_URL}/s/${created.code}`,
    createdAt: created.createdAt
  })
}

export async function getByIdHandler(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido' })
  const item = await getById(id)
  if (!item) return res.status(404).json({ error: true, message: 'Não encontrado' })
  return res.json({
    id: item.id,
    code: item.code,
    original: item.original,
    short: `${BASE_URL}/s/${item.code}`,
    createdAt: item.createdAt
  })
}

export async function getByCodeHandler(req: Request, res: Response) {
  const { code } = req.params
  const item = await getByCode(code)
  if (!item) return res.status(404).json({ error: true, message: 'Não encontrado' })
  return res.json({
    id: item.id,
    code: item.code,
    original: item.original,
    short: `${BASE_URL}/s/${item.code}`,
    createdAt: item.createdAt
  })
}

export async function listByDateHandler(req: Request, res: Response) {
  const { date } = req.query as { date: string }
  const list = await listByDate(date)
  return res.json(list.map(i => ({
    id: i.id,
    code: i.code,
    original: i.original,
    short: `${BASE_URL}/s/${i.code}`,
    createdAt: i.createdAt
  })))
}

export async function redirectByCode(req: Request, res: Response) {
  const { code } = req.params
  const item = await getByCode(code)
  if (!item) return res.status(404).send('Código não encontrado')
  return res.redirect(302, item.original)
}
