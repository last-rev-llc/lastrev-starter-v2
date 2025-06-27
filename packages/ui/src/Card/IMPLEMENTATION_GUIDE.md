# Card Optimization Implementation Guide

## Quick Start Implementation

This guide provides step-by-step instructions to implement the Card component optimization. Start with CardMedia as the proof of concept.

## Phase 1: Base Component Setup

### 1.1 Create Base Directory Structure

```bash
cd packages/ui/src/Card
mkdir -p base variants/{CardDefault,CardMedia,CardIcon,CardIconLeft,CardIconCenter,CardIconPadding,CardLogo,CardBlock,CardTestimonial,CardIconStats,CardIconListing}
```

### 1.2 Create CardBase Component

**packages/ui/src/Card/base/CardBase.tsx**
```typescript
import React from 'react';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea, { type CardActionAreaProps } from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import sidekick from '@last-rev/cms-sidekick-util';
import ErrorBoundary from '../../ErrorBoundary';
import Link, { type LinkProps } from '../../Link';
import type { CardProps } from '../Card.types';

export interface CardBaseProps extends Omit<CardProps, 'variant'> {
  variant: string;
  children?: React.ReactNode;
}

export interface CardOwnerState extends CardBaseProps {
  backgroundColor?: string;
}

const CardBase = React.forwardRef<HTMLDivElement, CardBaseProps>(
  (props, ref) => {
    const {
      backgroundColor,
      className,
      variant,
      sidekickLookup,
      children,
      link,
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
          <CardWrap ownerState={ownerState}>
            {!!link ? <CardActionArea component={CardLink} {...link} /> : null}
            {children}
          </CardWrap>
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
})<{ ownerState: CardOwnerState }>`
  container-type: inline-size;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${({ ownerState }) => ownerState?.link ? 'cursor: pointer;' : ''}

  ${({ theme, ownerState }) => theme.mixins.applyBackgroundColor({ ownerState, theme })}

  & .MuiTypography-root {
    white-space: initial;
  }
`;

export const CardWrap = styled(MuiCard, {
  name: 'Card',
  slot: 'CardWrap',
  overridesResolver: (_, styles) => [styles.cardWrap]
})<{ ownerState: CardOwnerState }>`
  ${({ theme, ownerState }) => theme.mixins.applyBackgroundColor({ ownerState, theme })}
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  box-shadow: initial;
  position: relative;
`;

export const CardLink = styled(Link, {
  name: 'Card',
  slot: 'CardLink',
  overridesResolver: (_, styles) => [styles.link]
})<CardActionAreaProps & LinkProps & { ownerState: CardOwnerState }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  
  &:hover {
    .MuiCardActionArea-focusHighlight {
      opacity: 0;
    }
  }
`;

export const ContentWrap = styled(CardContent, {
  name: 'Card',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: CardOwnerState }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--grid-gap);
  min-height: 0;
`;

export const ActionsWrap = styled(CardActions, {
  name: 'Card',
  slot: 'ActionsWrap',
  overridesResolver: (_, styles) => [styles.actionsWrap]
})<{ ownerState: CardOwnerState }>`
  padding: var(--grid-gap);
  margin-top: auto;
  
  a {
    padding: var(--grid-gap-half);
    margin: 0;
  }
`;

export default CardBase;
```

**packages/ui/src/Card/base/CardBase.types.ts**
```typescript
import type { CardProps } from '../Card.types';

export interface CardBaseProps extends Omit<CardProps, 'variant'> {
  variant: string;
  children?: React.ReactNode;
}

export interface CardOwnerState extends CardBaseProps {
  backgroundColor?: string;
}
```

## Phase 2: CardMedia Implementation (Proof of Concept)

### 2.1 Create CardMedia Component

