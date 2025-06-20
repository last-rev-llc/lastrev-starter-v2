# Diligent Design System Documentation

## Overview

This design system provides a comprehensive set of design tokens, typography styles, and color palettes for creating consistent user interfaces. Built with Material-UI compatibility in mind.

## Grid System

### Overview

The Diligent grid system is a responsive, flexible layout system that adapts to different screen sizes while maintaining visual consistency. It uses a column-based approach with breakpoint-specific configurations.

### Breakpoint Specifications

| Breakpoint   | Screen Size | Columns | Margins | Gutters | Container Query                                         |
| ------------ | ----------- | ------- | ------- | ------- | ------------------------------------------------------- |
| Desktop      | 1025-1440px | 12      | 96px    | 24px    | `@container (min-width: 1025px)`                        |
| Tablet Large | 835-1024px  | 12      | 56px    | 16px    | `@container (min-width: 835px) and (max-width: 1024px)` |
| Tablet Small | 581-834px   | 8       | 56px    | 16px    | `@container (min-width: 581px) and (max-width: 834px)`  |
| Mobile       | 320-580px   | 4       | 24px    | 16px    | `@container (max-width: 580px)`                         |

### Grid CSS Variables

The grid system uses CSS custom properties for maximum flexibility:

```css
/* Margins */
--grid-margin-xs: 24px;
--grid-margin-sm: 56px;
--grid-margin-md: 56px;
--grid-margin-lg: 96px;
--grid-margin-xl: 96px;
--grid-margin-xxl: 96px;

/* Gaps/Gutters */
--grid-gap-xs: 16px;
--grid-gap-sm: 16px;
--grid-gap-md: 16px;
--grid-gap-lg: 24px;
--grid-gap-xl: 24px;
--grid-gap-xxl: 24px;

/* Derived values */
--grid-gap-half: calc(var(--grid-gap) / 2);
--grid-gap-double: calc(var(--grid-gap) * 2);
--grid-gap-quarter: calc(var(--grid-gap) / 4);

/* Container calculations */
--container-width: min(var(--container-max-width), (100vw - (2 * var(--grid-margin))));
--content-width: min(var(--container-width), (100vw - (2 * var(--grid-margin))));
--container-gutter: minmax(
  var(--grid-margin),
  calc(50vw - var(--grid-margin) - (var(--container-margin) / 2))
);
```

### Grid Implementation

```typescript
// Using grid tokens from the theme
import { theme } from './design-system-mui-theme';

const gridConfig = theme.gridSystem.breakpoints.desktop;
const columns = gridConfig.columns; // 12
const margins = gridConfig.margins; // "96px"
const gutters = gridConfig.gutters; // "24px"

// Responsive grid container
const GridContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${theme.gridSystem.breakpoints.mobile.columns}, 1fr)`,
  gap: theme.gridSystem.cssVariables.gaps['--grid-gap-xs'],
  margin: `0 ${theme.gridSystem.cssVariables.margins['--grid-margin-xs']}`,

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: `repeat(${theme.gridSystem.breakpoints.tabletSmall.columns}, 1fr)`,
    gap: theme.gridSystem.cssVariables.gaps['--grid-gap-sm'],
    margin: `0 ${theme.gridSystem.cssVariables.margins['--grid-margin-sm']}`
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: `repeat(${theme.gridSystem.breakpoints.tabletLarge.columns}, 1fr)`,
    gap: theme.gridSystem.cssVariables.gaps['--grid-gap-md'],
    margin: `0 ${theme.gridSystem.cssVariables.margins['--grid-margin-md']}`
  },

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: `repeat(${theme.gridSystem.breakpoints.desktop.columns}, 1fr)`,
    gap: theme.gridSystem.cssVariables.gaps['--grid-gap-lg'],
    margin: `0 ${theme.gridSystem.cssVariables.margins['--grid-margin-lg']}`
  }
}));
```

## Card Design System

### Container Specifications

- **Standard Width**: 320px
- **Character Limit**: Maximum 25 characters per line for optimal readability
- **Container Type**: Uses CSS Container Queries for responsive behavior

### Logo/Media Aspect Ratios

| Aspect Ratio | Name              | Ratio        | Dimensions | Use Case                                    |
| ------------ | ----------------- | ------------ | ---------- | ------------------------------------------- |
| Horizontal   | 21:9              | 21/9 (2.333) | 144×60px   | Wide logos, banners, horizontal brand marks |
| Portrait     | 3:2               | 3/2 (0.667)  | 96×144px   | Vertical logos, portrait-oriented content   |
| Square       | 1:1               | 1/1 (1.0)    | 96×96px    | Icons, square logos, app icons              |
| Extra Wide   | 21:9 (50% Height) | 21/9 (2.333) | 280×60px   | Ultra-wide logos, panoramic content         |

### Card Grid Layout

The card grid system adapts the number of columns based on the viewport:

| Breakpoint   | Default | Wide Layout | Narrow Layout |
| ------------ | ------- | ----------- | ------------- |
| Desktop      | 3 cards | 2 cards     | 4 cards       |
| Tablet Large | 2 cards | 1 card      | 3 cards       |
| Tablet Small | 2 cards | 1 card      | 2 cards       |
| Mobile       | 1 card  | 1 card      | 1 card        |

### Card Spacing

```css
/* Container Padding */
--card-padding-desktop: calc(var(--grid-gap) * 2);
--card-padding-tablet: calc(var(--grid-gap) * 2);
--card-padding-mobile: var(--grid-gap);

