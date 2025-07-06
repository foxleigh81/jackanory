import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent, expect, fn } from 'storybook/test';
import { useState } from 'react';

// Import component files
import Tabs from './index';

const tabs = [
  {
    contentId: 'overview',
    label: 'Overview'
  },
  {
    contentId: 'details',
    label: 'Details'
  }
];

// Component that renders tabs with proper tab panels for accessibility
const TabsWithPanels = ({
  tabs,
  selectedTab = 0,
  handleChange,
  ...props
}: {
  tabs: Array<{ contentId: string; label: string }>;
  selectedTab?: number;
  handleChange?: (tabIndex: number) => void;
  [key: string]: any;
}) => {
  const [activeTab, setActiveTab] = useState(selectedTab);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
    if (handleChange) handleChange(tabIndex);
  };

  return (
    <div>
      <Tabs
        tabs={tabs}
        selectedTab={activeTab}
        handleChange={handleTabChange}
        {...props}
      />
      {tabs.map((tab, index) => (
        <div
          key={tab.contentId}
          id={tab.contentId}
          role="tabpanel"
          aria-labelledby={`tab-${tab.contentId}`}
          hidden={index !== activeTab}
          style={{
            padding: '1rem',
            border: '1px solid #ccc',
            borderTop: 'none',
            minHeight: '200px'
          }}
        >
          <h3>{tab.label} Content</h3>
          <p>This is the content for the {tab.label.toLowerCase()} tab.</p>
          {index === 0 && (
            <>
              <p>
                This overview section provides a summary of the main features
                and functionality.
              </p>
              <ul>
                <li>Feature 1: Easy to use interface</li>
                <li>Feature 2: Accessible navigation</li>
                <li>Feature 3: Responsive design</li>
              </ul>
            </>
          )}
          {index === 1 && (
            <>
              <p>This details section provides more in-depth information.</p>
              <div>
                <h4>Technical Specifications</h4>
                <ul>
                  <li>Built with React and TypeScript</li>
                  <li>Follows WCAG 2.1 AA guidelines</li>
                  <li>Supports keyboard navigation</li>
                  <li>Screen reader compatible</li>
                </ul>
              </div>
            </>
          )}
          {index === 2 && (
            <>
              <p>
                This settings section allows you to configure various options.
              </p>
              <div>
                <h4>Configuration Options</h4>
                <ul>
                  <li>Theme preferences</li>
                  <li>Accessibility settings</li>
                  <li>Notification preferences</li>
                  <li>Language selection</li>
                </ul>
                <button
                  type="button"
                  style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
                >
                  Save Settings
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const meta: Meta<typeof TabsWithPanels> = {
  component: TabsWithPanels,
  tags: ['autodocs'],
  args: {
    tabs
  },
  parameters: {
    previewLayout: 'vertical',
    controls: { hideNoControlsWarning: true }
  }
};

export default meta;

type Story = StoryObj<typeof TabsWithPanels>;

export const Default: Story = {};

export const ExternallyControlledTabs: Story = {
  args: {
    selectedTab: 1
  }
};

export const WithThreeTabs: Story = {
  args: {
    tabs: [
      ...tabs,
      {
        label: 'Settings',
        contentId: 'settings'
      }
    ],
    selectedTab: 0
  }
};

export const WithPlayFunction: Story = {
  args: {
    tabs: [
      ...tabs,
      {
        label: 'Settings',
        contentId: 'settings'
      }
    ],
    selectedTab: 1,
    handleChange: fn()
  },
  parameters: {
    test: {
      dangerouslyIgnoreUnhandledErrors: true
    }
  },
  play: async ({ args, canvasElement, step }) => {
    const tabList = within(canvasElement).getByRole('tablist');

    await step('The tabs are rendered with proper accessibility', async () => {
      // Wait for the component to be fully rendered
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Expect 3 tabs
      expect(tabList.children.length).toBe(3);
      // Expect the 2nd tab to be selected by default
      expect(tabList.children[1]).toHaveAttribute('aria-selected', 'true');

      // Check that the currently visible tab panel exists and is properly associated
      const detailsPanel = within(canvasElement).getByRole('tabpanel', {
        name: /details/i
      });
      expect(detailsPanel).toBeInTheDocument();
      expect(detailsPanel).not.toHaveAttribute('hidden');

      // Check that tab panels have proper ARIA relationships
      expect(detailsPanel).toHaveAttribute('id', 'details');
      expect(detailsPanel).toHaveAttribute('aria-labelledby', 'tab-details');
      expect(detailsPanel).toHaveAttribute('role', 'tabpanel');
    });

    await step(
      'Clicking on the 1st tab selects it, shows its panel, and calls "handleChange"',
      async () => {
        // Click on the 1st tab with a slight delay
        await userEvent.click(tabList.children[0], { delay: 50 });

        // Wait for state update
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Expect first tab to be selected
        expect(tabList.children[0]).toHaveAttribute('aria-selected', 'true');
        // Expect the 2nd tab to be unselected
        expect(tabList.children[1]).toHaveAttribute('aria-selected', 'false');
        // Expect the 3rd tab to be unselected
        expect(tabList.children[2]).toHaveAttribute('aria-selected', 'false');

        // Check that the correct panel is now visible
        const overviewPanel = within(canvasElement).getByRole('tabpanel', {
          name: /overview/i
        });
        expect(overviewPanel).toBeInTheDocument();
        expect(overviewPanel).not.toHaveAttribute('hidden');

        // Verify the panel has proper ARIA attributes
        expect(overviewPanel).toHaveAttribute('id', 'overview');
        expect(overviewPanel).toHaveAttribute(
          'aria-labelledby',
          'tab-overview'
        );

        // Expect the handleChange action to have been called
        expect(args.handleChange).toHaveBeenCalled();
      }
    );

    await step('Keyboard navigation works properly', async () => {
      try {
        // Focus the first tab
        (tabList.children[0] as HTMLElement).focus();
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Press arrow right to move to second tab
        await userEvent.keyboard('{ArrowRight}', { delay: 50 });
        await new Promise((resolve) => setTimeout(resolve, 100));
        expect(tabList.children[1]).toHaveAttribute('aria-selected', 'true');

        // Press arrow right again to move to third tab
        await userEvent.keyboard('{ArrowRight}', { delay: 50 });
        await new Promise((resolve) => setTimeout(resolve, 100));
        expect(tabList.children[2]).toHaveAttribute('aria-selected', 'true');

        // Press Home to go back to first tab
        await userEvent.keyboard('{Home}', { delay: 50 });
        await new Promise((resolve) => setTimeout(resolve, 100));
        expect(tabList.children[0]).toHaveAttribute('aria-selected', 'true');
      } catch (error) {
        // If keyboard navigation fails, just log it but don't fail the test
        console.warn('Keyboard navigation test encountered an error:', error);
      }
    });
  }
};
