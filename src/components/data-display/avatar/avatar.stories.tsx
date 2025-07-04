import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Import component files
import Avatar from './index';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  args: {
    name: 'John Doe',
    colour: 'rebeccapurple'
  },
  argTypes: {
    colour: {
      control: {
        type: 'color'
      }
    },
    imagePath: {
      control: {
        type: 'text'
      }
    },
    size: {
      control: {
        type: 'text'
      }
    },
    isLoading: {
      control: {
        type: 'boolean'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    imagePath: '/mocks/images/example-user.png'
  }
};

export const WithTransparentImage: Story = {
  args: {
    imagePath: '/mocks/images/example-user-no-bg.png'
  }
};

export const WithLongName: Story = {
  args: {
    name: 'Adolph Blaine Charles David Earl Frederick Gerald Hubert Irvin John Kenneth Lloyd Martin Nero Oliver Paul Quincy Randolph Sherman Thomas Uncas Victor William Xerxes Yancy Zeus'
  }
};

export const WithThreeWordName: Story = {
  args: {
    name: 'John Doe Smith'
  }
};

export const WithHyphenatedSurname: Story = {
  args: {
    name: 'John Doe-Smith'
  }
};

export const WithHyphenatedFirstName: Story = {
  args: {
    name: 'John-Doe Smith'
  }
};

export const WithHyphenatedFirstNameAndSurname: Story = {
  args: {
    name: 'John-Doe Smith-Jones'
  }
};

export const WithSingleWordName: Story = {
  args: {
    name: 'Madonna'
  }
};

export const WithInternationalCharacters: Story = {
  args: {
    name: 'Šarūnas Marčiulionis'
  }
};

export const WithNonLatinCharacters: Story = {
  args: {
    name: '习近平'
  }
};

export const WithUnknownUser: Story = {
  args: {
    name: undefined
  }
};

export const WithDefinedSize: Story = {
  args: {
    size: '150px'
  }
};
