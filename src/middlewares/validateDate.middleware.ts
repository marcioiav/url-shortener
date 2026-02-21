
import type { Request, Response, NextFunction } from 'express'
import { isValidISODate } from '../utils/dates.js'

export function requireISODate(req: Request, res: Response, next: NextFunction) {
  const { date } = req.query
  if (!date || typeof date !== 'string' || !isValidISODate(date)) {
    return res.status(400).json({ error: true, message: 'Parâmetro "date" deve ser YYYY-MM-DD' })
  }
  next()
}
