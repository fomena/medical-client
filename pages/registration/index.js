
import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useRouter } from 'next/router'
import Header from '../../components/Header';
import { useSelector, useDispatch } from 'react-redux'
import { create, getPatientsRid } from '../../redux/features/patient/patientSlicer';
import { PageHeader } from 'antd';


const openNotificationWithIcon = (type, message) => {
       notification[type]({
              message: message,
       });
};






export default function Registration() {
       const router = useRouter()

       const dispatch = useDispatch()
       var routerId = router.query.id
       var currentState = useSelector(getPatientsRid(routerId))
const [currentPatient, setcurentPatient]= useState(currentState)
       const [Patient, setPatient] = useState({
              code: null,
              name: null,
              sex: null,
              phone: null,
              email: null,
              appointment_date: null,
              first_time: null,
              request_date: null,
              appointment_status: null,
              appointment_time: null,
              address: null,
              city: null,
              before_appointment: null,
              after_appointment: null,



       })

       let [query, setQuery] = useState({
              method: "POST",
              body: Patient,
              URL:null
       })




       useEffect(() => {
              if (currentState?.code) {
                     setQuery({ method: "PUT", body:JSON.stringify(currentPatient) ,URL:`http://localhost:5000/api/patients/${currentPatient?._id}` })
              } else {
                     setQuery({ method: "POST", body: JSON.stringify(Patient),URL:`http://localhost:5000/api/patients` })
       
              }
       }, [currentPatient, Patient, routerId])



       const handleChange = (event) => {
              event.preventDefault();
              if (currentState?.code) {
                     setcurentPatient({ ...currentPatient, [event.target.name]: event.target.value });

              } else {
                     setPatient({ ...Patient, [event.target.name]: event.target.value });

                     
              }

       }

      

       const handleSubmit = async (event) => {
             
              event.preventDefault();
              

              try {
                     const response = await fetch(query.URL, {
                            method: query.method,
                            
                            mode: 'cors',
                            cache: 'no-cache',
                            headers: {
                                   'Content-Type': 'application/json'
                            },
                            referrerPolicy: 'no-referrer',
                            body: query.body
                     }).then((res) => {

                            return res.json()
                     }).then((data) => {
                            if (data.patient) {
                                   dispatch(create(data.patient))
                                   openNotificationWithIcon('success', data.message)
                                   console.log('good insertion')
                                   // console.log("etat du user creer", currentState);

                                   router.push({pathname:'/dashboard'})
                            } else {
                                   console.log(data.message)
                                   openNotificationWithIcon('error', data.message||data.error)

                            }
                     }
                     );


              } catch (error) {
                     console.log(error);
              }

       }












       return (
              <div>
                     <div className='px-[.2rem] w-full flex flex-col '>
                            <Header name="PATIENTS" />
                            {/* registration form */}

                            <section className='flex items-center justify-center'>
                                   <div className='flex flex-col px-[2rem] mt-[30px]'>
                                          {/* tabulation */}


                                          <PageHeader className=''

                                                 onBack={() => router.push('/dashboard')}
                                                 title="New Record"
                                          />

                                          {/* form */}
                                          <form className='mx-[3rem] pt-[1rem]' onSubmit={handleSubmit}>
                                                 {/* title */}
                                                 <div className='text-lg font-bold'>General information</div>
                                                 <div className='mt-[30px] flex space-x-[15px] flex-wrap mb-[20px]'>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='code'>Unique code</label>
                                                               <input required type="text" id='code' value={currentPatient?.code} name='code' className='max-w-[100px]  h-[30px]  focus:outline-none border-none rounded-[5px] border-[#bcbcbc] text-gray-500 px-[8px] ' readOnly></input>
                                                        </div>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='name'>Name</label>
                                                               <input onInput={handleChange} required type="text" value={currentPatient?.name} id='name' name='name' className='max-w-[200px] h-[30px] focus:outline-none border rounded-[5px] border-[#bcbcbc] text-gray-500 px-[8px]'></input>
                                                        </div>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='sex'>Sex</label>
                                                               <select id='sex' onInput={handleChange} defaultValue={currentPatient?.sex} name='sex' className='w-[200px] h-[30px] focus:outline-none border rounded-[5px] border-[#bcbcbc] !bg-white text-gray-500 px-[8px] outline-none  '>
                                                                      <option value="" ></option>
                                                                      <option value="male" >Male</option>
                                                                      <option value="female">Female</option>
                                                               </select>
                                                        </div>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='phone'>Phone</label>
                                                               <input required type="tel" id='phone' value={currentPatient?.phone} onInput={handleChange} name='phone' className='max-w-[200px] h-[30px] focus:outline-none border rounded-[5px] border-[#bcbcbc] text-gray-500 px-[8px]'></input>
                                                        </div>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='email'>Email</label>
                                                               <input required type="email" id='email' value={currentPatient?.email} onInput={handleChange} name='email' className='max-w-[200px] h-[30px] focus:outline-none border rounded-[5px] border-[#bcbcbc] text-gray-500 px-[8px]'></input>
                                                        </div>

                                                 </div>
                                                 <hr style={{
                                                        color: '#000000',
                                                        backgroundColor: '#d8d4d1',
                                                        height: .5,
                                                        marginBottom: 30

                                                 }} />

                                                 <div className='text-lg font-bold'>Appointments information</div>
                                                 <div className='mt-[30px] flex space-x-[15px] flex-wrap mb-[20px] items-center'>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='appointment_date'>Appointment date</label>
                                                               <input required onInput={handleChange} type="date" value={currentPatient?.appointment_date?.split('T')[0]} id='appointment_date' name='appointment_date' className='max-w-[200px]  h-[30px]  focus:outline-none border-none rounded-[5px] border-[#bcbcbc] text-gray-500 px-[8px] '></input>
                                                        </div>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='first_time'>First time</label>
                                                               <select id='first_time' required onInput={handleChange} defaultValue={currentPatient?.first_time} name='first_time' className='w-[200px] h-[30px] focus:outline-none border rounded-[5px] border-[#bcbcbc] !bg-white text-gray-500 px-[8px] outline-none  '>
                                                                      <option value=""></option>
                                                                      <option value={false}>No</option>
                                                                      <option value={true}>Yes</option>
                                                               </select>
                                                        </div>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='request_date'>Request date</label>
                                                               <input type="date" onInput={handleChange} value={currentPatient?.request_date?.split('T')[0]} id='request_date' name='request_date' className='max-w-[200px]  h-[30px]  focus:outline-none border-none rounded-[5px] border-[#bcbcbc] text-gray-500 px-[8px] '></input>
                                                        </div>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='appointment_status'>Appointment Status</label>
                                                               <select required id='appointment_status' onInput={handleChange} defaultValue={currentPatient?.appointment_status} name='appointment_status' className='w-[200px] h-[30px] focus:outline-none border rounded-[5px] border-[#bcbcbc] !bg-white text-gray-500 px-[8px] outline-none  '>
                                                                      <option value=""></option>
                                                                      <option value="pending">Pending</option>
                                                                      <option value="missed">missed</option>
                                                                      <option value="rescheduled">rescheduled</option>
                                                                      <option value="passed">passed</option>
                                                               </select>
                                                        </div>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='appointment_time'>Appointment Time</label>
                                                               <input required type="time" onInput={handleChange} value={currentPatient?.appointment_time} id='appointment_time' name='appointment_time' className=' max-w-[200px] h-[30px] focus:outline-none border rounded-[5px] border-[#bcbcbc] text-gray-500 px-[8px]'></input>
                                                        </div>


                                                 </div>

                                                 <div className='text-lg font-bold'>Adress information</div>
                                                 <div className='mt-[30px] flex space-x-[15px] flex-wrap mb-[20px]'>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='address'>address 1</label>
                                                               <input required onInput={handleChange} type="text" id='address' value={currentPatient?.address} name='address' className='max-w-[200px]  h-[30px]  focus:outline-none border-none rounded-[5px] border-[#bcbcbc] text-gray-500 px-[8px] '></input>
                                                        </div>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='city'>City</label>
                                                               <input required onInput={handleChange} type="text" id='city' name='city' value={currentPatient?.city} className='max-w-[200px]  h-[30px]  focus:outline-none border-none rounded-[5px] border-[#bcbcbc] text-gray-500 px-[8px] '></input>
                                                        </div>


                                                 </div>


                                                 <div className='text-lg font-bold'>Note</div>
                                                 <div className='mt-[30px] flex space-x-[15px] flex-wrap mb-[20px]'>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='before_appointment'> Before Appointment</label>
                                                               <textarea type="text" onChange={handleChange} id='before_appointment' value={currentPatient?.before_appointment} name='before_appointment' className='max-w-[300px]  h-[100px]  focus:outline-none border-none rounded-[5px] border-[#bcbcbc] text-gray-500 px-[8px] '></textarea>
                                                        </div>
                                                        <div className='flex flex-col space-y-[10px]'>
                                                               <label htmlFor='after_appointment'> After Appointment</label>
                                                               <textarea type="text" onChange={handleChange} id='after_appointment' value={currentPatient?.after_appointment} name='after_appointment' className='max-w-[300px]  h-[100px]  focus:outline-none border-none rounded-[5px] border-[#bcbcbc] text-gray-500 px-[8px] appearance-none '></textarea>
                                                        </div>


                                                 </div>
                                                 {/* next page and add task */}
                                                 <div className='flex  justify-end'>
                                                        <div className='shadow-lg'>
                                                               <input type="submit" value={currentPatient?.code ? 'Update' : 'Save'} className="rounded-[4px] cursor-pointer !border-none w-[90px] h-[35px] !bg-[#c06371] text-white font-bold" />

                                                        </div>

                                                 </div>

                                          </form>





                                   </div>


                            </section>



                     </div>
              </div>
       )
}