**packages/ui/src/Card/variants/CardMedia/CardMedia.tsx**
```typescript
import React from 'react';
import { styled } from '@mui/material/styles';
import { default as MuiCardMedia } from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import CardBase, { ContentWrap, ActionsWrap } from '../../base/CardBase';
import ContentModule from '../../../ContentModule';
import sidekick from '@last-rev/cms-sidekick-util';
import { getFirstOfArray } from '../../../utils/getFirstOfArray';

import type { CardProps } from '../../Card.types';
import type { CardOwnerState } from '../../base/CardBase.types';

const CardMedia: React.FC<CardProps> = (props) => {
  const {
    id,
    media,
    overline,
    title,
    subtitle,
    body,
    actions,
    loading,
    layoutConfig,
    gridLayout,
    sidekickLookup,
    aspectRatio = '16/9',
    ...rest
  } = props;

  const image = getFirstOfArray(media);
  const ownerState: CardOwnerState = { ...props, variant: 'media' };

  return (
    <CardBase {...rest} variant="media" sidekickLookup={sidekickLookup}>
      {/* Media Section */}
      {(image || loading) && (
        <StyledCardMedia ownerState={ownerState}>
          {!loading ? (
            <ContentModule
              __typename="Media"
              {...sidekick(sidekickLookup, 'media')}
              {...image}
              aspectRatio={aspectRatio}
              columns={layoutConfig?.[gridLayout]}
              data-testid="Card-media"
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height={200} />
          )}
        </StyledCardMedia>
      )}

      {/* Content Section */}
      {!loading && (overline || title || subtitle || body) && (
        <StyledContentWrap ownerState={ownerState}>
          {overline && (
            <Overline
              {...sidekick(sidekickLookup, 'overline')}
              variant="overline"
              data-testid="Card-overline"
              ownerState={ownerState}
            >
              {overline}
            </Overline>
          )}

          {title && (
            <Title
              {...sidekick(sidekickLookup, 'title')}
              component="p"
              variant="h4"
              data-testid="Card-title"
              ownerState={ownerState}
            >
              {title}
            </Title>
          )}

          {subtitle && (
            <Subtitle
              {...sidekick(sidekickLookup, 'subtitle')}
              component="div"
              variant="h6"
              data-testid="Card-subtitle"
              ownerState={ownerState}
            >
              {subtitle}
            </Subtitle>
          )}

          {body && (
            <BodyWrap ownerState={ownerState} {...sidekick(sidekickLookup, 'body')}>
              <Body
                __typename="RichText"
                body={body}
                ownerState={ownerState}
                data-testid="Card-body"
              />
            </BodyWrap>
          )}
        </StyledContentWrap>
      )}

      {/* Loading State */}
      {loading && (
        <StyledContentWrap ownerState={ownerState} data-testid="Card-ContentSkeleton">
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="100%" height={32} />
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="100%" height={60} />
        </StyledContentWrap>
      )}

      {/* Actions */}
      {(actions?.length || loading) && (
        <StyledActionsWrap
          {...sidekick(sidekickLookup, 'actions')}
          data-testid="Card-actions"
          ownerState={ownerState}
        >
          {!loading ? (
            actions?.map((action: any, index: number) => (
              <ContentModule
                key={`card-${id}-action-${action?.id || index}`}
                {...action}
              />
            ))
          ) : (
            <Skeleton variant="text" width="100%" />
          )}
        </StyledActionsWrap>
      )}
    </CardBase>
  );
};

// Styled Components for Media Variant
const StyledCardMedia = styled(MuiCardMedia, {
  name: 'CardMedia',
  slot: 'Media'
})<{ ownerState: CardOwnerState }>`
  aspect-ratio: 16/9;
  flex-shrink: 0;
  background-color: inherit;

  :is(picture, svg) {
    display: flex;
    height: 100%;
    width: 100%;

    &:is(svg) {
      object-fit: fill;
      margin: auto;
    }
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;

    &[src$=".svg"] {
      object-fit: fill;
      margin: auto;
    }
  }
`;

const StyledContentWrap = styled(ContentWrap)`
  flex: 1;
  align-items: flex-start;
  text-align: left;
