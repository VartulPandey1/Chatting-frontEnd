import { useState,useEffect } from "react"

const useGetUser = ()=>{

    const[data,setData]=useState()

    useEffect(()=>{
        getData()
    },[])
    async function getData(){
        const sol=await fetch("http://localhost:5000/user")
        const result =await sol.json()
        setData(result)
        console.log("result   = ",result)
    }
    return data
}

export default useGetUser