import React from 'react';
import { useRouter } from 'next/navigation';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MuiIconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';
import MuiMenuIcon from '@mui/icons-material/Menu';
import MuiCloseIcon from '@mui/icons-material/Close';
import MuiSearchIcon from '@mui/icons-material/Search';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ContentModule from '../ContentModule';

import type { HeaderProps, HeaderOwnerState } from './Header.types';
import type { NavigationItemProps } from '../NavigationItem';
import Background from '../Background';
// import AutoComplete from '../Algolia/AutoComplete';
// import CollectionDynamic from '../CollectionDynamic';

interface FormElements extends HTMLFormControlsCollection {
  query: HTMLInputElement;
}

interface SearchFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

const Header = (props: HeaderProps) => {
  const router = useRouter();
  const ownerState = { ...props };

  const {
    backgroundColor,
    logo,
    logoUrl,
    navigationItems,
    sidekickLookup,
    ctaItems,
    searchLandingPage,
    algoliaSearchKey,
    autoComplete
  } = props;

  const [menuVisible, setMenuVisible] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <Root {...sidekick(sidekickLookup)} ownerState={ownerState} menuVisible={menuVisible}>
      <HeaderBackground backgroundColor={backgroundColor} testId="Header-background" />

      <ContentOuterGrid ownerState={ownerState} menuVisible={menuVisible}>
        {logo ? (
          <LogoRoot
            {...logoUrl}
            aria-label={'Go to homepage'}
            ownerState={ownerState}
            text={undefined}>
            <Logo
              {...logo}
              __typename="Media"
              priority
              alt={logo?.title ?? 'Go to homepage'}
              ownerState={ownerState}
            />
          </LogoRoot>
        ) : null}

        <HeaderMobileNavWrap ownerState={ownerState} menuVisible={menuVisible}>
          {!!navigationItems?.length && (
            <HeaderMenuNav component="nav" ownerState={ownerState}>
              <HeaderMenuNavItems ownerState={ownerState}>
                {navigationItems.map((navItem: any, index: number) => (
                  <HeaderMenuNavItem key={`${navItem.id}-${index}`} ownerState={ownerState}>
                    <HeaderMenuNavLink
                      {...(navItem as NavigationItemProps)}
                      variant="link"
                      onRequestClose={() => {
                        setMenuVisible(false);
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur();
                        }
                      }}
                      ownerState={ownerState}
                      __typename="NavigationItem"
                      menuVisible={menuVisible}
                    />
                  </HeaderMenuNavItem>
                ))}
              </HeaderMenuNavItems>
            </HeaderMenuNav>
          )}

          <HeaderMenuCtas ownerState={ownerState}>
            {ctaItems?.map((ctaItem: any, index: number) => (
              <HeaderMenuCtaItem key={`${ctaItem.id}-${index}`} ownerState={ownerState}>
                <ContentModule {...ctaItem} size="small" />
              </HeaderMenuCtaItem>
            ))}
            {algoliaSearchKey && autoComplete && (
              <HeaderMenuCtaItem ownerState={ownerState}>
                <IconButton
                  ownerState={ownerState}
                  edge="end"
                  color="inherit"
                  aria-label="search"
                  onClick={() => setShowSearch(true)}>
                  <SearchIcon ownerState={ownerState} />
                </IconButton>
              </HeaderMenuCtaItem>
            )}
          </HeaderMenuCtas>
        </HeaderMobileNavWrap>

        <IconButtonWrap ownerState={ownerState}>
          <IconButton
            ownerState={ownerState}
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setMenuVisible(!menuVisible)}>
            <MenuIcon ownerState={ownerState} sx={{ display: menuVisible ? 'none' : 'block' }} />
            <CloseIcon ownerState={ownerState} sx={{ display: !menuVisible ? 'none' : 'block' }} />
          </IconButton>
          {algoliaSearchKey && autoComplete && (
            <IconButton
              ownerState={ownerState}
              edge="end"
              color="inherit"
              aria-label="search"
              onClick={() => setShowSearch(true)}>
              <SearchIcon ownerState={ownerState} />
            </IconButton>
          )}
        </IconButtonWrap>
      </ContentOuterGrid>
      {algoliaSearchKey && autoComplete && (
        <AutoCompleteWrap ownerState={ownerState} sx={{ display: showSearch ? 'block' : 'none' }}>
          <ContentOuterGrid>
            <AutoCompleteInnerWrap ownerState={ownerState}>
              <IconButton
                ownerState={ownerState}
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setShowSearch(false)}>
                <SearchCloseIcon ownerState={ownerState} />
              </IconButton>

              <ContentModule
                {...autoComplete}
                algoliaSearchKey={algoliaSearchKey}
                itemClickCallback={() => setShowSearch(false)}
              />
            </AutoCompleteInnerWrap>
          </ContentOuterGrid>
        </AutoCompleteWrap>
      )}
    </Root>
  );
};

const Root = styled(Box, {
  name: 'Header',
  slot: 'Root',
  shouldForwardProp: (prop: string) => prop !== 'menuVisible' && prop !== 'ownerState',
  overridesResolver: (_: any, styles: { root: any }) => [styles.root]
})<{ ownerState: HeaderOwnerState; menuVisible?: boolean }>``;

