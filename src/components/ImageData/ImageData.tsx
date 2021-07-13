import styles from './ImageData.module.css'
import Image from 'next/image'
import { Exif, UnsplashImage } from '../../interfaces'
import clsx from 'clsx'
const ImageData = ({ data }: { data: UnsplashImage }) => {
    return (
        <section className={clsx(styles.container)}>
            <header className={styles.heading}>
                <h2 className='text-2xl font-bold text-gray-600'>Info</h2>
            </header>

            <ul className={styles.imageDetails}>
                <li ><strong className='text-gray-800'>Uploaded By:</strong> <span className='text-gray-600'>{data.user.name}</span></li>
                {data.description && <li ><strong className='text-gray-800'>Description:</strong> <span className='text-gray-600'>{data.description}</span></li>}
                <li><strong className='text-gray-800'>Dimensions:</strong> <span className='text-gray-600'>{data.width} X {data.height}</span> </li>
                <li><DateTime created_at={data.created_at} /></li>
                {data.exif.model && <li><ExifData exif={data.exif} /></li>}
                <li className='flex'><strong className='pr-1 text-gray-800'>{data.likes}</strong>   <Image alt='Liked by' src="https://img.icons8.com/color/48/000000/facebook-like--v1.png" width={20} height={20} objectFit='contain' /></li>
                <li className='flex'><strong className='pr-1 text-gray-800'>{data.views}</strong>   <Image alt='Viewed-by' src="https://img.icons8.com/office/80/000000/visible--v1.png" width={20} height={20} objectFit='contain' /></li>
                <li className='flex'><strong className='pr-1 text-gray-800'>{data.downloads}</strong>   <Image alt='Downloaded by' src="https://img.icons8.com/color/96/000000/downloads.png" width={20} height={20} objectFit='contain' /></li>
            </ul>

        </section>
    )
}

const ExifData = ({ exif }: { exif: Exif }) => {
    return (
        <section className={clsx(styles.datetime, 'shadow pl-1 rounded-lg')}>
            <div className={clsx(styles.icon,'flex')}>
                <Image alt='Aperture icon' src="https://img.icons8.com/officel/80/000000/aperture.png" width={30} height={30} />
            </div>
            <ul className={styles.info}>
                {exif.model && <p className={clsx(styles.device, 'text-gray-800')}>{exif.model}</p>}
                <p className='text-gray-600'>
                    {exif.aperture && <span>f/{exif.aperture}</span>}
                    {exif.exposure_time && <span>{exif.exposure_time}</span>}
                    {exif.focal_length && <span>{exif.focal_length / 100}mm</span>}
                    {exif.iso && <span> ISO{exif.iso}</span>}
                </p>
            </ul>
        </section>
    )
}

const DateTime = ({ created_at }: { created_at: string }) => {

    function parseMinutes(x: number) {
        let temp = Math.abs(x);
        const hours = Math.floor(temp / 60);
        const minutes = temp % 60;
        return x > 0 ? `+${hours}:${minutes}` : `-${hours}:${minutes}`
    }

    const datetime = new Date(created_at);
    const date = datetime.getDate();
    const month = datetime.toLocaleString('default', { month: 'short' });
    const day = datetime.toLocaleString('default', { weekday: 'short' });
    const hours = datetime.getUTCHours();
    const minutes = datetime.getUTCMinutes();
    const timezone = parseMinutes(datetime.getTimezoneOffset());
    return (<section className={clsx(styles.datetime, 'shadow pl-1 rounded-lg')}>
        <div className={clsx(styles.icon,'flex')}>
            <Image alt='Calendar icon' src="https://img.icons8.com/color/48/000000/calendar--v1.png" width={30} height={30} />
        </div>
        <div className={styles.info}>
            <p className='text-gray-800'>{date} {month}</p>
            <p className='text-gray-600'>{day}, {hours}:{minutes} GMT{timezone}</p>
        </div>
    </section>)
}

export default ImageData;

