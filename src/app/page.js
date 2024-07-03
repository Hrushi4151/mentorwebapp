"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { resolve } from "styled-jsx/css";
var jwt = require('jsonwebtoken');


export default function Home() {
  const router=useRouter();
  const [reload, setreload] = useState(true)
 
  const [logindata, setlogindata] = useState({
    enrollment: "",
    password: "",
    userrole: "mentee",
  });


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
  }, [reload])
  

 const loginsubmit=async(e)=>{
  e.preventDefault()
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: logindata }),
  });
  const response = await res.json();
  console.log(response)
  if(response.status==200){
    alert("Login Successfull")
    setreload(!reload)
    localStorage.setItem("token",response.token)
    localStorage.setItem("userrole",logindata.userrole)
    setlogindata({
      enrollment: "",
      password: "",
      userrole: "mentee",
    })
  }else{
    alert("Login Failed.Please Try Again")
  }
 }


  return (
    <main className="flex flex-col items-center justify-start p-8">
      <h1 className="text-4xl text-orange-500 font-bold my-4 text-center">
        Welcome to Student Mentoring App
      </h1>

      <div class="bg-white mt-4 mx-auto p-5 w-[70vw] md:w-[40vw] lg:w-[30vw] h-fit border-2 border-black rounded-lg py-4 ">
        <h1 className="w-fit mx-auto text-xl text-orange-800 font-bold my-4">
          Login as
        </h1>
        <div class="flex flex-wrap  flex-row justify-evenly items-center mb-5">
          <button
            onClick={(e) => setlogindata({ ...logindata, userrole: "mentee" })}
            class={`flex-1 m-1  bg-blue-700 ${logindata.userrole=="mentee" ? "text-blue-800 border-2 font-bold border-orange-600 bg-white" :""}  hover:bg-blue-800 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            Student
          </button>

          <button
            onClick={(e) => setlogindata({ ...logindata, userrole: "mentor" })}
            class={`flex-1 m-1  bg-blue-700 ${logindata.userrole=="mentor" && "text-blue-800 border-2 font-bold border-orange-600 bg-white"}  hover:bg-blue-800 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            Mentor
          </button>
          <button
            onClick={(e) => setlogindata({ ...logindata, userrole: "admin" })}
            class={`flex-1 m-1  bg-blue-700 ${logindata.userrole=="admin" && "text-blue-800 border-2 font-bold border-orange-600 bg-white"}  hover:bg-blue-800 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            Admin
          </button>
        </div>
        <div class="mb-5 ">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Enrollment No.
          </label>
          <input
            onChange={(e) =>
              setlogindata({ ...logindata, enrollment: e.target.value })
            }
            value={logindata.enrollment}
            type="text"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Enter Enrollment No."
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            onChange={(e) =>
              setlogindata({ ...logindata, password: e.target.value })
            }
            value={logindata.password}
            type="text"
            id="password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            placeholder="Enter Password"
          />
        </div>

        <div className="flex w-full justify-center items-center">
          <button
            onClick={(e) => loginsubmit(e)}
            class=" text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