`;

const StyledActionsWrap = styled(ActionsWrap)``;

const Overline = styled(Typography, {
  name: 'CardMedia',
  slot: 'Overline'
})<{ ownerState: CardOwnerState }>``;

const Title = styled(Typography, {
  name: 'CardMedia',
  slot: 'Title'
})<{ ownerState: CardOwnerState }>`
  &, & * {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Subtitle = styled(Typography, {
  name: 'CardMedia',
  slot: 'Subtitle'
})<{ ownerState: CardOwnerState }>``;

const BodyWrap = styled(Box, {
  name: 'CardMedia',
  slot: 'BodyWrap'
})<{ ownerState: CardOwnerState }>`
  flex: 1;
  min-height: 0;

  * {
    ${({ theme }) => theme.typography.body1}
  }

  & > * {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    line-clamp: 10;
    -webkit-box-orient: vertical;

    @container (max-width: 580px) {
      -webkit-line-clamp: 4;
      line-clamp: 4;
    }
  }
`;

const Body = styled(ContentModule, {
  name: 'CardMedia',
  slot: 'Body'
})<{ ownerState: CardOwnerState }>``;

CardMedia.displayName = 'CardMedia';

export default CardMedia;
```

**packages/ui/src/Card/variants/CardMedia/index.ts**
```typescript
export { default } from './CardMedia';
```

### 2.2 Create CardMedia Tests

**packages/ui/src/Card/variants/CardMedia/CardMedia.test.tsx**
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import CardMedia from './CardMedia';
import { createTheme } from '../../../theme';

const theme = createTheme();

describe('CardMedia', () => {
  const defaultProps = {
    id: 'test-card-media',
    title: 'Test Media Card Title',
    body: {
      json: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [{ nodeType: 'text', value: 'Test body content' }]
          }
        ]
      }
    },
    media: [
      {
        id: 'test-media',
        file: { url: 'https://example.com/image.jpg' },
        title: 'Test Image',
        alt: 'Test alt text'
      }
    ]
  };

  const renderComponent = (props = {}) => {
    return render(
      <ThemeProvider theme={theme}>
        <CardMedia {...defaultProps} {...props} />
      </ThemeProvider>
    );
  };

  it('renders media variant correctly', () => {
    renderComponent();
    
    expect(screen.getByTestId('Card-media')).toBeInTheDocument();
    expect(screen.getByText('Test Media Card Title')).toBeInTheDocument();
    expect(screen.getByText('Test body content')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    renderComponent({ loading: true });
    
    expect(screen.getByTestId('Card-ContentSkeleton')).toBeInTheDocument();
    expect(screen.getAllByRole('progressbar')).toHaveLength(5); // Skeletons
  });

  it('handles missing media gracefully', () => {
    renderComponent({ media: [] });
    
    expect(screen.queryByTestId('Card-media')).not.toBeInTheDocument();
    expect(screen.getByText('Test Media Card Title')).toBeInTheDocument();
  });

  it('displays actions when provided', () => {
    const actions = [
      { id: 'action-1', __typename: 'Link', text: 'Read More', href: '/test' }
    ];
    
    renderComponent({ actions });
    
    expect(screen.getByTestId('Card-actions')).toBeInTheDocument();
  });

  it('applies correct data attributes', () => {
    renderComponent();
    
    expect(screen.getByTestId('Card-media')).toBeInTheDocument();
    expect(screen.getByTestId('Card-title')).toBeInTheDocument();
    expect(screen.getByTestId('Card-body')).toBeInTheDocument();
  });

  it('handles overline and subtitle', () => {
    renderComponent({
      overline: 'Test Overline',
      subtitle: 'Test Subtitle'
    });
    
    expect(screen.getByText('Test Overline')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('Card-overline')).toBeInTheDocument();
    expect(screen.getByTestId('Card-subtitle')).toBeInTheDocument();
  });
});
```

### 2.3 Create CardMedia Stories

**packages/ui/src/Card/variants/CardMedia/CardMedia.stories.tsx**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import CardMedia from './CardMedia';
import { mockCardProps } from '../../Card.mock';

const meta: Meta<typeof CardMedia> = {
  title: 'Components/Card/Variants/CardMedia',
  component: CardMedia,
  parameters: {
    layout: 'centered',
    chromatic: { viewports: [320, 768, 1200] }
  },
  argTypes: {
    backgroundColor: {
      control: 'color'
    },
    aspectRatio: {
      control: 'select',
      options: ['16/9', '4/3', '1/1', '3/2']
    }
  }
};

export default meta;
type Story = StoryObj<typeof CardMedia>;

export const Default: Story = {
  args: {
    ...mockCardProps,
    variant: 'media'
  }
};

export const WithActions: Story = {
  args: {
    ...mockCardProps,
    variant: 'media',
    actions: [
      {
        id: 'action-1',
        __typename: 'Link',
        text: 'Read More',
        href: '/example'
      }
    ]
  }
};

export const Loading: Story = {
  args: {
    ...mockCardProps,
    variant: 'media',
    loading: true
  }
};

export const NoMedia: Story = {
  args: {
    ...mockCardProps,
    variant: 'media',
    media: []
  }
};

export const SquareAspectRatio: Story = {
  args: {
    ...mockCardProps,
    variant: 'media',
    aspectRatio: '1/1'
  }
};

export const WithOverlineAndSubtitle: Story = {
  args: {
    ...mockCardProps,
    variant: 'media',
    overline: 'Category',
    subtitle: 'This is a subtitle that provides additional context'
  }
};
```

## Phase 3: Update Content Mapping

### 3.1 Update contentMapping.ts

**packages/ui/src/contentMapping.ts** (Modified sections)
```typescript
import dynamic from 'next/dynamic';

// Existing imports...

// Card variants - each creates its own chunk
const CardDefault = dynamic(() => import('./Card/variants/CardDefault'), {
  loading: () => <div>Loading card...</div>
});

const CardMedia = dynamic(() => import('./Card/variants/CardMedia'), {
  loading: () => <div>Loading media card...</div>
});

// Add other variants as they're implemented...

export const contentMapping: {
  [key: string]: any;
} = {
  // Variant-specific card mappings
  'Card:default': CardDefault,
  'Card:media': CardMedia,
  // 'Card:icon': CardIcon,        // Implement next
  // 'Card:logo': CardLogo,        // Implement next
  // ... other variants
  
  // Fallback for Card without variant
  'Card': CardDefault,
  
  // Special mappings with variants
  'Card:linkList': Link,
  
  // Other existing mappings...
  'CollectionDynamic(:.*Carousel)?': CollectionDynamic,
  'Collection:.*Carousel': Carousel,
  'Collection:splitLayout': Collection,
  'Collection:accordionShowcase': CollectionExpandable,
  'CollectionExpandable(:Tabs)?': Tabs,
  'CollectionExpandable:Accordion': Accordion,
  'ElementForm': Form,
  'NavigationItem:group': HeaderNavGroup,
  'NavigationItem:groupFooter': FooterNavigationItemGroup,
  'NavigationItem:link': HeaderNavLink,
  'NavigationItem:linkBoldedFooter': FooterNavigationItem,
  'NavigationItem:linkFooter': FooterNavigationItem,
  'NavigationItem:linkNested': HeaderNavLinkNested,
  
  // Base components
  Accordion,
  Block,
  Blog,
  Breadcrumbs,
  Carousel,
  Collection,
  CollectionExpandable,
  Footer,
  FooterNavigationItem,
  FooterNavigationItemGroup,
  Header,
  Hero,
  IFrame,
  Link,
  Media,
  NavigationItem,
  Page,
  Person,
  RichText,
  Section,
  SiteMessage,
  Tabs,
  Text
};

export default contentMapping;
```

## Phase 4: Testing the Implementation

### 4.1 Test CardMedia in Isolation

```bash
# Run component tests
cd packages/ui
pnpm test -- Card/variants/CardMedia

# Run Storybook to verify visually
pnpm storybook
```

### 4.2 Test in Next.js App

**Create test page: apps/web/src/app/test-card/page.tsx**
```typescript
import { ContentModuleProvider } from '@ui/ContentModule/ContentModuleContext';
import ContentModule from '@ui/ContentModule';

const testCardData = {
  __typename: 'Card',
  variant: 'media',
  id: 'test-card-1',
  title: 'Test Media Card',
  body: {
    json: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'This is a test of the optimized card component.' }]
        }
      ]
    }
  },
  media: [
    {
      id: 'test-media',
      file: { url: 'https://via.placeholder.com/800x450' },
      title: 'Test Image'
    }
  ]
};

