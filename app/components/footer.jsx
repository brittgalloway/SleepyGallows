import { year } from "../utilities/formating"

export function Footer({name}) {
    const label = {footer: name || "Sleepy Gallows Studio"}
    return (
     <footer>
         <small>Copyright © {year} <em>{label.footer}</em> - All Rights Reserved.</small>
     </footer>
    );
  }