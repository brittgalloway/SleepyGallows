import React from 'react'
import { Head } from './head'
import MainNavigation from './nav'

export default function Layout({ title }) {
  return(
    <>
      <Head title={ title } />
      <MainNavigation />
    </>
  )
}