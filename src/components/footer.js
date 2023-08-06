import React from "react"

export function Footer(props) {
  const label = {footer: props.footer || "Sleepy Gallows Studio"}
  const year = new Date().getFullYear();
  return (
   <footer>
       <small>Copyright © {year} <em>{label.footer}</em> - All Rights Reserved.</small>
   </footer>
  );
}