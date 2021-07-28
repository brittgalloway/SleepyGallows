import React from "react";
import Aside from "./aside";



export default function Layout({ children }) {
  return (
    <>
        <Aside/>
        <Content/>
    </>
  )
}