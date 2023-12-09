export const callCategory = async () => {
    try {
        const response = await fetch("http://localhost:5678/api/categories")
        const categories = await response.json()
        return categories;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
        throw error;
    }
}


export const callWorks = async () => {
    try {
        const response = await fetch("http://localhost:5678/api/works")
        const works = await response.json()
        return works;
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux", error)
        throw error
    }
}


