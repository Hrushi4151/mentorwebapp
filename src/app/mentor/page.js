'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
var jwt=require('jsonwebtoken')

const page = () => {
  const [data, setdata] = useState()
  const [tdata, settdata] = useState()
  const router=useRouter()
  const [searchdata, setsearchdata] = useState(
    {
        batch:"all",
        enrollment:""        
    }
)



useEffect(() => {
    let token=localStorage.getItem("token")
    let decoded = jwt.decode(token);
    console.log(decoded)
    if(token && decoded.exp>Math.floor( Date.now() / 1000 ) ){
      if(decoded.userrole=="mentee"){
        router.push('/mentee')
      }else if(decoded.userrole=="mentor"){
        router.push('/mentor')
        getmenteedata(null,decoded.name)
      }else if(decoded.userrole=="admin"){
        router.push('/admin')
      }else{
        localStorage.removeItem("token")
        localStorage.removeItem("userrole")
      }
    }else{
      localStorage.removeItem("token")
      localStorage.removeItem("userrole")
      router.push('/')
    }
  }, [])


const getmenteedata =async(batch=null,profname)=>{
        let fdata={batch:batch,
            profname:profname
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/getmentees`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: fdata }),
          });
          const response = await res.json();
          setdata(response.mentees)
          settdata(response.mentees)
        //   console.log(response.mentees)
    }

    const sortdata =()=>{
          const sorteddata=[]
          data.map((elem)=>{
            // if(elem.batch==searchdata.batch && searchdata.enrollment==""){
            //     return elem
            // }else 
            // if(elem.batch==searchdata.batch && searchdata.enrollment==elem.enrollment){
            //     return elem
            // }
            if(searchdata.enrollment==elem.enrollment){
                sorteddata.push(elem)
            }
          })
          settdata(sorteddata)
          console.log(data)
          console.log(sorteddata)
    }



  return (
    <div className='flex max-h-screen flex-col items-center justify-start  '>
        <div className='w-[90%] bg-transparent justify-center items-center p-4 rounded-lg my-2 '>
            <h2 className='text-xl text-[#FFFAE6] font-bold text-center'>Mentees Details</h2>
       </div>

       <div className='w-[90%] bg-[#FFFAE6] flex flex-wrap justify-around items-center p-4 rounded-lg '>
        <div className='flex flex-col justify-center items-center'>
            <h2 className='text-xl text-[#002379] font-bold text-center'>Totol Mentees</h2>
            <h2 className='text-xl text-[#c94141] font-bold text-center'>{data && data.length}</h2>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <h2 className='text-lg text-[#002379] font-bold'>FY Mentees:30</h2>
            <h2 className='text-lg text-[#002379] font-bold'>SY Mentees:10</h2>
            <h2 className='text-lg text-[#002379] font-bold'>TY Mentees:10</h2>
        </div>
       </div>

       <div className='w-[90%] bg-transparent flex flex-wrap justify-center items-center p-1 rounded-lg my-2'>
        <div className='flex flex-col justify-center items-center'>
        <div className=" grid gap-4  text-sm grid-cols-5 lg:grid-cols-5  bg-transparent justify-center items-end p-1 rounded-lg my-2 ">
          <div class="col-span-2">
                          <label for="full_name">Batch</label>
                          <select onChange={(e)=>setsearchdata({batch:e.target.value,enrollment:searchdata.enrollment})} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
    <option className='text-lg text-black 'value="all" selected>All</option>
    <option className='text-lg text-black ' value="2021-22">2021-22</option>
    <option className='text-lg text-black ' value="2022-23">2022-23</option>
    <option className='text-lg text-black ' value="2023-24">2023-24</option>
  </select>
                        </div>
          <div class="col-span-2">
                          <label for="full_name">Enrollment No. (optinal)</label>
                          <input
                         onChange={(e)=>setsearchdata({batch:searchdata.batch,enrollment:e.target.value})}
                            type="string"
                            name="enrollment"
                            id="enrollmemt"
                            class="h-10 text-black border mt-1 rounded px-4 w-full bg-gray-50"
                            value={searchdata.enrollment}
                            placeholder="Enter Enrollment No."
                          />
                        </div>
            <button type="button" onClick={sortdata} class="col-span-1 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5   focus:outline-none ">Search</button>

          </div>
        </div>
       </div>

       <div className='w-[90%] bg-[#FFFAE6] justify-center items-center p-4 rounded-lg my-2 '>  

      <div class="relative overflow-x-auto overflow-y-auto h-fit max-h-[50vh]">
    <table class="w-full   text-sm text-left rtl:text-right text-[#002379]  ">
        <thead class="sticky top-0 text-md text-[#002379] uppercase bg-[#FF5F00] border-b border-blue-800 font-bolder">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Roll No.
                </th>
                <th scope="col" class="px-6 py-3">
                Enrollment No.
                </th>
                <th scope="col" class="px-6 py-3">
                    Student Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Year
                </th>
                <th scope="col" class="px-6 py-3">
                    Details
                </th>
            </tr>
        </thead>
        <tbody>

           {tdata && tdata.map((elem)=>
           
           <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
           <th scope="row" class="px-6 py-4  text-[#002379] whitespace-nowrap ">
              { elem.roll}
           </th>
           <td class="px-6 py-4">
               {elem.enrollment}
           </td>
           <td class="px-6 py-4">
               {elem.name}
           </td>
           <td class="px-6 py-4">
               {elem.year}
           </td>
           <td class="px-6 py-4 ">
               <Link href={"/mentor/studentdetails/"+elem._id} className=' text-nowrap bg-red-400 px-3 py-2 rounded'>
                See Details
           </Link>
           </td>
       </tr>
        ) 
}

          
        
            
        </tbody>
    </table>
</div>

       </div>
       
       
    </div>
  )
}

export default page