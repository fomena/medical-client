
import React  from "react"
export default function Header( props) {
       

       return (
              <div className="border w-full bg-[#423a38] h-[45px] border-none fixed z-10 ">
                     <div className="h-full border w-1/3 bg-[#5e92a7] rounded-br-full border-none px-[1rem] py-[0.5]  flex space-x-6 items-center">
                            <span className="text-[#eaf5f4] text-lg font-bold" >DrNG</span>
                            <span className="border border-none bg-[#aec7d9] w-[2px] h-1/2 "></span>
                            <span className="text-[#eaf5f4] text-lg font-bold "> { props.name}</span>


                     </div>

              </div>
       )
}