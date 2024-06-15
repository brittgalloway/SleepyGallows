export const USD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const year = new Date().getFullYear();

// add isMobile?? would it still work?