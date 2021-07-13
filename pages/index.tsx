import { GetStaticProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Grid from '../components/Grid/Grid';
import Link from 'next/link'
import Loader from '../components/Loader/Loader';
import Error from 'next/error'
import { fetchImages } from '../utils';
import { UnsplashImage } from '../interfaces/index'
import clsx from 'clsx';


export default function Home({ data }: { data: UnsplashImage[] & { error: number } }) {

  const [images, setImages] = useState<UnsplashImage[]>(data);
  const loaderRef = useRef<HTMLElement>(null);
  const isIntersecting = useIntersectionObserver(loaderRef)
  const pageRef = useRef(1);

  const handleFetch = useCallback(async () => {
    const data = await fetchImages(++pageRef.current);
    if (data.error) {
      return;
    }
    setImages(images => [...images, ...data]);
  }, [])

  useEffect(() => {
    if (isIntersecting)
      handleFetch();
  }, [images, isIntersecting, handleFetch])

  if (data?.error) {
    return <Error statusCode={data.error} />
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Imageio</title>
        <meta name="description" content="A NextJS powered image gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className='text-4xl font-bold text-blue-500'>Imagio</h1>
      </header>
      <main id='main' className={styles.main}>
        <Grid>
          {images.map((image: UnsplashImage) => {
            return <Link
              key={image.id} href={`/photo/${image.id}`} passHref={true}>
              <Image src={image.urls.small}
                alt={image.alt_description}
                width={640}
                height={640}
                className='cursor-pointer hover:opacity-80 rounded-xl'
                objectFit='cover'
                layout='responsive'
                placeholder='blur'
                blurDataURL={image.urls.thumb}
              >
              </Image>
            </Link>
          })}
        </Grid>
        <Loader ref={loaderRef} />
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchImages(1);
  return { props: { data } };
}
