'use client'
import Script from 'next/script'
import { useEffect, useState } from "react"
import styles from '../page.module.scss';

export default function PatronBtn() {
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
						env:'sandbox',
						hosted_button_id:'DTXXZKX7XT3EA', 
						image: {
						src:'https://pics-v2.sandbox.paypal.com/00/s/YzI3MTc5ZWItOGE5MS00ZDUyLWEyODgtZTZjNmQ0MGI0NjU5/file.PNG',
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