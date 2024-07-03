'use client'
import Link from 'next/link'
import { usePathname,useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
var jwt= require("jsonwebtoken")

const Navbar = () => {
  const [tooglenav, settooglenav] = useState(false)
  const [role, setrole] = useState()
  const router = useRouter()
  const path=usePathname()
  useEffect(() => {
    let token=localStorage.getItem("token")
    let decoded = jwt.decode(token);
    console.log(decoded)
    if(token && decoded.exp>Math.floor( Date.now() / 1000 ) ){
      if(decoded.userrole=="mentee"){
        if(path.includes("mentee")){
          router.push(path)
        }
        else{
          router.push("/mentee")
        }
        setrole("mentee")
      }else if(decoded.userrole=="mentor"){
        if(path.includes("mentor")){
          router.push(path)
        }
        else{
          router.push("/mentor")
        }
        setrole('mentor')

      }else if(decoded.userrole=="admin"){
        if(path.includes("admin")){
          router.push(path)
        }
        else{
          router.push("/admin")
        }
        setrole('admin')
      }else{
        setrole("")
        localStorage.removeItem("token")
        localStorage.removeItem("userrole")
      }
    }else{
      setrole("")
      localStorage.removeItem("token")
      localStorage.removeItem("userrole")
      router.push('/')
    }
  }, [role,path])

  const logoutfunc=()=>{
    setrole("")
    localStorage.removeItem("token")
    localStorage.removeItem("userrole")
  }

  return (
<nav class="bg-[#FF5F00] border-2 border-gray-200 m-2 rounded  sticky top-2 z-50">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MentorApp</span>
    </a>
    
      <button onClick={()=>settooglenav(!tooglenav)} data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 d" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        {tooglenav ?<svg class="w-5 h-5 font-bold" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path> </svg>

: <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>}
    </button>
    <div class={`${!tooglenav && "hidden"} w-full md:block md:w-auto`} id="navbar-default">
      <ul class="font-medium flex gap-2 flex-col  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#FF5F00] md:flex-row md:flex-wrap md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  ">
        {role=="mentee"&&<><li>
          <Link href="/" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/admin'&& "bg-transparent"} border-2 border-[#002379]`}>Home</Link>
        </li>
        <li>
          <Link href="/about" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/about'&& "bg-transparent"} border-2 border-[#002379]`}>About</Link>
        </li>
        <li>
          <Link href="/help" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/help'&& "bg-transparent"} border-2 border-[#002379]`}>Help</Link>
        </li>
        <li>
          <Link href="/contact" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/contact'&& "bg-transparent"} border-2 border-[#002379]`}>Contact</Link>
        </li></>}
        {role=="mentor"&&<><li>
          <Link href="/mentor" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/mentor'&& "bg-transparent"} border-2 border-[#002379]`}>Home</Link>
        </li>
        <li>
          <Link href="/about" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/about'&& "bg-transparent"} border-2 border-[#002379]`}>About</Link>
        </li>
        <li>
          <Link href="/help" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/help'&& "bg-transparent"} border-2 border-[#002379]`}>Help</Link>
        </li>
        <li>
          <Link href="/contact" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/contact'&& "bg-transparent"} border-2 border-[#002379]`}>Contact</Link>
        </li></>}
        {role=="admin"&&<>
        <li>
          <Link href="/admin" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/admin'&& "bg-transparent"} border-2 border-[#002379]`}>Home</Link>
        </li>
        <li>
          <Link href="/admin/addstudentsdetails" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/admin/addstudentsdetails'&& "bg-transparent"} border-2 border-[#002379]`}>Add Students</Link>
        </li>
        <li>
          <Link href="/admin/addmentors" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/admin/addmentors'&& "bg-transparent"} border-2 border-[#002379]`}>Add Mentor</Link>
        </li>
        <li>
          <Link href="/admin/allocatementor" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/admin/allocatementor'&& "bg-transparent"} border-2 border-[#002379]`}>Allocate Mentor</Link>
        </li>
        <li>
          <Link href="/admin/updatestudentdetails" class={`block py-2 px-3 bg-[#002379] rounded-lg hover:bg-transparent ${path=='/admin/updatestudentdetails'&& "bg-transparent"} border-2 border-[#002379]`}>Update Student</Link>
        </li>
        </>}
        {role!="" && <li>
        <button onClick={logoutfunc} class="w-fit mx-auto block py-2 px-3 text-white bg-[#ca3439] rounded-lg hover:bg-transparent border-2 border-[#4b3737]" aria-current="page">Logout</button>
        </li>}
      </ul>
    </div>
  </div>
</nav>

 
  )
}

export default Navbar