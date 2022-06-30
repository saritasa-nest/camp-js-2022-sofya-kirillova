export const api = (async (https: string, meth: string) => {
  const response = await fetch(https, {
    method: meth,
    headers: {
      'Api-Key': API_KEY
    },
  })
  const data = await response.json()
  return data
})
