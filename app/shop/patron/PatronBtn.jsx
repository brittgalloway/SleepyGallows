'use client'
import Script from 'next/script'
import { useEffect, useState } from "react"
import styles from '../page.module.scss';

export default function PatronButton() {
	const [accessPayPal, setaccessPayPal] = useState(false);
	useEffect(() => {
	  setaccessPayPal(true);
	}, [accessPayPal]);
	return (
	  <>
	  {/* consider making the hosted button id a variable */}
		{
		  accessPayPal === true ?  
		  <div id="donate-button-container">
			  <div id="donate-button" className={styles.donate}></div>
				<Script id="donate-button-script">
					{`
					PayPal.Donation.Button({
						env:'production',
						hosted_button_id:'2HJN6ZN822T6S', 
						image: {
						src:'https://pics.paypal.com/00/s/MDBiMGNkZDctZTNhMi00M2FiLWE5NjUtODM2NWIzZTM2NGE0/file.PNG',
						alt:'Donate with PayPal button',
						title:'PayPal - The safer, easier way to pay online!',
						}
					}).render('#donate-button');
					`}
				</Script>
			  </div>
			   : false
			}
		</>
	);
}