/* Content Padding */
--card-content-default: var(--grid-gap);
--card-content-compact: var(--grid-gap-half);
--card-content-spacious: var(--grid-gap-double);

/* Gap Between Cards */
--card-gap-desktop: 24px;
--card-gap-tablet: 16px;
--card-gap-mobile: 16px;
```

### Card Variants

The system includes multiple card variants optimized for different content types:

#### 1. **Icon Card**

- Flexible alignment: left (default), center, or right
- Icon max width: 96px
- Vertical content layout
- Text limits: 2 lines title, 4-10 lines body
- Hideable elements: icon, overline, title, body, CTA
- Base width: 320px (mobile)
- Use: Feature highlights, service information

#### 2. **Icon Padding Card**

- Extends icon card with extra padding
- Container padding: var(--grid-gap)
- Icon padding: var(--grid-gap-double)
- Icon background: default background color
- Card background: paper background color
- Use: Emphasized icon features, premium features

#### 3. **Logo Card**

- Container width: 320px
- Padding: 2× grid gap
- Object fit: contain
- Background: default background color
- Supported aspect ratios:
  - **21:9** - 144×60px (horizontal logos)
  - **3:2** - 96×144px (portrait logos)
  - **1:1** - 96×96px (square logos)
  - **21:9 (50% Height)** - 280×60px (extra wide logos)
- Use: Brand/partner logos, certifications

#### 4. **Media Card**

- Aspect ratio: 16:9
- Object fit: cover
- Media position: top
- Alignment: left
- Text limits: 2 lines title, 4-10 lines body
- Hideable elements: image, overline, title, body, CTA
- Container width: 320px
- Use: Image-heavy content, articles, blog posts

#### 5. **Testimonial Card**

- Background image with overlay gradient
- Quote typography:
  - Desktop/Tablet: H3 font size
  - Mobile: Body1 font size
- Quote marks: 1.5em, white color
- Attribution structure:
  - Name: Body2 size, medium weight
  - Title: BodyXSmall size, 90% opacity
  - Company: BodyXSmall size, 90% opacity
- Responsive layouts:
  - Desktop/Tablet: Horizontal layout, 50% image width
  - Mobile: Stacked layout, 200px image height
- Padding: 2× grid gap (desktop/tablet), 1× grid gap (mobile)
- Hideable elements: overline, title, body, avatar, CTA
- Use: Customer testimonials, quotes, reviews

#### 6. **Icon Stats Card**

- Responsive layout switching:
  - Desktop/Tablet: Horizontal layout
  - Mobile: Vertical layout, left aligned
- Icon size: 48px
- Icon color: primary color
- Stat value: H2 typography, primary color, 1 line limit
- Stat label: Body2 typography, text primary color, 2 lines max
- Gap: var(--grid-gap) desktop/tablet, half on mobile
- Hideable elements: image, icon, overline, title, body, CTA
- Container width: 320px
- Use: Dashboard metrics, KPIs, statistics

#### 7. **Icon Listing Card**

- Responsive layout:
  - Desktop/Tablet: Horizontal with left icon
  - Mobile: Vertical with top icon
- Icon size: 64px
- Icon color: primary color
- Text limits: 2 lines title, 4-10 lines body
- Gap: var(--grid-gap) desktop/tablet, half on mobile
- Alignment: left
- Hideable elements: image, icon, overline, title, body, CTA
- Container width: 320px
- Use: Feature lists, service listings, menu items

### Common Card Rules

All card variants follow these common rules:

#### Text Constraints

- **Maximum characters per line**: 25
- **Title line clamp**: Default 2 lines, max 3 lines
- **Body text**:
  - Mobile: 4-10 lines
  - Desktop: 3-8 lines
- **Overline**: 1 line

#### Container Specifications

- **Base width**: 320px (mobile)
- **Responsive**: Adjusts to larger widths on desktop
- **Container queries**: Enabled for component-level responsiveness

#### Flexible Elements

Any card element can be hidden based on content needs:

- Icon/Media
- Overline
- Title
- Body copy
- CTA/Actions

#### Responsive Behavior

- Uses CSS container queries for adaptive layouts
- Smooth transitions between breakpoints
- Maintains readability across all screen sizes

### Implementation Guidelines

```typescript
// Example: Creating an icon card with center alignment
const IconCard = styled(Card)(({ theme }) => ({
  ...theme.card.variants.icon,
  'containerType': 'inline-size',
  'width': theme.card.variants.icon.containerWidth,

  '.icon': {
    maxWidth: theme.card.variants.icon.mediaMaxWidth,
    margin: '0 auto' // For center alignment
  },

  '.content': {
    textAlign: 'center' // When alignment is center
  }
}));

