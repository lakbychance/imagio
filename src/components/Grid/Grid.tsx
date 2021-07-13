import React, { ReactChild, ReactChildren, ReactElement, ReactNode } from 'react'
import styles from './Grid.module.css'
const Grid = ({ children }: { children: ReactNode }) => {
  return <div className={styles.grid}>
    {children}
  </div>
}

export default Grid;