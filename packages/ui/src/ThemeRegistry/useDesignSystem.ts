import { useTheme } from '@mui/material/styles';
import { designSystemColors, getContrastTextColor, designSystemGuidelines } from './theme';

/**
 * Custom hook to access Design System tokens and utilities
 * Provides easy access to design system colors, guidelines, and helper functions
 */
export const useDesignSystem = () => {
  const theme = useTheme();

  return {
    // Design system color tokens
    colors: designSystemColors,
    
    // Direct access to theme palette with design system extensions
    palette: theme.palette,
    
    // Helper functions
    getContrastText: getContrastTextColor,
    
    // Usage guidelines
    guidelines: designSystemGuidelines,
    
    // Utility functions for common design system patterns
    utils: {
      // Get primary red color with specified shade
      getPrimaryColor: (shade: 500 | 600 | 700 | 800 | 900 = 500): string => {
        const shadeMap = {
          500: designSystemColors.primary.red500,
          600: designSystemColors.primary.red600,
          700: designSystemColors.primary.red700,
          800: designSystemColors.primary.red800,
          900: designSystemColors.primary.red900
        };
        return shadeMap[shade];
      },
      
      // Get neutral gray color with specified shade
      getNeutralColor: (shade: 100 | 200 | 300 | 500 | 700 | 800 | 900 | 950): string => {
        const shadeMap = {
          100: designSystemColors.neutral.gray100,
          200: designSystemColors.neutral.gray200,
          300: designSystemColors.neutral.gray300,
          500: designSystemColors.neutral.gray500,
          700: designSystemColors.neutral.gray700,
          800: designSystemColors.neutral.gray800,
          900: designSystemColors.neutral.gray900,
          950: designSystemColors.neutral.gray950
        };
        return shadeMap[shade];
      },
      
      // Get utility color for states
      getUtilityColor: (type: 'success' | 'error' | 'warning' | 'info' | 'caution'): string => {
        const typeMap = {
          success: designSystemColors.utility.green,
          error: designSystemColors.utility.red,
          warning: designSystemColors.utility.orange,
          info: designSystemColors.utility.blue,
          caution: designSystemColors.utility.yellow
        };
        return typeMap[type];
      },
      
      // Get secondary color for data visualization
      getSecondaryColor: (type: 'magenta' | 'violet' | 'violetDark' | 'sky' | 'azure' | 'azureDark'): string => {
        const typeMap = {
          magenta: designSystemColors.designSystemSecondary.magenta500,
          violet: designSystemColors.designSystemSecondary.violet500,
          violetDark: designSystemColors.designSystemSecondary.violet700,
          sky: designSystemColors.designSystemSecondary.sky500,
          azure: designSystemColors.designSystemSecondary.azure600,
          azureDark: designSystemColors.designSystemSecondary.azure800
        };
        return typeMap[type];
      },
      
      // Check if a color is dark (requires white text)
      isDarkColor: (color: string): boolean => {
        return getContrastTextColor(color) === designSystemColors.neutral.white;
      },
      
      // Generate CSS variables for a color scale
      generateColorScale: (baseName: string, scale: Record<string, string>) => {
        return Object.entries(scale).reduce((acc, [key, value]) => {
          acc[`--${baseName}-${key}`] = value;
          return acc;
        }, {} as Record<string, string>);
      }
    },
    
    // Typography helpers
    typography: {
      // Get font weight for design system typography
      getFontWeight: (variant: 'regular' | 'medium'): number => {
        return variant === 'medium' ? 500 : 400;
      },
      
      // Get font size for design system typography
      getFontSize: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'): string => {
        const sizeMap = {
          xs: '14px',
          sm: '16px',
          md: '18px',
          lg: '20px',
          xl: '24px',
          xxl: '32px',
          xxxl: '48px'
        };
        return sizeMap[size];
      }
    }
  };
};

// Type definitions for better TypeScript support
export type DesignSystemColors = typeof designSystemColors;
export type PrimaryShade = 500 | 600 | 700 | 800 | 900;
export type NeutralShade = 100 | 200 | 300 | 500 | 700 | 800 | 900 | 950;
export type UtilityType = 'success' | 'error' | 'warning' | 'info' | 'caution';
export type SecondaryType = 'magenta' | 'violet' | 'violetDark' | 'sky' | 'azure' | 'azureDark';
export type FontWeight = 'regular' | 'medium';
export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';