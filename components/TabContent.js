import React, { useEffect, useState } from 'react'
import { Button, Popover, notification } from 'antd'
import {
       UpOutlined,
       DownOutlined,
       EyeOutlined,
       EditOutlined,
       LeftOutlined,
       RightOutlined
} from '@ant-design/icons'
import PatientStatus from './molecule/PatientStatus'
import Link from 'next/link'
import FilterIcon from './molecule/Filter'
import { useSelector } from 'react-redux'
import { getPatientsR } from '../redux/features/patient/patientSlicer'
import { useRouter } from 'next/router'

const openNotificationWithIcon = (type, message) => {
       notification[type]({
              message: message,
       })
}
function sorter(orderDirection, field, Patients = []) {
       let custumPatients = []
       Patients.forEach((e) => {
              custumPatients.push(e)
       })
       if (orderDirection === 'asc') {
              custumPatients.sort((a, b) =>
                     a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0,
              )
       } else {
              custumPatients.sort((a, b) =>
                     a[field] < b[field] ? 1 : b[field] < a[field] ? -1 : 0,
              )
       }

       return custumPatients
}

function filter(criteria, cat, Patients = []) {
       let custumPatients = []
       Patients.forEach((e) => {
              custumPatients.push(e)
       })
       let res = custumPatients.filter((e) => e[cat] === criteria)
       return res
}

const statusContent = ['missed', 'rescheduled', 'passed', 'pending']
const sexContent = ['male', 'female']

