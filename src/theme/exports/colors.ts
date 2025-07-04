/**
 * Color exports from SCSS variables
 *
 * This file provides TypeScript access to SCSS color variables.
 * Values are manually synced with src/theme/colours.scss
 *
 * Note: If you update colors in colours.scss, please update this file as well.
 */

export const primary = 'hsl(327, 100%, 38%)'; // $primary
export const secondary = 'hsl(273, 100%, 35%)'; // $secondary
export const tertiary = 'hsl(198, 100%, 95%)'; // $tertiary

// RAG status colors (from colours.scss)
export const ragGreen = 'hsl(107, 54%, 44%)'; // $rag-green
export const ragAmber = 'hsl(42, 96%, 54%)'; // $rag-amber
export const ragRed = 'hsl(359, 89%, 48%)'; // $rag-red
export const ragGrey = 'hsl(200, 1%, 55%)'; // $rag-grey
export const ragBlue = 'hsl(214, 60%, 48%)'; // $rag-blue

// Default export with only required colors
const colors = {
  primary,
  secondary,
  tertiary,
  ragGreen,
  ragAmber,
  ragRed,
  ragGrey,
  ragBlue
} as const;

export default colors;
