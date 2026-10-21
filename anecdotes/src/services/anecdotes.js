const baseUrl = 'http://localhost:3001/anecdotes'

// Obtener todas las anécdotas
const getAll = async () => {
  const response = await fetch(baseUrl)
  return await response.json()
}

// Crear nueva anécdota
const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  }
  const response = await fetch(baseUrl, options)
  return await response.json()
}

// Actualizar los votos
const update = async (id, newObject) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newObject),
  }
  const response = await fetch(`${baseUrl}/${id}`, options)
  return await response.json()
}

export default { getAll, createNew, update }