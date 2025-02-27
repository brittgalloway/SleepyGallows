'use client'
import { useState } from "react"
import { stripePromise} from '@/lib/stripe'
import { 
	PATRON_5,
	PATRON_10,
	PATRON_15,
	PATRON_MONTHLY_5,
	PATRON_MONTHLY_10,
	PATRON_MONTHLY_15,
	PATRON_YEARLY_12,
	PATRON_YEARLY_60,
	PATRON_YEARLY_120
 } from '@/lib/stripe'
import patronStyles from '@/shop/patron/patron.module.scss'

export function StripePatron() {
	const [ patronFrequency, setPatronFrequency ] = useState('monthly');
	const [ patronAmount, setPatronAmount ] = useState(PATRON_MONTHLY_5);

	const onFrequencyChange = (event) => {
		const frequency = event.target.value;
		setPatronFrequency(frequency);

		if (frequency == 'monthly'){
			setPatronAmount(PATRON_MONTHLY_5);
		}
		else if (frequency == 'yearly'){
			setPatronAmount(PATRON_YEARLY_60);
		}
		else {
			setPatronAmount(PATRON_5);
		}
	}

	const onAmountChange = (event) => {
		const selectedAmount = JSON.parse(event.target.dataset.amount);
		setPatronAmount(selectedAmount);
		
	};
	const onValueChange = (event) => {
		const price = event.target.value;
		const interval = event.target.dataset.interval !== 'once' ? event.target.dataset.interval : null;
		setPatronAmount(
			{
				price: price,
				interval: interval,
			}
		);

	};
	const handleCheckout = async () => {
	  
		const response = await fetch('/api/create_patron', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ patron:
			{
				price: parseFloat(patronAmount.price).toFixed(2),
				interval: patronAmount.interval,
			}
		  }),
		});
	  
		const session = await response.json();
	  
		const stripe = await stripePromise;
		const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
		if (error) {
		  console.error('Error:', error);
		}
	  };
	return (
		<form className={patronStyles.form}> 
				<h2>Become a Patron</h2>
			<fieldset className={patronStyles.fieldset}>
				<label>
					One-Time
					<input type="radio" name="patron_frequency" value="once" onChange={onFrequencyChange}/>
				</label>
				<label>
					Monthly
					<input type="radio" defaultChecked name="patron_frequency" value="monthly" onChange={onFrequencyChange}/>
				</label>
				<label>
					Yearly
					<input type="radio" name="patron_frequency" value="yearly" onChange={onFrequencyChange}/>
				</label>
			</fieldset>
			{patronFrequency == 'monthly' ? (
				<fieldset className={`${patronStyles.fieldset} ${patronStyles.prices}`} >
					<label>
						$5
						<input type="radio" data-testid="monthly_5" name="monthly_amount" defaultChecked data-amount={JSON.stringify(PATRON_MONTHLY_5)} onChange={onAmountChange}/>
					</label>
					<label>
						$10
						<input type="radio" data-testid="monthly_10" name="monthly_amount" data-amount={JSON.stringify(PATRON_MONTHLY_10)} onChange={onAmountChange}/>
					</label>
					<label>
						$15
						<input type="radio" data-testid="monthly_15" name="monthly_amount" data-amount={JSON.stringify(PATRON_MONTHLY_15)} onChange={onAmountChange}/>
					</label>
					<label>
						Patron&apos;s Choice
						<input type="number" 
							data-testid="monthly_pc"
							name="monthly_amount" 
							data-interval="month" 
							pattern="^\d+?(\.\d{0,2})$"
							step="0.01"
							onChange={onValueChange}/>
					</label>
				</fieldset>
				) : ''
			}
			{patronFrequency == 'once' ? (
				<fieldset className={`${patronStyles.fieldset} ${patronStyles.prices}`} >
					<label>
					$5
					<input type="radio" data-testid="once_5" name="one_amount" defaultChecked data-amount={JSON.stringify(PATRON_5)} onChange={onAmountChange}/>
				</label>
				<label>
					$10
					<input type="radio" data-testid="once_10" name="one_amount" data-amount={JSON.stringify(PATRON_10)} onChange={onAmountChange}/>
				</label>
				<label>
					$15
					<input type="radio" data-testid="once_15" name="one_amount" data-amount={JSON.stringify(PATRON_15)} onChange={onAmountChange}/>
				</label>
				<label>
					Patron&apos;s Choice
					<input type="number"
						data-testid="once_pc"
						name="one_amount" 
						data-interval="once"
						pattern="^\d+?(\.\d{0,2})$"
						step="0.01"
						onChange={onValueChange}/>
					</label>
				</fieldset>
				) : ''
			}
			{patronFrequency == 'yearly' ? (
				<fieldset className={`${patronStyles.fieldset} ${patronStyles.prices}`}>
					<label>
						$12
						<input type="radio" data-testid="yearly_12" name="yearly_amount" data-amount={JSON.stringify(PATRON_YEARLY_12)} onChange={onAmountChange}/>
					</label>
					<label>
						$60
						<input type="radio" data-testid="yearly_60" name="yearly_amount" defaultChecked data-amount={JSON.stringify(PATRON_YEARLY_60)} onChange={onAmountChange}/>
					</label>
					<label>
						$120
						<input type="radio" data-testid="yearly_120" name="yearly_amount" data-amount={JSON.stringify(PATRON_YEARLY_120)} onChange={onAmountChange}/>
					</label>
					<label>
						Patron&apos;s Choice
						<input type="number" 
							data-testid="yearly_pc"
							name="yearly_amount" 
							data-interval="year"
							pattern="^\d+?(\.\d{0,2})$"
							step="0.01"
							onChange={onValueChange}/>
					</label>
				</fieldset>
				) : ''
			}
			<button type="button" onClick={handleCheckout} className={patronStyles.support}>Support</button>
		</form>
	)

}