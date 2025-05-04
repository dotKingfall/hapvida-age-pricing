// src/utils/fileLoader.ts
export async function loadFileData(fileName: string): Promise<string> {
  try {
    const response = await fetch(`/data/${fileName}`)
    if (!response.ok) {
      throw new Error(`Failed to load file: ${fileName}`)
    }
    return await response.text()
  } catch (error) {
    console.error(`Error loading file ${fileName}:`, error)
    throw error
  }
}