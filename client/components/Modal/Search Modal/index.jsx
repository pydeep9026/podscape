import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'

const SearchModal = ({ setShowSearchModal }) => {
    const searchRef = useRef(null)
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(false)
    const [results, setResults] = useState([])

    const searchEndpoint = (query) => `/api/search?q=${query}`

    const onChange = useCallback((event) => {
        onFocus()
        const query = event.target.value;
        setQuery(query)
        if (query.length) {
            fetch(searchEndpoint(query))
                .then(res => res.json())
                .then(res => {
                    setResults(res.results)
                })
        } else {
            setResults([])
        }
    }, [])

    const onFocus = useCallback(() => {
        setActive(true)
        window.addEventListener('click', onClick)
    }, [])

    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false)
            window.removeEventListener('click', onClick)
        }
    }, [])
    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setShowSearchModal(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full justify-center text-center items-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div
                                    className='relative'
                                    ref={searchRef}
                                >
                                    <div className="relative flex items-center sm:w-full w-[10rem] h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border sm:z-0 z-10">
                                        <div className="grid place-items-center h-full w-12 text-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                            </svg>
                                        </div>
                                        <input
                                            className="h-full w-full outline-none text-sm text-gray-700 pl-2"
                                            type="text"
                                            id="search"
                                            onChange={onChange}
                                            value={query}
                                            placeholder="Find Podcasts" />
                                        <div onClick={() => setShowSearchModal(false)} className="grid place-items-center h-full w-12 text-gray-300 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                    {active && results.length > 0 && (
                                        <ul className='absolute top-full list-none overflow-hidden mx-0 left-0 right-0 border rounded-b-lg'>
                                            {results.map(({ id, title, size, slug, type }) => (
                                                <li className='p-4 bg-white border-b cursor-pointer hover:bg-gray-50 duration-200' key={id}>
                                                    <Link href={`/${type}/${slug}`}>
                                                        {
                                                            type === 'product' ? <p>{`${title} - ${size}`}</p> : <p>{`${title}`}</p>
                                                        }
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default SearchModal