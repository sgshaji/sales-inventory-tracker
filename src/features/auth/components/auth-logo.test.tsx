
import { render, screen } from '@testing-library/react';
import { AuthLogo } from './auth-logo';

describe('AuthLogo', () => {
  it('renders logo and company name', () => {
    render(<AuthLogo />);
    
    const logoImage = screen.getByAltText('Company Logo');
    const companyName = screen.getByText('Sales Tracker');
    
    expect(logoImage).toBeInTheDocument();
    expect(companyName).toBeInTheDocument();
  });
});
