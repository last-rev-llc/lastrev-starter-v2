import { createTheme, ThemeOptions, PaletteOptions } from '@mui/material/styles';

// Extend Material-UI's theme types to include custom properties
declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      white: string;
      black: string;
    };
    utility: {
      red: string;
      orange: string;
      yellow: string;
      green: string;
      blue: string;
    };
  }

  interface PaletteOptions {
    neutral?: {
      white?: string;
      black?: string;
    };
    utility?: {
      red?: string;
      orange?: string;
      yellow?: string;
      green?: string;
      blue?: string;
    };
  }

  interface TypographyVariants {
    useCase?: string;
  }

  interface TypographyVariantsOptions {
    useCase?: string;
  }
}

// Color constants
const colors = {
  primary: {
    red500: '#EE312E', // Primary Red
    red600: '#D3222A', // Red 2
    red700: '#AF292E', // Red 3
    red800: '#921A1D', // Red 4
    red900: '#5F091D' // Red 5
  },
  secondary: {
    magenta500: '#C247FA',
    violet500: '#8B48FA',
    violet700: '#642FCF',
    sky500: '#00D3F3',
    azure600: '#0086FA',
    azure800: '#084CCE'
  },
  grey: {
    0: '#FFFFFF',
    100: '#F5F3F3',
    200: '#DADADA',
    300: '#A0A2A5',
    500: '#6F7377',
    700: '#50565F',
    800: '#3C424B',
    900: '#282E37',
    950: '#141423'
  },
  neutral: {
    white: '#FFFFFF',
    black: '#000000'
  },
  utility: {
    red: '#EE312E',
    orange: '#FF6B00',
    yellow: '#FFD500',
    green: '#00C851',
    blue: '#0066FF'
  }
};

// Typography constants
const fontFamily =
  "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// Create the theme
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary.red500,
      light: colors.primary.red600,
      dark: colors.primary.red700,
      contrastText: colors.neutral.white
    },
    secondary: {
      main: colors.secondary.violet500,
      light: colors.secondary.magenta500,
      dark: colors.secondary.violet700,
      contrastText: colors.neutral.white
    },
    error: {
      main: colors.utility.red
    },
    warning: {
      main: colors.utility.orange
    },
    info: {
      main: colors.secondary.azure600
    },
    success: {
      main: colors.utility.green
    },
    grey: {
      50: colors.grey[0],
      100: colors.grey[100],
      200: colors.grey[200],
      300: colors.grey[300],
      400: colors.grey[500],
      500: colors.grey[500],
      600: colors.grey[700],
      700: colors.grey[700],
      800: colors.grey[800],
      900: colors.grey[900]
    },
    background: {
      default: colors.neutral.white,
      paper: colors.grey[100]
    },
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[700],
      disabled: colors.grey[300]
    },
    neutral: colors.neutral,
    utility: colors.utility
  },
  typography: {
    fontFamily,
    fontSize: 16,
    htmlFontSize: 16,
    h1: {
      fontFamily,
      fontWeight: 500,
      fontSize: '48px',
      lineHeight: 1.2,
      letterSpacing: '-0.01562em'
    },
    h2: {
      fontFamily,
      fontWeight: 500,
      fontSize: '32px',
      lineHeight: 1.25,
      letterSpacing: '-0.00833em'
    },
    h3: {
      fontFamily,
      fontWeight: 500,
      fontSize: '24px',
      lineHeight: 1.3,
      letterSpacing: '0em'
    },
    h4: {
      fontFamily,
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: 1.35,
      letterSpacing: '0.00735em'
    },
    h5: {
      fontFamily,
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: 1.4,
      letterSpacing: '0em'
    },
    h6: {
      fontFamily,
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: 1.4,
      letterSpacing: '0.0075em'
    },
    body1: {
      fontFamily,
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: 1.5,
      letterSpacing: '0.00938em'
    },
    body2: {
      fontFamily,
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 1.43,
      letterSpacing: '0.01071em'
    },
    button: {
      fontFamily,
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none'
    },
    caption: {
      fontFamily,
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: 1.66,
      letterSpacing: '0.03333em'
    },
    overline: {
      fontFamily,
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase'
    }
  },
  shape: {
    borderRadius: 4
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '16px',
          textTransform: 'none',
          borderRadius: 4
        },
        containedPrimary: {
          'backgroundColor': colors.primary.red500,
          'color': colors.neutral.white,
          '&:hover': {
            backgroundColor: colors.primary.red600
          }
        },
        containedSecondary: {
          'backgroundColor': colors.secondary.violet500,
          'color': colors.neutral.white,
          '&:hover': {
            backgroundColor: colors.secondary.violet700
          }
        }
      },
      defaultProps: {
        disableElevation: true
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily
        }
      },
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          body1: 'p',
          body2: 'p'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily,
          fontSize: '16px',
          lineHeight: 1.5,
          color: colors.grey[900],
          backgroundColor: colors.neutral.white
        }
      }
    }
  }
};

