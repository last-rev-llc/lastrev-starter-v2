# Card Component Optimization Plan

## Executive Summary

This document outlines a comprehensive plan to optimize the Card component in the LastRev Next.js starter by splitting it into variant-specific components. This optimization leverages Next.js's dynamic imports and code splitting to reduce bundle sizes, improve performance, and enhance maintainability.

### Goals
- **Reduce initial bundle size** by 60-80% for Card components
- **Improve Time to Interactive (TTI)** through selective loading
- **Enable better caching** with variant-specific chunks
- **Maintain backward compatibility** during migration
- **Improve developer experience** with clearer component organization

### Key Metrics
- Bundle size reduction: Expected 60-80% for pages using specific variants
- Load time improvement: 200-500ms faster TTI on 3G networks
- Build time optimization: Better incremental builds with isolated components

## Current State Analysis

### Existing Architecture
```
packages/ui/src/Card/
├── Card.tsx           (825 lines - handles all variants)
├── Card.types.ts      (Type definitions)
├── Card.theme.ts      (637 lines - all variant styles)
├── Card.mock.ts       (Mock data)
└── Card.stories.tsx   (Storybook stories)
```

### Identified Variants
1. **default** - Basic card layout
2. **media** - Card with prominent image (16:9 aspect ratio)
3. **icon** - Simple icon without padding
4. **iconLeft** - Horizontal layout with icon on left
5. **iconCenter** - Centered icon and content
6. **iconPadding** - Icon with padding and background
7. **logo** - Logo display variant
8. **block** - Block-style card
9. **testimonial** - Quote/testimonial with background image
10. **iconStats** - Statistics display with icon
11. **iconListing** - List-style with icon

### Current Problems
- All variants loaded even when only one is needed
- 825+ lines of component code always parsed
- 637+ lines of theme styles always included
- No granular caching - any change invalidates entire Card cache
- Difficult to maintain with all variants in one file

## Proposed Architecture

### New File Structure
```
packages/ui/src/Card/
├── index.ts                          # Public API exports
├── Card.tsx                          # Smart router component (temporary)
├── Card.types.ts                     # Shared type definitions
├── Card.mock.ts                      # Mock data
├── Card.stories.tsx                  # Storybook stories
├── base/
│   ├── CardBase.tsx                  # Shared component logic
│   ├── CardBase.types.ts             # Base types
│   ├── CardBase.theme.ts             # Shared styles
│   └── CardBase.utils.ts             # Shared utilities
└── variants/
    ├── index.ts                      # Variant exports
    ├── CardDefault/
    │   ├── index.ts                  # Export
    │   ├── CardDefault.tsx           # Component
    │   ├── CardDefault.theme.ts      # Styles
    │   └── CardDefault.test.tsx      # Tests
    ├── CardMedia/
    │   ├── index.ts
    │   ├── CardMedia.tsx
    │   ├── CardMedia.theme.ts
    │   └── CardMedia.test.tsx
    ├── CardIcon/
    │   ├── index.ts
    │   ├── CardIcon.tsx
    │   ├── CardIcon.theme.ts
    │   └── CardIcon.test.tsx
    └── ... (other variants follow same pattern)
```

## Implementation Plan

### Phase 1: Foundation Setup (Week 1)

#### 1.1 Create Base Component Architecture

**CardBase.tsx**
```typescript
import React from 'react';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import Box from '@mui/material/Box';
import sidekick from '@last-rev/cms-sidekick-util';
import ErrorBoundary from '../../ErrorBoundary';
import type { CardBaseProps, CardOwnerState } from './CardBase.types';

export interface CardBaseComponentProps extends CardBaseProps {
  children: React.ReactNode;
  variant: string;
}

const CardBase = React.forwardRef<HTMLDivElement, CardBaseComponentProps>(
  (props, ref) => {
    const {
      backgroundColor,
      className,
      variant,
      sidekickLookup,
      children,
      ...rest
    } = props;

    const ownerState: CardOwnerState = {
      ...props,
      variant,
      backgroundColor
    };

    return (
      <ErrorBoundary>
        <Root
          ref={ref}
          ownerState={ownerState}
          data-testid={`Card-${variant}`}
          {...sidekick(sidekickLookup)}
          className={className}
        >
          {children}
        </Root>
      </ErrorBoundary>
    );
  }
);

CardBase.displayName = 'CardBase';

// Shared styled components
export const Root = styled(Box, {
  name: 'Card',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: CardOwnerState }>``;

export const CardWrap = styled(MuiCard, {
  name: 'Card',
  slot: 'CardWrap',
  overridesResolver: (_, styles) => [styles.cardWrap]
})<{ ownerState: CardOwnerState }>``;

// Export other shared components...
export default CardBase;
```

