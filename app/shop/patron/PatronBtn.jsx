'use client'
import { useState } from 'react';
import { STRIPE_PUBLIC } from '@/app/utilities/formating'
import styles from '../page.module.scss'
require('dotenv').config();

function OneDonation() {
	return (
		<stripe-buy-button
			buy-button-id="buy_btn_1PVi7MJiAoJrRPIxXmderocZ"
  			publishable-key={ process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
		/>
	);
}
function RecurringDonation() {
	return (
		<stripe-buy-button
			buy-button-id="buy_btn_1PVmxgJiAoJrRPIx4UwBcn6j"
			publishable-key={ process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
		/>
	);
}
  
export function PatronOptions() {
	return (
		<div>
			<OneDonation/>
			<RecurringDonation/>
		</div>
	);
}
export function PatronButton() {
	const [isOpen, setIsOpen] = useState(false);
	function handleClick() {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	}
	return (
		<>
			{isOpen ? ( <PatronOptions/> ) : null}
			<button onClick={handleClick}>Be a Patron</button>
		</>
	);
}