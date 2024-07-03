"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
var jwt =require("jsonwebtoken")

const page = () => {
  const router=useRouter()
  const [mentorarr, setmentorarr] = useState([]);

  useEffect(() => {
    let token=localStorage.getItem("token")
    let decoded = jwt.decode(token);
    console.log(decoded)
    if(token && decoded.exp>Math.floor( Date.now() / 1000 ) ){
      if(decoded.userrole=="mentee"){
        router.push('/mentee')
      }else if(decoded.userrole=="mentor"){
        router.push('/mentor')
      }else if(decoded.userrole=="admin"){
        router.push('/admin/allocatementor')
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
  
 
  const handleUpload = async (e) => {
    console.log("reading input file:");
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });

    //console.log(e.target.files[0]);
    //console.log(workbook);
    jsonData.shift();
    setmentorarr(jsonData);
    console.log(jsonData);
    
  };

  const submitdada =async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/allocatementor`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mentorarr: mentorarr }),
      });
      const response = await res.json();
      if(response.status==200){
        setmentorarr([])
          alert("Mentor Allocated Succesfully")
      }
      else{
        alert("Faile to Allocate Mentor")
      }
  }




  return (
    <div className="flex max-h-screen flex-col items-center justify-start">
      <div className="w-[90%] bg-transparent justify-center items-center p-4 rounded-lg my-2 ">
        <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="text-gray-600 mx-auto w-fit">
            <p class="font-bold text-white text-lg">Allocate Mentors</p>
          </div>
          <div class="text-gray-600 mx-auto w-fit my-2 text-center bg-white rounded p-3">
            <input className="w-[15rem]" onInput={(e) => handleUpload(e)} type="file"></input>
          </div>
          {mentorarr.length>0 && <><div class="relative overflow-x-auto overflow-y-auto h-fit max-h-[50vh]">
            <table class="w-full   text-sm text-left rtl:text-right text-[#002379]  ">
              <thead class="sticky top-0 text-md text-[#002379] uppercase bg-[#FF5F00] border-b border-blue-800 font-bolder">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Enrollment No.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Year
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Mentor Name.
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {mentorarr &&
                  mentorarr.map((row) => (
                    <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
                       {row.map((elem)=>
                        <td class="px-6 py-4">{elem}</td>
                       )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center my-2">
            <button 
            onClick={submitdada}
              type="button"
              className="mt-8 focus:outline-none text-white bg-[#002379] hover:bg-white hover:text-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              Add New
            </button>
          </div></>}
        </div>
      </div>
    </div>
  );
};

export default page;
