import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';

export default async function TopMenu() {
    noStore();
    const session = await getServerSession(authOptions)

    return (
        <div className={styles.menucontainer}>
            <Image src={'/img/logo.png'} className={styles.logoimg} alt='logo'
            width={0} height={0} sizes='100vh' />

            {/* show info */}
            <TopMenuItem title='Catalogue' pageRef='/toys'/>

            {/*  order page */}
            <TopMenuItem title='Order Toy' pageRef='/orders'/>

            {/* cart page */}
            <TopMenuItem title='My Orders' pageRef='/my-orders'/>

            {/* for admin */}
            <TopMenuItem title='Admin Menu' pageRef='/adminMenu'/>

            <div className="flex"> 
             {
                session? (
                    <Link href="/api/auth/signout">
                     <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                     Sign-Out of {session.user?.name}</div>
                    </Link>
                     ) : (
                    <> 
                     <Link href="/api/auth/signin">
                     <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                        Sign-In</div>
                        </Link>

                        <Link href="/register">
                            <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                            Sign-Up
                            </div>
                        </Link>
                    </>
                 )
             }
            </div>

        </div>
    );
}