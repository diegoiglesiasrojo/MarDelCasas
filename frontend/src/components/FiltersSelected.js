import React, { useEffect, useState } from 'react'
import { XOctagon } from 'react-bootstrap-icons'
import { connect } from "react-redux"
import propertiesActions from '../redux/action/propertiesActions'


const FiltersSelected = (props) => {
    const {deletePropertieFromObject, formFilter, setFormFilter, cities, getPropertiesFiltered, selectFilters} = props
    const [filtersSelected, setFiltersSelected] = useState([])
    console.log("Estoy en FiltersSelected")
    useEffect(() => {
        console.log("FiltersSelected")
        console.log("Array de Formfilter en UseEffect", formFilter)
        console.log("filtros listos para eliminar", filtersSelected)
        let arrayAux =[] 
        Object.keys(formFilter).forEach((key, i) =>{
            if (!(formFilter[key] === "allCases" || formFilter[key] === false || formFilter[key] === "")){ 
                let cityName = cities.filter(city => city._id === formFilter.city)[0].cityName
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
                        valueDelete = cityName
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
                console.log("Cada bloque a eliminar ", [nameDelete, valueDelete, key, formFilter[key]])
                arrayAux.push([nameDelete, valueDelete, key, formFilter[key]])
            } //else {
            //     setFiltersSelected([])
            // }
        })
        setFiltersSelected(arrayAux)
    }, [formFilter])

    const resetInputSelect = (e, nameInputSelect, i) => {
        console.log(nameInputSelect)
        let initialValue
        console.log("para colocar efecto", e.target)
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
            case "greater":
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
        console.log("Array de bloques antes de eliminar uno", filtersSelected)
        setFiltersSelected( filtersSelected.filter((block, j) => i!==j))
        setFormFilter( { ...formFilter, [nameInputSelect]: initialValue})
        let newFilter = deletePropertieFromObject(nameInputSelect) // cambiar el objeto filter en redux
        console.log("nuevo filtro despues de eliminar bloque", newFilter)
        getPropertiesFiltered(newFilter)
        .then(res => {
            if(!res.data.success){
                throw new Error('Something went wrong')
            }
            console.log(res.data.response)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={!selectFilters ? "filtersSelected expandWidth" : "filtersSelected"}>
            {(!selectFilters && filtersSelected.length>0) && <p className="infoP">Filtros Seleccionados: </p>}
            {filtersSelected.map((eachFilter, i) => {
                if (eachFilter) {
                    return <p 
                                key={eachFilter[2] + "F"}
                                onClick={(e) => resetInputSelect(e, eachFilter[2], i)}
                            >
                                {`${eachFilter[0]} ${eachFilter[1]} `}<XOctagon/> 
                            </p> 
                } 
                return false
            })}
        </div>
    )
}

const mapDispatchToProps = {
    getPropertiesFiltered: propertiesActions.getPropertiesFiltered
}

const mapStateToProps = (state) => {
    return {
        cities: state.allCities.cities,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersSelected)