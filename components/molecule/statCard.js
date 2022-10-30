
import React  from "react"
export default function StatCard(props) {
       

       return (
              <div className={`px-[1rem] py-[0.3rem] border border-none max-w-[200px] w-full ${props.bgClass} h-[75px] rounded-tr-[15px] rounded-bl-[15px] flex flex-col justify-between`}>
                     <span className="font-[505] text-sm">{ props.name}</span>
                     <span className={` ${props.vClass} font-bold text-lg` }>{ props.value}</span>
              </div>
       )
}