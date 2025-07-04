import type { FormData } from '../index';
import styles from '../sb-styles.module.scss';

export const simpleForm = {
  fieldsets: [
    {
      legend: 'Personal Details',
      fields: [
        {
          id: 'firstName',
          name: 'firstName',
          label: 'First Name'
        },
        {
          id: 'surname',
          name: 'surname',
          label: 'Surname'
        }
      ]
    }
  ]
} as FormData;

export const customStyledForm = {
  fieldsets: [
    {
      legend: 'Personal Details',
      className: styles['custom-fieldset'],
      fields: [
        {
          id: 'firstName',
          name: 'firstName',
          label: 'First Name',
          required: true
        },
        {
          id: 'surname',
          name: 'surname',
          label: 'Surname',
          required: true
        },
        {
          id: 'age',
          name: 'age',
          label: 'Age',
          className: styles['age-input']
        }
      ]
    }
  ]
} as FormData;

export const bigForm = {
  actions: [
    {
      type: 'submit',
      label: 'Submit'
    },
    {
      type: 'reset',
      label: 'Reset'
    }
  ],
  fieldsets: [
    {
      legend: 'Personal Information',
      id: 'personal-info',
      fields: [
        {
          id: 'Name',
          variant: 'text',
          name: 'Name',
          label: 'Name',
          helperText: 'Please enter your full name',
          placeholder: 'John Doe',
          required: true
        },
        {
          id: 'Age',
          variant: 'number',
          name: 'Age',
          label: 'Age',
          required: true
        },
        {
          id: 'Email',
          variant: 'email',
          name: 'Email',
          label: 'Email',
          required: true
        }
      ]
    },
    {
      legend: 'Preference survey',
      id: 'preference-survey',
      fields: [
        {
          id: 'FavouriteColour',
          variant: 'select',
          name: 'FavouriteColour',
          label: 'What is your favourite colour?',
          placeholder: 'Select a colour',
          options: [
            {
              label: 'Red',
              value: 'red'
            },
            {
              label: 'Hot Pink',
              value: 'hot-pink'
            },
            {
              label: 'Green',
              value: 'green'
            },
            {
              label: 'Ultraviolet',
              value: 'ultraviolet'
            }
          ],
          required: true
        },
        {
          id: 'Cats',
          variant: 'radiogroup',
          name: 'Cats',
          label: 'Do you like cats?',
          required: true,
          options: [
            {
              label: 'Yes',
              value: 'yes'
            },
            {
              label: 'No',
              value: 'no'
            },
            {
              label: 'Depends on the cat',
              value: 'depends'
            }
          ]
        },
        {
          id: 'Lights',
          variant: 'toggleswitch',
          name: 'Lights',
          label: 'Lights on or off?'
        }
      ]
    },
    {
      legend: 'Disclaimer',
      id: 'disclaimer',
      fields: [
        {
          id: 'terms-id',
          variant: 'checkbox',
          name: 'Terms',
          label: 'I agree to the terms and conditions',
          required: true
        },
        {
          id: 'badger-id',
          variant: 'checkbox',
          name: 'Badger',
          label: 'I am not now, nor have I ever been, a badger',
          required: true
        }
      ]
    }
  ]
} as FormData;
