import React from 'react';
import { BlockProps } from '../Block/Block.types';

export const addSvgIconToListItems = (
  jsonBody: (BlockProps['supplementalContent'] | BlockProps['body']) & {
    json?: string;
  },
  listItemsIcon: React.ReactNode | React.ReactNode[] // Accept either a single icon or an array of icons
): BlockProps['supplementalContent'] | BlockProps['body'] => {
  // Helper function to recursively traverse and modify the JSON
  let iconIndex = 0; // Track the current icon index if an array of icons is provided

  const traverseAndModify = (node: any) => {
    if (node?.nodeType === 'list-item' && node?.content) {
      const paragraphNode = node.content.find((child: any) => child.nodeType === 'paragraph');

      if (paragraphNode && paragraphNode.content) {
        // Check if the SVG icon is already present
        const hasIcon = paragraphNode.content.some(
          (childNode: any) => childNode.nodeType === 'text' && React.isValidElement(childNode.value)
        );

        if (!hasIcon) {
          // Determine the icon to use (single icon or array of icons in sequence)
          const currentIcon =
            Array.isArray(listItemsIcon) && listItemsIcon.length > 0
              ? listItemsIcon[iconIndex % listItemsIcon.length]
              : listItemsIcon;

          // Insert the SVG icon as a text node
          const svgIconNode = {
            data: {},
            marks: [],
            value: currentIcon,
            nodeType: 'text'
          };

          // Remove unwanted nodes between icon and text
          paragraphNode.content = paragraphNode.content.filter(
            (childNode: any) =>
              !(
                (childNode.nodeType === 'text' && childNode.value === '') // Remove empty text nodes
              ) && !(childNode.nodeType === 'embedded-entry-inline') // Remove embedded entry nodes
          );

          // Add the SVG icon node at the start of the paragraph content
          paragraphNode.content.unshift(svgIconNode);

          // Increment the icon index for the next list item
          iconIndex++;
        }
      }
    }

    if (node?.content && Array.isArray(node.content)) {
      node.content.forEach((childNode: any) => traverseAndModify(childNode));
    }
  };

  traverseAndModify(jsonBody?.json);

  return jsonBody;
};
