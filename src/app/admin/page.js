"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
var jwt = require("jsonwebtoken");

const page = () => {
  const router = useRouter();
  const [newadmin, setnewadmin] = useState({
    name:"",
    enrollment:"",
    password:"",
    email:"",
    phone:""
  });
  const [adminsarr, setadminsarr] = useState([]);
  const [toggle, settoggle] = useState(false);

 

  const submitdada = async () => {


    if(newadmin.enrollment!=""&& newadmin.name!=""&& newadmin.email!="" && newadmin.password!="" && newadmin.phone!="")   { const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/addadmins`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newadmin: newadmin }),
    });
    const response = await res.json();
    if (response.status == 200) {
      alert("Admin Added Succesfully");
      settoggle(false);
      setnewadmin({
        name:"",
        enrollment:"",
        password:"",
        email:"",
        phone:""
      })
    } else {
      alert("Faile to Insert");
    }}else{
      alert("Please Fill All the Fields");
    }




  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let decoded = jwt.decode(token);
    console.log(decoded);
    if (token && decoded.exp > Math.floor(Date.now() / 1000)) {
      if (decoded.userrole == "mentee") {
        router.push("/mentee");
      } else if (decoded.userrole == "mentor") {
        router.push("/mentor");
      } else if (decoded.userrole == "admin") {
        router.push("/admin");
        getadmindata();
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userrole");
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userrole");
      router.push("/");
    }
  }, []);

  const getadmindata = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/getadmins`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    setadminsarr(response.admins);

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
              Create Admin
            </button>
          </div>
          {adminsarr.length > 0 && (
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
                        Mobile No.
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminsarr &&
                      adminsarr.map((row) => (
                        <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
                          <td class="px-6 py-4">{row.enrollment}</td>
                          <td class="px-6 py-4">{row.name}</td>
                          <td class="px-6 py-4">{row.password}</td>
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
        <dialog open={toggle} className="absolute top-[20%] mx-auto">
          <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 mb-6 w-[60vw]">
            
            <form class=" mx-auto w-full max-w-lg">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                   Enrollment
                  </label>
                  <input
onChange={(e) => {
  setnewadmin((prevAdmin) => ({
      ...prevAdmin,
      enrollment: e.target.value,
  }));
  console.log(newadmin);
}}
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    name="enrollment"
                    placeholder="Enter Enrollment No."
                  />
                  
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Password
                  </label>
                  <input
onChange={(e) => {
  setnewadmin((prevAdmin) => ({
      ...prevAdmin,
      password: e.target.value,
  }));
  console.log(newadmin);
}}
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                  />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Name
                  </label>
                  <input
onChange={(e) => {
  setnewadmin((prevAdmin) => ({
      ...prevAdmin,
      name: e.target.value,
  }));
  console.log(newadmin);
}}
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="text"
                    placeholder="Enter Name"
                  />
                  
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                   Email
                  </label>
                  <input

onChange={(e) => {
  setnewadmin((prevAdmin) => ({
      ...prevAdmin,
      email: e.target.value,
  }));
  console.log(newadmin);
}}

                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                  />
                  
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Phone No.
                  </label>
                  <input
onChange={(e) => {
  setnewadmin((prevAdmin) => ({
      ...prevAdmin,
      phone: e.target.value,
  }));
  console.log(newadmin);
}}
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="number"
                    placeholder="Enter Phone No."
                    name="phone"
                  />
                </div>
              </div>
              
              <div class="flex justify-around items-center text-gray-600 mx-auto w-full">
              
              <button
                onClick={submitdada}
                type="button"
                className="w-40 text-black bg-[#efefef] hover:bg-white hover:text-blue-800  font-medium rounded-lg text-sm px-5 py-2.5  "
              >
                Add
              </button>
          
            
              <button
                onClick={() => settoggle(false)}
                type="button"
                className="w-40 text-white bg-[#002379] hover:bg-white hover:text-blue-800  font-medium rounded-lg text-sm px-5 py-2.5  "
              >
                Cancel
              </button>
            </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default page;

{
  /* <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="text-gray-600 mx-auto w-fit">
            <p class="font-bold text-white text-lg">Add Sudent Details</p>
          </div>
          <div class="text-gray-600 mx-auto w-fit my-2 text-center bg-white rounded p-3">
            <input onInput={(e) => handleUpload(e)} type="file"></input>
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
        </div> */
}
