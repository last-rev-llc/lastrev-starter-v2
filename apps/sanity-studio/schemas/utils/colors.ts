/**
 * Design System Color Options for Sanity Schemas
 * Based on semantic color sets from design system
 */

import {defineField} from 'sanity'

// Background Colors - Simplified semantic approach (5 main options)
export const backgroundColorOptions = [
  // Light backgrounds
  {value: 'Light Background', title: '⚪ Light Background (Default)'},
  {value: 'Light Gray Primary-1', title: '🔘 Light Gray Primary-1'},
  {value: 'Light Gray Primary-2', title: '🔘 Light Gray Primary-2'},

  // Dark backgrounds
  {value: 'Dark Gray Primary-1', title: '⚫ Dark Gray Primary-1'},

  // Brand background
  {value: 'Primary Red', title: '🔴 Primary Red'},
]

export const backgroundColorValues = backgroundColorOptions.map((option) => option.value)

// Semantic Color Sets - For buttons, CTAs, text, icons (contextual)
export const semanticColorOptions = [
  // Semantic colors that adapt based on background context
  {value: 'Primary-1', title: '⚫ Primary-1 (Contextual)'},
  {value: 'Primary-2', title: '🔘 Primary-2 (Contextual)'},
  {value: 'Brand', title: '🔴 Brand (Contextual)'},
]

export const semanticColorValues = semanticColorOptions.map((option) => option.value)

// Direct Color Options - For specific use cases where exact color is needed
export const directColorOptions = [
  // Light background compatible
  {value: 'Gray 950', title: '⚫ Gray 950 (Primary-1 on Light)'},
  {value: 'Gray 700', title: '🔘 Gray 700 (Primary-2 on Light)'},
  {value: 'Red 600', title: '🔴 Red 600 (Brand on Light)'},

  // Dark background compatible
  {value: 'Gray 25', title: '⚪ Gray 25 (Primary-1 on Dark)'},
  {value: 'Gray 200', title: '🔘 Gray 200 (Primary-2 on Dark)'},
  {value: 'Red 400', title: '🔴 Red 400 (Brand on Dark)'},
]

export const directColorValues = directColorOptions.map((option) => option.value)

// Legacy compatibility mapping for existing schemas
export const legacyColorMapping = {
  None: 'Light Background',
  Transparent: 'Light Background',
  White: 'Light Background',
  Black: 'Dark Gray Primary-1',
  'Gray 900': 'Dark Gray Primary-1',
  'Primary Red': 'Primary Red',
  Primary: 'Primary Red',
  primary: 'Brand',
  secondary: 'Primary-2',
  'background.dark': 'Dark Gray Primary-1',
  'Transparent Light': 'Light Background',
  'Transparent Dark': 'Dark Gray Primary-1',
}

/**
 * Get validation function for background colors
 */
export const validateBackgroundColor = (Rule: any) =>
  Rule.custom((value: string) => {
    if (!value) return true // Allow empty values
    const allowedValues = [
      ...backgroundColorValues,
      'Inherit',
      'Transparent',
      ...Object.keys(legacyColorMapping),
    ]
    return (
      allowedValues.includes(value) ||
      `Invalid color: ${value}. Must be one of: ${allowedValues.join(', ')}`
    )
  })

/**
 * Get validation function for semantic colors (buttons, text, icons)
 */
export const validateSemanticColor = (Rule: any) =>
  Rule.custom((value: string) => {
    if (!value) return true // Allow empty values
    const allowedValues = [
      ...semanticColorValues,
      // ...directColorValues,
      ...Object.keys(legacyColorMapping),
    ]
    return (
      allowedValues.includes(value) ||
      `Invalid color: ${value}. Must be one of: ${allowedValues.join(', ')}`
    )
  })

/**
 * Combined semantic + direct options for comprehensive color selection
 */
export const combinedColorOptions = [
  ...semanticColorOptions,
  {value: '---', title: '--- Direct Colors ---', disabled: true},
  ...directColorOptions,
]

// For backward compatibility, keep the old function names but point to semantic validation
export const validateHighlightColor = validateSemanticColor
export const validateTextColor = validateSemanticColor
