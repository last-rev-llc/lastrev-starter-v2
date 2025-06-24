import React, { useState, useEffect, useCallback, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { CollectionExpandableProps, CollectionExpandableOwnerState } from './CollectionExpandable.types';
import { CollectionExpandableVariants } from './CollectionExpandable.types';

import Grid from '@ui/Grid';
import ContentModule from '@ui/ContentModule';
import RichText from '@ui/RichText';
import Media from '@ui/Media';

const Root = styled(Box, {
  name: 'CollectionExpandable',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: CollectionExpandableOwnerState }>``;

const ContentGrid = styled(Grid, {
  name: 'CollectionExpandable',
  slot: 'ContentGrid',
  shouldForwardProp: (prop) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: CollectionExpandableOwnerState }>``;

const ItemsContainer = styled(Box, {
  name: 'CollectionExpandable',
  slot: 'ItemsContainer',
  shouldForwardProp: (prop) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.itemsContainer]
})<{ ownerState: CollectionExpandableOwnerState }>``;

const Item = styled(Box, {
  name: 'CollectionExpandable',
  slot: 'Item',
  shouldForwardProp: (prop) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.item]
})<{ ownerState: CollectionExpandableOwnerState }>``;

const ItemHeader = styled(Box, {
  name: 'CollectionExpandable',
  slot: 'ItemHeader',
  shouldForwardProp: (prop) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.itemHeader]
})<{ ownerState: CollectionExpandableOwnerState }>``;

const ItemContent = styled(Collapse, {
  name: 'CollectionExpandable',
  slot: 'ItemContent',
  shouldForwardProp: (prop) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.itemContent]
})<{ ownerState: CollectionExpandableOwnerState }>``;

const ExpandIcon = styled(ExpandMoreIcon, {
  name: 'CollectionExpandable',
  slot: 'ExpandIcon',
  shouldForwardProp: (prop) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.expandIcon]
})<{ ownerState: CollectionExpandableOwnerState }>``;

const ImageContainer = styled(Box, {
  name: 'CollectionExpandable',
  slot: 'ImageContainer',
  shouldForwardProp: (prop) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.imageContainer]
})<{ ownerState: CollectionExpandableOwnerState }>``;

const SharedImage = styled('img', {
  name: 'CollectionExpandable',
  slot: 'SharedImage',
  shouldForwardProp: (prop) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.sharedImage]
})<{ ownerState: CollectionExpandableOwnerState }>``;

const ProgressIndicator = styled(Box, {
  name: 'CollectionExpandable',
  slot: 'ProgressIndicator',
  shouldForwardProp: (prop) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.progressIndicator]
})<{ ownerState: CollectionExpandableOwnerState }>``;

