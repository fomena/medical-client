import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import patientReducer from './features/patient/patientSlicer'

export default configureStore({
  reducer: {
    patient: patientReducer,

    counter: counterReducer,
  }
})