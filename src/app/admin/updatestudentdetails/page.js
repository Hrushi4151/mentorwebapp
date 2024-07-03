'use client'

import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
var jwt=require("jsonwebtoken")

export default function Page() {
const router=useRouter()
const [id, setid] = useState(""); 
const [data, setdata] = useState() 
const [cdata, setcdata] = useState() 
const [acadata,setacadata]=useState();
const semarr = [0, 1, 2, 3, 4, 5];

const searchdata =async()=>{
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/getstudentdetail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enrollment: id }),
      });
      const response = await res.json();
      if(response.status==200){
        setdata(response.mentees)
        setcdata(response.mentees)
        setacadata(Object.values(response.mentees.academics));
          alert("Data Found")
      }
      else{
        alert("Nor Data Found")
      }
}

const updatedata = async () => {
  let updateobj={}
  let semesterdata = {};
  semarr.forEach((index) => {
      const semesterProperty = `semester${index+1}`;
      
      let toinsertsemesterdata = {
          [semesterProperty]: acadata[index], // Use square brackets to create a dynamic property name
      };
      console.log(toinsertsemesterdata);

      semesterdata[semesterProperty] = toinsertsemesterdata[semesterProperty]; // Insert the object into semesterdata
    });
    updateobj={...data,academics:semesterdata}

    if (data!=updateobj) {
      console.log("data")
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}api/updatestudentdetails`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: updateobj }),
      }
    );
    const response = await res.json();
    if (response.status == 200) {
      alert("Data Updated Succesfully");
      searchdata(params.slug);
    } else {
      alert("Failed to Update");
    }
  }
}

  // const updatedata=async()=>{
  //   if(cdata!=data){const res = await fetch(`http://localhost:3000/api/updatestudentdetails`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ data: data }),
  //     });
  //     const response = await res.json();
  //     setdata(response.mentees)
  //     console.log(response.mentees)
  //     if(response.status==200){
  //         alert("Data Updated Succesfully")
  //     }
  //     else{
  //       alert("Failed to Update")
  //     }
  //   }
  // }

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
        router.push('/admin/updatestudentdetails')
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

    return (
      <>
        <div className="flex max-h-screen flex-col items-center justify-start ">
          <div className="w-[90%] bg-transparent justify-center items-center p-4 rounded-lg my-2 ">
            <h2 className="text-xl text-[#FFFAE6] font-bold text-center">
              Student Details
            </h2>
          </div>

         {!data && <div className=" grid gap-4 gap-y-2 text-sm grid-cols-2 lg:grid-cols-4  bg-transparent justify-center items-end p-4 rounded-lg my-2 ">
          <div class="col-span-3">
                          <label for="full_name">Enrollment No.</label>
                          <input
                          onChange={(e)=>{setid(e.target.value)}}
                            type="string"
                            name="enrollment"
                            id="enrollmemt"
                            class="h-10 text-black border mt-1 rounded px-4 w-full bg-gray-50"
                            value={id}
                            placeholder="Enter Enrollment No."
                          />
                        </div>
            <button type="button" onClick={searchdata} class="col-span-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2   focus:outline-none ">Search</button>

          </div>}
         {data &&  <div className="w-[90%] bg-white flex flex-wrap justify-around items-center p-4 rounded-lg ">
            <div class="container w-full mx-auto p-6">
              <div>
                <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-4">
                    <div class="text-gray-600">
                      <p class="font-bold text-white text-lg">Personal Details</p>
                    </div>

                    <div class="lg:col-span-3">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-3">
                          <label for="full_name">Department</label>
                          <input
                           onChange={(e)=>setdata({...data,department:e.target.value})}
                            type="text"
                            name="full_name"
                            id="full_name"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.department}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <label for="full_name">Year</label>
                          <input
                          onChange={(e)=>setdata({...data,year:e.target.value})}
                            type="text"
                            name="full_name"
                            id="full_name"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.year}
                          />
                        </div>
                        <div class="md:col-span-3">
                          <label for="full_name">Enrollment No.</label>
                          <input
                          disabled
                            type="text"
                            name="full_name"
                            id="full_name"
                            class="text-black  h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.enrollment}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <label for="full_name">Roll No.</label>
                          <input
                          onChange={(e)=>setdata({...data,roll:e.target.value})}
                            type="text"
                            name="full_name"
                            id="full_name"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.roll}
                          />
                        </div>
  
                        <div class="md:col-span-4">
                          <label for="full_name">Student Full Name</label>
                          <input
                          onChange={(e)=>setdata({...data,name:e.target.value})}
                            type="text"
                            name="full_name"
                            id="full_name"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.name}
                          />
                        </div>
                        <div class="md:col-span-1">
                          <label for="full_name">Age</label>
                          <input
                          onChange={(e)=>setdata({...data,age:e.target.value})}
                            type="text"
                            name="full_name"
                            id="full_name"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.age}
                          />
                        </div>
                        <div class="md:col-span-3">
                          <label for="full_name">Father Full Name</label>
                          <input
                          onChange={(e)=>setdata({...data,fathername:e.target.value})}
                            type="text"
                            name="full_name"
                            id="full_name"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.fathername}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <label for="full_name">Occupation</label>
                          <input
                          onChange={(e)=>setdata({...data,fatherocc:e.target.value})}
                            type="text"
                            name="full_name"
                            id="full_name"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.fatherocc}
                          />
                        </div>
                        <div class="md:col-span-3">
                          <label for="full_name">Mother Full Name</label>
                          <input
                          onChange={(e)=>setdata({...data,mothername:e.target.value})}
                            type="text"
                            name="full_name"
                            id="full_name"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.mothername}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <label for="full_name">Occupation</label>
                          <input
                          onChange={(e)=>setdata({...data,motherocc:e.target.value})}
                            type="text"
                            name="full_name"
                            id="full_name"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.motherocc}
                          />
                        </div>
  
                        <div class="md:col-span-3">
                          <label for="email">Email Address</label>
                          <input
                          onChange={(e)=>setdata({...data,email:e.target.value})}
                            type="text"
                            name="email"
                            id="email"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.email}
                            placeholder="email@domain.com"
                          />
                        </div>
                        <div class="md:col-span-2">
                          <label for="email">Mobile No.</label>
                          <input
                          onChange={(e)=>setdata({...data,mobile:e.target.value})}
                            type="text"
                            name="email"
                            id="email"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.mobile}
                            placeholder="Mobile Number"
                          />
                        </div>
  
                        <div class="md:col-span-3">
                          <label for="address">Address / Street</label>
                          <input
                          onChange={(e)=>setdata({...data,address:e.target.value})}
                            type="text"
                            name="address"
                            id="address"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.address}
                            placeholder=""
                          />
                        </div>
  
                        <div class="md:col-span-2">
                          <label for="city">Pin Code</label>
                          <input
                           onChange={(e)=>setdata({...data,pincode:e.target.value})}
                            type="text"
                            name="city"
                            id="city"
                            class="text-black h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.pincode}
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  

                <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div class="text-gray-600">
                  <p class="font-bold text-white text-lg">Academic Details</p>
                </div>
                <div class="relative overflow-x-auto overflow-y-auto h-fit max-h-[50vh]">
                  <table class="w-full   text-sm text-left rtl:text-right text-[#002379]  ">
                    <thead class="sticky top-0 text-md text-[#002379] uppercase bg-[#FF5F00] border-b border-blue-800 font-bolder">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Semester
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Attendance
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Percentage
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Result
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      
                    {acadata  &&
                          semarr.map((index) => (
                            <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
                              <th
                                scope="row"
                                class="px-6 py-4  text-[#002379] whitespace-nowrap "
                              >
                                Sem {index + 1}
                              </th>
                              <td class="px-6 py-4">
                                <input
                                  onChange={(e) => {
                                    setacadata(prevAcadata => {
                                      const updatedAcadata = [...prevAcadata];
                                      updatedAcadata[index] = {
                                        ...updatedAcadata[index],
                                        attendance: e.target.value
                                      };
                                      return updatedAcadata; 
                                    });
                                  }}
                                  type="text"
                                  name="city"
                                  id="city"
                                  class="text-black h-10 border rounded px-4 w-full bg-gray-50"
                                  value={acadata[index] && acadata[index].attendance}
                                  placeholder=""
                                />
                              </td>
                              <td class="px-6 py-4">
                                <input
                                 onChange={(e) => {
                                  setacadata(prevAcadata => {
                                    const updatedAcadata = [...prevAcadata]; 
                                    updatedAcadata[index] = {
                                      ...updatedAcadata[index], 
                                      percentage: e.target.value 
                                    };
                                    return updatedAcadata; 
                                  });
                                }}
                                  type="text"
                                  name="city"
                                  id="city"
                                  class="text-black h-10 border rounded px-4 w-full bg-gray-50"
                                  value={acadata[index] && acadata[index].percentage}
                                  placeholder=""
                                />
                              </td>
                              <td class="px-6 py-4">
                                <a
                                  href="#"
                                  class=" px-2 py-3 bg-blue-800 rounded-lg font-medium text-white  hover:underline"
                                >
                                  View
                                </a>
                              </td>
                            </tr>
                          ))}
                    
                    </tbody>
                  </table>
                    <h2 className="text-white text-lg w-full text-center font-bold mt-4">No Data</h2>

                </div>
              </div>


                <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 ">
                  <div class="text-gray-600">
                    <p class="font-bold text-white text-lg">
                      Mentor Details
                    </p>
                  </div>
                  <div class="relative overflow-x-auto overflow-y-auto h-[38vh]">
                    <table class="w-full   text-sm text-left rtl:text-right text-[#002379]  ">
                      <thead class="sticky top-0 text-md text-[#002379] uppercase bg-[#FF5F00] border-b border-blue-800 font-bolder">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Year
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Mentor Name
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
                          <th
                            scope="row"
                            class="px-6 py-4  text-[#002379] whitespace-nowrap "
                          >
                            First Year (FY)
                          </th>
                          <td class="px-6 py-4"><input
                            onChange={(e)=>setdata({...data,mentors:{fy:e.target.value,sy:data.mentors.sy,ty:data.mentors.ty}})}
                            type="text"
                            name="city"
                            id="city"
                            class="text-black h-10 border rounded px-4 w-full bg-gray-50"
                            value={data.mentors.fy}
                            placeholder=""
                          /></td>
                        </tr>
                        <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
                          <th
                            scope="row"
                            class="px-6 py-4  text-[#002379] whitespace-nowrap "
                          >
                            Second Year (SY)
                          </th>
                          <td class="px-6 py-4"><input
                          onChange={(e)=>setdata({...data,mentors:{fy:data.mentors.fy,sy:e.target.value,ty:data.mentors.ty}})}
                            type="text"
                            name="city"
                            id="city"
                            class="text-black h-10 border rounded px-4 w-full bg-gray-50"
                            value={data.mentors.sy}
                            placeholder=""
                          /></td>
                        </tr>
                        <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
                          <th
                            scope="row"
                            class="px-6 py-4  text-[#002379] whitespace-nowrap "
                          >
                            Third Year (TY)
                          </th>
                          <td class="px-6 py-4"><input
                          onChange={(e)=>setdata({...data,mentors:{fy:data.mentors.fy,sy:data.mentors.sy,ty:e.target.value}})}
                            type="text"
                            name="city"
                            id="city"
                            class="text-black h-10 border rounded px-4 w-full bg-gray-50"
                            value={data.mentors.ty}
                            placeholder=""
                          /></td>
                        </tr>
                        
                      </tbody>
                    </table>
                  </div>
                 <div className="flex justify-center items-center my-2">
            <button 
            onClick={updatedata}
              type="button"
              className=" focus:outline-none text-white bg-[#002379] hover:bg-white hover:text-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  "
            >
              Save
            </button>
          </div>
                </div>
                
              </div>
            </div>
          </div>}
        </div>
      </>
    );
  }
  