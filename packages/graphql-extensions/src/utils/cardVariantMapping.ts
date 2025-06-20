// Card variant mapping from Sanity values to code values
// This mapping is used by both Card and Collection extensions

export const CARD_VARIANT_MAPPING: Record<string, string> = {
  'Default': 'default',
  'Icon Left': 'iconLeft',
  'Icon Center': 'iconCenter',
  'Icon Padding Left': 'iconPaddingLeft',
  'Icon Padding Center': 'iconPaddingCenter',
  'Logo': 'logo',
  'Media': 'media',
  'Quote': 'testimonial',
  'Icon Stats': 'iconStats',
  'Icon Listing': 'iconListing',
  // Legacy mappings for backward compatibility
  'Icon': 'iconLeft',
  'Blog': 'media',
  'Person': 'media',
  'Pricing': 'media'
};

export const mapCardVariant = (sanityVariant: string | undefined): string => {
  if (!sanityVariant) return 'default';
  return CARD_VARIANT_MAPPING[sanityVariant] || sanityVariant;
};