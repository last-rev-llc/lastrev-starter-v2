'use client';
import * as React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import StyledComponentsRegistry from './StyledComponentsRegistry';
import { theme } from './theme';
import { Experimental_CssVarsProvider as CssVarsProvider, css } from '@mui/material/styles';
import { getInitColorSchemeScript } from '@mui/material/styles';
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const h1FontSizeBase = 3;
  const h2FontSizeBase = 2.25;
  const h3FontSizeBase = 1.75;
  const h4FontSizeBase = 1.5;
  const h5FontSizeBase = 1.25;
  const h6FontSizeBase = 1;

  const display1FontSizeBase = 3;
  const display2FontSizeBase = 2.25;
  const display3FontSizeBase = 1.75;
  const display4FontSizeBase = 1.5;
  const display5FontSizeBase = 1.25;
  const display6FontSizeBase = 1;

  return (
    <>
      {getInitColorSchemeScript()}
      <StyledComponentsRegistry>
        <CssVarsProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline enableColorScheme />
          <GlobalStyles
            styles={css`
              @font-face {
                font-family: 'swiper-icons';
                src: url('data:application/font-woff;charset=utf-8;base64, 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');
                font-weight: 400;
                font-style: normal;
              }

              :root {
                --grid-margin-xs: 12px;
                --grid-margin-sm: 24px;
                --grid-margin-md: 24px;
                --grid-margin-lg: 96px;
                --grid-margin-xl: 128px;
                --grid-margin-xxl: 140px;
                --grid-margin: var(--grid-margin-xs);

                --grid-gap-xs: var(--grid-margin-xs);
                --grid-gap-sm: calc(var(--grid-margin-sm) / 2);
                --grid-gap-md: calc(var(--grid-margin-md) / 2);
                --grid-gap-lg: calc(var(--grid-margin-lg) / 4);
                --grid-gap-xl: calc(var(--grid-margin-xl) / 4);
                --grid-gap-xxl: calc(var(--grid-margin-xxl) / 4);

                --grid-gap: var(--grid-margin-xs);
                --grid-gap-double: calc(var(--grid-gap) * 2);
                --grid-gap-half: calc(var(--grid-gap) / 1);
                --grid-gap-quarter: calc(var(--grid-gap) / 2);

                --container-width-xs: ${theme.containerBreakpoints.values.sm}px;
                --container-width-sm: ${theme.containerBreakpoints.values.sm}px;
                --container-width-md: ${theme.containerBreakpoints.values.md}px;
                --container-width-lg: ${theme.containerBreakpoints.values.lg}px;
                --container-width-xl: ${theme.containerBreakpoints.values.xl}px;
                --container-width-xxl: ${theme.containerBreakpoints.values.xxl}px;
                --container-width: var(--container-width-xs);
                --container-margin: var(--container-width-xs);
                --container-gutter: minmax(
                  var(--grid-margin),
                  calc(50vw - var(--grid-margin) - (var(--container-margin) / 2))
                );
                --content-width: min(var(--container-width), (100vw - (2 * var(--grid-margin))));
                --container-max: min(var(--container-width), (100vw - (2 * var(--grid-margin))));

                --h1-font-size-base: ${h1FontSizeBase}rem;
                --h2-font-size-base: ${h2FontSizeBase}rem;
                --h3-font-size-base: ${h3FontSizeBase}rem;
                --h4-font-size-base: ${h4FontSizeBase}rem;
                --h5-font-size-base: ${h5FontSizeBase}rem;
                --h6-font-size-base: ${h6FontSizeBase}rem;

                --h1-font-size: ${h1FontSizeBase}rem;
                --h2-font-size: ${h2FontSizeBase}rem;
                --h3-font-size: ${h3FontSizeBase}rem;
                --h4-font-size: ${h4FontSizeBase}rem;
                --h5-font-size: ${h5FontSizeBase}rem;
                --h6-font-size: ${h6FontSizeBase}rem;
                --display1-font-size: var(--h1-font-size);
                --display2-font-size: var(--h2-font-size);
                --overline-font-size: 0.75rem;
                --body1-font-size: 1.125rem;
                --body2-font-size: 1rem;
                --bodyXSmall-font-size: 0.875rem;
                --bodySmall-font-size: 1rem;
                --bodyLarge-font-size: 1.25rem;

                --h1-line-height: 1.25em;
                --h2-line-height: 1.25em;
                --h3-line-height: 1.5em;
                --h4-line-height: 1.5em;
                --h5-line-height: 1.5em;
                --h6-line-height: 1.5em;
                --display1-line-height: var(--h1-line-height);
                --display2-line-height: var(--h2-line-height);
                --overline-line-height: 1.5em;

                --body1-line-height: 1.5em;
                --body2-line-height: 1.5em;
                --bodyXSmall-line-height: 1.5em;
                --bodySmall-line-height: 1.75em;
                --bodyLarge-line-height: 1.25em;

                --h1-margin: 0 0 0.5em 0;
                --h2-margin: 0 0 0.5em 0;
                --h3-margin: 0 0 0.5em 0;
                --h4-margin: 0 0 0.5em 0;
                --h5-margin: 0 0 0.5em 0;
                --h6-margin: 0 0 0.5em 0;
                --display1-margin: var(--h1-margin);
                --display2-margin: var(--h2-margin);
                --overline-margin: 0 0 var(--grid-gap-half) 0;
                --body1-margin: 0;
                --body2-margin: 0;
                --bodyXSmall-margin: 0;
                --bodySmall-margin: 0;
                --bodyLarge-margin: 0;

                --h1-font-weight: 600;
                --h2-font-weight: 600;
                --h3-font-weight: 600;
                --h4-font-weight: 600;
                --h5-font-weight: 600;
                --h6-font-weight: 600;
                --display1-font-weight: var(--h1-font-weight);
                --display2-font-weight: var(--h2-font-weight);
                --body1-font-weight: 400;
                --body2-font-weight: 400;
                --bodyXSmall-font-weight: 400;
                --bodySmall-font-weight: 400;
                --bodyLarge-font-weight: 400;

                --swiper-theme-color: var(--mui-palette-text-primary);
                --swiper-preloader-color: var(--swiper-theme-color);
                --swiper-wrapper-transition-timing-function: initial;

                --swiper-navigation-size: var(--grid-gap);
                --swiper-navigation-top-offset: 100%;
                --swiper-navigation-sides-offset: 0;
                --swiper-navigation-color: var(--swiper-theme-color);

                --swiper-pagination-color: var(--mui-palette-text-primary);
                --swiper-pagination-left: auto;
                --swiper-pagination-right: var(--grid-gap-half);
                --swiper-pagination-bottom: var(--grid-gap-half);
                --swiper-pagination-top: auto;
                --swiper-pagination-fraction-color: inherit;
                --swiper-pagination-progressbar-bg-color: rgba(0, 0, 0, 0.25);
                --swiper-pagination-progressbar-size: var(--grid-gap-quarter);
                --swiper-pagination-bullet-size: var(--grid-gap-half);
                --swiper-pagination-bullet-width: var(--grid-gap-half);
                --swiper-pagination-bullet-height: var(--grid-gap-half);
                --swiper-pagination-bullet-border-radius: 50%;
                --swiper-pagination-bullet-inactive-color: var(--mui-palette-text-primary);
                --swiper-pagination-bullet-inactive-opacity: 0.2;
                --swiper-pagination-bullet-opacity: 1;
                --swiper-pagination-bullet-horizontal-gap: var(--grid-gap-quarter);
                --swiper-pagination-bullet-vertical-gap: var(--grid-gap-quarter);

                --swiper-scrollbar-border-radius: var(--grid-gap-half);
                --swiper-scrollbar-top: auto;
                --swiper-scrollbar-bottom: var(--grid-gap-quarter);
                --swiper-scrollbar-left: auto;
                --swiper-scrollbar-right: var(--grid-gap-quarter);
                --swiper-scrollbar-sides-offset: 1%;
                --swiper-scrollbar-bg-color: rgba(0, 0, 0, 0.1);
                --swiper-scrollbar-drag-bg-color: rgba(0, 0, 0, 0.5);
                --swiper-scrollbar-size: var(--grid-gap-quarter);
              }

              body * {
                --section-padding: calc(var(--grid-gap) * 2);
                ${theme.breakpoints.up('sm')} {
                  --grid-gap: var(--grid-gap-sm);
                  --grid-margin: var(--grid-margin-sm);
                  --container-width: var(--container-width-sm);
                  --container-margin: var(--container-width-md);
                  --container-gutter: minmax(
                    var(--grid-margin),
                    calc(50vw - var(--grid-margin) - (var(--container-margin) / 2))
                  );
                }

                ${theme.breakpoints.up('md')} {
                  --grid-gap: var(--grid-gap-md);
                  --grid-margin: var(--grid-margin-md);
                  --grid-gap-half: calc(var(--grid-gap) / 2);
                  --grid-gap-quarter: calc(var(--grid-gap) / 4);
                  --container-width: var(--container-width-md);
                  --container-margin: var(--container-width-lg);
                  --container-gutter: minmax(
                    var(--grid-margin),
                    calc(50vw - var(--grid-margin) - (var(--container-margin) / 2))
                  );
                }

                ${theme.breakpoints.up('lg')} {
                  --grid-gap: var(--grid-gap-lg);
                  --grid-margin: var(--grid-margin-lg);
                  --container-width: var(--container-width-lg);
                  --container-margin: var(--container-width-xl);
                  --container-gutter: minmax(
                    var(--grid-margin),
                    calc(50vw - var(--grid-margin) - (var(--container-margin) / 2))
                  );
                }

                ${theme.breakpoints.up('xl')} {
                  --grid-gap: var(--grid-gap-xl);
                  --grid-margin: var(--grid-margin-xl);
                  --container-width: var(--container-width-xl);
                  --container-margin: var(--container-width-xl);
                  --container-gutter: minmax(
                    var(--grid-margin),
                    calc(50vw - var(--grid-margin) - (var(--container-margin) / 2))
                  );
                }

                /* ${theme.breakpoints.up('xxl')} {
                  --grid-gap: var(--grid-gap-xxl);
                  --grid-margin: var(--grid-margin-xxl);
                  --container-width: var(--container-width-xxl);
                  --container-margin: var(--container-width-xxl);
                  --container-gutter: minmax(
                    var(--grid-margin),
                    calc(
                      50vw - var(--grid-margin) - (var(--container-margin) / 2)
                    )
                  );

                  --body1-font-size: 1.375rem;
                  --body2-font-size: 1.375rem;
                  --bodyXSmall-font-size: 1.125rem;
                  --bodySmall-font-size: 1.25rem;
                  --bodyLarge-font-size: 1.25rem;
                } */

                ${theme.containerBreakpoints.up('xl')} {
                  --h1-font-size: ${(h1FontSizeBase / 8) * 9}rem;
                  --h2-font-size: ${(h2FontSizeBase / 8) * 9}rem;
                  --h3-font-size: ${(h3FontSizeBase / 8) * 9}rem;
                  --h4-font-size: ${(h4FontSizeBase / 8) * 9}rem;
                  --h5-font-size: ${(h5FontSizeBase / 8) * 9}rem;

                  --body1-font-size: 1.125rem;
                  --body2-font-size: 1.125rem;
                  --bodyXSmall-font-size: 0.875rem;
                  --bodySmall-font-size: 1rem;
                  --bodyLarge-font-size: 1.25rem;
                }

                ${theme.containerBreakpoints.down('lg')} {
                  --h1-font-size: ${(h1FontSizeBase / 8) * 7}rem;
                  --h2-font-size: ${(h2FontSizeBase / 8) * 7}rem;
                  --h3-font-size: ${(h3FontSizeBase / 8) * 7}rem;
                  --h4-font-size: ${(h4FontSizeBase / 8) * 7}rem;
                  --h5-font-size: ${(h5FontSizeBase / 8) * 7}rem;

                  --body1-font-size: 1rem;
                  --body2-font-size: 1rem;
                  --bodyXSmall-font-size: 0.875rem;
                  --bodySmall-font-size: 1rem;
                  --bodyLarge-font-size: 1.125rem;
                }

                ${theme.containerBreakpoints.down('md')} {
                  --h1-font-size: ${(h1FontSizeBase / 8) * 6}rem;
                  --h2-font-size: ${(h2FontSizeBase / 8) * 6}rem;
                  --h3-font-size: ${(h3FontSizeBase / 8) * 6}rem;
                }

                ${theme.containerBreakpoints.down('sm')} {
                  --h1-font-size: ${(h1FontSizeBase / 8) * 4}rem;
                  --h2-font-size: ${(h2FontSizeBase / 8) * 4}rem;
                  --h3-font-size: ${(h3FontSizeBase / 8) * 5}rem;
                }

                ${theme.breakpoints.up('xxl')} {
                  --grid-gap: var(--grid-gap-xxl);
                  --grid-margin: var(--grid-margin-xxl);
                  --container-width: var(--container-width-xxl);
                  --container-margin: var(--container-width-xxl);
                  --container-gutter: minmax(
                    var(--grid-margin),
                    calc(50vw - var(--grid-margin) - (var(--container-margin) / 2))
                  );

                  --body1-font-size: 1.375rem;
                  --body2-font-size: 1.375rem;
                  --bodyXSmall-font-size: 1.125rem;
                  --bodySmall-font-size: 1.25rem;
                  --bodyLarge-font-size: 1.5rem;
                }
              }
            `}
          />
          {children}
        </CssVarsProvider>
      </StyledComponentsRegistry>
    </>
  );
}
