export function Footer({name}) {
    const label = {footer: name || "Sleepy Gallows Studio"}
    const year = new Date().getFullYear();
    return (
     <footer>
         <small>Copyright © {year} <em>{label.footer}</em> - All Rights Reserved.</small>
     </footer>
    );
  }