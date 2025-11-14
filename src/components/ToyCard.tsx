import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function ToyCard( {toyName,imgSrc, onCompare} 
    : {toyName:string,imgSrc:string, onCompare?:Function}) {

    return (
        <InteractiveCard> 
            <div className= 'w-full'>
            <Image src={imgSrc}
                alt='Product Picture'
                width={300} 
                height={300}
                className='w-full h-auto object-contain'/>
            </div>

            <div className='w-full p-4 text-center font-semibold'>
                {toyName}
            </div>

            <div className='w-full flex justify-center p-2'>
            {
                onCompare? <button className='block text-sm rounded-md bg-sky-600
                hover:bg-indigo-600 mx-2 px-3 py-2 text-white shadow-sm'
                onClick={(e)=>{e.stopPropagation(); e.preventDefault() ;onCompare(toyName)}}
                >Compare</button> 
                : null 
            }
            </div>
        </InteractiveCard> 
    );
}