export default function TabContent() {
       var curentContent = useSelector(getPatientsR)
       var [Patients, setPatients] = useState(curentContent)
       const router = useRouter()

       const [filterState, setFilterState] = useState(0)

       // Pagination managment
       const [currentPage, setCurrentPage] = useState(1)
       const [recordsPerPage] = useState(10)
       const indexOfLastRecord = currentPage * recordsPerPage
       const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
       // Records to be displayed on the current page
       const currentRecords = Patients.slice(indexOfFirstRecord, indexOfLastRecord)
       const nPages = Math.ceil(Patients.length / recordsPerPage)
       const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

       const content = (c, cat) => {
              return (
                     <div>
                            {c.map((val, index) => {
                                   return (
                                          <p
                                                 className="hover:bg-blue-100 cursor-pointer capitalize  font-light"
                                                 key={index}
                                                 onClick={() => {
                                                        let res = filter(val, cat, Patients)
                                                        if (res.length == 0) {
                                                               openNotificationWithIcon(
                                                                      'error',
                                                                      `${val} is not have data to filter`,
                                                               )
                                                        }
                                                        setPatients(res)
                                                 }}
                                          >
                                                 {val}
                                          </p>
                                   )
                            })}
                     </div>
              )
       }

       const nextPage = () => {
              if (currentPage !== nPages) setCurrentPage(currentPage + 1)
       }
       const prevPage = () => {
              if (currentPage !== 1) setCurrentPage(currentPage - 1)
       }
      
       const   search = (e)=> {
              if (e.target.value.length > 1) {
                     let res = Patients.filter((el) => (
                            ((el.name.toLowerCase().includes(e.target.value.toLowerCase())) ||
                           
                                   (el.name.toLowerCase().includes(e.target.value.toLowerCase())) ||
                                   (el.phone.toLowerCase().includes(e.target.value.toLowerCase()))
                     )))

                     setPatients(res) 
              } else {
                     setPatients(curentContent) 
              }

       }

       useEffect(() => {
              if (curentContent.length > 0 && Patients.length === 0) {
                     setPatients(curentContent)
              }
       }, [curentContent])

       return (
              <div>
                      <div className="w-full flex justify-center items-center mb-3">
                                   <div className=" border w-[185px] h-[30px] bg-[#ffffff] rounded-[7px]  flex items-center px-[7px] pb-1 pl-[15px] space-x-8">
                                          <input onInput={(event) =>search(event)} type="text" id="search" className="bg-white border-gray-100 border-b focus:outline-none  text-sm h-full w-full   " placeholder="Search" />
                                          <label htmlFor="search">
                                                 <svg aria-hidden="true" strokeWidth="2%" className="w-[15px] h-[15px] font-bold" fill="#daadb8" stroke="5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd"  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>

                                          </label>

                                   </div>
                     </div>
                     
                     <div className="overflow-x-auto relative  sm:rounded-lg">
                     <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase  ">
                                   <tr className=" ">
                                          <th scope="col" className="py-3 px-6">
                                                 <div className="flex items-center justify-between ">
                                                        Name
                                                        <div className="flex flex-col space-y-2">
                                                               <UpOutlined
                                                                      onClick={() => {
                                                                             let res = sorter('asc', 'name', Patients)
                                                                             setPatients(res)
                                                                      }}
                                                                      className="hover:cursor-pointer hover:text-blue-300 "
                                                                      title="sort asd"
                                                               />
                                                               <DownOutlined
                                                                      onClick={() => {
                                                                             let res = sorter('desc', 'name', Patients)
                                                                             setPatients(res)
                                                                      }}
                                                                      className="hover:cursor-pointer hover:text-blue-300"
                                                                      title="sort desc"
                                                               />
                                                        </div>
                                                 </div>
                                          </th>
                                          <th scope="col" className="py-3 px-6">
                                                 <div className="flex items-center justify-between">Code</div>
                                          </th>
                                          {/* <th scope="col" className="py-3 px-6">
                                                 <div className="flex items-center justify-between">
                                                        Age
                                                        <Popover content={content} title="Age range" trigger="focus">
                                                               <Button className="!border-none">
                                                                      <FilterIcon />
                                                               </Button>
                                                        </Popover>
                                                 </div>
                                          </th> */}
                                          <th scope="col" className="py-3 px-6">
                                                 <div className="flex items-center justify-between">Address</div>
                                          </th>
                                          <th scope="col" className="py-3 px-6">
                                                 <div className="flex items-center justify-between">Phone</div>
                                          </th>
                                          <th scope="col" className="py-3 px-6">
                                                 <div className="flex items-center justify-between">
                                                        Status
                                                        <Popover
                                                               content={content(statusContent, 'appointment_status')}
                                                               title="status"
                                                               trigger="focus"
                                                        >
                                                               <Button className="!border-none">
                                                                      <FilterIcon />
                                                               </Button>
                                                        </Popover>
                                                        <div className="flex flex-col space-y-2">
                                                               <UpOutlined
                                                                      onClick={() => {
                                                                             let res = sorter('asc', 'appointment_status', Patients)
                                                                             setPatients(res)
                                                                      }}
                                                                      className="hover:cursor-pointer hover:text-blue-300 "
                                                                      title="sort asd"
                                                               />
                                                               <DownOutlined
                                                                      onClick={() => {
                                                                             let res = sorter('desc', 'appointment_status', Patients)
                                                                             setPatients(res)
                                                                      }}
                                                                      className="hover:cursor-pointer hover:text-blue-300"
                                                                      title="sort desc"
                                                               />
                                                        </div>
                                                 </div>
                                          </th>

                                          <th scope="col" className="py-3 px-6">
                                                 <div className="flex items-center justify-between">
                                                        Sex
                                                        <Popover
                                                               content={content(sexContent, 'sex')}
                                                               title="select sex"
                                                               trigger="focus"
                                                        >
                                                               <Button className="!border-none">
                                                                      <FilterIcon />
                                                               </Button>
                                                        </Popover>
                                                        <div className="flex flex-col space-y-2">
                                                               <UpOutlined
                                                                      onClick={() => {
                                                                             let res = sorter('asc', 'sex', Patients)
                                                                             setPatients(res)
                                                                      }}
                                                                      className="hover:cursor-pointer hover:text-blue-300 "
                                                                      title="sort asd"
                                                               />
                                                               <DownOutlined
                                                                      onClick={() => {
                                                                             let res = sorter('desc', 'sex', Patients)
                                                                             setPatients(res)
                                                                      }}
                                                                      className="hover:cursor-pointer hover:text-blue-300"
                                                                      title="sort desc"
                                                               />
                                                        </div>
                                                 </div>
                                          </th>

                                          <th scope="col" className="py-3 px-6">
                                                 <div className="flex items-center justify-between">
                                                        Appointment date
                                                        <div className="flex flex-col space-y-2">
                                                               <UpOutlined
                                                                      onClick={() => {
                                                                             let res = sorter('asc', 'appointment_date', Patients)
                                                                             setPatients(res)
                                                                      }}
                                                                      className="hover:cursor-pointer hover:text-blue-300 "
                                                                      title="sort asd"
                                                               />
                                                               <DownOutlined
                                                                      onClick={() => {
                                                                             let res = sorter('desc', 'appointment_date', Patients)
                                                                             setPatients(res)
                                                                      }}
                                                                      className="hover:cursor-pointer hover:text-blue-300"
                                                                      title="sort desc"
                                                               />
                                                        </div>
                                                 </div>
                                          </th>
                                          <th scope="col" className="py-3 px-6">
                                                 <div className="flex items-center justify-between">
                                                        Date of record
                                                        <div className="flex flex-col space-y-2">
                                                               <div className="flex flex-col space-y-2">
                                                                      <UpOutlined
                                                                             onClick={() => {
                                                                                    let res = sorter('asc', 'created', Patients)
                                                                                    setPatients(res)
                                                                             }}
                                                                             className="hover:cursor-pointer hover:text-blue-300 "
                                                                             title="sort asd"
                                                                      />
                                                                      <DownOutlined
                                                                             onClick={() => {
                                                                                    let res = sorter('desc', 'created', Patients)
                                                                                    setPatients(res)
                                                                             }}
                                                                             className="hover:cursor-pointer hover:text-blue-300"
                                                                             title="sort desc"
                                                                      />
                                                               </div>
                                                        </div>
                                                 </div>
                                          </th>
                                          <th scope="col" className="py-3 px-6">
                                                 <div className="flex items-center justify-between">Actions</div>
                                          </th>
                                   </tr>
                            </thead>
                            <tbody>
                                   {Patients?.map((p) => {
                                          return (
                                                 <tr className="  " key={p?._id}>
                                                        <td
                                                               scope="row"
                                                               className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                                        >
                                                               {p.name}
                                                        </td>
                                                        <td className="py-4 px-6">{p.code}</td>

                                                        <td className="py-4 px-6">{p.address}</td>
                                                        <td className="py-4 px-6 ">{p.phone}</td>
                                                        <td className="py-4 px-6 ">
                                                               {p.appointment_status === 'passed' ? (
                                                                      <PatientStatus
                                                                             color="bg-[#eff3f2] text-[#8eab9d]"
                                                                             text={p.appointment_status}
                                                                      />
                                                               ) : (
                                                                      ''
                                                               )}
                                                               {p.appointment_status === 'pending' ? (
                                                                      <PatientStatus
                                                                             color="bg-blue-300  text-blue-500"
                                                                             text={p.appointment_status}
                                                                      />
                                                               ) : (
                                                                      ''
                                                               )}
                                                               {p.appointment_status === 'rescheduled' ? (
                                                                      <PatientStatus
                                                                             color="bg-[#fcf5ee] text-[#d2b460]"
                                                                             text={p.appointment_status}
                                                                      />
                                                               ) : (
                                                                      ''
                                                               )}
                                                               {p.appointment_status === 'missed' ? (
                                                                      <PatientStatus
                                                                             color="bg-[#fbdee2] text-[#cd747c]"
                                                                             text={p.appointment_status}
                                                                      />
                                                               ) : (
                                                                      ''
                                                               )}
                                                        </td>
                                                        <td className="py-4 px-6 text-center">{p.sex}</td>
                                                        <td className="py-4 px-6 text-center">
                                                               {p.appointment_date?.split('T')[0]}
                                                        </td>
                                                        <td className="py-4 px-6 text-center">
                                                               {p.created?.split('T')[0]}
                                                        </td>
                                                        <td className="py-4 px-6 text-center">
                                                               <div className="flex justify-center items-center space-x-4">
                                                                      <Link
                                                                             href={{
                                                                                    pathname: '/patient-details',
                                                                                    query: {
                                                                                           id: p._id,
                                                                                    },
                                                                             }}
                                                                      >
                                                                             <EyeOutlined
                                                                                    className="hover:text-blue-400 hover:cursor-pointer"
                                                                                    title="show details"
                                                                             />
                                                                      </Link>
                                                                      <Link
                                                                             href={{
                                                                                    pathname: '/registration',
                                                                                    query: {
                                                                                           id: p._id,
                                                                                    },
                                                                             }}
                                                                      >
                                                                             <EditOutlined
                                                                                    className="hover:text-blue-400 hover:cursor-pointer"
                                                                                    title="show details"
                                                                             />
                                                                      </Link>
                                                               </div>
                                                        </td>
                                                 </tr>
                                          )
                                   })}
                            </tbody>
                     </table>

                     {/* Pagination */}
                     <nav className='flex justify-center items-center mb-4 '> 
                            <ul className="flex  justify-center items-center space-x-3 bg-white max-w-[500px] px-5 py-1 rounded-lg ">
                                   <li className="flex justify-center items-center">
                                
                                          <LeftOutlined  onClick={prevPage}/>  
                                                 
                                 
                                   </li>
                                   {pageNumbers.map((pgNumber) => (
                                          <li
                                                 key={pgNumber}
                                                 className={`py-1 px-[12px] rounded-md cursor-pointer ${currentPage == pgNumber ? 'bg-[#f3e9e8]' : ''
                                                        } `}
                                          >
                                                 <div 
                                                        onClick={() => setCurrentPage(pgNumber)}
                                                       
                                                        href="#"
                                                 >
                                                        {pgNumber}
                                                 </div>
                                          </li>
                                   ))}
                                   <li className="flex justify-center items-center ">
                                         
                                          <RightOutlined  onClick={nextPage}/>
                                          
                                   </li>
                            </ul>
                     </nav>
              </div>
              </div>
              
       )
}