// Example: Testimonial card implementation
const TestimonialCard = styled(Card)(({ theme }) => {
  const variant = theme.card.variants.testimonial;

  return {
    'position': 'relative',
    'overflow': 'hidden',

    // Background image and overlay
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: variant.backgroundImage.overlay.gradient,
      zIndex: 1
    },

    // Quote styling
    '.quote': {
      'fontSize': variant.quote.fontSize.desktop,
      'color': variant.quote.color,
      'position': 'relative',
      'zIndex': 2,

      '&::before': {
        content: '"\\201C"',
        fontSize: variant.quote.quotationMarks.size,
        color: variant.quote.quotationMarks.color
      },

      '@container (max-width: 580px)': {
        fontSize: variant.quote.fontSize.mobile
      }
    },

    // Attribution
    '.attribution': {
      'position': 'relative',
      'zIndex': 2,
      'marginTop': variant.attribution.marginTop,

      '.name': {
        fontSize: variant.attribution.name.fontSize,
        fontWeight: variant.attribution.name.fontWeight,
        color: variant.attribution.name.color
      },

      '.title, .company': {
        fontSize: variant.attribution.title.fontSize,
        color: variant.attribution.title.color,
        opacity: variant.attribution.title.opacity
      }
    }
  };
});

// Example: Icon Stats card with responsive behavior
const IconStatsCard = styled(Card)(({ theme }) => {
  const variant = theme.card.variants.iconStats;

  return {
    'display': 'grid',
    'gridTemplate': variant.responsive.desktop.gridTemplate,
    'alignItems': variant.responsive.desktop.alignment,
    'gap': variant.responsive.desktop.gap,

    '@container (max-width: 580px)': {
      gridTemplate: variant.responsive.mobile.gridTemplate,
      alignItems: variant.responsive.mobile.alignment,
      gap: variant.responsive.mobile.gap
    },

    '.icon': {
      width: variant.icon.size,
      height: variant.icon.size,
      color: variant.icon.color
    },

    '.stat-value': {
      fontSize: variant.statValue.fontSize,
      fontWeight: variant.statValue.fontWeight,
      color: variant.statValue.color,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: variant.statValue.lineClamp,
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical'
    }
  };
});
```

## Typography System

### Font Family

**Plus Jakarta Sans** - A modern, clean sans-serif font used throughout the system.

### Type Scale

| Style Name | Font              | Weight        | Size | Use Case         |
| ---------- | ----------------- | ------------- | ---- | ---------------- |
| H1         | Plus Jakarta Sans | Medium (500)  | 48px | Headline         |
| H2         | Plus Jakarta Sans | Medium (500)  | 32px | Title            |
| H3         | Plus Jakarta Sans | Medium (500)  | 24px | Subheading       |
| H4         | Plus Jakarta Sans | Medium (500)  | 20px | Use case         |
| H5         | Plus Jakarta Sans | Medium (500)  | 18px | Use case         |
| H6         | Plus Jakarta Sans | Regular (400) | 18px | Use case         |
| CTA        | Plus Jakarta Sans | Medium (500)  | 16px | CTA              |
| Body       | Plus Jakarta Sans | Regular (400) | 16px | Body copy        |
| Overline   | Plus Jakarta Sans | Regular (400) | 14px | Label / Overline |

### Typography Guidelines

- H1 includes responsive sizing with auto width (min: 130px) and auto height (min: 24px)
- All typography uses the Plus Jakarta Sans font family
- Text transform is disabled for buttons to maintain readability
- Overline text uses uppercase transformation

## Color System

### Primary Colors - Red Scale

Our brand color is vibrant and strong. The Diligent Red should always be present, but doesn't need to be everywhere.

| Color Name             | Hex Code | Usage                            |
| ---------------------- | -------- | -------------------------------- |
| Red 500 (Diligent Red) | #EE312E  | Primary brand color              |
| Red 600 (Red 2)        | #D3222A  | Hover states, secondary emphasis |
| Red 700 (Red 3)        | #AF292E  | Darker accents                   |
| Red 800 (Red 4)        | #921A1D  | Deep emphasis                    |
| Red 900 (Red 5)        | #5F091D  | Least used, maximum contrast     |

**Usage Guidelines:**

- Use white space to provide a blank canvas for clear focus
- Apply red shades in progression, starting with Diligent Red
- Never use more red shades than necessary
- Red 900 (#5F091D) should be the least used color

### Neutral Colors

Neutrals provide areas of calm to balance our red palette.

| Color Name        | Hex Code | Usage                 |
| ----------------- | -------- | --------------------- |
| White 0           | #FFFFFF  | Primary background    |
| Gray 100 (Gray 1) | #F5F3F3  | Light backgrounds     |
| Gray 200 (Gray 2) | #DADADA  | Borders, dividers     |
| Gray 300 (Gray 3) | #A0A2A5  | Disabled states       |
| Gray 500 (Gray 4) | #6F7377  | Secondary text        |
| Gray 700          | #50565F  | Body text alternative |
| Gray 800          | #3C424B  | Dark UI elements      |
| Gray 900 (Gray 5) | #282E37  | Primary text          |
| Gray 950          | #141423  | Maximum contrast      |
| Black             | #000000  | Pure black            |

**Usage Guidelines:**

- Use for backgrounds and textures
- Apply as section dividers in charts and graphs
- Suitable for typography and informational elements

### Secondary Colors

Chosen for distinctive data visualization and information design.

| Color Name  | Hex Code | Usage                    |
| ----------- | -------- | ------------------------ |
| Magenta 500 | #C247FA  | Charts, graphs (warning) |
| Violet 500  | #8B48FA  | Data visualization       |
| Violet 700  | #642FCF  | Intense warning states   |
| Sky 500     | #00D3F3  | Information, safety      |
| Azure 600   | #0086FA  | Primary info color       |
| Azure 800   | #084CCE  | Intense safety states    |

**Usage Guidelines:**

- Use ONLY for charts, graphs, tables, and data visualizations
- Blue tones symbolize safety
- Purple tones signal warning
- Color intensity represents urgency level
- More vibrant colors bring urgent information to the top

### Utility Colors

For success, error, and warning states.

| Color Name   | Hex Code | Usage              |
| ------------ | -------- | ------------------ |
| Diligent Red | #EE312E  | Error states       |
| Orange       | #FF6B00  | Warning states     |
| Yellow       | #FFD500  | Caution/attention  |
| Green        | #00C851  | Success states     |
| Blue         | #0066FF  | Information states |

**Usage Guidelines:**

- Ensure users receive clear visual cues
- Use consistently across all UI components
- Apply to form validation, alerts, and status indicators

## Contrast Guidelines

### Text on Colored Backgrounds

- **On Red 500-900**: Use white text
- **On Light Neutrals (White, Gray 100-300)**: Use black text
- **On Dark Neutrals (Gray 700-950, Black)**: Use white text
- **On Magenta 500**: Use black text
- **On Violet 500-700**: Use white text
- **On Sky 500**: Use black text
- **On Azure 600-800**: Use white text

## Implementation Files

### JSON Configuration

- `design-system-mui-theme.json` - Complete theme configuration in JSON format

### TypeScript Implementation

- `design-system-mui-theme.ts` - Type-safe Material-UI theme with:
  - Extended theme types for custom properties
  - Color constants and scales
  - Typography configuration
  - Component overrides
  - Helper functions for contrast calculation
  - Usage guidelines as exportable constants
  - Example implementation code

## Component Integration

### Material-UI Theme Provider

```typescript
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './design-system-mui-theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### Using Theme Colors

