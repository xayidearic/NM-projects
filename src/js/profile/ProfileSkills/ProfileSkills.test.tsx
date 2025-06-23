import { describe, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import { mockUseGetUserDataQuery } from '../ProfilePage.test';
import ProfileSkills from './ProfileSkills';

describe('ProfileSkills', () => {
  it('renders skills correctly', () => {
    const { getByText } = render(<ProfileSkills data={mockUseGetUserDataQuery().data} />);
    
    // Check if the skills are rendered
    expect(getByText('Agile Workflow')).toBeInTheDocument();
    expect(getByText('Bootstrap')).toBeInTheDocument();
    expect(getByText('Cascading Style Sheets (CSS)')).toBeInTheDocument();
    expect(getByText('Data Structures')).toBeInTheDocument();
    
    // Check if the "Show More" button is present
    expect(getByText('Show More')).toBeInTheDocument();
  });

  it('toggles skills visibility on button click', () => {
    const { getByText, queryByText } = render(<ProfileSkills data={mockUseGetUserDataQuery().data} />);
    
    // Initially, only a subset of skills should be visible
    expect(queryByText('Web Development Services')).not.toBeInTheDocument(); // Should not be visible initially
    
    // Click the button to show more skills
    const showMoreButton = getByText('Show More');
    fireEvent.click(showMoreButton);
    
    // Now all skills should be visible
    expect(getByText('Web Development Services')).toBeInTheDocument();
  });
});