export default function TestCardPage() {
  return (
    <ContentModuleProvider>
      <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <h1>Card Optimization Test</h1>
        <ContentModule {...testCardData} />
      </div>
    </ContentModuleProvider>
  );
}
```

### 4.3 Verify Bundle Splitting

```bash
# Build and analyze
cd apps/web
pnpm build
ANALYZE=true pnpm build

# Check for card variant chunks in the output
# Should see: chunks/card-media.[hash].js
```

## Phase 5: Performance Verification

### 5.1 Bundle Size Analysis

Create a simple script to measure improvements:

**scripts/measure-card-bundles.js**
```javascript
const fs = require('fs');
const path = require('path');

// Read Next.js build stats
const statsPath = path.join(__dirname, '../apps/web/.next/stats.json');
if (fs.existsSync(statsPath)) {
  const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
  
  // Find card-related chunks
  const cardChunks = Object.entries(stats.namedChunkGroups)
    .filter(([name]) => name.includes('card-'))
    .map(([name, data]) => ({
      name,
      size: data.assets.reduce((sum, asset) => sum + asset.size, 0)
    }));
  
  console.log('Card variant chunks:');
  console.table(cardChunks);
  
  const totalSize = cardChunks.reduce((sum, chunk) => sum + chunk.size, 0);
  console.log(`Total card variants size: ${(totalSize / 1024).toFixed(2)}KB`);
}
```

### 5.2 Runtime Performance Test

**apps/web/src/app/test-card/performance.tsx**
```typescript
'use client';
import React, { useEffect, useState } from 'react';
import { ContentModuleProvider } from '@ui/ContentModule/ContentModuleContext';
import ContentModule from '@ui/ContentModule';

