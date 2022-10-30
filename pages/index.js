import React, { useState, useEffect } from 'react';
import Apointment from './../components/Apointment';
import Header from './../components/Header';
import TabContent from './../components/TabContent';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';
import { getPatients } from './../services/patient.service';
import { useDispatch } from 'react-redux'
import { setPatientsR } from './../redux/features/patient/patientSlicer';

const App = () => {

       const dispatch = useDispatch()
       const [dataStat,setDataStat]= useState({missed:0, rescheduled:0,passed:0, pending:0}) 


       useEffect(() => {

              getPatients().then((data) => {
                     dispatch(setPatientsR(data))

                     setDataStat({
                            ...dataStat,
                            missed: data?.filter((x) => x.appointment_status === 'missed').length,
                            rescheduled: data?.filter((x) => x.appointment_status === 'rescheduled').length,
                            passed:data?.filter((x)=>x.appointment_status==='passed').length,
                            pending:data?.filter((x)=>x.appointment_status==='pending').length
                     })


                    
              })
       }, [dataStat])







       return (
              <div className='px-[.2rem] w-full  flex-col '>
                     <Header name="Patients" />
                     <div className='flex flex-col justify-center items-center'>
                            <div className='mt-24 w-full max-w-[660px] ' >
                                   <div className='w-full'>
                                          <Apointment data={dataStat} />

                                   </div>


                            </div>

                            <div className='mt-[50px] w-full '>
                                   <div className='w-full '>
                                          <TabContent />

                                   </div>
                            </div>
                     </div>
                     {/* next page and add task */}
                     <div className='flex  justify-center'>
                            <div className='shadow-lg'>
                                   <Link href="/registration">

                                          <Button type="primary" icon={<PlusOutlined />} size={30} className="rounded-[4px] !border-none  !bg-[#c06371]" />

                                   </Link>

                            </div>

                     </div>

              </div>
       );
};
export default App;