const CollectionExpandable = (props: CollectionExpandableProps) => {
  const {
    id,
    sidekickLookup,
    items = [],
    introText,
    backgroundImage,
    backgroundColor,
    variant = CollectionExpandableVariants.default,
    autoPlay = false,
    autoPlayInterval = 5000,
    showProgressIndicator = true,
    expandMultiple = false,
    defaultExpanded = 0,
    fadeTransition = true,
    title,
    subtitle,
    ...rest
  } = props;

  const ownerState: CollectionExpandableOwnerState = {
    ...props,
    variant,
    autoPlay,
    autoPlayInterval,
    showProgressIndicator,
    expandMultiple,
    defaultExpanded,
    fadeTransition
  };

  const [expandedItems, setExpandedItems] = useState<Set<number>>(
    new Set(expandMultiple ? [] : [defaultExpanded])
  );
  const [activeIndex, setActiveIndex] = useState(defaultExpanded);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<{ [key: number]: NodeJS.Timeout | null }>({});

  // Handle item expansion
  const handleItemToggle = useCallback((index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      
      if (expandMultiple) {
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
      } else {
        newSet.clear();
        if (!prev.has(index)) {
          newSet.add(index);
        }
      }
      
      return newSet;
    });

    // Update active index for image display
    setActiveIndex(index);
    
    // Pause autoplay when user interacts
    if (autoPlay && isPlaying) {
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 2000); // Resume after 2s
    }
  }, [expandMultiple, autoPlay, isPlaying]);

  // Auto-progression logic
  useEffect(() => {
    if (!autoPlay || !isPlaying || items.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const nextIndex = (prev + 1) % items.length;
        
        // Auto-expand the next item
        setExpandedItems(currentExpanded => {
          const newSet = new Set<number>();
          if (expandMultiple) {
            // Keep existing expanded items and add new one
            currentExpanded.forEach(idx => newSet.add(idx));
            newSet.add(nextIndex);
          } else {
            // Only expand the new item
            newSet.add(nextIndex);
          }
          return newSet;
        });
        
        return nextIndex;
      });
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isPlaying, autoPlayInterval, items.length, expandMultiple]);

  // Progress bar animation
  useEffect(() => {
    if (!autoPlay || !showProgressIndicator || !isPlaying) return;

    // Clear existing progress timeouts
    Object.values(progressRef.current).forEach(timeout => {
      if (timeout) clearTimeout(timeout);
    });

    // Start progress for active item
    const progressElement = document.querySelector(`[data-progress-index="${activeIndex}"]`);
    if (progressElement) {
      progressElement.setAttribute('data-active', 'true');
      
      progressRef.current[activeIndex] = setTimeout(() => {
        progressElement.setAttribute('data-active', 'false');
      }, autoPlayInterval);
    }

    return () => {
      Object.values(progressRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, [activeIndex, autoPlay, showProgressIndicator, isPlaying, autoPlayInterval]);

  // Get the active image for shared image display
  const getActiveImage = () => {
    if (backgroundImage) return backgroundImage;
    
    const activeItem = items[activeIndex];
    // For now, backgroundImage is not part of the GraphQL schema for items
    // This would need to be added to the schema if images per item are needed
    
    return null;
  };

  const hasSharedImage = !!backgroundImage;
  const showImageContainer = variant === CollectionExpandableVariants.documentManager && hasSharedImage;

  return (
    <Root
      ownerState={ownerState}
      data-sidebar-lookup={sidekickLookup}
      {...rest}
    >
      {/* Intro Section */}
      {(title || subtitle || introText) && (
        <Box sx={{ marginBottom: 'var(--grid-gap-double)' }}>
          {title && (
            <Typography variant="h2" component="h2" sx={{ marginBottom: 'var(--grid-gap)' }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="h5" component="p" sx={{ marginBottom: 'var(--grid-gap)' }}>
              {subtitle}
            </Typography>
          )}
          {introText && <RichText {...introText} />}
        </Box>
      )}

      <ContentGrid ownerState={ownerState}>
        {/* Items Container */}
        <ItemsContainer ownerState={ownerState}>
          {items.map((item, index) => (
            <Item
              key={item.id || index}
              ownerState={ownerState}
              data-expanded={expandedItems.has(index)}
            >
              <ItemHeader
                ownerState={ownerState}
                onClick={() => handleItemToggle(index)}
                data-active={index === activeIndex}
              >
                <Typography variant="h6" component="h3">
                  {item.title || `Item ${index + 1}`}
                </Typography>
                <ExpandIcon
                  ownerState={ownerState}
                  data-expanded={expandedItems.has(index)}
                />
              </ItemHeader>

              <ItemContent
                in={expandedItems.has(index)}
                ownerState={ownerState}
              >
                <Box>
                  {/* Item content */}
                  {item?.body && <RichText {...item.body} />}
                  
                  {/* Render nested content module if present */}
                  {item?.content && (
                    <ContentModule
                      {...item.content}
                    />
                  )}
                </Box>
              </ItemContent>
            </Item>
          ))}
        </ItemsContainer>

        {/* Shared Image Container */}
        {showImageContainer && backgroundImage && (
          <ImageContainer ownerState={ownerState}>
            <Media 
              {...backgroundImage} 
              priority
              sx={{ 
                width: '100%', 
                height: '100%', 
                '& img': {
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%'
                }
              }} 
            />
          </ImageContainer>
        )}
      </ContentGrid>

      {/* Progress Indicator */}
      {autoPlay && showProgressIndicator && items.length > 1 && (
        <ProgressIndicator ownerState={ownerState}>
          {items.map((_, index) => (
            <Box
              key={index}
              data-progress-index={index}
              sx={{
                flex: 1,
                height: '4px',
                backgroundColor: 'var(--mui-palette-grey-300)',
                borderRadius: '2px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  backgroundColor: 'var(--mui-palette-primary-main)',
                  borderRadius: '2px',
                  transition: 'width linear',
                  width: '0%'
                },
                '&[data-active="true"]::before': {
                  width: '100%',
                  transitionDuration: `${autoPlayInterval}ms`
                }
              }}
              onClick={() => handleItemToggle(index)}
            />
          ))}
        </ProgressIndicator>
      )}
    </Root>
  );
};

export default CollectionExpandable;