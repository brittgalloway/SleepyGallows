import { 
    Grandstander, 
    Heebo,
    Cinzel_Decorative,
    Lato
} from 'next/font/google'
 
export const grandstander = Grandstander({
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

export const heebo = Heebo({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

export const lato = Lato({
    weight: ['300'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

export const cinzel_decorative = Cinzel_Decorative({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})