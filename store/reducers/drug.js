import React from "react"
import PRODUCTS from "../../data/dummy-data"
const initialState = {
    availableDrugs: PRODUCTS,
    userDrugs: PRODUCTS.filter(prod=>prod.id ==="u1")

}

export default (state = initialState, action)=>{


    return state;
}