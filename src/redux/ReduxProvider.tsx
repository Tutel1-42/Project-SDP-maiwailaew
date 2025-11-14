"use client"
import { Provider as ReactReduxProvider } from "react-redux"
import { store } from "./store"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import { SessionProvider } from "next-auth/react"

export default function ReduxProvider({children}:{children:React.ReactNode}) {

    let reduxPersistor = persistStore(store)

    return (
        <SessionProvider>
         <ReactReduxProvider store={store}>
            <PersistGate loading={null} persistor={reduxPersistor}>
            {children}
            </PersistGate>
         </ReactReduxProvider>
        </SessionProvider>
    )
}