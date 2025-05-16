
import type { Meta, StoryObj } from '@storybook/react';
import { AuthLogo } from './auth-logo';

const meta = {
  title: 'Auth/AuthLogo',
  component: AuthLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomClass: Story = {
  args: {
    className: 'w-32 h-32',
  },
};
