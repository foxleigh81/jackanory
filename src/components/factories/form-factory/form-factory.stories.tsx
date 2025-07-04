import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  within,
  userEvent,
  waitFor,
  fireEvent,
  expect,
  fn
} from 'storybook/test';

import { simpleForm, customStyledForm, bigForm } from './mocks/forms';
import {
  simpleFormSchema,
  customStyledFormSchema,
  bigFormSchema
} from './mocks/schemas';

// Import component files
import FormFactory from './index';

const meta: Meta<typeof FormFactory> = {
  component: FormFactory,
  args: {
    onSubmit: action('onSubmit')
  },
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof FormFactory>;

export const Default: Story = {
  args: {
    formData: simpleForm,
    schema: simpleFormSchema
  }
};

export const CustomStyledForm: Story = {
  args: {
    formData: customStyledForm,
    schema: customStyledFormSchema
  }
};

export const BigForm: Story = {
  args: {
    formData: bigForm,
    schema: bigFormSchema
  },
  play: async ({ canvasElement, step }) => {
    // Setup test elements
    const form = await within(canvasElement).findByTestId('form-factory');
    const personalInfoFieldset = await within(form).findByTestId(
      'fieldset-personal-info'
    );
    const preferenceSurveyFieldset = await within(form).findByTestId(
      'fieldset-preference-survey'
    );
    const disclaimerFieldset = await within(form).findByTestId(
      'fieldset-disclaimer'
    );
    const submitButton = await within(form).findByText('Submit');
    const resetButton = await within(form).findByText('Reset');
    const nameInput = await within(form).findByLabelText(/Name/);
    const ageInput = await within(form).findByLabelText(/Age/);
    const emailInput = await within(form).findByLabelText(/Email/);
    const favouriteColourInput = await within(form).findByLabelText(
      /What is your favourite colour/
    );
    const catsInput0 = await within(form).findByTestId('Cats-0-input');
    const catsInput1 = await within(form).findByTestId('Cats-1-input');
    const catsInput2 = await within(form).findByTestId('Cats-2-input');
    const lightsInput = await within(form).findByLabelText(/Lights on or off?/);
    const termsInput = await within(form).findByTestId('terms-id');
    const badgerInput = await within(form).findByTestId('badger-id');

    // Form rendering
    await step('All form elements are rendered', () => {
      expect(form).toBeInTheDocument();
      expect(personalInfoFieldset).toBeInTheDocument();
      expect(preferenceSurveyFieldset).toBeInTheDocument();
      expect(disclaimerFieldset).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();
      expect(ageInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(favouriteColourInput).toBeInTheDocument();
      expect(catsInput0).toBeInTheDocument();
      expect(catsInput1).toBeInTheDocument();
      expect(catsInput2).toBeInTheDocument();
      expect(lightsInput).toBeInTheDocument();
      expect(termsInput).toBeInTheDocument();
      expect(badgerInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
      expect(resetButton).toBeInTheDocument();
    });

    await step('Form has correct fieldsets and legends', () => {
      expect(personalInfoFieldset).toHaveTextContent('Personal Information');
      expect(preferenceSurveyFieldset).toHaveTextContent('Preference survey');
      expect(disclaimerFieldset).toHaveTextContent('Disclaimer');
    });

    await step('Inputs are rendered with correct required attribute', () => {
      expect(nameInput).toHaveAttribute('required');
      expect(ageInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('required');
      expect(favouriteColourInput).toHaveAttribute('required');
      expect(catsInput0).toHaveAttribute('required');
      expect(catsInput1).toHaveAttribute('required');
      expect(catsInput2).toHaveAttribute('required');
      expect(lightsInput).not.toHaveAttribute('required');
      expect(termsInput).toHaveAttribute('required');
      expect(badgerInput).toHaveAttribute('required');
    });

    await step('"Favourite colour" select has correct options', () => {
      expect(favouriteColourInput).toHaveTextContent('Red');
      expect(favouriteColourInput).toHaveTextContent('Hot Pink');
      expect(favouriteColourInput).toHaveTextContent('Green');
      expect(favouriteColourInput).toHaveTextContent('Ultraviolet');
    });

    await step('"Cats" radiogroup has correct options', () => {
      expect(catsInput0).toHaveAttribute('value', 'yes');
      expect(catsInput1).toHaveAttribute('value', 'no');
      expect(catsInput2).toHaveAttribute('value', 'depends');
    });
  }
};

export const InvalidFormInput: Story = {
  args: {
    ...BigForm.args
  },
  play: async ({ canvasElement, step }) => {
    // Setup test elements
    const form = await within(canvasElement).findByTestId('form-factory');
    const personalInfoFieldset = await within(form).findByTestId(
      'fieldset-personal-info'
    );
    const preferenceSurveyFieldset = await within(form).findByTestId(
      'fieldset-preference-survey'
    );
    const disclaimerFieldset = await within(form).findByTestId(
      'fieldset-disclaimer'
    );
    const submitButton = await within(form).findByText('Submit');
    const nameInput = await within(form).findByLabelText(/Name/);
    const ageInput = await within(form).findByLabelText(/Age/);
    const emailInput = await within(form).findByLabelText(/Email/);
    const favouriteColourInput = await within(form).findByLabelText(
      /What is your favourite colour/
    );
    const catsInput0 = await within(form).findByTestId('Cats-0-input');
    const catsInput1 = await within(form).findByTestId('Cats-1-input');
    const catsInput2 = await within(form).findByTestId('Cats-2-input');
    const lightsInput = await within(form).findByLabelText(/Lights on or off?/);
    const termsInput = await within(form).findByTestId('terms-id');
    const badgerInput = await within(form).findByTestId('badger-id');
    // Form validation
    await step('Empty form submission shows validation errors', async () => {
      await userEvent.click(submitButton);
      await waitFor(async () => {
        const nameError = await within(personalInfoFieldset).findByText(
          'You must enter your name'
        );
        expect(nameError).toBeInTheDocument();
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      });
      await waitFor(async () => {
        expect(ageInput).toHaveAttribute('aria-invalid', 'true');
        const ageError = await within(personalInfoFieldset).findByText(
          'Age is a required field'
        );
        expect(ageError).toBeInTheDocument();
      });
      await waitFor(async () => {
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
        const emailError = await within(personalInfoFieldset).findByText(
          'Email is a required field'
        );
        expect(emailError).toBeInTheDocument();
      });
      await waitFor(async () => {
        expect(favouriteColourInput).toHaveAttribute('aria-invalid', 'true');
        const colourError = await within(preferenceSurveyFieldset).findByText(
          'FavouriteColour is a required field'
        );
        expect(colourError).toBeInTheDocument();
      });
      await waitFor(async () => {
        expect(catsInput0).toHaveAttribute('aria-invalid', 'true');
        expect(catsInput1).toHaveAttribute('aria-invalid', 'true');
        expect(catsInput2).toHaveAttribute('aria-invalid', 'true');
        const catsError = await within(preferenceSurveyFieldset).findByText(
          'Cats is a required field'
        );
        expect(catsError).toBeInTheDocument();
      });

      await waitFor(() =>
        expect(lightsInput).not.toHaveAttribute('aria-invalid')
      );
      await waitFor(async () => {
        expect(termsInput).toHaveAttribute('aria-invalid', 'true');
        const termsError = await within(disclaimerFieldset).findByText(
          'You must accept the terms and conditions'
        );
        expect(termsError).toBeInTheDocument();
      });
      await waitFor(async () => {
        expect(badgerInput).toHaveAttribute('aria-invalid', 'true');
        const badgerError = await within(disclaimerFieldset).findByText(
          'No badgers allowed!'
        );
        expect(badgerError).toBeInTheDocument();
      });
    });

    await step('Age validation works as expected', async () => {
      await userEvent.type(ageInput, '-1');

      const negativeAgeError = await within(personalInfoFieldset).findByText(
        'No negative ages allowed!'
      );
      expect(negativeAgeError).toBeInTheDocument();
      expect(ageInput).toHaveAttribute('aria-invalid', 'true');

      await userEvent.clear(ageInput);
      await userEvent.type(ageInput, '12');

      const underageError = await within(personalInfoFieldset).findByText(
        'You must be over 18 to submit this form'
      );
      expect(underageError).toBeInTheDocument();
      expect(ageInput).toHaveAttribute('aria-invalid', 'true');
    });

    await step('Email validation works as expected', async () => {
      await userEvent.type(emailInput, 'notanemail');

      const emailValidationError = await within(
        personalInfoFieldset
      ).findByText('Email must be a valid email');
      expect(emailValidationError).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });

    await step('Favourite colour validation works as expected', async () => {
      await userEvent.selectOptions(favouriteColourInput, 'Ultraviolet');

      const colourValidationError = await within(
        preferenceSurveyFieldset
      ).findByText(
        "You Fell Victim to One of the Classic Blunders! You can't like ultraviolet, it's not even visible!"
      );
      expect(colourValidationError).toBeInTheDocument();
      expect(favouriteColourInput).toHaveAttribute('aria-invalid', 'true');
    });
  }
};

export const ValidFormInput: Story = {
  args: {
    ...BigForm.args
  },
  play: async ({ canvasElement, step }) => {
    // Setup test elements

    const form = await within(canvasElement).findByTestId('form-factory');
    const nameInput = await within(form).findByLabelText(/Name/);
    const ageInput = await within(form).findByLabelText(/Age/);
    const emailInput = await within(form).findByLabelText(/Email/);
    const favouriteColourInput = await within(form).findByLabelText(
      /What is your favourite colour/
    );
    const catsInput0 = await within(form).findByTestId('Cats-0-input');

    const lightsInput = await within(form).findByLabelText(/Lights on or off?/);
    const termsInput = await within(form).findByTestId('terms-id');
    const badgerInput = await within(form).findByTestId('badger-id');
    // Form Input
    await step('Complete form correctly', async () => {
      await userEvent.type(nameInput, 'John Smith');
      await userEvent.type(ageInput, '19');
      await userEvent.type(emailInput, 'john@smith.net');
      await userEvent.selectOptions(favouriteColourInput, 'Red');
      await userEvent.click(catsInput0);
      await userEvent.click(lightsInput);
      await userEvent.click(termsInput);
      await userEvent.click(badgerInput);
    });
  }
};

export const SubmitForm: Story = {
  args: {
    ...ValidFormInput.args,
    onSubmit: fn()
  },
  play: async (context) => {
    await ValidFormInput?.play?.(context);
    const { canvasElement, step, args } = context;
    const form = await within(canvasElement).findByTestId('form-factory');
    // Form actions
    await step(
      'Clicking the submit button submits the form and returns the correct data',
      async () => {
        await fireEvent.submit(form);
        await waitFor(() =>
          expect(args.onSubmit).toHaveBeenCalledWith(
            {
              Name: 'John Smith',
              Age: 19,
              Email: 'john@smith.net',
              FavouriteColour: 'red',
              Cats: 'yes',
              Lights: false,
              Terms: true,
              Badger: true
            },
            expect.anything()
          )
        );
      }
    );

    await step('Clicking the reset button resets the form', async () => {
      await fireEvent.reset(form);

      await waitFor(async () => {
        expect(await within(form).findByLabelText(/Name/)).toHaveValue('');
        expect(await within(form).findByLabelText(/Age/)).toHaveValue(null);
        expect(await within(form).findByLabelText(/Email/)).toHaveValue('');
        expect(
          await within(form).findByLabelText(/What is your favourite colour/)
        ).toHaveValue('');
        expect(await within(form).findByTestId('Cats-0-input')).toBeChecked();
        expect(
          await within(form).findByTestId('Cats-1-input')
        ).not.toBeChecked();
        expect(
          await within(form).findByTestId('Cats-2-input')
        ).not.toBeChecked();
        expect(
          await within(form).findByLabelText(/Lights on or off?/)
        ).not.toBeChecked();
        expect(await within(form).findByTestId('terms-id')).not.toBeChecked();
        expect(await within(form).findByTestId('badger-id')).not.toBeChecked();
      });
    });
  }
};
