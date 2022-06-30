export const api = (async (https: string, meth: string) => {
  const response = await fetch(https, {
    method: meth,
    headers: {
      'Api-Key': '3df19916-03c9-47de-ab5c-5619376c2cef'
    },
  })
  const data = await response.json()
  return data
})
