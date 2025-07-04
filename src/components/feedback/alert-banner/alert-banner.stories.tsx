import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import AlertBanner from './index';

const meta: Meta<typeof AlertBanner> = {
  component: AlertBanner,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['information', 'danger', 'warning', 'success']
      }
    }
  },
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof AlertBanner>;

export const Default: Story = {
  args: {
    type: 'information',
    title: 'Banner example',
    children: `This is an example of an alert banner.`
  }
};

export const InfoBanner: Story = {
  args: {
    type: 'information',
    title: 'Advanced notification of downtime',
    children: `This project is going to be going down for maintainance at approximately 11pm on December 2nd for 48 hours.`
  }
};

export const DangerBanner: Story = {
  args: {
    type: 'danger',
    title: 'This site is offline',
    children: `Usual service will be resumed shortly`
  }
};

export const WarningBanner: Story = {
  args: {
    type: 'warning',
    title: 'Site downtime imminent',
    children: `This site will be going offline in approximately 30 minutes.`
  }
};

export const SuccessBanner: Story = {
  args: {
    type: 'success',
    title: 'Update Successful',
    children: (
      <p>
        To see what has changed <a href="">Click here</a>
      </p>
    )
  }
};

export const NoTitle: Story = {
  args: {
    type: 'information',
    children: `This project is going to be going down for maintainance at approximately 11pm on December 2nd for 48 hours.`
  }
};
