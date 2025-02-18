'use client'
import { useState } from "react"
import { PATRON_LINK, PATRON_LINK_MONTHLY, PATRON_LINK_YEARLY } from '@/lib/stripe';
import patronStyles from '@/shop/patron/patron.module.scss'

export function StripeButton() {
	const [ patronLevel, setPatronLevel ] = useState(PATRON_LINK_MONTHLY);

	const onLevelChange = level => {
		setPatronLevel(level.target.value)
	  }

	return (
		<fieldset className={patronStyles.fieldset}>
			<legend>Become a Patron</legend>
			<label>
				One-Time
				<input type="radio" name={'patron'} value={PATRON_LINK} onChange={onLevelChange}/>
			</label>
			<label>
				Monthly
				<input type="radio" defaultChecked name={'patron'} value={PATRON_LINK_MONTHLY} onChange={onLevelChange}/>
			</label>
			<label>
				Yearly
				<input type="radio" name={'patron'} value={PATRON_LINK_YEARLY} onChange={onLevelChange}/>
			</label>
			<a href={patronLevel}>Support</a>
		</fieldset>
	)
}