'use client'

export function NoClients() {
  return (
   <aside style={{marginLeft: '20rem', textAlign:'center', fontSize: '1rem'}}>
        <span style={{color: 'var(--brand-color)', fontWeight: 'bold'}}>*</span>
        We are not currently accepting contract work or gigs at this time.
   </aside>
  );
}