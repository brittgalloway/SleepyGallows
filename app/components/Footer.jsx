import { year } from '@/lib/utils'
import Beehiiv from './beehiiv';

export function Footer({name}) {
    const label = {footer: name || "Sleepy Gallows Studio"}
    return (
     <footer>
            <Beehiiv />
            <small>Copyright © {year} <em>{label.footer}</em> - All Rights Reserved.</small>
     </footer>
    );
  }