**CardBase.types.ts**
```typescript
import type { CardProps } from '../Card.types';

// Base props that all variants share
export interface CardBaseProps extends Omit<CardProps, 'variant'> {
  // Add any base-specific props here
}

// Owner state for styling
export interface CardOwnerState {
  variant?: string;
  backgroundColor?: string;
  // Other styling props
}
```

#### 1.2 Create Variant Template

**Template for each variant (e.g., CardMedia.tsx)**
```typescript
import React from 'react';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CardBase, { CardWrap } from '../../base/CardBase';
import ContentModule from '../../../ContentModule';
import { getFirstOfArray } from '../../../utils/getFirstOfArray';
import sidekick from '@last-rev/cms-sidekick-util';

import type { CardProps } from '../../Card.types';
import { cardMediaStyles } from './CardMedia.theme';

const CardMediaVariant: React.FC<CardProps> = (props) => {
  const {
    id,
    media,
    overline,
    title,
    subtitle,
    body,
    link,
    actions,
    loading,
    layoutConfig,
    gridLayout,
    sidekickLookup,
    aspectRatio = '16/9',
    ...rest
  } = props;

  const image = getFirstOfArray(media);
  const ownerState = { ...props, variant: 'media' };

  return (
    <CardBase {...rest} variant="media" sidekickLookup={sidekickLookup}>
      <StyledCardWrap ownerState={ownerState}>
        {/* Media-specific implementation */}
        {image && (
          <StyledCardMedia ownerState={ownerState}>
            <ContentModule
              __typename="Media"
              {...sidekick(sidekickLookup, 'media')}
              {...image}
              aspectRatio={aspectRatio}
              columns={layoutConfig?.[gridLayout]}
              data-testid="Card-media"
            />
          </StyledCardMedia>
        )}
        
        {(overline || title || subtitle || body) && (
          <StyledContentWrap ownerState={ownerState}>
            {/* Content rendering */}
          </StyledContentWrap>
        )}
      </StyledCardWrap>
    </CardBase>
  );
};

// Variant-specific styled components
const StyledCardWrap = styled(CardWrap)(cardMediaStyles.cardWrap);
const StyledCardMedia = styled(CardMedia)(cardMediaStyles.media);
const StyledContentWrap = styled(CardContent)(cardMediaStyles.contentWrap);

CardMediaVariant.displayName = 'CardMedia';

export default CardMediaVariant;
```

### Phase 2: Content Mapping Integration (Week 1-2)

#### 2.1 Update Content Mapping

**packages/ui/src/contentMapping.ts**
```typescript
import dynamic from 'next/dynamic';

// Existing imports...

// Card variant imports - each is a separate chunk
const CardDefault = dynamic(() => import('./Card/variants/CardDefault'), {
  loading: () => <CardSkeleton />
});

const CardMedia = dynamic(() => import('./Card/variants/CardMedia'), {
  loading: () => <CardSkeleton variant="media" />
});

const CardIcon = dynamic(() => import('./Card/variants/CardIcon'), {
  loading: () => <CardSkeleton variant="icon" />
});

// ... other variants

export const contentMapping: { [key: string]: any } = {
  // Variant-specific mappings
  'Card:default': CardDefault,
  'Card:media': CardMedia,
  'Card:icon': CardIcon,
  'Card:iconLeft': dynamic(() => import('./Card/variants/CardIconLeft')),
  'Card:iconCenter': dynamic(() => import('./Card/variants/CardIconCenter')),
  'Card:iconPadding': dynamic(() => import('./Card/variants/CardIconPadding')),
  'Card:logo': dynamic(() => import('./Card/variants/CardLogo')),
  'Card:block': dynamic(() => import('./Card/variants/CardBlock')),
  'Card:testimonial': dynamic(() => import('./Card/variants/CardTestimonial')),
  'Card:iconStats': dynamic(() => import('./Card/variants/CardIconStats')),
  'Card:iconListing': dynamic(() => import('./Card/variants/CardIconListing')),
  
  // Fallback for unspecified variant
  'Card': CardDefault,
  
  // Other component mappings...
  'Collection:.*Carousel': Carousel,
  // ...
};
```

#### 2.2 Update GraphQL Extension

