// Card variant mapping from Sanity values to code values
// This mapping is used by both Card and Collection extensions

export const CARD_VARIANT_MAPPING: Record<string, string> = {
  'Default': 'default',
  'Media': 'media',
  'Logo': 'logo',
  'Icon': 'icon',
  'Icon Left': 'iconLeft',
  'Icon Padding': 'iconPadding',
  'Icon Stats': 'iconStats',
  'Icon Listing': 'iconListing',
  'Quote': 'testimonial',
  // Legacy mappings for backward compatibility
  'Blog': 'media',
  'Person': 'media',
  'Pricing': 'media'
};

export const mapCardVariant = (sanityVariant: string | undefined): string => {
  if (!sanityVariant) return 'default';
  return CARD_VARIANT_MAPPING[sanityVariant] || sanityVariant;
};
