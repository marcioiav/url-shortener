
import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'
import { assertValidUrl } from '../utils/url.js'
import { dayBounds } from '../utils/dates.js'

const prisma = new PrismaClient()

export async function createShortUrl(original: string) {
  assertValidUrl(original)
  const code = nanoid(8)
  const record = await prisma.shortUrl.create({ data: { code, original } })
  return record
}

export async function getById(id: number) {
  return prisma.shortUrl.findUnique({ where: { id } })
}

export async function getByCode(code: string) {
  return prisma.shortUrl.findUnique({ where: { code } })
}

export async function listByDate(dateISO: string) {
  const { start, end } = dayBounds(dateISO)
  return prisma.shortUrl.findMany({
    where: { createdAt: { gte: start, lte: end } },
    orderBy: { createdAt: 'asc' }
  })
}
