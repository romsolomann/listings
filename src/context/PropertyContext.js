import { createContext, useContext, useEffect, useState } from "react"
import { doFetch } from "../api/doFetch.js";
import {useLocation} from 'react-router-dom'
const PropertyContext = createContext();

export const PropertyProvider = ({children})=>{
    let location = useLocation();
    
    const params = new URLSearchParams(location.search);
    const [properties,setProperties] = useState(null);
    const [queryProperties,setQueryProperties] = useState(null);
    const [totalPages,setTotalPages] = useState(null)
    const [yeshuvim,setYeshuvim] = useState(null)
    const [page,setPage] = useState(1);
    const [filterBy,setFilterBy] = useState({district:[],area:[],price:{min:0,max:20000000}});
    const [cities, setCities] = useState(null);
    const [districts,setDistricts] = useState(null)
    const [divisions,setDivisions] = useState(null)


    useEffect(()=>{
        const areaParams = params.get("area");
        const districtParams = params.get("district");
        const min = +params.get("minPrice")
        const max = +params.get("maxPrice")

        
        if(typeof areaParams !== 'object' || typeof districtParams !== 'object' || min !== 0 || max !== 0){
          const area =(areaParams.length === 0) ? []:areaParams.split(',')
          const district = districtParams.length === 0 ?[]:districtParams.split(',')


          const filter = {
              district,
              area,
              price:{min,max}
          }
          setFilterBy(filter)
          loadProperties(filter)
        }else {
            loadProperties(filterBy)
        }
    },[])

    const loadProperties = async (filter) => {
        try{
            const {properties,yeshuvim,query_properties,total_pages,districts} = await doFetch("/il/dashboard/search-listings",{
                headers: {
                    "Content-Type": "application/json",
                 },
                method:'POST',
                body:JSON.stringify({
                    page:page,
                    district:filter.district,
                    yeshuv: filter.area,
                    min_price: filter.price.min,
                    max_price: filter.price.max}),
                    
                })
            const divisions = districts.map((district)=>district.properties.district)
            const cities= _getCitiesInDistrict(filter,yeshuvim);
            setProperties(properties)
            setYeshuvim(yeshuvim)
            setQueryProperties(query_properties)
            setTotalPages(total_pages)
            setCities(cities);
            setDivisions(divisions)
            setDistricts(districts)
        }catch(err){
            console.log(`err`, err)
        }
    }

    const getRequestedPage = async (pageValue) => {
        try{
            const {page,properties} = await doFetch("/il/dashboard/search-listings",{
                headers: {
                    "Content-Type": "application/json",
                 },
                method:'POST',
                body:JSON.stringify({
                    page:pageValue,
                    district:filterBy.district,
                    yeshuv: filterBy.area,
                    min_price: filterBy.price.min,
                    max_price: filterBy.price.max}),
                })
                
            setProperties(properties)
            setYeshuvim(yeshuvim)
            setPage(page)
        } catch(err){
            console.log(`err`, err)
        }
    }

    const _getCitiesInDistrict = (filter,yeshuvim) => {
        if(filter.district.length === 0) {
          const cities =  yeshuvim.map((yeshuv) => yeshuv.properties.yeshuv)
          return cities 
        }
        else {
            const citiesToReturn = [];
            const cities = filter.district.map(district=>{
                const yeshuv =yeshuvim.filter(yeshuv=>yeshuv.properties.district ===district)
                return yeshuv;
            })
            cities.forEach(cities=>cities.forEach(city=>citiesToReturn.push(city.properties.yeshuv)))
            return citiesToReturn
        }
    }

    const getDistrictByName = ([districtName]) => {
       
        return districts.find(district=> districtName === district.properties.district)
    }

    const getYeshuvByName = ([yeshuvName]) => {
        return yeshuvim.find(yeshuv=> yeshuvName === yeshuv.properties.yeshuv)
    }
    
    return (
        <PropertyContext.Provider value={{properties,queryProperties,cities,page,districts,divisions,filterBy,getYeshuvByName,getDistrictByName,setFilterBy,totalPages,getRequestedPage,yeshuvim,loadProperties}}>
            {children}
        </PropertyContext.Provider>
    )
}

export const useProperty = () => useContext(PropertyContext)