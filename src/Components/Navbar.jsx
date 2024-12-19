import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import {useWindowScroll} from "react-use"
import { TiLocationArrow } from 'react-icons/ti'
import gsap from 'gsap'
const navItems=["Nexus","Vault","Proleague","About","Contact"]
const Navbar = () => {
    const {y:currentScrollY} = useWindowScroll();
    
    const [isAudioplaying,setIsAudioPlaying]=useState(false)
    const [isindicatorActive, setIsindicatorActive] = useState(false)
    const [lastScrollY, setlastScrollY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true)
    const navContainerRef=useRef(null)
    const audioElementRef=useRef(null)
    const toggleAudioIndicator=()=>{
        setIsAudioPlaying((prev)=>!prev);
        setIsindicatorActive((prev)=>!prev);

    }
    useEffect(()=>{
        if(currentScrollY===0){
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        }else if(currentScrollY>lastScrollY){
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        } 
        else if(currentScrollY<lastScrollY){
            setIsNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        } 

        setlastScrollY(currentScrollY)

    },[currentScrollY,lastScrollY])
    useEffect(()=>{
        gsap.to(navContainerRef.current,{
         y:isNavVisible?0:-100,
         opacity:isNavVisible?1:0,
         duration:0.2,   
        })

    },[isNavVisible])
    useEffect(()=>{
        if(isAudioplaying){
            audioElementRef.current.play();
        }else{
            audioElementRef.current.pause();
        }

    },[isAudioplaying])

  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 '>
        <header className='absolute top-1/2 w-full -translate-y-1/2' >
        <nav className='flex size-full item-center justify-between p-4' >
            <div className='flex items-center gap-7'>
                <img src="/img/logo.png" alt="logo" className='w-10' />
                <Button id="product-button"
                title="products"
                rightIcon={<TiLocationArrow/>}
                containerClass="bg-blue-50 md:flex hidden item-center justfy-center gap-1"
                />
            </div>
            <div className="flex h-full items-center">
                <div className="hidden md:block">
                    {navItems.map((item)=>(
                      <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                    {item}
                      </a>  
                    ))}
                </div>
                <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
                    <audio className='hidden' ref={audioElementRef}  src="/audio/loop.mp3" loop/>{[1,2,3,4].map((bar)=>(
                        <div key={bar} className={` indicator-line ${setIsindicatorActive ? "active": ""}`} style={{animationDelay:`${bar*0.1}s`}}></div>
                    ))}
                 
                </button>

            </div>
        </nav>
        </header>

    </div>
  )
}

export default Navbar