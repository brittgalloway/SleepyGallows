import { grandstander } from '@/fonts'
import Image from 'next/image'
import Link from 'next/link'
import style from './page.module.scss'

export default function  WebContact() {

    return (
        <section className={style.contactSection}>
            <h2 className={grandstander.className} id='connect'>Connect w/Me!</h2>
            <ul className={style.ul}>
                <li className={style.li}>
                    <Link href="https://github.com/brittgalloway">
                        <Image 
                        width={60}
                        height={60}
                        alt="Github logo" 
                        src="data:image/svg+xml,%3Csvg width='60px' height='60px' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Egithub %5B%23142%5D%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Dribbble-Light-Preview' transform='translate(-140.000000, -7559.000000)' fill='%236B599E'%3E%3Cg id='icons' transform='translate(56.000000, 160.000000)'%3E%3Cpath d='M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399' id='github-%5B%23142%5D'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E" />
                    </Link>
                </li>
                <li className={style.li}>
                    <Link href="https://www.linkedin.com/in/brittneygalloway/">
                        <Image 
                        width={60}
                        height={60}
                        alt="LinkedIn logo" 
                        src="data:image/svg+xml,%3Csvg fill='%236B599E' height='60px' width='60px' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='-143 145 512 512' xml:space='preserve'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'/%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round' stroke='%23CCCCCC' stroke-width='1.024'/%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M329,145h-432c-22.1,0-40,17.9-40,40v432c0,22.1,17.9,40,40,40h432c22.1,0,40-17.9,40-40V185C369,162.9,351.1,145,329,145z M41.4,508.1H-8.5V348.4h49.9V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7 c18.4,0,29.7,11.9,30.1,27.7C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4 c-14.9,0-23.2,10-27,19.6c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6 c35.5,0,63.3,23,63.3,72.4V508.1z'/%3E%3C/g%3E%3C/svg%3E" />
                    </Link>
                </li>
                <li className={style.li}>
                    <Link href="mailto:crlnfllr@gmail.com">
                        <Image 
                        width={60}
                        height={60}
                        alt="email logo" 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60px' height='60px' viewBox='0 0 149 101' fill='none'%3E%3Crect width='160' height='115' fill='%23EBEBEB'/%3E%3Cg clip-path='url(%23clip0_2_27)'%3E%3Crect width='1440' height='4310' transform='translate(-1010 -3278)' fill='white'/%3E%3Cpath d='M115.346 9.00098L74.8461 36.6164L33.4199 9.00098V9.00842L33.47 9.04578V47.7147L74.3793 75.9268L115.346 48.804V9.00098Z' fill='%23EA4335'/%3E%3Cpath d='M125.978 2.28365L115.342 9.00085V48.804L148.809 26.3539V12.8296C148.809 12.8296 144.747 -6.48607 125.978 2.28365Z' fill='%23FBBC05'/%3E%3Cpath d='M115.342 48.8042V100.43H140.993C140.993 100.43 148.293 99.7732 148.818 92.5036V26.354L115.342 48.8042Z' fill='%2334A853'/%3E%3Cpath d='M33.4719 100.475V47.715L33.4199 47.6777L33.4719 100.475Z' fill='%23C5221F'/%3E%3Cpath d='M33.418 9.00744L22.8404 2.32753C4.07086 -6.44219 0 12.8661 0 12.8661V26.3899L33.418 47.6763V9.00744Z' fill='%23C5221F'/%3E%3Cpath d='M33.4199 9.00977V47.6788L33.4719 47.7161V9.04712L33.4199 9.00977Z' fill='%23C5221F'/%3E%3Cpath d='M0 26.3999V92.5494C0.51722 99.8268 7.8248 100.476 7.8248 100.476H33.4764L33.418 47.6787L0 26.3999Z' fill='%234285F4'/%3E%3Cg style='mix-blend-mode:color'%3E%3Crect width='149' height='100' fill='%236B599E'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_2_27'%3E%3Crect width='1440' height='4310' fill='white' transform='translate(-1010 -3278)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E" />
                    </Link>
                </li>
            </ul>
        </section>
    )
  }