// Create and export the theme
export const theme = createTheme(themeOptions);

// Export individual color scales for use in custom components
export const colorScales = {
  primary: colors.primary,
  secondary: colors.secondary,
  grey: colors.grey,
  neutral: colors.neutral,
  utility: colors.utility
};

// Helper function to determine text color based on background
export const getContrastText = (backgroundColor: string): string => {
  const darkBackgrounds = [
    colors.primary.red700,
    colors.primary.red800,
    colors.primary.red900,
    colors.secondary.violet700,
    colors.secondary.azure800,
    colors.grey[800],
    colors.grey[900],
    colors.grey[950],
    colors.neutral.black
  ];

  return darkBackgrounds.includes(backgroundColor) ? colors.neutral.white : colors.neutral.black;
};

// Card design tokens
export const cardTokens = {
  container: {
    width: 320,
    maxCharactersPerLine: 25
  },
  aspectRatios: {
    horizontal: {
      name: '21:9',
      ratio: '21/9',
      value: 21 / 9,
      dimensions: { width: 144, height: 60 }
    },
    portrait: {
      name: '3:2',
      ratio: '3/2',
      value: 3 / 2,
      dimensions: { width: 96, height: 144 }
    },
    square: {
      name: '1:1',
      ratio: '1/1',
      value: 1,
      dimensions: { width: 96, height: 96 }
    },
    extraWide: {
      name: '21:9 (50% Height)',
      ratio: '21/9',
      value: 21 / 9,
      dimensions: { width: 280, height: 60 },
      heightScale: 0.5
    }
  },
  grid: {
    desktop: {
      breakpoint: { min: 1025, max: 1440 },
      columns: 12,
      margins: { value: 96, unit: 'px' },
      gutters: { value: 24, unit: 'px' }
    },
    tabletLarge: {
      breakpoint: { min: 835, max: 1024 },
      columns: 12,
      margins: { value: 56, unit: 'px' },
      gutters: { value: 16, unit: 'px' }
    },
    tabletSmall: {
      breakpoint: { min: 581, max: 834 },
      columns: 8,
      margins: { value: 56, unit: 'px' },
      gutters: { value: 16, unit: 'px' }
    },
    mobile: {
      breakpoint: { min: 320, max: 580 },
      columns: 4,
      margins: { value: 24, unit: 'px' },
      gutters: { value: 16, unit: 'px' }
    }
  },
  spacing: {
    containerPadding: {
      desktop: 96,
      tabletLarge: 56,
      tabletSmall: 56,
      mobile: 24
    },
    cardGap: {
      desktop: 24,
      tabletLarge: 16,
      tabletSmall: 16,
      mobile: 16
    }
  }
};

// Grid system helper functions
export const getGridColumns = (
  breakpoint: 'mobile' | 'tabletSmall' | 'tabletLarge' | 'desktop'
) => {
  return cardTokens.grid[breakpoint].columns;
};

export const getGridMargins = (
  breakpoint: 'mobile' | 'tabletSmall' | 'tabletLarge' | 'desktop'
) => {
  const { value, unit } = cardTokens.grid[breakpoint].margins;
  return `${value}${unit}`;
};

