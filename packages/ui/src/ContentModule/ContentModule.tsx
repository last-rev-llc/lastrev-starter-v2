/* eslint-disable react/jsx-props-no-spreading */
'use client';
import React, { useMemo } from 'react';
import { useContentModuleContext } from './ContentModuleContext';
import type { ContentModuleProps } from './ContentModule.types';
import ErrorBoundary from '../ErrorBoundary';

const getComponentForContentType = (
  contentType: string,
  contentMapping: { [x: string]: any; hasOwnProperty?: any }
) => {
  // Try regex match for keys in contentMapping
  for (const key in contentMapping) {
    if (new RegExp(`^${key}$`).test(contentType)) {
      return contentMapping[key];
    }
  }

  // Check if the contentMapping has the key directly
  if (contentMapping.hasOwnProperty(contentType)) {
    return contentMapping[contentType];
  }

  return null;
};

const ContentModule = React.forwardRef(function ContentModule(
  { __typename, theme, ...fields }: ContentModuleProps,
  ref: any
) {
  const contentMapping = useContentModuleContext();

  const contentMappingKey =
    fields?.variant &&
    getComponentForContentType(`${__typename}:${fields?.variant}`, contentMapping)
      ? `${__typename}:${fields?.variant}`
      : __typename;

  const Main = useMemo(
    () => contentMappingKey && getComponentForContentType(contentMappingKey, contentMapping),
    [contentMappingKey, contentMapping]
  );

  if (!Main) {
    console.info(
      `Did not find mapping for Content Type "${__typename}"${
        fields?.variant ? ` with a variant "${fields?.variant}"` : ``
      }. Please add a mapping in the ContentModuleProvider`
    );
    return null;
  }

  Main.displayName = `Content_${contentMappingKey}`;

  const sectionText = fields.title || fields.subtitle;

  const anchorText = !sectionText
    ? sectionText
    : sectionText
        // reference: https://gist.github.com/codeguy/6684588
        .normalize('NFKD')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/[-\s]+/g, '-');

  return (
    <ErrorBoundary>
      {anchorText ? (
        <span
          style={{
            display: 'contents'
          }}
          id={anchorText}
        />
      ) : null}
      <Main {...fields} ref={ref} />
    </ErrorBoundary>
  );
});

export default ContentModule;
