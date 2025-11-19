"use client" 
import { useSession } from "next-auth/react";
import { useState } from "react"; 
import { TextField } from "@mui/material"; 
// ตรวจสอบ Path ให้ถูกต้องตามโครงสร้างโปรเจกต์ของคุณ
import { ArtToyType } from "../../../interfaces"; 
import { createSingleOrder } from "@/app/actions/orderActions";
import { useRouter } from "next/navigation";

interface OrderFormProps {
    allToys: ArtToyType[];
    pastOrderedToyIds: string[];
}

export default function OrderForm ({ allToys, pastOrderedToyIds }: OrderFormProps) { 
    
    // 1. ย้าย Hooks เข้ามาข้างใน Component (สำคัญ!)
    const { data: session } = useSession(); 
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false); 

    const [toyNameInput, setToyNameInput] = useState<string>(""); 
    const [amountInput, setAmountInput] = useState<number>(1);

    const makeOrder = async () => { 
        setIsLoading(true);

        // --- Validation ---
        if (!amountInput || amountInput <= 0 || amountInput > 5) {
             alert("Quantity must be between 1 and 5");
             setIsLoading(false); 
             return; 
        }
        if (!toyNameInput) { 
            alert("Please enter a toy name");
            setIsLoading(false); 
            return; 
        }

        // --- Find Toy ---
        const foundToy = allToys.find(toy => 
            toy.name.toLowerCase() === toyNameInput.trim().toLowerCase() 
        ); 

        if(foundToy) { 
            const isAlreadyOrdered = pastOrderedToyIds.includes(foundToy._id);
            if (isAlreadyOrdered) {
                alert("You have already successfully pre-ordered this toy."); 
                setIsLoading(false);
                return;
            }

            try {
                await createSingleOrder(foundToy._id, amountInput);
                alert(`Pre-order ${foundToy.name} successful!`);
                router.refresh(); 
                setToyNameInput("");
                
            } catch (error: any) {
                console.error(error);
                alert(`Failed to pre-order: ${error.message}`); 
            }
        } else { 
            alert("There isn't any toy with this name"); 
        } 
        
        setIsLoading(false);
    } 

    const isMember = session?.user?.role === 'member';

    return ( 
        <main className="w-full flex flex-col items-center space-y-4 pt-10 min-h-screen bg-amber-100"> 
            <div className="text-xl font-medium">New Order</div> 

            <div className="flex flex-col items-center space-y-10 w-full max-w-xs sm:max-w-sm"> 
                <TextField 
                    label="Enter Toy Name" 
                    variant="outlined" 
                    className="w-full bg-white rounded-md" 
                    value={toyNameInput} 
                    onChange={(e) => setToyNameInput(e.target.value)} 
                /> 

                <TextField 
                    label="Enter Quantity (1-5)" 
                    variant="outlined" 
                    className="w-full bg-white rounded-md" 
                    type="number" 
                    value={amountInput} 
                    onChange={(e) => { 
                        const val = parseInt(e.target.value, 10); 
                        if (isNaN(val) || val < 1) { 
                            setAmountInput(1); 
                        } else if (val > 5) { 
                            setAmountInput(5); 
                        } else { 
                            setAmountInput(val); 
                        } 
                    }} 
                /> 

                {!isMember ? (
                    <div className="text-red-500 font-bold bg-red-100 p-4 rounded w-full text-center">
                        Only members can place orders. 
                    </div>
                ) : (
                    <button 
                        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-small disabled:bg-gray-400 w-full" 
                        onClick={makeOrder} 
                        disabled={!toyNameInput || !amountInput || amountInput <= 0 || amountInput > 5 || isLoading} 
                    > 
                        {isLoading ? "Processing..." : "Pre-order this Toy"}
                    </button> 
                )}
            </div>
        </main> 
    ); 
}