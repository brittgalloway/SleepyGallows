import { 
    Grandstander, 
    Cinzel_Decorative,
    Cinzel,
    Lato
} from 'next/font/google'
 
export const grandstander = Grandstander({
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--grandstander',
})


export const lato = Lato({
    weight: ['300','400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--lato',
})

export const cinzel_decorative = Cinzel_Decorative({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--cinzel_decorative',
})
export const cinzel = Cinzel({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--cinzel',
})