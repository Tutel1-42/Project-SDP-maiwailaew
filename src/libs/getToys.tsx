export default async function getToys() {

    await new Promise( (resolve)=>setTimeout(resolve, 1000)  )


    const response = await fetch("http://my-art-toy-api.onrender.com/api/v1/arttoys", {next: {tags:['toys']}})

    if(!response.ok) {
        throw new Error("Failed to fetch toys")
    }

    return await response.json()
}