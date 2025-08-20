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
