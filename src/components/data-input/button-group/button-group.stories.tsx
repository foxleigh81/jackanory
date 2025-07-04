import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonGroup from './index';
import { Button } from '../button';

const buttons = [
  <Button key="1" label="Button 1" />,
  <Button key="2" label="Button 2" variant="destroy" />,
  <Button key="3" label="Button 3" variant="create" />
];

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  args: {
    children: buttons
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {};

export const VerticalLayout: Story = {
  args: {
    orientation: 'vertical'
  }
};

export const CollapsedSpacing: Story = {
  args: {
    collapseSpacing: true
  }
};

export const CollapsedSpacingVerticalLayout: Story = {
  args: {
    collapseSpacing: true,
    orientation: 'vertical'
  }
};
