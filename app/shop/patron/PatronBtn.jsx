'use client'
import { useState } from "react"
import { PATRON_LINK_CHOOSE,
	PATRON_LINK_5,
	PATRON_LINK_10,
	PATRON_LINK_MONTHLY_5,
	PATRON_LINK_MONTHLY_10,
	PATRON_LINK_MONTHLY_15,
	PATRON_LINK_YEARLY_12,
	PATRON_LINK_YEARLY_60,
	PATRON_LINK_YEARLY_120
 } from '@/lib/stripe';
import patronStyles from '@/shop/patron/patron.module.scss'

export function StripeButton() {
	const [ patronFrequency, setPatronFrequency ] = useState('monthly');
	const [ patronAount, setPatronAount ] = useState(PATRON_LINK_MONTHLY_5);

	const onFrequencyChange = frequncy => {
		setPatronFrequency(frequncy.target.value);
	}

	const onAmountChange = amount => {
		setPatronAount(amount.target.value);
	}

	return (
		<form className={patronStyles.form}> 
				<h2>Become a Patron</h2>
			<fieldset className={patronStyles.fieldset}>
				<label>
					One-Time
					<input type="radio" name='patron_frequency' value='once' onChange={onFrequencyChange}/>
				</label>
				<label>
					Monthly
					<input type="radio" defaultChecked name='patron_frequency' value='monthly' onChange={onFrequencyChange}/>
				</label>
				<label>
					Yearly
					<input type="radio" name='patron_frequency' value='yearly' onChange={onFrequencyChange}/>
				</label>
			</fieldset>
			{patronFrequency == 'monthly' ? (
				<fieldset className={patronStyles.fieldset} >
					<label>
					$5
					<input type="radio" name='monthly_amount' defaultChecked value={PATRON_LINK_MONTHLY_5} onChange={onAmountChange}/>
				</label>
				<label>
					$10
					<input type="radio" name='monthly_amount' value={PATRON_LINK_MONTHLY_10} onChange={onAmountChange}/>
				</label>
				<label>
					$15
				<input type="radio" name='monthly_amount' value={PATRON_LINK_MONTHLY_15} onChange={onAmountChange}/>
				</label>
				</fieldset>
				) : ''
			}
			{patronFrequency == 'once' ? (
				<fieldset className={patronStyles.fieldset} >
					<label>
					$5
					<input type="radio" name='one_amount' defaultChecked value={PATRON_LINK_5} onChange={onAmountChange}/>
				</label>
				<label>
					$10
					<input type="radio" name='one_amount' value={PATRON_LINK_10} onChange={onAmountChange}/>
				</label>
				<label>
					Pay What you want
					<input type="number" name='one_amount' placeholder="$5" onChange={onAmountChange}/>
				</label>
				</fieldset>
				) : ''
			}
			{patronFrequency == 'yearly' ? (
				<fieldset className={patronStyles.fieldset}>
					<label>
					$12
					<input type="radio" name='yearly_amount' value={PATRON_LINK_YEARLY_12} onChange={onAmountChange}/>
				</label>
				<label>
					$60
					<input type="radio" name='yearly_amount' defaultChecked value={PATRON_LINK_YEARLY_60} onChange={onAmountChange}/>
				</label>
				<label>
					$120
					<input type="radio" name='yearly_amount' value={PATRON_LINK_YEARLY_120} onChange={onAmountChange}/>
				</label>
				</fieldset>
				) : ''
			}
			<a href={patronAount} className={patronStyles.support}>Support</a>
		</form>
	)
}