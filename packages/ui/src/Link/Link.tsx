import React from 'react';
import clsx from 'clsx';

import { usePathname } from 'next/navigation';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Icon } from '../Icons/Icon';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import MuiLink, { type LinkProps as MuiLinkProps } from '@mui/material/Link';
import Button, { type ButtonProps } from '@mui/material/Button';

import sidekick from '@last-rev/contentful-sidekick-util';

import type { LinkProps, LinkOwnerState } from './Link.types';

const isReactComponent = (value: any): value is React.ComponentType<any> => {
  return (
    typeof value === 'function' && value.prototype && typeof value.prototype.render === 'function'
  );
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef<any, LinkProps>(function Link(props, ref) {
  const ownerState = { ...props };

  const {
    activeClassName = 'MuiLink-selected',
    className: classNameProps,
    href = '#',
    role, // Links don't have roles.
    text,
    children,
    variant,
    icon,
    iconPosition,
    sidekickLookup,
    // Remove id from other props
    id,
    ...other
  } = props;

  // Color prop fails if it's null
  if (!other.color) delete other.color;

  const pathname = usePathname();

  const className = clsx(classNameProps, {
    [activeClassName]: pathname?.toLowerCase().startsWith(href?.toLowerCase()) && activeClassName
  });

  const sharedLinkProps = {
    component: NextLink, //href === '/#' ? Box : NextLink,
    className,
    ref,
    href,
    variant,
    target: href?.startsWith('http') ? '_blank' : '_self',
    ...other,
    ...sidekick(sidekickLookup),
    // 'aria-label': text,
    ownerState: ownerState
  };

  if (children) {
    return <RootLinkChildren {...sharedLinkProps}>{children}</RootLinkChildren>;
  }

  if (!text && icon) {
    return (
      <RootIconButton {...sharedLinkProps}>
        <Icon iconName={icon} />
      </RootIconButton>
    );
  }

  if (variant?.includes('button')) {
    let trimmedSharedLinkProps: any = sharedLinkProps;
    if ((sharedLinkProps as { type?: string })?.type === 'submit') {
      const { component, href, ref, ...rest } = sharedLinkProps;
      trimmedSharedLinkProps = rest;
    }

    const buttonVariant = variant.replace('button', '').toLowerCase() as
      | 'text'
      | 'outlined'
      | 'contained'
      | undefined;

    return (
      <RootButton
        {...trimmedSharedLinkProps}
        variant={buttonVariant}
        startIcon={icon && iconPosition === 'Left' && <Icon iconName={icon} />}
        endIcon={icon && iconPosition !== 'Left' && <Icon iconName={icon} />}>
        {text || children}
      </RootButton>
    );
  }

  /* This needs to pull from the main color since it's MUI link and it doesn't accept an object */

  if (sharedLinkProps.color) {
    sharedLinkProps.color = `${sharedLinkProps.color}.main`;
  }

  if (text && icon) {
    return (
      <RootLinkTextIcon {...sharedLinkProps}>
        <RootLinkText ownerState={ownerState}>{text}</RootLinkText>
        <RootLinkIcon ownerState={ownerState}>
          <Icon iconName={icon} />
        </RootLinkIcon>
      </RootLinkTextIcon>
    );
  }

  return <RootLink {...sharedLinkProps}>{text}</RootLink>;
});

const shouldForwardProp = (prop: string) =>
  // prop !== 'variant' &&
  prop !== 'icon' &&
  prop !== 'iconPosition' &&
  prop !== 'sidekickLookup' &&
  prop !== 'onRequestClose' &&
  prop !== 'passHref' &&
  prop !== 'ownerState';

const RootButton = styled(Button, {
  name: 'Link',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_: any, styles: { root: any; rootButton: any }) => [
    styles.root,
    styles.rootButton
  ]
})<ButtonProps & { ownerState: LinkOwnerState }>``;

const RootIconButton = styled(IconButton, {
  name: 'Link',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_: any, styles: { root: any; rootIconButton: any }) => [
    styles.root,
    styles.rootIconButton
  ]
})<IconButtonProps & { ownerState: LinkOwnerState }>``;

const RootLinkTextIcon = styled(MuiLink, {
  name: 'Link',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_: any, styles: { root: any; rootLink: any }) => [
    styles.root,
    styles.rootLink
  ]
})<NextLinkProps & MuiLinkProps & { ownerState: LinkOwnerState }>``;

const RootLink = styled(MuiLink, {
  name: 'Link',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_: any, styles: { root: any; rootLink: any }) => [
    styles.root,
    styles.rootLink
  ]
})<MuiLinkProps & { ownerState: LinkOwnerState }>``;

const RootLinkChildren = styled(NextLink, {
  name: 'Link',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_: any, styles: { root: any; rootLinkChildren: any }) => [
    styles.root,
    styles.rootLinkChildren
  ]
})<{ ownerState: LinkOwnerState }>``;

const RootLinkIcon = styled(Box, {
  name: 'Link',
  slot: 'RootLinkIcon',
  shouldForwardProp,
  overridesResolver: (_: any, styles: { root: any; rootLinkIcon: any }) => [
    styles.root,
    styles.rootLinkIcon
  ]
})<{ ownerState: LinkOwnerState }>``;

const RootLinkText = styled(Box, {
  name: 'Link',
  slot: 'RootLinkText',
  shouldForwardProp,
  overridesResolver: (_: any, styles: { root: any; rootLinkText: any }) => [
    styles.root,
    styles.rootLinkText
  ]
})<{ ownerState: LinkOwnerState }>``;

export default Link;
