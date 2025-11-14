'use client'
import { useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image';

export default function Banner () {
    const covers = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg']
    const [index, setIndex] = useState(0);

    return (
        <div className = {styles.banner} onClick={()=>{ setIndex(index+1)}}>
            <Image src={covers[index%3]} 
            alt='cover'
            fill = {true}
            priority 
            objectFit='cover'/>
            <div className={styles.bannerText}>
                 <h1 className='text-4xl font-medium'>Preorder your own Art Toys</h1>
                 <h3 className='text-xl'>Welcome!</h3>
            </div>
        </div>
    );
}