interface ColorData {
  color: string
  hex: string
  r: number
  g: number
  b: number
  h: number
  s: number
  v: number
}

export function convertColor(color: string): ColorData {
  let hexData = color.split("#")[1]
  if (hexData.length === 3) {
    hexData = hexData
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const r = parseInt(hexData.substring(0, 2), 16)
  const g = parseInt(hexData.substring(2, 4), 16)
  const b = parseInt(hexData.substring(4, 6), 16)

  const rNormalized = r / 255
  const gNormalized = g / 255
  const bNormalized = b / 255

  const max = Math.max(rNormalized, gNormalized, bNormalized)
  const min = Math.min(rNormalized, gNormalized, bNormalized)

  const delta = max - min

  let h = 0
  if (delta === 0) {
    h = 0
  } else if (max === rNormalized) {
    h = (((gNormalized - bNormalized) / delta) % 6) * 60
    if (h < 0) {
      h += 360
    }
  } else if (max === gNormalized) {
    h = ((bNormalized - rNormalized) / delta + 2) * 60
  } else if (max === bNormalized) {
    h = ((rNormalized - gNormalized) / delta + 4) * 60
  }

  let s = 0
  if (max !== 0) {
    s = (delta / max) * 100
  }

  let v = max * 100

  return {
    color: color,
    hex: hexData,
    r: r,
    g: g,
    b: b,
    h: h,
    s: s,
    v: v,
  }
}
