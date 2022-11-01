
import React from "react"
import StatCard from "./molecule/statCard"

export default function Apointment(props) {

   
       return (
              <div className=" ">
                     <div className="flex justify-between">
                            <div className="flex flex-col items-center">
                                   <span className="text-[#c1717d] font-bold text-[12px]">Appointments</span>
                                   <span className="border w-[30px] h-[3px] bg-[#c1717d]"></span>
                            </div>
                           

                     </div>
                     <div className="flex  space-x-[40px] w-full mt-10">
                            <StatCard name="Missed" value={props.data.missed} bgClass="bg-[#eececf]  font-bold" vClass="text-[#dc2e30]" />
                            <StatCard name="Rescheduled" value={props.data.rescheduled} bgClass="bg-[#eedac1]" vClass="text-[#e4952b]" />
                            <StatCard name="Passed" value={props.data.passed} bgClass="bg-[#cfd6cf]  font-bold" vClass="text-[#4e816a]" />
                            <StatCard name="Pending" value={props.data.pending} bgClass="bg-blue-300 font-bold" vClass="text-blue-500 " />
                     </div>
              </div>
       )
}