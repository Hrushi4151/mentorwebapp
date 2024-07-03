"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
var jwt = require("jsonwebtoken");

export default function Page({ params }) {
  const router = useRouter();
  const [data, setdata] = useState();
  const [acadata, setacadata] = useState();
  const [toogle, settoogle] = useState(false);
  const [extradata, setextradata] = useState({
    eventname: "",
    eventplace: "",
    rank: "",
  });
  const semarr = [0, 1, 2, 3, 4, 5];

  useEffect(() => {
    let token = localStorage.getItem("token");
    let decoded = jwt.decode(token);
    if (token && decoded.exp > Math.floor( Date.now() / 1000 )) {
      if (decoded.userrole == "mentee") {
        router.push("/mentee");
        if (decoded.enrollment !== null) {
          searchdata(decoded.enrollment);
        }
      } else if (decoded.userrole == "mentor") {
        router.push("/mentor");
      } else if (decoded.userrole == "admin") {
        router.push("/admin");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userrole");
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userrole");
      router.push("/");
    }
  }, [toogle]);

  const searchdata = async (enroll) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getstudentdetail`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enrollment: enroll }),
    });
    const response = await res.json();
    if (response.status == 200) {
      setacadata(Object.values(response.mentees.academics));
      setdata(response.mentees);
    } else {
      router.refresh();
    }
  };

  const updatedata = async (e) => {
    e.preventDefault();
    let extraaar = [...data.extraactivity, extradata];
    console.log(extraaar);
    let updateobj = {};
    updateobj = { ...data, extraactivity: extraaar };

    if (data != updateobj) {
      console.log("data");
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
        setextradata({
          eventname: "",
          eventplace: "",
          rank: "",
        });

        settoogle(false);
      } else {
        alert("Failed to Update");
      }
    }
  };

  return (
    <>
      <div className="flex max-h-screen flex-col items-center justify-start ">
        <div className="w-[90%] bg-transparent justify-center items-center p-4 rounded-lg my-2 ">
          <h2 className="text-xl text-[#FFFAE6] font-bold text-center">
            Student Details
          </h2>
        </div>

        {data && (
          <div className="w-[90%] bg-white flex flex-wrap justify-around items-center p-4 rounded-lg ">
            <div class="container w-full mx-auto p-6">
              <div>
                <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-4">
                    <div class="text-gray-600">
                      <p class="font-bold text-white text-lg">
                        Personal Details
                      </p>
                    </div>

                    <div class="lg:col-span-3">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-3">
                          <label for="full_name">Department</label>
                          <input
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                        {data &&
                          semarr.map((index) => (
                            <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
                              <th
                                scope="row"
                                class="px-6 py-4  text-[#002379] whitespace-nowrap "
                              >
                                Sem {index + 1}
                              </th>
                              <td class="px-6 py-4">
                                {acadata[index] && acadata[index].attendance}
                              </td>
                              <td class="px-6 py-4">
                                {acadata[index] && acadata[index].percentage}
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
                  </div>
                </div>

                <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="text-gray-600">
                    <p class="font-bold text-white text-lg">
                      ExtraCurricular Activities
                    </p>
                  </div>
                  <div class="relative overflow-x-auto overflow-y-auto h-fit max-h-[50vh]">
                    <table class="w-full   text-sm text-left rtl:text-right text-[#002379]  ">
                      <thead class="sticky top-0 text-md text-[#002379] uppercase bg-[#FF5F00] border-b border-blue-800 font-bolder">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Event name
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Event Place
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Position
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Certificate
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.extraactivity &&
                          data.extraactivity.map((elem, index) => (
                            <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
                              <th
                                scope="row"
                                class="px-6 py-4  text-[#002379] whitespace-nowrap "
                              >
                                {elem.eventname}
                              </th>
                              <td class="px-6 py-4">{elem.eventplace}</td>
                              <td class="px-6 py-4">{elem.rank}</td>
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
                  </div>
                  <div className="flex justify-center items-center my-2">
                    <button
                      onClick={() => settoogle(!toogle)}
                      type="button"
                      className="focus:outline-none text-white bg-[#002379] hover:bg-white hover:text-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  "
                    >
                      {toogle ? "Cancel" : "Add New"}
                    </button>
                  </div>
                  <dialog
                    open={toogle}
                    className="relative my-auto w-[50vw] h-fit z-10 border-2 border-black rounded-lg py-4"
                  >
                    <form class="max-w-sm mx-auto p-5">
                      <div class="mb-5">
                        <label
                          for="email"
                          class="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Event Name
                        </label>
                        <input
                          onChange={(e) =>
                            setextradata({
                              ...extradata,
                              eventname: e.target.value,
                            })
                          }
                          value={extradata.eventname}
                          type="text"
                          id="email"
                          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                          placeholder="Event Name"
                          required
                        />
                      </div>
                      <div class="mb-5">
                        <label
                          for="password"
                          class="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Event Place
                        </label>
                        <input
                          onChange={(e) =>
                            setextradata({
                              ...extradata,
                              eventplace: e.target.value,
                            })
                          }
                          value={extradata.eventplace}
                          type="text"
                          id="password"
                          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          required
                          placeholder="Event Place"
                        />
                      </div>
                      <div class="mb-5">
                        <label
                          for="repeat-password"
                          class="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Rank
                        </label>
                        <input
                          onChange={(e) =>
                            setextradata({ ...extradata, rank: e.target.value })
                          }
                          value={extradata.rank}
                          type="text"
                          id="repeat-password"
                          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          required
                          placeholder="Rank Scored"
                        />
                      </div>

                      <button
                        onClick={(e) => updatedata(e)}
                        class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      >
                        Add
                      </button>
                    </form>
                  </dialog>
                </div>

                <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 ">
                  <div class="text-gray-600">
                    <p class="font-bold text-white text-lg">Mentor Details</p>
                  </div>
                  <div class="relative overflow-x-auto overflow-y-auto h-fit max-h-[38vh]">
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
                          <td class="px-6 py-4">{data.mentors.fy}</td>
                        </tr>
                        <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
                          <th
                            scope="row"
                            class="px-6 py-4  text-[#002379] whitespace-nowrap "
                          >
                            Second Year (SY)
                          </th>
                          <td class="px-6 py-4">{data.mentors.sy}</td>
                        </tr>
                        <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
                          <th
                            scope="row"
                            class="px-6 py-4  text-[#002379] whitespace-nowrap "
                          >
                            Third Year (TY)
                          </th>
                          <td class="px-6 py-4">{data.mentors.ty}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// export default function Page() {

//   return (
//     <>
//       <div className="flex max-h-screen flex-col items-center justify-start ">
//         <div className="w-[90%] bg-transparent justify-center items-center p-4 rounded-lg my-2 ">
//           <h2 className="text-xl text-[#FFFAE6] font-bold text-center">
//             Student Details
//           </h2>
//         </div>
//         <div className="w-[90%] bg-white flex flex-wrap justify-around items-center p-4 rounded-lg ">
//           <div class="container w-full mx-auto p-6">
//             <div>
//               <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
//                 <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-4">
//                   <div class="text-gray-600">
//                     <p class="font-bold text-white text-lg">Personal Details</p>
//                   </div>

//                   <div class="lg:col-span-3">
//                     <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
//                       <div class="md:col-span-3">
//                         <label for="full_name">Department</label>
//                         <input
//                           type="text"
//                           name="full_name"
//                           id="full_name"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                         />
//                       </div>
//                       <div class="md:col-span-2">
//                         <label for="full_name">Year</label>
//                         <input
//                           type="text"
//                           name="full_name"
//                           id="full_name"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                         />
//                       </div>
//                       <div class="md:col-span-3">
//                         <label for="full_name">Enrollment No.</label>
//                         <input
//                           type="text"
//                           name="full_name"
//                           id="full_name"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                         />
//                       </div>
//                       <div class="md:col-span-2">
//                         <label for="full_name">Roll No.</label>
//                         <input
//                           type="text"
//                           name="full_name"
//                           id="full_name"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                         />
//                       </div>

//                       <div class="md:col-span-4">
//                         <label for="full_name">Student Full Name</label>
//                         <input
//                           type="text"
//                           name="full_name"
//                           id="full_name"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                         />
//                       </div>
//                       <div class="md:col-span-1">
//                         <label for="full_name">Age</label>
//                         <input
//                           type="text"
//                           name="full_name"
//                           id="full_name"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                         />
//                       </div>
//                       <div class="md:col-span-3">
//                         <label for="full_name">Father Full Name</label>
//                         <input
//                           type="text"
//                           name="full_name"
//                           id="full_name"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                         />
//                       </div>
//                       <div class="md:col-span-2">
//                         <label for="full_name">Occupation</label>
//                         <input
//                           type="text"
//                           name="full_name"
//                           id="full_name"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                         />
//                       </div>
//                       <div class="md:col-span-3">
//                         <label for="full_name">Mother Full Name</label>
//                         <input
//                           type="text"
//                           name="full_name"
//                           id="full_name"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                         />
//                       </div>
//                       <div class="md:col-span-2">
//                         <label for="full_name">Occupation</label>
//                         <input
//                           type="text"
//                           name="full_name"
//                           id="full_name"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                         />
//                       </div>

//                       <div class="md:col-span-3">
//                         <label for="email">Email Address</label>
//                         <input
//                           type="text"
//                           name="email"
//                           id="email"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                           placeholder="email@domain.com"
//                         />
//                       </div>
//                       <div class="md:col-span-2">
//                         <label for="email">Mobile No.</label>
//                         <input
//                           type="text"
//                           name="email"
//                           id="email"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                           placeholder="Mobile Number"
//                         />
//                       </div>

//                       <div class="md:col-span-3">
//                         <label for="address">Address / Street</label>
//                         <input
//                           type="text"
//                           name="address"
//                           id="address"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                           placeholder=""
//                         />
//                       </div>

//                       <div class="md:col-span-2">
//                         <label for="city">Pin Code</label>
//                         <input
//                           type="text"
//                           name="city"
//                           id="city"
//                           class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                           value=""
//                           placeholder=""
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
//                 <div class="text-gray-600">
//                   <p class="font-bold text-white text-lg">Academic Details</p>
//                 </div>
//                 <div class="relative overflow-x-auto overflow-y-auto h-[50vh]">
//                   <table class="w-full   text-sm text-left rtl:text-right text-[#002379]  ">
//                     <thead class="sticky top-0 text-md text-[#002379] uppercase bg-[#FF5F00] border-b border-blue-800 font-bolder">
//                       <tr>
//                         <th scope="col" class="px-6 py-3">
//                           Semester
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                           Attendance
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                           Percentage
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                           Result
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>

//                       <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
//                         <th
//                           scope="row"
//                           class="px-6 py-4  text-[#002379] whitespace-nowrap "
//                         >
//                           Sem 1
//                         </th>
//                         <td class="px-6 py-4">85%</td>
//                         <td class="px-6 py-4">88%</td>
//                         <td class="px-6 py-4">
//                           <a
//                             href="#"
//                             class=" px-2 py-3 bg-blue-800 rounded-lg font-medium text-white  hover:underline"
//                           >
//                             View
//                           </a>
//                         </td>
//                       </tr>

//                     </tbody>
//                   </table>

//                 </div>
//                  <div className="flex justify-center items-center">
//                   <button type="button" className="focus:outline-none text-white bg-[#002379] hover:bg-white hover:text-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Add New</button>
//                  </div>
//               </div>

//               <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
//                 <div class="text-gray-600">
//                   <p class="font-bold text-white text-lg">
//                     ExtraCurricular Activities
//                   </p>
//                 </div>
//                 <div class="relative overflow-x-auto overflow-y-auto h-[50vh]">
//                   <table class="w-full   text-sm text-left rtl:text-right text-[#002379]  ">
//                     <thead class="sticky top-0 text-md text-[#002379] uppercase bg-[#FF5F00] border-b border-blue-800 font-bolder">
//                       <tr>
//                         <th scope="col" class="px-6 py-3">
//                           Event name
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                           Event Place
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                           Position
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                           Certificate
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>

//                       <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
//                         <th
//                           scope="row"
//                           class="px-6 py-4  text-[#002379] whitespace-nowrap "
//                         >
//                           Compitition 1
//                         </th>
//                         <td class="px-6 py-4">Shirdi</td>
//                         <td class="px-6 py-4">2nd place</td>
//                         <td class="px-6 py-4">
//                           <a
//                             href="#"
//                             class=" px-2 py-3 bg-blue-800 rounded-lg font-medium text-white  hover:underline"
//                           >
//                             View
//                           </a>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="flex justify-center items-center">
//                   <button type="button" className="focus:outline-none text-white bg-[#002379] hover:bg-white hover:text-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Add New</button>
//                  </div>
//               </div>

//               <div class="bg-[#FF5F00] rounded shadow-lg p-4 px-4 md:p-8 ">
//                 <div class="text-gray-600">
//                   <p class="font-bold text-white text-lg">
//                     Mentor Details
//                   </p>
//                 </div>
//                 <div class="relative overflow-x-auto overflow-y-auto h-[32vh]">
//                   <table class="w-full   text-sm text-left rtl:text-right text-[#002379]  ">
//                     <thead class="sticky top-0 text-md text-[#002379] uppercase bg-[#FF5F00] border-b border-blue-800 font-bolder">
//                       <tr>
//                         <th scope="col" class="px-6 py-3">
//                           Year
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                           Mentor Name
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
//                         <th
//                           scope="row"
//                           class="px-6 py-4  text-[#002379] whitespace-nowrap "
//                         >
//                           First Year (FY)
//                         </th>
//                         <td class="px-6 py-4">Prof. ABCD ABDS</td>
//                       </tr>
//                       <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
//                         <th
//                           scope="row"
//                           class="px-6 py-4  text-[#002379] whitespace-nowrap "
//                         >
//                           Second Year (SY)
//                         </th>
//                         <td class="px-6 py-4">Prof. ABCD ABDS</td>
//                       </tr>
//                       <tr class="bg-[#FFFAE6] border-b border-blue-800 font-bold">
//                         <th
//                           scope="row"
//                           class="px-6 py-4  text-[#002379] whitespace-nowrap "
//                         >
//                           Third Year (TY)
//                         </th>
//                         <td class="px-6 py-4">Prof. ABCD ABDS</td>
//                       </tr>

//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* <form class="w-full mx-auto">

//   <div class="grid md:grid-cols-2 md:gap-6">
//     <div class="relative z-0 w-full mb-5 group">
//         <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//         <label for="floating_first_name" class="peer-focus:font-medium absolute text-lg text-[#002379]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enrollment No.</label>
//     </div>
//     <div class="relative z-0 w-full mb-5 group">
//         <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//         <label for="floating_last_name" class="peer-focus:font-medium absolute text-lg text-[#002379]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Roll No.</label>
//     </div>
//   </div>
//   <div class="grid md:grid-cols-2 md:gap-6">
//     <div class="relative z-0 w-full mb-5 group">
//         <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//         <label for="floating_first_name" class="peer-focus:font-medium absolute text-lg text-[#002379]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
//     </div>
//     <div class="relative z-0 w-full mb-5 group">
//         <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//         <label for="floating_last_name" class="peer-focus:font-medium absolute text-lg text-[#002379]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
//     </div>
//   </div>
//   <div class="grid md:grid-cols-2 md:gap-6">
//     <div class="relative z-0 w-full mb-5 group">
//         <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//         <label for="floating_phone" class="peer-focus:font-medium absolute text-lg text-[#002379]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
//     </div>
//     <div class="relative z-0 w-full mb-5 group">
//         <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//         <label for="floating_company" class="peer-focus:font-medium absolute text-lg text-[#002379]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
//     </div>
//   </div>
//   <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
// </form> */}
//       </div>
//     </>
//   );
// }
