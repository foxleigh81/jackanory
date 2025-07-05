/**
 * Color exports from SCSS variables
 *
 * This file provides TypeScript access to SCSS color variables.
 * Auto-generated from src/theme/colors.scss - DO NOT EDIT MANUALLY
 *
 * To update colors, modify colors.scss and run: npm run process-colors
 */

/* Backgrounds */
export const bg = 'hsl(0, 0%, 100%)'; // $bg
export const bgDark = 'hsl(0, 0%, 9%)'; // $bg-dark
export const mainPanelBg = 'hsl(0, 0%, 100%)'; // $main-panel-bg
export const altPanelBg = 'hsl(0, 0%, 98%)'; // $alt-panel-bg

/* Brand Colours */
export const primary = 'hsl(327, 100%, 38%)'; // $primary
export const secondary = 'hsl(273, 100%, 35%)'; // $secondary
export const tertiary = 'hsl(198, 100%, 95%)'; // $tertiary

/* Dark and light base colours */
export const dark = 'hsl(0, 0%, 7%)'; // $dark
export const light = 'hsl(0, 0%, 100%)'; // $light

/* Grey shades */
export const grey100 = 'hsl(0, 0%, 98%)'; // $grey-100
export const grey200 = 'hsl(0, 0%, 94%)'; // $grey-200
export const grey300 = 'hsl(0, 0%, 90%)'; // $grey-300
export const grey400 = 'hsl(0, 0%, 77%)'; // $grey-400
export const grey500 = 'hsl(0, 0%, 60%)'; // $grey-500
export const grey600 = 'hsl(0, 0%, 40%)'; // $grey-600
export const grey700 = 'hsl(0, 0%, 20%)'; // $grey-700
export const grey800 = 'hsl(0, 0%, 13%)'; // $grey-800
export const grey900 = 'hsl(0, 0%, 7%)'; // $grey-900

/* Typography */
export const bodyText = 'hsl(180, 4%, 2%)'; // $body-text
export const bodyTextInverse = 'hsl(0, 0%, 90%)'; // $body-text-inverse

/* Statuses */
export const warning = 'hsl(33, 88%, 36%)'; // $warning
export const success = 'hsl(150, 100%, 26%)'; // $success
export const danger = 'hsl(8, 73%, 49%)'; // $danger
export const info = 'hsl(214, 60%, 48%)'; // $info
export const error = 'hsl(8, 73%, 49%)'; // $error

/* RAG colours */

/* These are used for data visualisation only and are not accessible enough for text */
export const ragGreen = 'hsl(107, 54%, 44%)'; // $rag-green
export const ragAmber = 'hsl(42, 96%, 54%)'; // $rag-amber
export const ragRed = 'hsl(359, 89%, 48%)'; // $rag-red
export const ragGrey = 'hsl(200, 1%, 55%)'; // $rag-grey
export const ragBlue = 'hsl(214, 60%, 48%)'; // $rag-blue

/* Buttons */
export const primaryButton = 'hsl(327, 100%, 38%)'; // $primary-button
export const primaryButtonText = 'hsl(0, 0%, 100%)'; // $primary-button-text
export const secondaryButton = 'hsl(273, 100%, 35%)'; // $secondary-button
export const secondaryButtonText = 'hsl(0, 0%, 100%)'; // $secondary-button-text

/* Inputs */
export const inputBg = 'hsl(0, 0%, 100%)'; // $input-bg
export const inputBorder = 'hsl(0, 0%, 60%)'; // $input-border
export const inputBorderFocus = 'hsl(327, 100%, 38%)'; // $input-border-focus
export const labelText = 'hsl(180, 4%, 2%)'; // $label-text
export const inputText = 'hsl(180, 4%, 2%)'; // $input-text
export const disabledInputText = 'hsl(0, 5%, 30%)'; // $disabled-input-text

/* Links */

/* Style also applies to text buttons */
export const link = 'hsl(220, 73%, 34%)'; // $link
export const linkDisabled = 'hsl(0, 5%, 46%)'; // $link-disabled

/* Actions */
export const action = 'hsl(220, 73%, 34%)'; // $action
export const actionDestroy = 'hsl(8, 73%, 49%)'; // $action-destroy
export const actionCreate = 'hsl(150, 100%, 26%)'; // $action-create
export const actionDisabled = 'hsl(0, 0%, 60%)'; // $action-disabled
export const actionText = 'hsl(0, 0%, 100%)'; // $action-text

/* Shadows and borders */
export const shadow = 'hsl(0, 0%, 0%)'; // $shadow
export const border = 'hsl(30, 3%, 87%)'; // $border
export const borderDark = 'hsl(0, 0%, 44%)'; // $border-dark

/* A11y compliance */
export const keyboardFocus = 'hsl(47, 100%, 51%)'; // $keyboard-focus

/* Gradients */

// Default export with all colors
const colors = {
  bg,
  bgDark,
  mainPanelBg,
  altPanelBg,
  primary,
  secondary,
  tertiary,
  dark,
  light,
  grey100,
  grey200,
  grey300,
  grey400,
  grey500,
  grey600,
  grey700,
  grey800,
  grey900,
  bodyText,
  bodyTextInverse,
  warning,
  success,
  danger,
  info,
  error,
  ragGreen,
  ragAmber,
  ragRed,
  ragGrey,
  ragBlue,
  primaryButton,
  primaryButtonText,
  secondaryButton,
  secondaryButtonText,
  inputBg,
  inputBorder,
  inputBorderFocus,
  labelText,
  inputText,
  disabledInputText,
  link,
  linkDisabled,
  action,
  actionDestroy,
  actionCreate,
  actionDisabled,
  actionText,
  shadow,
  border,
  borderDark,
  keyboardFocus
} as const;

export default colors;
