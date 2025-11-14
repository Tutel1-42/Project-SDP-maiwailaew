"use client"
import { useState, useEffect } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs" 

export default function ArrivalDatePicker({ arrivalDate, onDateChange }
    : { arrivalDate: string | null, onDateChange: (newDate: Dayjs | null) => void }) {


    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    useEffect(() => {

        if (arrivalDate) {
            setSelectedDate(dayjs(arrivalDate));
        } else {
            setSelectedDate(null);
        }
    }, [arrivalDate]); 

    const handleDateChange = (value: Dayjs | null) => {
        setSelectedDate(value);
        onDateChange(value);
    }

    return (

        <div className="bg-slate-100 rounded-lg space-y-2
        w-fit px-10 py-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    label="Arrival Date" 
                    className="bg-white"
                    value={selectedDate} 
                    onChange={handleDateChange} 
                />
            </LocalizationProvider>

        </div>
    )
}