export const getGridGutters = (
  breakpoint: 'mobile' | 'tabletSmall' | 'tabletLarge' | 'desktop'
) => {
  const { value, unit } = cardTokens.grid[breakpoint].gutters;
  return `${value}${unit}`;
};

// Collection design tokens
export const collectionTokens = {
  variants: {
    logos: {
      carouselMode: 'always' as const,
      layout: {
        desktop: { itemsPerView: 6, scrollable: true, gap: 24 },
        tablet: { itemsPerView: 4, scrollable: true, gap: 16 },
        mobile: { itemsPerView: 2, scrollable: true, gap: 16 }
      },
      logoSpecs: {
        maxHeight: 64,
        objectFit: 'contain' as const,
        padding: 16,
        backgroundColor: 'transparent'
      },
      navigation: {
        type: 'arrows' as const,
        arrows: true,
        arrowPosition: 'sides' as const,
        dots: false,
        scrollBehavior: 'smooth' as const,
        autoPlay: {
          enabled: true,
          interval: 3000,
          pauseOnHover: true
        }
      },
      responsive: {
        minWidth: { desktop: 1025, tablet: 581, mobile: 320 },
        maxWidth: { desktop: 1919, tablet: 834, mobile: 580 }
      }
    },
    cta: {
      layout: {
        desktop: { containerLayout: 'horizontal', contentWidth: '50%', minHeight: 600 },
        tablet: { containerLayout: 'vertical', contentWidth: '100%', minHeight: 500 },
        mobile: { containerLayout: 'vertical', contentWidth: '100%', minHeight: 400 }
      },
      background: {
        color: colors.primary.red500,
        gradient: `linear-gradient(135deg, ${colors.primary.red700} 0%, ${colors.primary.red500} 100%)`,
        overlay: 'rgba(0,0,0,0.2)'
      },
      content: {
        backgroundColor: colors.grey[900],
        textColor: colors.neutral.white,
        padding: { desktop: 48, tablet: 48, mobile: 24 },
        maxWidth: 600
      },
      features: {
        icon: { size: 48, color: colors.neutral.white, spacing: 24 },
        layout: 'grid' as const,
        columns: { desktop: 2, tablet: 2, mobile: 1 }
      }
    },
    threePerRow: {
      carouselMode: 'optional' as const,
      layout: {
        desktop: { columns: 3, itemsPerView: 3, gap: 24 },
        tablet: { columns: 2, itemsPerView: 2, gap: 16 },
        mobile: { columns: 1, itemsPerView: 1, gap: 16 }
      },
      navigation: {
        type: 'arrows' as const,
        arrows: true,
        arrowPosition: 'sides' as const,
        dots: true,
        scrollBehavior: 'smooth' as const,
        swipeEnabled: true
      },
      cardSpecs: {
        aspectRatio: '16/9',
        imagePosition: 'top',
        contentPadding: 24,
        backgroundColor: colors.grey[100]
      },
      textLimits: {
        title: { recommended: '2 lines', max: '3 lines' },
        body: { recommended: '4 lines', max: '10 lines' },
        overline: { max: '1 line', textTransform: 'uppercase' }
      },
      characterLimits: {
        heading: { desktop: 60, tablet: 50, mobile: 40 },
        body: { desktop: 150, tablet: 120, mobile: 100 }
      },
      cta: {
        color: colors.primary.red500,
        textDecoration: 'none',
        hoverTextDecoration: 'underline'
      }
    },
    testimonial: {
      carouselMode: 'always' as const,
      layout: {
        itemsPerView: 1,
        gap: 24,
        fullWidth: true,
        scrollSnapAlign: 'start' as const
      },
      container: {
        desktop: { minHeight: 500, padding: 48 },
        tablet: { minHeight: 400, padding: 48 },
        mobile: { minHeight: 350, padding: 24 }
      },
      background: {
        type: 'image',
        overlay: {
          color: 'rgba(0,0,0,0.7)',
          gradient: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)'
        },
        objectFit: 'cover' as const,
        fallbackColor: colors.grey[900]
      },
      quote: {
        fontSize: { desktop: 24, tablet: 20, mobile: 18 },
        fontWeight: 400,
        color: colors.neutral.white,
        maxWidth: 800,
        quotationMarks: {
          display: true,
          size: '2em',
          color: colors.primary.red500,
          opacity: 0.8
        }
      },
      attribution: {
        layout: 'vertical',
        spacing: 8,
        name: { fontSize: 16, fontWeight: 400, color: colors.neutral.white },
        title: { fontSize: 14, color: colors.neutral.white, opacity: 0.9 },
        company: { fontSize: 14, color: colors.neutral.white, opacity: 0.9 }
      },
      navigation: {
        type: 'dots' as const,
        arrows: true,
        arrowPosition: 'sides' as const,
        dots: true,
        dotsPosition: 'bottom' as const,
        color: colors.neutral.white,
        activeColor: colors.primary.red500,
        swipeEnabled: true,
        keyboardNavigation: true,
        autoPlay: {
          enabled: false,
          interval: 5000,
          pauseOnHover: true
        }
      }
    }
  },
  commonRules: {
    containerQuery: true,
    fullWidthContainer: true,
    padding: {
      desktop: `0 ${cardTokens.grid.desktop.margins.value}px`,
      tablet: `0 ${cardTokens.grid.tabletLarge.margins.value}px`,
      mobile: `0 ${cardTokens.grid.mobile.margins.value}px`
    },
    introText: {
      maxWidth: 800,
      margin: '0 auto 48px auto',
      textAlign: 'center' as const,
      fontSize: 16
    },
    carouselBehavior: {
      mobileSwipe: true,
      touchThreshold: 50,
      keyboardControls: {
        enabled: true,
        leftKey: 'ArrowLeft',
        rightKey: 'ArrowRight'
      },
      accessibility: {
        announceSlideChange: true,
        ariaLabels: {
          container: 'Carousel',
          previousButton: 'Previous slide',
          nextButton: 'Next slide',
          pagination: 'Slide {current} of {total}'
        }
      }
    }
  },
  carouselModes: {
    always: 'Component always renders as a carousel',
    optional: 'Can be toggled between grid and carousel based on enableCarousel prop',
    never: 'Always renders as a grid, no carousel functionality'
  }
};