**packages/graphql-extensions/src/Card.extension.ts**
```typescript
import gql from 'graphql-tag';
import type { ApolloContext } from './types';
import { getLocalizedField } from '@last-rev/graphql-cms-core';
import type { Mappers } from '@last-rev/types';
import { defaultResolver } from './utils/defaultResolver';

// Updated variant mapping to ensure exact matches
export const CARD_VARIANT_MAPPING: Record<string, string> = {
  'Default': 'default',
  'Media': 'media',
  'Logo': 'logo',
  'Icon': 'icon',
  'Icon Left': 'iconLeft',
  'Icon Center': 'iconCenter',
  'Icon Padding': 'iconPadding',
  'Icon Stats': 'iconStats',
  'Icon Listing': 'iconListing',
  'Block': 'block',
  'Quote': 'testimonial',
  'Testimonial': 'testimonial',
  // Legacy mappings
  'Blog': 'media',
  'Person': 'media',
  'Pricing': 'iconPadding'
};

export const mapCardVariant = (sanityVariant: string | undefined): string => {
  if (!sanityVariant) return 'default';
  
  const mapped = CARD_VARIANT_MAPPING[sanityVariant];
  if (mapped) return mapped;
  
  // Log unmapped variants for monitoring
  console.warn(`Unmapped card variant: ${sanityVariant}, falling back to default`);
  return 'default';
};

// Rest of the extension remains the same...
```

### Phase 3: Migration Strategy (Week 2-3)

#### 3.1 Backward Compatibility Layer

**packages/ui/src/Card/Card.tsx** (Temporary Router)
```typescript
import React, { lazy, Suspense } from 'react';
import CardSkeleton from './CardSkeleton';
import type { CardProps } from './Card.types';

// Lazy load variants
const variantComponents = {
  default: lazy(() => import('./variants/CardDefault')),
  media: lazy(() => import('./variants/CardMedia')),
  icon: lazy(() => import('./variants/CardIcon')),
  iconLeft: lazy(() => import('./variants/CardIconLeft')),
  iconCenter: lazy(() => import('./variants/CardIconCenter')),
  iconPadding: lazy(() => import('./variants/CardIconPadding')),
  logo: lazy(() => import('./variants/CardLogo')),
  block: lazy(() => import('./variants/CardBlock')),
  testimonial: lazy(() => import('./variants/CardTestimonial')),
  iconStats: lazy(() => import('./variants/CardIconStats')),
  iconListing: lazy(() => import('./variants/CardIconListing'))
};

/**
 * @deprecated This is a compatibility layer. 
 * Import specific variants directly for better performance.
 */
const Card: React.FC<CardProps> = (props) => {
  const { variant = 'default', ...rest } = props;
  
  const VariantComponent = variantComponents[variant] || variantComponents.default;
  
  return (
    <Suspense fallback={<CardSkeleton variant={variant} />}>
      <VariantComponent {...rest} variant={variant} />
    </Suspense>
  );
};

Card.displayName = 'Card';

export default Card;
```

#### 3.2 Migration Steps

1. **Phase 3.2.1: Proof of Concept**
   - Implement CardDefault, CardMedia, and CardIcon variants
   - Test in isolation with unit tests
   - Verify Storybook stories work correctly
   - Measure bundle size impact

2. **Phase 3.2.2: Gradual Rollout**
   - Update content mapping for test variants
   - Deploy to staging environment
   - Monitor performance metrics
   - Gather feedback

3. **Phase 3.2.3: Complete Migration**
   - Implement remaining variants
   - Update all imports in the codebase
   - Remove backward compatibility layer
   - Full production deployment

### Phase 4: Testing Strategy (Ongoing)

#### 4.1 Unit Tests

**Example: CardMedia.test.tsx**
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import CardMedia from './CardMedia';
import theme from '../../../theme';

describe('CardMedia', () => {
  const defaultProps = {
    id: 'test-card',
    title: 'Test Title',
    body: { json: { nodeType: 'document', content: [] } },
    media: [{
      id: 'test-media',
      file: { url: 'https://example.com/image.jpg' },
      title: 'Test Image'
    }]
  };

  it('renders media variant correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <CardMedia {...defaultProps} />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('Card-media')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('maintains 16:9 aspect ratio', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CardMedia {...defaultProps} />
      </ThemeProvider>
    );
    
    const media = container.querySelector('[class*="CardMedia"]');
    expect(media).toHaveStyle({ aspectRatio: '16/9' });
  });
});
```

#### 4.2 Visual Regression Tests

**Storybook Configuration**
```typescript
// Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import CardDefault from './variants/CardDefault';
import CardMedia from './variants/CardMedia';
// ... other variants

const meta: Meta = {
  title: 'Components/Card',
  parameters: {
    chromatic: { viewports: [320, 768, 1200] }
  }
};

export default meta;

// Story for each variant
export const Default: StoryObj<typeof CardDefault> = {
  render: (args) => <CardDefault {...args} />,
  args: { /* default props */ }
};

