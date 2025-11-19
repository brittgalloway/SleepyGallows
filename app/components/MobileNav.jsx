'use client'
import Image from 'next/image'
import Link from 'next/link'
import { USER_ACCOUNT_LINK } from '@/lib/stripe'
import mainStyles from '@/style/MainNavigation.module.scss'
import shopStyles from '@/style/shopHeader.module.scss'
import textStyles from '@/style/titles.module.scss'

export default function MobileNav({navType, navId, testId, ariaLabel, navItems}) {
    function handleClick() {
        document.getElementById(`${navId}`).hidePopover();
    }
    return (
      <>
        <div className={shopStyles.mobile_menu} >
            <button className={shopStyles.hamburger} data-testid={testId} type="button" popoverTarget={navId}>
                <Image src='/hamburger.svg' 
                width={40} 
                height={30} 
                alt="Click here to open the navigation menu."/>
            </button>
            <dialog data-testid={navId} id={navId} popover="auto">
                <ul aria-label={ariaLabel} className={shopStyles.nav_list}>
                    {navType === 'main' && (
                        <li className={`${shopStyles.li} ${shopStyles.about}`}>
                            <Link className={`${mainStyles.a} ${textStyles.cinzelDec}`} onClick={handleClick} href="/about">
                                About
                            </Link>
                        </li>
                    )}
                    {navItems.map((link, index) => (
                    <li key={index}>
                        <Link href={`${navType === 'shop' ? '/shop/' : ''}${link}`} onClick={handleClick} className={`${textStyles.cinzelDec}`}>
                            {link.replace('-', ' ')}
                        </Link>
                    </li>
                    ))}
                    {navType === 'shop' && (
                        <li>
                            <a href={USER_ACCOUNT_LINK}>Account</a>
                        </li>
                    )}
                </ul>
            </dialog>
        </div>
      </>
    )
}