import Header from "../../components/Header"
import React, { useEffect, useState } from "react"
import { Typography } from 'antd';
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { getPatientsRid } from "../../redux/features/patient/patientSlicer";

const { Title } = Typography;

export default function PatientDetails() {
       const router = useRouter()
const [patient,setPatient] = useState([])
       var patientdb = useSelector(getPatientsRid(router.query.id))

       useEffect(() => {
              setPatient(patientdb)
       },[patientdb])

       return (
              <div>
                     <div className='px-[.2rem] w-full flex flex-col  '>
                            <Header name="PATIENTS" />
                            {/* registration form */}
                            <section className=" flex flex-col  items-center mt-[50px]">
                            <Title underline>Patient Informations </Title>
                                   
                                   <div className="w-1/3 float-left">
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>Code :</Title> <span className="text-right "> {patient?.code}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>name :</Title> <span className="text-right "> {patient?.name}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>sex :</Title> <span className="text-right "> {patient?.sex}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>phone :</Title> <span className="text-right "> {patient?.phone}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>email :</Title> <span className="text-right "> {patient?.email}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>appointment date :</Title> <span className="text-right "> {patient?.appointment_date}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>first time :</Title> <span className="text-right "> {patient?.first_time}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>request date :</Title> <span className="text-right "> {patient?.request_date}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>appointment status :</Title> <span className="text-right "> {patient?.appointment_status}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>appointment time :</Title> <span className="text-right "> {patient?.appointment_time}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>address :</Title> <span className="text-right "> {patient?.address}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>city :</Title> <span className="text-right "> {patient?.city}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>before_appointment :</Title> <span className="text-right "> {patient?.before_appointment}</span> </div>
                                          <div className="flex justify-between space-x-2 "><Title className="capitalize " level={5}>after_appointment :</Title> <span className="text-right "> {patient?.after_appointment}</span> </div>
                                   
                                 
                                   </div>
                            </section>
                           



                     </div>
              </div>
       )
}