const testCards = Array.from({ length: 20 }, (_, i) => ({
  __typename: 'Card',
  variant: i % 2 === 0 ? 'media' : 'default',
  id: `test-card-${i}`,
  title: `Test Card ${i + 1}`,
  body: {
    json: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: `Content for card ${i + 1}` }]
        }
      ]
    }
  },
  media: i % 2 === 0 ? [
    {
      id: `media-${i}`,
      file: { url: `https://via.placeholder.com/400x225?text=Card+${i + 1}` },
      title: `Image ${i + 1}`
    }
  ] : []
}));

export default function PerformanceTest() {
  const [loadTime, setLoadTime] = useState<number | null>(null);
  
  useEffect(() => {
    const start = performance.now();
    
    // Measure time until all images are loaded
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        const end = performance.now();
        setLoadTime(end - start);
      }
    };
    
    images.forEach((img) => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.addEventListener('load', checkAllLoaded);
      }
    });
  }, []);
  
  return (
    <ContentModuleProvider>
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '1rem' }}>
        <h1>Performance Test - 20 Cards</h1>
        {loadTime && (
          <p>Load time: {loadTime.toFixed(2)}ms</p>
        )}
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1rem' 
        }}>
          {testCards.map((card) => (
            <ContentModule key={card.id} {...card} />
          ))}
        </div>
      </div>
    </ContentModuleProvider>
  );
}
```

## Phase 6: Next Steps

### 6.1 Implement Additional Variants

Follow the CardMedia pattern for other variants:

1. **CardIcon** - Simple icon variant
2. **CardDefault** - Basic text-only variant
3. **CardLogo** - Logo display variant

### 6.2 Update GraphQL Extension

Ensure the GraphQL extension returns exact variant names that match your content mapping keys.

### 6.3 Full Migration

Once 3-4 variants are working:

1. Update all content mapping entries
2. Test across different page types
3. Monitor performance in production
4. Gradually implement remaining variants

## Expected Results

After implementing CardMedia optimization:

- **Bundle size**: CardMedia chunk should be ~15-20KB vs ~150KB for full Card
- **Load time**: 200-300ms faster on 3G networks for pages using only media cards
- **Cache efficiency**: Separate chunks allow better caching strategies
- **Build time**: Faster incremental builds when only one variant changes

## Troubleshooting

### Common Issues:

1. **Variant not loading**: Check content mapping key matches exactly with GraphQL extension output
2. **Styles not applied**: Verify styled components are importing theme correctly
3. **Type errors**: Ensure CardBase types are properly exported and imported
4. **Bundle not splitting**: Check dynamic imports are not being statically imported somewhere

### Debug Commands:

```bash
# Check bundle analysis
ANALYZE=true pnpm build

# Verify dynamic imports
grep -r "import.*Card" --include="*.tsx" --include="*.ts" packages/ui/src/

# Check content mapping resolution
console.log(Object.keys(contentMapping).filter(k => k.includes('Card')))
```

This implementation guide provides everything needed to start optimizing the Card component. Begin with CardMedia, verify the improvements, then systematically implement the remaining variants.