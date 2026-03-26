export function formatDisplay(n: number): string {
  if (!isFinite(n)) return 'Error'
  if (isNaN(n)) return 'Error'
  let s = parseFloat(n.toPrecision(8)).toString()
  if (s.length > 10) {
    s = parseFloat(n.toExponential(5)).toString()
  }
  return s
}
