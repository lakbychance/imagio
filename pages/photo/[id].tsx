import { GetStaticProps, GetStaticPropsContext } from "next"
import { fetchSingleImage, fetchImages } from "../../utils"
import styles from './Photo.module.css'
import Image from 'next/image'
import clsx from 'clsx'
import React, { useState } from "react"
import ImageData from "../../components/ImageData/ImageData"
import { useRouter } from 'next/router';
import Error from 'next/error'
import { UnsplashImage } from "../../interfaces"


const Photo = ({ data }: { data: UnsplashImage }) => {
    const [isSidebarOpen, toggleSidebar] = useState(false);
    const router = useRouter();
    if (data?.error) {
        return <Error statusCode={data.error} />
    }
    return <>
        <section className={styles.container}>
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.infoIcon} onClick={() => router.back()}>
                        <Image alt='Back icon' src="https://img.icons8.com/ios/100/000000/circled-left-2.png" width={35} height={35}></Image>
                    </div>
                    <div className={styles.infoIcon} onClick={() => toggleSidebar(isSidebarOpen => !isSidebarOpen)}>
                        <Image alt='Info icon' src='https://img.icons8.com/pastel-glyph/2x/info.png' width={25} height={25}></Image>
                    </div>
                </header>
                <section className={styles.image}>
                    {data && <Image
                        width={data.width}
                        height={data.height}
                        src={data.urls.full}
                        alt={data.alt_description}
                        blurDataURL={data.urls.small}
                        placeholder='blur'
                        objectFit='contain'
                        layout='responsive'
                    ></Image>}
                </section>
            </main>

            <aside className={clsx(styles.infoSidebar, isSidebarOpen && styles.showSidebar)}>
                <Image alt='Close icon' className={styles.closeIcon} src="https://img.icons8.com/windows/96/000000/macos-close.png" onClick={() => toggleSidebar(isSidebarOpen => !isSidebarOpen)} width={40} height={40}></Image>
                <section>
                    {data && <ImageData data={data} />}
                </section>
            </aside>
        </section>
    </>
}



export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    const data = await fetchSingleImage(params?.id as string);
    return { props: { data } };
}


export async function getStaticPaths() {
    let paths;
    try {
        const data = await fetchImages(1);
        paths = data.map((image: UnsplashImage) => ({
            params: { id: image.id },
        }));
    }
    catch (e) {
        paths = []
    }

    return { paths, fallback: true }
}

export default Photo;