import getToys from "@/libs/getToys"
import ToyCatalog from "@/components/ToyCatalog"

export default function Toy() {
    const toys = getToys()

    return (
        <div className="text-center min-h-screen bg-sky-100">  
            <h1 className="text-xl text-red-500 font-medium">Select Your Toys</h1>        
              <ToyCatalog toyJson={toys}/>
        </div>
    )
} 