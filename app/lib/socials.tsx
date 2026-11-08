import type { ReactNode } from 'react'
import { YOUTUBE, INSTAGRAM, INSTAGRAM_BG, INSTA_CANDYFLUFFS, TIKTOK_CANDYFLUFFS, INSTA_2HEROES, PATREON_2HEROES, TWITTER_2HEROES } from '@/lib/data'

const icons = {
  youtube: <svg aria-hidden="true" focusable="false" width="22.5" height="20" viewBox="0 0 576 512"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>,
  instagram: <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>,
  tiktok: <svg aria-hidden="true" focusable="false" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z"/></svg>,
  twitter: <svg aria-hidden="true" focusable="false" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M357.2 48L427.8 48 273.6 224.2 455 464 313 464 201.7 318.6 74.5 464 3.8 464 168.7 275.5-5.2 48 140.4 48 240.9 180.9 357.2 48zM332.4 421.8l39.1 0-252.4-333.8-42 0 255.3 333.8z"/></svg>,
  patreon: <svg aria-hidden="true" focusable="false" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M490 153.8c-.1-65.4-51-119-110.7-138.3-74.2-24-172-20.5-242.9 12.9-85.8 40.5-112.8 129.3-113.8 217.8-.8 72.8 6.4 264.4 114.6 265.8 80.3 1 92.3-102.5 129.5-152.3 26.4-35.5 60.5-45.5 102.4-55.9 72-17.8 121.1-74.7 121-150l-.1 0z"/></svg>,
} satisfies Record<string, ReactNode>

export type Social = {
  href: string
  platform: string       
  handle: string    
  icon: ReactNode
}

export const SOCIALS = {
  youtube:          { href: YOUTUBE,            platform: 'YouTube',   handle: 'Sleepy Gallows', icon: icons.youtube },
  instagram:        { href: INSTAGRAM,          platform: 'Instagram', handle: 'Sleepy Gallows', icon: icons.instagram },
  instagramBg:      { href: INSTAGRAM_BG,       platform: 'Instagram', handle: 'Brittney',       icon: icons.instagram },
  instaCandyfluffs: { href: INSTA_CANDYFLUFFS,  platform: 'Instagram', handle: 'Candyfluffs',    icon: icons.instagram },
  tiktokCandyfluffs:{ href: TIKTOK_CANDYFLUFFS, platform: 'TikTok',    handle: 'Candyfluffs',    icon: icons.tiktok },
  patreon2heroes:{ href: PATREON_2HEROES, platform: 'Patreon',    handle: '2Heroes',    icon: icons.patreon },
  insta2heroes:{ href: INSTA_2HEROES, platform: 'Instagram',    handle: '2Heroes',    icon: icons.instagram },
  twitter2heroes:{ href: TWITTER_2HEROES, platform: 'TikTok',    handle: '2Heroes',    icon: icons.twitter },
} satisfies Record<string, Social>

export type SocialKey = keyof typeof SOCIALS