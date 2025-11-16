export default async function getToy(id:string) {
    const response = await fetch(`http://my-art-toy-api.onrender.com/api/v1/arttoys/${id}`)
    if(!response.ok) {
        throw new Error("Failed to fetch toy")
    }
    return await response.json()
}