const HeaderBackground = styled(Background, {
  name: 'Block',
  slot: 'HeaderBackground',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Header',
  slot: 'ContentOuterGrid',
  shouldForwardProp: (prop: string) => prop !== 'menuVisible' && prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: HeaderOwnerState }>``;

const LogoRoot = styled(ContentModule, {
  name: 'Header',
  slot: 'LogoRoot',
  overridesResolver: (_, styles) => [styles.logoRoot]
})<{ ownerState: HeaderOwnerState }>``;

const Logo = styled(ContentModule, {
  name: 'Header',
  slot: 'Logo',
  overridesResolver: (_, styles) => [styles.logo]
})<{ ownerState: HeaderOwnerState }>``;

const HeaderMenuCtas = styled(List, {
  name: 'Header',
  slot: 'HeaderMenuCtas',
  overridesResolver: (_, styles) => [styles.headerMenuCtas]
})<{ ownerState: HeaderOwnerState }>``;

const HeaderMenuCtaItem = styled(ListItem, {
  name: 'Header',
  slot: 'HeaderMenuCtaItem',
  overridesResolver: (_, styles) => [styles.headerMenuCtaItem]
})<{ ownerState: HeaderOwnerState }>``;

const HeaderMenuNav = styled(Box, {
  name: 'Header',
  slot: 'HeaderMenuNav',
  shouldForwardProp: (prop: string) => prop !== 'menuVisible' && prop !== 'ownerState',
  overridesResolver: (_: any, styles: { headerMenuNav: any }) => [styles.headerMenuNav]
})<{ ownerState: HeaderOwnerState; menuVisible?: boolean }>``;

const HeaderMobileNavWrap = styled(Box, {
  name: 'Header',
  slot: 'HeaderMobileNavWrap',
  shouldForwardProp: (prop: string) => prop !== 'menuVisible' && prop !== 'ownerState',
  overridesResolver: (_: any, styles: { headerMobileNavWrap: any }) => [styles.headerMobileNavWrap]
})<{ ownerState: HeaderOwnerState; menuVisible?: boolean }>``;

const HeaderMenuNavItems = styled(List, {
  name: 'Header',
  slot: 'headerMenuNavItems',
  overridesResolver: (_, styles) => [styles.headerMenuNavItems]
})<{ ownerState: HeaderOwnerState; hasSiteMessage?: boolean }>``;

const HeaderMenuNavItem = styled(ListItem, {
  name: 'Header',
  slot: 'HeaderMenuNavItem',
  shouldForwardProp: (prop: string) => prop !== 'menuVisible' && prop !== 'ownerState',
  overridesResolver: (_: any, styles: { headerMenuNavItem: any }) => [styles.headerMenuNavItem]
})<{ ownerState: HeaderOwnerState }>``;

const HeaderMenuNavLink = styled(ContentModule, {
  name: 'Header',
  slot: 'HeaderMenuNavLink',
  overridesResolver: (_, styles) => [styles.headerMenuNavLink]
})<{ ownerState: HeaderOwnerState }>``;

const MenuIcon = styled(MuiMenuIcon, {
  name: 'Header',
  slot: 'MenuIcon',
  overridesResolver: (_, styles) => [styles.menuIcon]
})<{ ownerState: HeaderOwnerState }>``;

const CloseIcon = styled(MuiCloseIcon, {
  name: 'Header',
  slot: 'CloseIcon',
  overridesResolver: (_, styles) => [styles.closeIcon]
})<{ ownerState: HeaderOwnerState }>``;

const SearchCloseIcon = styled(MuiCloseIcon, {
  name: 'Header',
  slot: 'SearchCloseIcon',
  overridesResolver: (_, styles) => [styles.searchCloseIcon]
})<{ ownerState: HeaderOwnerState }>``;

const SearchIcon = styled(MuiSearchIcon, {
  name: 'Header',
  slot: 'SearchIcon',
  overridesResolver: (_, styles) => [styles.searchIcon]
})<{ ownerState: HeaderOwnerState }>``;

const IconButtonWrap = styled(Box, {
  name: 'Header',
  slot: 'IconButtonWrap',
  overridesResolver: (_, styles) => [styles.iconButtonWrap]
})<{ ownerState: HeaderOwnerState }>``;

const IconButton = styled(MuiIconButton, {
  name: 'Header',
  slot: 'IconButton',
  overridesResolver: (_, styles) => [styles.iconButton]
})<{ ownerState: HeaderOwnerState }>``;

const AutoCompleteWrap = styled(Grid, {
  name: 'Header',
  slot: 'AutoCompleteWrap',
  overridesResolver: (_, styles) => [styles.autoCompleteWrap, styles.contentGrid]
})<{ ownerState: HeaderOwnerState }>``;

const AutoCompleteInnerWrap = styled(Box, {
  name: 'Header',
  slot: 'AutoCompleteInnerWrap',
  overridesResolver: (_, styles) => [styles.autoCompleteInnerWrap]
})<{ ownerState: HeaderOwnerState }>``;

export default Header;