// Usage guidelines as constants
export const designGuidelines = {
  colorUsage: {
    primary:
      "Use Primary Red as the primary brand color. It should always be present but doesn't need to be everywhere. Use white space to provide a blank canvas for clear focus.",
    primaryProgression:
      'Use additional shades of red in progression, starting with Primary Red. Never use more red shades than necessary; Red 5 (#5F091D) should be the least used color.',
    secondary:
      'Secondary colors are only for charts, graphs, tables and data visualizations. Blue tones symbolize safety, purple tones signal warning. More intense colors represent stronger urgency.',
    neutral:
      'Neutrals provide areas of calm to balance our red palette. Use for backgrounds, textures, section dividers, information in charts and graphs, and typography.',
    utility:
      'Tertiary colors represent success, error, and warning states, ensuring users receive clear visual cues.'
  },
  typography: {
    h1: 'Use for main headlines',
    h2: 'Use for page titles',
    h3: 'Use for subheadings',
    h4: 'Use for section headers',
    h5: 'Use for subsection headers',
    h6: 'Use for minor headers',
    body: 'Use for body copy and regular text',
    button: 'Use for CTAs and interactive elements',
    overline: 'Use for labels and overline text'
  }
};

// Example component demonstrating theme usage
export const ThemeExample = `
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Typography, Button, Box, Stack } from '@mui/material';
import { theme } from './design-system-mui-theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h1" color="primary">
            Headline Text
          </Typography>
          <Typography variant="h2">
            Title Text
          </Typography>
          <Typography variant="h3">
            Subheading Text
          </Typography>
          <Typography variant="body1">
            This is body copy using Plus Jakarta Sans Regular at 16px.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary">
              Primary CTA
            </Button>
            <Button variant="contained" color="secondary">
              Secondary CTA
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
`;
