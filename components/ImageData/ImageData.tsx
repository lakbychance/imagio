import styles from './ImageData.module.css'
import Image from 'next/image'
import { Exif, UnsplashImage } from '../../interfaces'
const ImageData = ({ data }: { data: UnsplashImage }) => {
    return (
        <section className={styles.container}>
            <header className={styles.heading}>
                <h3>
                    Info
                </h3>
            </header>

            <ul className={styles.imageDetails}>
                <li ><strong>Uploaded By:</strong> <span style={{ color: '#676767' }}>{data.user.name}</span></li>
                {data.description && <li ><strong>Description:</strong> <span style={{ color: '#676767' }}>{data.description}</span></li>}
                <li><strong>Dimensions:</strong> <span style={{ color: '#676767' }}>{data.width} X {data.height}</span> </li>
                <li><DateTime created_at={data.created_at} /></li>
                {data.exif.model && <li><ExifData exif={data.exif} /></li>}
                <li style={{ display: 'flex', alignItems: 'center' }}><strong style={{ paddingRight: 5 }}>{data.likes}</strong>   <Image alt='Liked by' src="https://img.icons8.com/color/48/000000/facebook-like--v1.png" width={20} height={20} /></li>
                <li style={{ display: 'flex', alignItems: 'center' }}><strong style={{ paddingRight: 5 }}>{data.views}</strong>   <Image alt='Viewed-by' src="https://img.icons8.com/office/80/000000/visible--v1.png" width={20} height={20} /></li>
                <li style={{ display: 'flex', alignItems: 'center' }}><strong style={{ paddingRight: 5 }}>{data.downloads}</strong>   <Image alt='Downloaded by' src="https://img.icons8.com/color/96/000000/downloads.png" width={20} height={20} /></li>
            </ul>

        </section>
    )
}

const ExifData = ({ exif }: { exif: Exif }) => {
    return (
        <section className={styles.datetime}>
            <div className={styles.icon}>
                <Image alt='Aperture icon' src="https://img.icons8.com/officel/80/000000/aperture.png" width={30} height={30} />
            </div>
            <ul className={styles.info}>
                {exif.model && <p className={styles.device}>{exif.model}</p>}
                <p>
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
    return (<section className={styles.datetime}>
        <div className={styles.icon}>
            <Image alt='Calendar icon' src="https://img.icons8.com/color/48/000000/calendar--v1.png" width={30} height={30} />
        </div>
        <div className={styles.info}>
            <p>{date} {month}</p>
            <p>{day}, {hours}:{minutes} GMT{timezone}</p>
        </div>
    </section>)
}

export default ImageData;

