import * as yup from 'yup';

export const simpleFormSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    surname: yup.string().required()
  })
  .required();

export const customStyledFormSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    surname: yup.string().required(),
    age: yup.number()
  })
  .required();

export const bigFormSchema = yup
  .object()
  .shape({
    // You can customise the error messages by passing a string to the method you're validating against
    Name: yup.string().required('You must enter your name'),
    Age: yup
      .number()
      .required()
      .positive('No negative ages allowed!')
      .integer('Grown ups use whole numbers for ages!')
      // This is a custom transform function that will return null if the value is NaN (Useful for number inputs!)
      .transform((value) => (Number.isNaN(value) ? null : value))
      // You can also test against values using a function, this is useful for more complex validation
      .test((value, ctx) => {
        if (value < 18) {
          return ctx.createError({
            message: 'You must be over 18 to submit this form'
          });
        }
        return true;
      }),
    Email: yup.string().email().required(),
    FavouriteColour: yup
      .string()
      .required()
      .test((value, ctx) => {
        if (value === 'ultraviolet') {
          return ctx.createError({
            message:
              "You Fell Victim to One of the Classic Blunders! You can't like ultraviolet, it's not even visible!"
          });
        }
        return true;
      }),
    Cats: yup.string().required(),
    // When testing against a checkbox or radio, you should use oneOf instead of required
    // as an unchecked checkbox still technically has a value (false)
    Terms: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions'),
    Badger: yup.boolean().oneOf([true], 'No badgers allowed!')
  })
  .required();

export type SimpleFormValues = yup.InferType<typeof simpleFormSchema>;
export type CustomStyledFormValues = yup.InferType<
  typeof customStyledFormSchema
>;
export type BigFormValues = yup.InferType<typeof bigFormSchema>;
