export default function formatTime(n: number): string {
  const h = Math.floor(n)
  const d = n - h
  const m = d * 60

  const min = m < 10 ? `0${m}` : `${m}`

  if (h === 0) return `${min}min`

  return `${h}h ${min}m`
}

export const padNumber = (n: number | string) => {
  const s = String(n)

  if (s.length < 2) return `0${s}`

  return s
}
