import React, { FormEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './styles.module.scss';

import { Button, type Props as ButtonProps } from '../../data-input/button';
import {
  Fieldset,
  type Props as FieldsetProps
} from '../../data-input/fieldset';
import InputFactory from '../input-factory';
import Icon from '@/components/data-display/icon';
import ButtonGroup from '@/components/data-input/button-group';
import Form from '../../data-input/form';

import type InputProps from '../../factories/input-factory/types/input-props';
import type InputTypes from '../../factories/input-factory/types/input-types';
import type ComponentStatuses from '@/libs/types/component-statuses';

export interface FieldSetData extends FieldsetProps {
  /**
   * The legend to display above the fieldset
   */
  legend?: string;
  /**
   * The fields to display in the fieldset
   */
  fields: FieldData[];
}

export interface FieldData extends InputProps {
  /**
   * The label to display with the input
   */
  label: string;
  /**
   * The type of input to render
   * @default text
   */
  variant?: InputTypes;
}

export type FormData = {
  /**
   * The name of the form
   */
  name?: string;
  /**
   * The id of the form
   */
  id?: string;
  /**
   * A custom class name for the form
   */
  className?: string;
  /**
   * A form action to override the default form action
   */
  action?: string;
  /**
   * The fieldsets to display in the form (each fieldset can contain multiple fields, at least one fieldset is required)
   */
  fieldsets: FieldSetData[];
  /**
   * The buttons to display at the bottom of the form
   */
  actions?: ButtonProps[];
};

/*  Types */
export interface Props extends React.ComponentProps<'form'> {
  /**
   * The form data to render (Not required if children are provided)
   */
  formData: FormData;
  /**
   * Form schema to validate against
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 3rd party library
  schema: yup.ObjectSchema<any>;
  /**
   * The function to call when the form is submitted
   */
  onSubmit: FormEventHandler<HTMLFormElement>;
  /**
   * A Test ID for the form (used by tests to target the form)
   * @default form-factory (or `form-factory-${formData.id}` if an id is provided in the formData)
   */
  testID?: string;
}

/**
 * The 'FormFactory' component automatically generates a form based on the provided form data
 */
export const FormFactory: React.FC<Props> = ({
  formData,
  schema,
  onSubmit,
  testID = formData.id ? `form-factory-${formData.id}` : 'form-factory',
  ...props
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const getErrors = (input: string) => {
    if (errors[input]) {
      return {
        status: 'error' as ComponentStatuses,
        statusMessage: errors[input]?.message as string
      };
    }
    return {
      status: 'default' as ComponentStatuses,
      statusMessage: '' as string
    };
  };

  return (
    <Form
      name={formData.name || 'form-factory-form'}
      id={formData.id || 'form-factory-form'}
      data-testid={testID}
      {...props}
      ref={undefined}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      action={formData.action || undefined}
      className={formData.className || undefined}
    >
      <>
        {formData.fieldsets.map((fieldset, index) => {
          const fieldSetProps = {
            ...fieldset,
            fields: undefined as FieldData[]
          };
          return (
            <Fieldset
              key={
                fieldset.legend ||
                `fieldset-${fieldset.id}` ||
                `fieldset-${index}`
              }
              {...fieldSetProps}
            >
              {fieldset.fields.map((field) => {
                const { variant, name, ...rest } = field;
                return (
                  <InputFactory
                    key={name}
                    variant={variant || 'text'}
                    {...rest}
                    {...getErrors(name)}
                    {...register(name)}
                  />
                );
              })}
            </Fieldset>
          );
        })}
        <>
          {Object.keys(errors).length > 0 && (
            <div className={styles['error-summary']} aria-live="assertive">
              <p className={styles['error-count']}>
                <Icon use="error" className={styles['icon']} />{' '}
                {Object.keys(errors).length} errors found, please correct them
                and try again:
              </p>
              <ul className={styles['error-list']}>
                {Object.keys(errors).map((error) => {
                  return (
                    <li key={error} className={styles['error-item']}>
                      {/* @ts-expect-error -- If we have errors, we have error messages */}
                      {errors[error].message}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <ButtonGroup className={styles['button-group']}>
            {formData.actions ? (
              formData.actions.map((action) => {
                return (
                  <Button key={action.label} {...action} ref={undefined} />
                );
              })
            ) : (
              <Button type="submit" label="Submit" />
            )}
          </ButtonGroup>
        </>
      </>
    </Form>
  );
};

export default FormFactory;
