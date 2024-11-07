import style from '@/style/noClient.module.scss'

export function NoClients() {
  return (
   <aside className={style.aside}>
        <span className={style.span}>*</span>
        We are not currently accepting contract work or gigs at this time.
   </aside>
  );
}