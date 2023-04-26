import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import Modal from '../components/Modal'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const [user, setUser] = useState(false)
    const [showSearchModal, setShowSearchModal] = useState(false)
    const [nav, setNav] = useState(false);
    const [color, setColor] = useState('transparent');
    const [textColor, setTextColor] = useState('white');
    const [shadow, setShadow] = useState('')
    const [creator, setcreator] = useState(null);

    const handleNav = () => {
        setNav(!nav);
    };

    useEffect(() => {
        const changeColor = () => {
            if (window.scrollY >= 90) {
                setColor('#131517');
                setTextColor('#ffffff');
                setShadow('shadow-md')
            } else {
                setColor('transparent');
                setTextColor('#ffffff');
                setShadow('')
            }
        };
        window.addEventListener('scroll', changeColor);
    }, []);


    useEffect(() => {
        async function setuserfunc() {
            if (!localStorage.getItem("chat-nexus-user")) {
            } else {
                setcreator(await JSON.parse(localStorage.getItem("chat-nexus-user")));
            }
        }
        setuserfunc();
    }, []);


    const handleSignOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("chat-nexus-user");
        setcreator(null);
        window.location.href = "/";
    }


    return (
        <div
            style={{ backgroundColor: `${color}` }}
            className={`navbar fixed left-0 top-0 w-full z-10 ease-in duration-300 ${shadow}`}
        >
            <div className='max-w-[1240px] m-auto flex justify-between items-center p-2 text-white'>
                <Link rel="preload" href='/'>
                    <Image quality="90" priority className='cursor-pointer' src='/logo.png' width="200" height="150" alt="navbarLogo" />
                </Link>
                <ul style={{ color: `${textColor}` }} className='hidden sm:flex'>
                    <li className='p-4 text-lg'>
                        <Link rel="preload" href='/'><h6 className='cursor-pointer'>Home</h6></Link>
                    </li>
                    <li className='p-4 text-lg'>
                        <Link rel="preload" href='/releases'><h6 className='cursor-pointer'>Releases</h6></Link>
                    </li>
                    <li className='p-4 text-lg'>
                        <Link rel="preload" href='/podcasts'><h6 className='cursor-pointer'>Podcasts</h6></Link>
                    </li>
                    <li className='p-4 text-lg'>
                        <Link rel="preload" href='/artists'><h6 className='cursor-pointer'>Artists</h6></Link>
                    </li>
                </ul>

                <div className="flex items-center space-x-2">
                    {
                        !showSearchModal &&
                        <button onClick={() => setShowSearchModal(true)} className='p-2 rounded-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    }
                    {
                        showSearchModal && <Modal showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal} />
                    }
                    {
                        !user && !creator &&
                        <>
                            <Link href="/login">
                                <button className='px-6 py-2 border border-sky-500 rounded-md text-sky-500 hover:bg-sky-500 hover:text-white'>Sign In</button>
                            </Link>
                            <Link href="/login-creator">
                                <button className='px-6 py-2 border border-sky-500 rounded-md text-sky-500 hover:bg-sky-500 hover:text-white'>Creator Sign In</button>
                            </Link>
                        </>
                    }
                    {user &&
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="rounded-full p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <form method="POST" action="#">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        type="submit"
                                                        onClick={handleSignOut}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block w-full px-4 py-2 text-left text-sm'
                                                        )}
                                                    >
                                                        Sign out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </form>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    }
                    {
                        creator &&
                        <Menu as="div" className="relative inline-block text-left">
                            <div>

                                <Menu.Button className="rounded-full p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Link href="/creator/dashboard">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Creator Dashboard
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Link>
                                        <form method="POST" action="#">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        type="submit"
                                                        onClick={handleSignOut}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block w-full px-4 py-2 text-left text-sm'
                                                        )}
                                                    >
                                                        Sign out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </form>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    }
                </div>

                {/* Mobile Button */}
                <div onClick={handleNav} className='block sm:hidden z-10'>
                    {nav ? (
                        <AiOutlineClose size={20} style={{ color: "#ffffff" }} />
                    ) : (
                        <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
                    )}
                </div>
                {/* Mobile Menu */}
                <div
                    className={
                        nav
                            ? 'sm:hidden absolute top-0 left-2/3 right-0 bottom-0 flex justify-center items-center w-1/3 h-screen bg-black text-center ease-out duration-300'
                            : 'sm:hidden absolute top-0 left-[100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
                    }
                >
                    <ul>
                        <li onClick={handleNav} className='p-4 text-2xl'>
                            <Link rel="preload" href='/'><h6 className='cursor-pointer'>Home</h6></Link>
                        </li>
                        <li onClick={handleNav} className='p-4 text-2xl'>
                            <Link rel="preload" href='/releases'><h6 className='cursor-pointer'>Releases</h6></Link>
                        </li>
                        <li onClick={handleNav} className='p-4 text-2xl'>
                            <Link rel="preload" href='/podcasts'><h6 className='cursor-pointer'>Podcasts</h6></Link>
                        </li>
                        <li onClick={handleNav} className='p-4 text-2xl'>
                            <Link rel="preload" href='/artists'><h6 className='cursor-pointer'>Artists</h6></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;