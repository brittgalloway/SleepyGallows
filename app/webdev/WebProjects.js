'use client'
import React, { useState } from 'react'
import { happy_monkey } from '@/app/fonts'
import Image from 'next/image'
import AnimatedIcons from '@/app/components/projectIcons'
import styles from './page.module.scss'

export default function  WebProjects({id, projectName, icon, description, liveApp, github}) {
    const [display, setDisplay] = useState(false);
    
    function handleClick() {
      display === true ? setDisplay(false) : setDisplay(true);
    }
    return (
      <>
        <div className={styles.projectWrapper} key={id} onClick={handleClick} >
            <AnimatedIcons
              title={icon.title}
            />
            <h2 style={happy_monkey.style}>{projectName}</h2>
            <p>development & design</p>
        </div>
        { display ? (
          <>
            <div className={styles.project} role="dialog" aria-modal="true" key={projectName}>
              <button className={styles.close} onClick={handleClick}>
                <Image
                  width={30}
                  height={30}
                  alt="a white 'x' to close the popup/dialog" 
                  src="data:image/svg+xml,%3Csvg width='30px' height='30px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='%23ffffff'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'/%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z' fill='%23ffffff'/%3E%3C/g%3E%3C/svg%3E" />
              </button>
              <div className={styles.projectInfo}> 
                <h2 className={happy_monkey.className}>{projectName}</h2>
                <div dangerouslySetInnerHTML={{ __html: description }}/>
                <a className={styles.btnPink} href={liveApp}>See it here</a> 
                <a className={styles.btnPurple} href={github}>Github</a>
              </div>
            </div>
            <div className={styles.backdrop} onClick={handleClick}></div>
          </>
        ) : null }
      </>
    )
  }