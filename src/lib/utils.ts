const locale = new Intl.NumberFormat().resolvedOptions().locale
const NumberFormatter = new Intl.NumberFormat(locale, {
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3,
})

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function formatNumber(input: number, unit = ""): string {
  if (input === 0 || input === null || input === undefined) {
    return "-"
  }

  let result = NumberFormatter.format(input)
  if (unit && unit === "%") {
    result += unit
  } else if (unit) {
    result += ` ${unit}`
  }
  return result
}

export function formatNumberPrecision(input: number, precision = 2, unit = ""): string {
  if (input === 0 || input === null || input === undefined) {
    return "-"
  }

  let result = input.toFixed(precision)

  if (unit && unit === "%") {
    result += unit
  } else if (unit) {
    result += ` ${unit}`
  }
  return result
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "-"
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  } catch {
    return dateString
  }
}

export function formatDuration(seconds?: number): string {
  if (!seconds) return "-"
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  } else {
    return `${remainingSeconds}s`
  }
}

export function formatTimestamp(timestamp?: string): string {
  if (!timestamp) return "-"
  try {
    return new Date(timestamp).toLocaleString()
  } catch {
    return timestamp
  }
}
