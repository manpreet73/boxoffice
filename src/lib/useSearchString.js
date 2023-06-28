import { useEffect, useState } from "react";

const usePersistedState=(inititalState,sessionStorageKey)=>{
    const [state,setState]=useState(()=>{
        const persistedValue= sessionStorage.getItem(sessionStorageKey);

        return persistedValue?JSON.parse(persistedValue):inititalState;
    })

    useEffect(()=>{
        sessionStorage.setItem(sessionStorageKey,JSON.stringify(state));
    },[state,sessionStorageKey])

    return [state,setState]
}

export const useSearchString=()=>{
    return usePersistedState('','searchString')
}