```typescript
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }}>
      {/* Component content */}
    </Box>
  );
}
```

### Typography Usage

```typescript
<Typography variant="h1" color="primary">
  Main Headline
</Typography>
<Typography variant="body1" color="text.secondary">
  Secondary body text
</Typography>
```

## Best Practices

1. **Color Hierarchy**: Start with Diligent Red, add other colors only as needed
2. **White Space**: Use generously to create focus and clarity
3. **Data Visualization**: Reserve secondary colors exclusively for charts and graphs
4. **Accessibility**: Always check contrast ratios, especially with custom color combinations
5. **Consistency**: Use the provided theme tokens rather than hard-coded values
6. **Progressive Enhancement**: Apply darker shades progressively for emphasis

## Design Principles

1. **Clarity**: Information should be immediately understandable
2. **Hierarchy**: Use color and typography to establish clear visual hierarchy
3. **Restraint**: More color doesn't mean better design
4. **Purpose**: Every color choice should have a clear purpose
5. **Accessibility**: Ensure all users can access and understand content

## Card Design System

### Container Specifications

- **Standard Width**: 320px
- **Character Limit**: Maximum 25 characters per line for optimal readability

### Logo/Media Aspect Ratios

| Aspect Ratio | Name              | Ratio | Dimensions | Use Case                  |
| ------------ | ----------------- | ----- | ---------- | ------------------------- |
| Horizontal   | 21:9              | 21/9  | 144x60px   | Wide logos, banners       |
| Portrait     | 3:2               | 3/2   | 96x144px   | Vertical logos, portraits |
| Square       | 1:1               | 1/1   | 96x96px    | Icons, square logos       |
| Extra Wide   | 21:9 (50% Height) | 21/9  | 280x60px   | Ultra-wide logos          |

