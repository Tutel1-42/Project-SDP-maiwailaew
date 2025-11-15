import Link from "next/link"
import ToyCard from "./ToyCard"
import { ArtToyType } from "../../interfaces"
import { ToyCatalogProps } from "../../interfaces"

export default async function ToyCatalog({toyJson} : ToyCatalogProps) {
    const toyJsonReady = await toyJson
    return (
        <div>
            
        <p className="mb-4 text-green-500"> 
        Explore {toyJsonReady.count} toys in our catalog
        </p>

        <div style={{margin:"20px", display:"flex", flexDirection:"row",
                    flexWrap:"wrap",padding:"10px", justifyContent:"space-around",
                     alignContent:"space-around",alignItems: "flex-start"}}>
                        {
                            toyJsonReady.data.map((toyItem : ArtToyType) => (
                            <div key={toyItem.sku} className="w-full sm:w-[50%] 
                            md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">
                                
                                <Link href ={`/toys/${toyItem._id}`}>
                                    <ToyCard toy={toyItem}/>
                                </Link>

                            </div>
                            ))
                        }
            </div>
        </div>
    )
}