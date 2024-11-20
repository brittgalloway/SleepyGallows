import '@testing-library/jest-dom'
import {cleanup, render, screen, fireEvent} from '@testing-library/react'
import WebContact from '@/webdev/WebContact'
import WebProject from '@/webdev/WebProjects'
import { afterEach } from 'node:test'

describe('WebContact Component', () => {
  it('renders a heading', () => {
    render(<WebContact/>)
 
    const heading = screen.getByRole('heading', { level: 2 })
 
    expect(heading).toBeInTheDocument()
  })
})

describe('WebProjects Component', () => {
  const mockProject = {
    id: '2',
    projectName: 'Sleepy Gallows',
    icon: { title: 'Sample Icon' },
    description: '<p>Sample description</p>',
    liveApp: 'https://www.sleepygallows.com/',
    github: 'https://github.com/brittgalloway/SleepyGallows'
  };

  afterEach(cleanup);
  // CLICK EVENTS
  it('opens the dialog when the .projectWrapper is clicked and closes when the close button is clicked', () => {
    render(<WebProject {...mockProject} />);
    const projectWrapper = screen.getByTestId(mockProject.id);

    // Click the wrapper div to open the dialog
    fireEvent.click(projectWrapper);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Click the close button to close the dialog
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(dialog).not.toBeInTheDocument();
  });
  it('opens the dialog when the .projectWrapper is clicked and closes when the backdrop is clicked', () => {
    render(<WebProject {...mockProject} />);
    const projectWrapper = screen.getByTestId(mockProject.id);

    // Click the wrapper div to open the dialog
    fireEvent.click(projectWrapper);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Click the close button to close the dialog
    const close = screen.getByTestId('backdrop');
    fireEvent.click(close);
    expect(dialog).not.toBeInTheDocument();
  });
  it('opens the dialog when the .projectWrapper is clicked and redirects to the live app when "See it here" link is clicked', () => {
    render(<WebProject {...mockProject} />);

    const projectWrapper = screen.getByTestId(mockProject.id);

    // Click the wrapper div to open the dialog
    fireEvent.click(projectWrapper);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Click on the "See it here" link
    const liveAppLink = screen.getByText('See it here');
    expect(liveAppLink).toBeInTheDocument();
    expect(liveAppLink).toHaveAttribute('href', mockProject.liveApp);

    // Simulate clicking the link
    fireEvent.click(liveAppLink);
  });
  it('opens the dialog when the .projectWrapper is clicked and redirects to the live app when "Github" link is clicked', () => {
    render(<WebProject {...mockProject} />);

    const projectWrapper = screen.getByTestId(mockProject.id);

    // Click the wrapper div to open the dialog
    fireEvent.click(projectWrapper);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Click on the "Github" link
    const github = screen.getByText('Github');
    expect(github).toBeInTheDocument();
    expect(github).toHaveAttribute('href', mockProject.github);

    // Simulate clicking the link
    fireEvent.click(github);
  });
  // KEYPRESS EVENTS
  it('opens the dialog when the .projectWrapper receives the Enter keydown event and closes when the backdrop receives Enter or Space keydown event', () => {
    render(<WebProject {...mockProject} />);
    const projectWrapper = screen.getByTestId(mockProject.id);

    // Simulate keydown event on the wrapper div to open the dialog
    fireEvent.keyDown(projectWrapper, { code: 'Enter' });
    let dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Close the dialog using keydown on the backdrop
    const backdrop = screen.getByTestId('backdrop');
    fireEvent.keyDown(backdrop, { code: 'Enter' });
    expect(dialog).not.toBeInTheDocument();
  });

  it('opens the dialog when the .projectWrapper receives Enter or Space keydown event and checks "See it here" link', () => {
    render(<WebProject {...mockProject} />);

    const projectWrapper = screen.getByTestId(mockProject.id);

    // Simulate keydown event on the wrapper div to open the dialog
    fireEvent.keyDown(projectWrapper, { code: 'Enter' });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Check the "See it here" link
    const liveAppLink = screen.getByText('See it here');
    expect(liveAppLink).toBeInTheDocument();
    expect(liveAppLink).toHaveAttribute('href', mockProject.liveApp);

    // Simulate keydown event on the link
    fireEvent.keyDown(liveAppLink, { code: 'Enter' });
  });

  it('opens the dialog when the .projectWrapper receives Enter or Space keydown event and checks "Github" link', () => {
    render(<WebProject {...mockProject} />);

    const projectWrapper = screen.getByTestId(mockProject.id);

    // Simulate keydown event on the wrapper div to open the dialog
    fireEvent.keyDown(projectWrapper, { code: 'Enter' });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Check the "Github" link
    const githubLink = screen.getByText('Github');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', mockProject.github);

    // Simulate keydown event on the link
    fireEvent.keyDown(githubLink, { code: 'Enter' });
  });
});
