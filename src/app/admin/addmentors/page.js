"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
var jwt = require('jsonwebtoken')

const page = () => {
  const router=useRouter()
  const [menteesarr, setmenteesarr] = useState([]);
  const [mentors, setmentors] = useState([])
  const [toggle, settoggle] = useState(false);

  
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
    setmenteesarr(jsonData);
    console.log(menteesarr);
    
  };

  const submitdada =async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/addmentors`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menteesarr: menteesarr }),
      });
      const response = await res.json();
      if(response.status==200){
          alert("Data Inserted Succesfully")
      }
      else{
        alert("Faile to Insert")
      }
  }

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
        router.push('/admin/addmentors')
        getmentordata();
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
  
  const getmentordata = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/getmentors`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    setmentors(response.mentors);

    //   console.log(response.mentees)
  };



  return (
    <div className="flex max-h-screen flex-col items-center justify-start">
      <div className="w-[90%] bg-transparent justify-center items-center p-4 rounded-lg my-2 ">
      <div class="bg-[#FF5F00] rounded shadow-lg px-4 py-2 mb-6">
          <div class="flex justify-between items-center text-gray-600 mx-auto w-full">
            <p class="font-bold text-white text-lg">Admins</p>
            <button
              onClick={() => settoggle(true)}
              type="button"
              className=" text-white bg-[#002379] hover:bg-white hover:text-blue-800  font-medium rounded-lg text-sm px-5 py-2.5  "
            >
             Add New Mentors
            </button>
          </div>
          {mentors && mentors.length > 0 && (
            <>
              <div class="relative overflow-x-auto overflow-y-auto h-fit max-h-[70vh]">
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
                        Password
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Department
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Mobile No.
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mentors &&
                      mentors.map((row) => (
                        <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
                          <td class="px-6 py-4">{row.enrollment}</td>
                          <td class="px-6 py-4">{row.name}</td>
                          <td class="px-6 py-4">{row.password}</td>
                          <td class="px-6 py-4">{row.department}</td>
                          <td class="px-6 py-4">{row.phone}</td>
                          <td class="px-6 py-4">{row.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <dialog open={toggle} className="absolute top-[10%] mx-auto h-fit">
        <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8  w-[60vw]">
          <div class="text-gray-600 mx-auto w-fit">
          <button
                onClick={() => {settoggle(false);setmenteesarr([])}}
                type="button"
                className="relative top-0 left-[30rem] text-white bg-[#002379] hover:bg-white hover:text-blue-800  font-medium rounded-lg text-sm px-5 py-2.5  "
              >
                X
              </button>
            <p class="font-bold text-white text-lg">Add Mentor Details</p>
            
          </div>
          <div class="text-gray-600 mx-auto w-fit my-2 text-center bg-white rounded p-3">
            <input className="w-[15rem]" onInput={(e) => handleUpload(e)} type="file"></input>
          </div>
          {menteesarr.length>0 && <><div class="relative overflow-x-auto overflow-y-auto h-fit max-h-[50vh]">
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
                    Password
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Mobile No.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {menteesarr &&
                  menteesarr.map((row) => (
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
        </dialog>
      </div>
    </div>
  );
};

export default page;
