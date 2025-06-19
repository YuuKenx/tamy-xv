// Función para normalizar texto (quitar acentos, convertir a minúsculas, etc.)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[^a-z\s]/g, "") // Solo letras y espacios
    .trim()
}

// Función para calcular la distancia de Levenshtein (similitud entre strings)
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1, // deletion
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}

// Función para calcular el porcentaje de similitud
function calculateSimilarity(str1: string, str2: string): number {
  const maxLength = Math.max(str1.length, str2.length)
  if (maxLength === 0) return 100

  const distance = levenshteinDistance(str1, str2)
  return ((maxLength - distance) / maxLength) * 100
}

// Función para buscar invitado en la lista
export async function buscarInvitado(nombreIngresado: string): Promise<{
  encontrado: boolean
  nombre?: string
  cupo?: number
  similitud?: number
}> {
  try {
    // Obtener la lista de invitados
    const response = await fetch("/invitados.txt")
    const contenido = await response.text()

    const invitados = contenido
      .split("\n")
      .filter((linea) => linea.trim())
      .map((linea) => {
        const [nombre, cupo] = linea.split("|")
        return {
          nombre: nombre.trim(),
          cupo: Number.parseInt(cupo.trim()),
        }
      })

    const nombreNormalizado = normalizeText(nombreIngresado)

    let mejorCoincidencia = {
      nombre: "",
      cupo: 0,
      similitud: 0,
    }

    // Buscar coincidencias exactas primero
    for (const invitado of invitados) {
      const nombreInvitadoNormalizado = normalizeText(invitado.nombre)

      // Coincidencia exacta
      if (nombreInvitadoNormalizado === nombreNormalizado) {
        return {
          encontrado: true,
          nombre: invitado.nombre,
          cupo: invitado.cupo,
          similitud: 100,
        }
      }

      // Buscar coincidencias parciales (nombre y apellido en diferente orden)
      const palabrasIngresadas = nombreNormalizado.split(" ").filter((p) => p.length > 2)
      const palabrasInvitado = nombreInvitadoNormalizado.split(" ").filter((p) => p.length > 2)

      let coincidenciasParciales = 0
      for (const palabraIngresada of palabrasIngresadas) {
        for (const palabraInvitado of palabrasInvitado) {
          const similitud = calculateSimilarity(palabraIngresada, palabraInvitado)
          if (similitud >= 80) {
            // 80% de similitud mínima
            coincidenciasParciales++
            break
          }
        }
      }

      // Si coinciden al menos 2 palabras importantes
      if (coincidenciasParciales >= 2 && palabrasIngresadas.length >= 2) {
        const similitudTotal =
          (coincidenciasParciales / Math.max(palabrasIngresadas.length, palabrasInvitado.length)) * 100

        if (similitudTotal > mejorCoincidencia.similitud) {
          mejorCoincidencia = {
            nombre: invitado.nombre,
            cupo: invitado.cupo,
            similitud: similitudTotal,
          }
        }
      }

      // Búsqueda por similitud general
      const similitudGeneral = calculateSimilarity(nombreNormalizado, nombreInvitadoNormalizado)
      if (similitudGeneral >= 70 && similitudGeneral > mejorCoincidencia.similitud) {
        mejorCoincidencia = {
          nombre: invitado.nombre,
          cupo: invitado.cupo,
          similitud: similitudGeneral,
        }
      }
    }

    // Si encontramos una coincidencia con al menos 70% de similitud
    if (mejorCoincidencia.similitud >= 70) {
      return {
        encontrado: true,
        nombre: mejorCoincidencia.nombre,
        cupo: mejorCoincidencia.cupo,
        similitud: mejorCoincidencia.similitud,
      }
    }

    return { encontrado: false }
  } catch (error) {
    console.error("Error al buscar invitado:", error)
    return { encontrado: false }
  }
}
