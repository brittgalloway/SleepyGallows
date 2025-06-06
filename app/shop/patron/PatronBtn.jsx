'use client'
import { useState, useRef } from 'react'
import { 
	stripePromise,
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
	const numberInput = useRef(null);
	const [ hasError, setHasError ] = useState(false);
	const [ loading, setLoading ] = useState(false);

	const onFrequencyChange = (event) => {
		const frequency = event.target.value;
		setPatronFrequency(frequency);
		setHasError(false);

		if (frequency == 'monthly'){
			setPatronAmount(PATRON_MONTHLY_5);
		}
		else if (frequency == 'yearly'){
			setPatronAmount(PATRON_YEARLY_60);
		}
		else {
			setPatronAmount(PATRON_5);
		}
	};
	const handleCheckout = async () => {
		setLoading(true);
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
		if (!response.ok) {
			setHasError(true);
			setLoading(false);
			const errorMessage = await response.text();
			console.error('Error creating checkout session:', errorMessage);
		}
		const session = await response.json();
	  
		const stripe = await stripePromise;
		const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
		if (error) {
			setHasError(true);
			setLoading(false);
		 	console.error('Error:', error);
		}
	};
	function PatronField( fieldName, interval, defaultChecked,
		testId1, testId2, testId3, testId4,
		price1, price2, price3, suggested,
		stripePrice1, stripePrice2, stripePrice3,
	) {
		this.fieldName = fieldName;
		this.interval = interval;
		this.defaultChecked = defaultChecked;
		this.testId1 = testId1;
		this.testId2 = testId2;
		this.testId3 = testId3;
		this.testId4 = testId4;
		this.price1 = price1;
		this.price2 = price2;
		this.price3 = price3;
		this.suggested = suggested;
		this.stripePrice1 = stripePrice1;
		this.stripePrice2 = stripePrice2;
		this.stripePrice3 = stripePrice3;
		this.onAmountChange = (event) => {
			setHasError(false);	
			numberInput.current.value = '';
			const selectedAmount = JSON.parse(event.target.dataset.amount);
			setPatronAmount(selectedAmount);
		};
		this.onValueChange = (event) => {
			setHasError(false);
			const price = event.target.value;
			const interval = event.target.dataset.interval !== 'once' ? event.target.dataset.interval : null;
			setPatronAmount(
				{
					price: price,
					interval: interval,
				}
			);
		};
	}
	
	const patronOnce = new PatronField('one_amount', 'once', 1, 'once_5', 'once_10', 'once_15', 'once_pc', 5, 10, 15, 3, PATRON_5, PATRON_10, PATRON_15);
	
	const patronMonthly = new PatronField('monthly_amount', 'month', 1, 'monthly_5', 'monthly_10', 'monthly_15', 'monthly_pc', 5, 10, 15, 3, PATRON_MONTHLY_5, PATRON_MONTHLY_10, PATRON_MONTHLY_15);
	
	const patronYearly = new PatronField('yearly_amount', 'year', 2, 'yearly_12', 'yearly_10', 'yearly_120', 'yearly_pc', 12, 60, 120, 6, PATRON_YEARLY_12, PATRON_YEARLY_60, PATRON_YEARLY_120);
	
	return (
		<form className={patronStyles.form}> 
			<h2>Become a Patron</h2>
			<fieldset className={`${patronStyles.fieldset} ${patronStyles.frequency}`}>
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
			{patronFrequency == 'monthly' && FieldSet(patronMonthly, hasError, numberInput)}
			{patronFrequency == 'once' && FieldSet(patronOnce, hasError, numberInput)}
			{patronFrequency == 'yearly' && FieldSet(patronYearly, hasError, numberInput)}
			<button type="button" onClick={handleCheckout} className={patronStyles.support}>
				{loading ? <div aria-label="A spinning dotted circle while the computer thinks." className="spinner"></div> : 'Support'}
			</button>
		</form>
	)
}
function FieldSet (opts, hasError, numberInput){
	return(
	<fieldset className={`${patronStyles.fieldset} ${patronStyles.prices}`}>
		<label>
			${opts.price1}
			<input type="radio" data-testid={opts.testId1} name={opts.fieldName} defaultChecked={opts.defaultChecked === 1 ? true:false} data-amount={JSON.stringify(opts.stripePrice1)} onChange={opts.onAmountChange}/>
		</label>
		<label>
			${opts.price2}
			<input type="radio" data-testid={opts.testId2} name={opts.fieldName} defaultChecked={opts.defaultChecked === 2 ? true:false} data-amount={JSON.stringify(opts.stripePrice2)} onChange={opts.onAmountChange}/>
		</label>
		<label>
			${opts.price3}
			<input type="radio" data-testid={opts.testId3} name={opts.fieldName} defaultChecked={opts.defaultChecked === 3 ? true:false} data-amount={JSON.stringify(opts.stripePrice3)} onChange={opts.onAmountChange}/>
		</label>
		<label className={`${patronStyles.patronChoice}`}>
			Patron&apos;s Choice
			<input type="number" 
				data-testid={opts.testId4}
				name={opts.fieldName} 
				data-interval={opts.interval}
				pattern="^\d+?(\.\d{0,2})$"
				min={1}
				step="0.01"
				placeholder={opts.suggested}
				onChange={opts.onValueChange}
				ref={numberInput}
				aria-invalid={hasError}
				aria-describedby={hasError ? "element-error" : ''}/>
			{hasError && <p id="element-error" role="alert">The number must be between 1 and 999999.</p>}
		</label>
	</fieldset>
	)
}