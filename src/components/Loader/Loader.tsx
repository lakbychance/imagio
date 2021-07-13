import { ForwardedRef, forwardRef, LegacyRef, RefObject } from 'react'
import styles from './Loader.module.css'

const Loader = forwardRef((_, ref: ForwardedRef<HTMLElement>) => {
    return <div ref={ref as LegacyRef<HTMLDivElement>} className={styles.loader}></div>
})

Loader.displayName = 'Loader'

export default Loader;