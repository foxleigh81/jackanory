import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Import component files
import { Card } from './index';

const cardContentExample = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.`;

const meta: Meta<typeof Card> = {
  component: Card,
  args: {
    children: <p>{cardContentExample}</p>
  },
  parameters: {
    worksWith: 'Cards'
  }
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const NoBg: Story = {
  args: {
    noBg: true
  }
};

export const VSpacing: Story = {
  args: {
    vSpacing: true
  }
};

export const HSpacing: Story = {
  args: {
    hSpacing: true
  }
};

export const WithBody: Story = {
  args: {
    children: <Card.Body>{cardContentExample}</Card.Body>
  }
};

export const WithHeader: Story = {
  args: {
    children: (
      <>
        <Card.Header>Example card header</Card.Header>
        <Card.Body>{cardContentExample}</Card.Body>
      </>
    )
  }
};

export const WithPrimaryHeader: Story = {
  args: {
    children: (
      <>
        <Card.Header bg="primary">Example card header</Card.Header>
        <Card.Body>{cardContentExample}</Card.Body>
      </>
    )
  }
};

export const WithSecondaryHeader: Story = {
  args: {
    children: (
      <>
        <Card.Header bg="secondary">Example card header</Card.Header>
        <Card.Body>{cardContentExample}</Card.Body>
      </>
    )
  }
};

export const WithSuccessHeader: Story = {
  args: {
    children: (
      <>
        <Card.Header bg="success">Example card header</Card.Header>
        <Card.Body>{cardContentExample}</Card.Body>
      </>
    )
  }
};

export const WithWarningHeader: Story = {
  args: {
    children: (
      <>
        <Card.Header bg="warning">Example card header</Card.Header>
        <Card.Body>{cardContentExample}</Card.Body>
      </>
    )
  }
};

export const WithDangerHeader: Story = {
  args: {
    children: (
      <>
        <Card.Header bg="danger">Example card header</Card.Header>
        <Card.Body>{cardContentExample}</Card.Body>
      </>
    )
  }
};

export const WithInfoHeader: Story = {
  args: {
    children: (
      <>
        <Card.Header bg="info">Example card header</Card.Header>
        <Card.Body>{cardContentExample}</Card.Body>
      </>
    )
  }
};
