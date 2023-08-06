import React from "react";
import { Head } from "./head";
import MainNavigation from "./nav"

export default function Layout(props) {
  return(
    <>
      <Head title={props.title}/>
      <MainNavigation />
    </>
  )
}