### Responsive Grid System

| Breakpoint   | Screen Size | Columns | Margins | Gutters |
| ------------ | ----------- | ------- | ------- | ------- |
| Desktop      | 1025-1440px | 12      | 96px    | 24px    |
| Tablet Large | 835-1024px  | 12      | 56px    | 16px    |
| Tablet Small | 581-834px   | 8       | 56px    | 16px    |
| Mobile       | 320-580px   | 4       | 24px    | 16px    |

### Card Variants

The system includes multiple card variants optimized for different content types:

1. **Default**: Standard card with hover effects
2. **Hover**: Reveals content on hover with slide-up animation
3. **Media**: Optimized for media content with 16:9 aspect ratio
4. **Logo**: Contains logos with proper padding and aspect ratio support
5. **Media Only (Fit)**: Shows only media, contained within bounds
6. **Media Only (Full)**: Shows only media, covering full area
7. **Icon**: Small icon with content alignment
8. **Icon Left**: Icon positioned to the left with grid layout
9. **Autocomplete**: Optimized for search results with text clamping
10. **Icon Center**: Centered icon and content
11. **Person**: Profile cards with overlay effects
12. **Search**: Horizontal layout for search results

### Implementation Example

```typescript
import { cardTokens } from './design-system-mui-theme';

// Using aspect ratios
const logoAspectRatio = cardTokens.aspectRatios.horizontal.ratio; // "21/9"

// Getting grid specifications
const desktopColumns = cardTokens.grid.desktop.columns; // 12
const mobileMargins = cardTokens.grid.mobile.margins.value; // 24

// Responsive spacing
const getCardSpacing = (breakpoint: string) => {
  return cardTokens.spacing.cardGap[breakpoint];
};
```

### Card Grid CSS Variables

The system uses CSS custom properties for responsive behavior:

```css
:root {
  /* Grid margins */
  --grid-margin-xs: 24px;
  --grid-margin-sm: 56px;
  --grid-margin-md: 56px;
  --grid-margin-lg: 96px;

  /* Grid gaps/gutters */
  --grid-gap-xs: 16px;
  --grid-gap-sm: 16px;
  --grid-gap-md: 16px;
  --grid-gap-lg: 24px;
}
```
