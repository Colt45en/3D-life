/**
 * Download a file with given content
 */
export function downloadFile(filename: string, content: string, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Download JSON data
 */
export function downloadJson(filename: string, data: unknown) {
  const json = JSON.stringify(data, null, 2)
  downloadFile(filename, json, 'application/json')
}
