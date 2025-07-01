import React from 'react';

import { styled } from '@mui/material/styles';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

import sidekick from '@last-rev/cms-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { NavigationItemProps, NavigationItemOwnerState } from './NavigationItem.types';

const NavigationItem = (props: NavigationItemProps) => {
  const ownerState = {
    ...props,
    numOfCols: props.subNavigation?.length || 1
  };

  const { subNavigation, sidekickLookup, onRequestClose } = props;

  const [open, setOpen] = React.useState<boolean>(false);
  const theme = useTheme();
  const menuBreakpoint = theme?.components?.Header?.mobileMenuBreakpoint ?? 'sm';
  const isMobile = useMediaQuery(theme.breakpoints.down(menuBreakpoint), { defaultMatches: true });

  const handleClick = (evt: any) => {
    if (isMobile && subNavigation?.length) {
      evt.preventDefault();
      evt.stopPropagation();
      setOpen(!open);
    } else {
      if (onRequestClose) onRequestClose();
    }
  };

  const handleSubnavClick = () => {
    setOpen(false);
    if (onRequestClose) onRequestClose();
  };

  return (
    <ErrorBoundary>
      <Root
        sx={{ position: 'relative' }}
        open={open}
        data-testid="NavigationItem"
        menuBreakpoint={menuBreakpoint}>
        <NavigationItemLink
          {...(props as NavigationItemProps)}
          {...sidekick(sidekickLookup)}
          onClick={handleClick}
          __typename="Link"
          ownerState={ownerState}
        />
        {subNavigation?.length ? (
          <NavItemSubMenu menuBreakpoint={menuBreakpoint} component={'ul'} ownerState={ownerState}>
            {subNavigation?.map((item) => (
              <NavItemSubMenuItem key={item.id} ownerState={ownerState}>
                <ContentModule
                  {...item}
                  variant={'link'}
                  onClick={handleSubnavClick}
                  {...(item?.__typename == 'NavigationItem'
                    ? {
                        onRequestClose: handleSubnavClick
                      }
                    : {})}
                  ownerState={ownerState}
                />
              </NavItemSubMenuItem>
            ))}
          </NavItemSubMenu>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'NavigationItem',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; open: boolean; menuBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>``;

const NavItemSubMenu = styled(List, {
  name: 'NavigationItem',
  slot: 'NavItemSubMenu',

  overridesResolver: (_, styles) => [styles.navItemSubMenu]
})<{ ownerState: NavigationItemOwnerState }>``;

const NavItemSubMenuItem = styled(ListItem, {
  name: 'NavigationItem',
  slot: 'NavItemSubMenuItem',
  overridesResolver: (_, styles) => [styles.navItemSubMenuItem]
})<{ ownerState: NavigationItemOwnerState }>``;

const NavigationItemLink = styled(ContentModule, {
  name: 'NavigationItem',
  slot: 'Link',

  overridesResolver: (_, styles) => [styles.link]
})<{ ownerState: NavigationItemOwnerState }>``;

export default NavigationItem;