export const Media: StoryObj<typeof CardMedia> = {
  render: (args) => <CardMedia {...args} />,
  args: { /* media props */ }
};
```

### Phase 5: Performance Monitoring (Week 3-4)

#### 5.1 Bundle Analysis

**webpack-bundle-analyzer Configuration**
```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  // ... other config
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Track card variant chunks
      config.optimization.splitChunks.cacheGroups.cardVariants = {
        test: /[\\/]Card[\\/]variants[\\/]/,
        name(module) {
          const match = module.context.match(/variants[\\/]([^\\/]+)/);
          return `card-${match ? match[1].toLowerCase() : 'unknown'}`;
        },
        priority: 20,
        reuseExistingChunk: true
      };
    }
    return config;
  }
});
```

#### 5.2 Performance Metrics

**Monitoring Script**
```typescript
// scripts/analyze-card-performance.js
const fs = require('fs');
const path = require('path');

async function analyzeCardBundles() {
  const statsFile = path.join(__dirname, '../.next/stats.json');
  const stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
  
  const cardChunks = Object.entries(stats.namedChunkGroups)
    .filter(([name]) => name.includes('card-'))
    .map(([name, data]) => ({
      variant: name.replace('card-', ''),
      size: data.assets.reduce((sum, asset) => sum + asset.size, 0),
      files: data.assets.map(a => a.name)
    }));
  
  console.table(cardChunks);
  
  // Compare with baseline
  const baseline = 150000; // Original card bundle size
  const totalNewSize = cardChunks.reduce((sum, chunk) => sum + chunk.size, 0);
  const reduction = ((baseline - totalNewSize) / baseline * 100).toFixed(2);
  
  console.log(`Bundle size reduction: ${reduction}%`);
}

analyzeCardBundles();
```

#### 5.3 Runtime Performance Tracking

**Performance Observer Setup**
```typescript
// utils/performance-tracking.ts
export function trackCardVariantPerformance() {
  if (typeof window === 'undefined') return;
  
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes('card-') && entry.entryType === 'resource') {
        // Track variant load times
        window.analytics?.track('Card Variant Loaded', {
          variant: entry.name.match(/card-(\w+)/)?.[1],
          duration: entry.duration,
          size: entry.transferSize,
          cached: entry.transferSize === 0
        });
      }
    }
  });
  
  observer.observe({ entryTypes: ['resource'] });
}
```

### Phase 6: Rollback Plan

#### 6.1 Feature Flags

```typescript
// config/features.ts
export const features = {
  USE_OPTIMIZED_CARDS: process.env.NEXT_PUBLIC_USE_OPTIMIZED_CARDS === 'true'
};

// contentMapping.ts
const Card = features.USE_OPTIMIZED_CARDS
  ? dynamic(() => import('./Card/variants/CardDefault'))
  : dynamic(() => import('./Card'));
```

#### 6.2 Quick Rollback Process

1. **Immediate Rollback** (< 5 minutes)
   ```bash
   # Disable feature flag
   NEXT_PUBLIC_USE_OPTIMIZED_CARDS=false npm run deploy
   ```

2. **Code Rollback** (< 30 minutes)
   ```bash
   # Revert to previous version
   git revert --no-commit HEAD~5..HEAD
   git commit -m "Revert card optimization"
   git push origin main
   ```

## Success Metrics

### Technical Metrics
- **Bundle Size**: 60-80% reduction per variant
- **Load Time**: 200-500ms improvement on 3G
- **Cache Hit Rate**: >80% for returning users
- **Build Time**: 20-30% faster incremental builds

### Business Metrics
- **Page Speed Score**: +10-15 points
- **Time to Interactive**: 20-30% improvement
- **Bounce Rate**: Expected 5-10% reduction
- **Core Web Vitals**: All metrics in "Good" range

## Maintenance Guide

### Adding New Variants

1. Create variant folder: `variants/CardNewVariant/`
2. Implement component extending CardBase
3. Add variant-specific theme
4. Update content mapping
5. Add to GraphQL variant mapping
6. Create tests and stories
7. Document in this guide

### Debugging Guide

Common issues and solutions:

1. **Variant not loading**
   - Check content mapping key matches exactly
   - Verify GraphQL extension returns correct variant
   - Check browser console for chunk loading errors

2. **Styling issues**
   - Ensure variant theme is properly imported
   - Check ownerState is passed to styled components
   - Verify theme provider is wrapping component

3. **Performance regression**
   - Run bundle analyzer to check chunk sizes
   - Verify dynamic imports aren't being statically imported
   - Check for accidental imports of all variants

## Conclusion

This optimization plan provides a clear path to significantly improve the performance and maintainability of the Card component system. By leveraging Next.js's code splitting capabilities and implementing a variant-based architecture, we can achieve substantial improvements in bundle size, load times, and developer experience.

The phased approach ensures minimal disruption while allowing for careful monitoring and validation at each step. The comprehensive testing and monitoring strategy provides confidence in the changes while the rollback plan ensures we can quickly recover if issues arise.

Expected timeline: 3-4 weeks for complete implementation and rollout.