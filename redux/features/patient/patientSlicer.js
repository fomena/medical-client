import { createSlice } from '@reduxjs/toolkit'
export const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    patients: [],
    
  },
  reducers: {

    create: (state, action) => {
      state.patients.push(action.payload) 
    },

    setPatientsR: (state, action) => {
      state.patients = action.payload
     
    },




  }
})



export var selectPatient = state => state.patient.patients
export var getPatientsR = state => state.patient.patients
export var getPatientsRid = id=> state => {
  let res = state.patient.patients?.find((e) => e._id === id)
  return res
}

export const { create , setPatientsR} = patientSlice.actions

export default patientSlice.reducer