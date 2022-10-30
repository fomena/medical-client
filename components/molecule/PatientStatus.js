
import React from "react"
export default function PatientStatus(props) {


       return (
              <div className={`${props.color} px-2 py-1 text-sm rounded-md text-center font-bold`}>
                     {props.text}
              </div>
       )
}