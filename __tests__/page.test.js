import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
 
describe('Page', () => {
  it('renders 4 links', () => {
    render(<Home />)
 
    const heading = screen.getAllByRole('link')
 
    expect(heading[0]).toBeInTheDocument()
  })
})