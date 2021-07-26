import { createContext, useContext, useState } from "react";


const DisplayContext = createContext();

export const DisplayProvider = ({children}) => {
    const [display,setDisplay] = useState('tiles');

    return (
        <DisplayContext.Provider value={{display,setDisplay}}>
            {children}
        </DisplayContext.Provider>
    )
}

export const useDisplayMode = () => useContext(DisplayContext)