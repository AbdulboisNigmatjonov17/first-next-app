"use client";

import { NotificationsOutlined, PersonOutlineOutlined, Search, VideoCallOutlined, YouTube } from '@mui/icons-material'
import Link from 'next/link';

export default function Navbar() {

    return (
        <nav className='h-[7dvh] px-5 flex justify-between items-center'>
            <Link href={'/'}>
                <div className='flex text-red-600 items-center'>
                    <YouTube fontSize='large' />
                    <h3 className='text-black text-[22px]'>YouTube</h3>
                </div>
            </Link>
            <form className='w-[600px] border border-black rounded-[100px] pl-5 h-[50px] flex'>
                <input type="text" placeholder='Search' className='outline-none h-full w-full' />
                <button className='w-[100px] border border-l-black rounded-r-[100px] hover:bg-black hover:text-white'>
                    <Search />
                </button>
            </form>
            <div className='flex gap-5 items-center'>
                <VideoCallOutlined fontSize='large' className='cursor-pointer' />
                <NotificationsOutlined fontSize='large' className='cursor-pointer' />
                <PersonOutlineOutlined fontSize='large' className='cursor-pointer' />
            </div>
        </nav>
    )
}
