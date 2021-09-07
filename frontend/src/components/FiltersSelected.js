import React, { useEffect, useState } from 'react'
import { XOctagon } from 'react-bootstrap-icons'
import { connect } from "react-redux"


const FiltersSelected = (props) => {
    const {deletePropertieFromObject, bigFilter, formFilter, setFormFilter, cities} = props
    const [filtersSelected, setFiltersSelected] = useState([])

    useEffect(() => {
        console.log(formFilter)
        console.log(cities)
        console.log(bigFilter)
        console.log(filtersSelected)
        let arrayAux =[] 
        let nameCity = formFilter.city !== "allCases" ? (cities.find(city => city._id === formFilter.city)).cityName : ""

        Object.keys(formFilter).forEach((key, i) =>{
            if (!(formFilter[key] === "allCases" || formFilter[key] === false || formFilter[key] === "")){ 
                let nameDelete, valueDelete
                switch (key) {
                    case "operation":
                        nameDelete = "Operación: "
                        if (formFilter.operation === "forSale") {
                            valueDelete = "Venta"
                        } else  if (formFilter.operation === "forRental") {
                            valueDelete = "Alquiler"
                        } else {
                            valueDelete = "Alquiler Termporario"
                        }
                        break;
                    case "city":
                        nameDelete = "Ciudad/Región: "
                        valueDelete = nameCity
                        break;
                    case "isHouse":
                        nameDelete = "Tipo: "
                        valueDelete = formFilter.isHouse==="house" ? "Casa" : "Departamento"
                        break;
                    case"numberOfRooms":
                        nameDelete = "Ambientes: "
                        valueDelete = formFilter.numberOfRooms === "6AndMore" ? "6 o más" : formFilter.numberOfRooms
                        break;
                    case"numberOfBedrooms":
                        nameDelete = "Dormitorios: "
                        valueDelete = formFilter.numberOfBedrooms === "6AndMore" ? "6 o más" : formFilter.numberOfBedrooms
                        break;
                    case"numberOfBathrooms":
                        nameDelete = "Baños: "
                        valueDelete = formFilter.numberOfBathrooms === "6AndMore" ? "6 o más" : formFilter.numberOfBathrooms
                        break;
                    case "isUSD":
                        nameDelete = "Moneda: "
                        valueDelete = formFilter.isUSD==="pesos" ? "Pesos" : "Dólares"
                        break;
                    case "greater":
                        nameDelete = "Mayor a: $"
                        valueDelete = formFilter.greater
                        break;
                    case "lower":
                        nameDelete = "Menor a: $"
                        valueDelete = formFilter.lower
                        break;
                    case "roofedArea":
                        nameDelete = "Area Cubierta: "
                        switch (formFilter.roofedArea) {
                            case '{"$lte": 40}':
                                valueDelete = "hasta 40m²"
                                break;
                            case '{"$gte":41,"$lte": 80}':
                                valueDelete = "41m² a 80m²"
                                break;
                            case '{"$gte":81,"$lte": 200}':
                                valueDelete = "81m² a 200m²"
                                break;
                            case '{"$gte":201,"$lte": 600}':
                                valueDelete = "201m² a 600m²²"
                                break;
                            case '{"$gte":600}':
                                valueDelete = "600m² o más"
                                break;
                            default:
                                break;
                        }
                        break;
                    case "isBrandNew":
                        nameDelete = "A estrenar"
                        valueDelete = ""
                        break;
                    case "haveGarden":
                        nameDelete = "Con Jardín"
                        valueDelete = ""
                        break;
                    case "haveGarage":
                        nameDelete = "Con Cochera"
                        valueDelete = ""
                        break;
                    case "havePool":
                        nameDelete = "Con Pileta"
                        valueDelete = ""
                        break;
                    default:
                        break;
                }                        
                arrayAux.push([nameDelete, valueDelete, key, formFilter[key]])
            } else {
                setFiltersSelected([])
            }
        })
        setFiltersSelected(arrayAux)
    }, [formFilter])

    const resetInputSelect = (nameInputSelect, i) => {
        console.log(nameInputSelect)
        let initialValue
        switch (nameInputSelect) {
            case "operation":
            case "city":
            case "isHouse":
            case "numberOfRooms":
            case "numberOfBedrooms":
            case "numberOfBathrooms":
            case "isUSD":
            case "roofedArea":
                initialValue = "allCases"
                break;
            case "greter":
            case "lower":
                initialValue = ""
                break;
            case "isBrandNew":
            case "haveGarden":
            case "haveGarage":
            case "havePool":
                initialValue = false
                break;
            default:
                break;
        }
        setFiltersSelected( filtersSelected.filter((block, j) => i!==j))
        setFormFilter( { ...formFilter, nameInputSelect: initialValue})
        deletePropertieFromObject(nameInputSelect)
    }

    return (
        <div className="filtersSelected">
            {filtersSelected.map((eachFilter, i) => {//cambiarle el key no dejarle index 
                if (eachFilter) {
                    return <p 
                                key={eachFilter[0] + "F"}
                                onClick={() => resetInputSelect(eachFilter[2], i)}
                            >
                                {`${eachFilter[0]} ${eachFilter[1]} `}<XOctagon/> 
                            </p> 
                }
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cities: state.allCities.cities,
    }
}

export default connect(mapStateToProps)(FiltersSelected)
