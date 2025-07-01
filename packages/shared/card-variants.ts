// Shared Card variant definitions to maintain consistency across the codebase
// This file is imported by both Sanity schema and GraphQL extensions

export const CARD_VARIANTS = {
  // Icon variants
  iconLeft: {
    value: 'iconLeft',
    title: '🎯 Icon Left',
    sanityValue: 'Icon Left'
  },
  iconCenter: {
    value: 'iconCenter', 
    title: '🎯 Icon Center',
    sanityValue: 'Icon Center'
  },
  
  // Icon padding variants
  iconPaddingLeft: {
    value: 'iconPaddingLeft',
    title: '🎯 Icon Padding Left',
    sanityValue: 'Icon Padding Left'
  },
  iconPaddingCenter: {
    value: 'iconPaddingCenter',
    title: '🎯 Icon Padding Center',
    sanityValue: 'Icon Padding Center'
  },
  
  // Logo variant
  logo: {
    value: 'logo',
    title: '🏢 Logo',
    sanityValue: 'Logo'
  },
  
  // Media variant
  media: {
    value: 'media',
    title: '🎬 Media',
    sanityValue: 'Media'
  },
  
  // Testimonial variant
  testimonial: {
    value: 'testimonial',
    title: '💬 Testimonial',
    sanityValue: 'Quote'
  },
  
  // Stats variant
  iconStats: {
    value: 'iconStats',
    title: '📊 Icon Stats',
    sanityValue: 'Icon Stats'
  },
  
  // Listing variant
  iconListing: {
    value: 'iconListing',
    title: '📋 Icon Listing',
    sanityValue: 'Icon Listing'
  },
  
  // Default
  default: {
    value: 'default',
    title: 'Default Card',
    sanityValue: 'Default'
  }
} as const;

// Helper to get all Sanity values for schema
export const getSanityCardVariantOptions = () => 
  Object.values(CARD_VARIANTS).map(variant => ({
    value: variant.sanityValue,
    title: variant.title
  }));

// Helper to get all code values for TypeScript enum
export const getCardVariantValues = () =>
  Object.values(CARD_VARIANTS).map(variant => variant.value);

// Helper to map Sanity value to code value
export const mapSanityToCodeVariant = (sanityValue: string): string => {
  const variant = Object.values(CARD_VARIANTS).find(v => v.sanityValue === sanityValue);
  return variant?.value || 'default';
};

// Helper to map code value to Sanity value
export const mapCodeToSanityVariant = (codeValue: string): string => {
  const variant = Object.values(CARD_VARIANTS).find(v => v.value === codeValue);
  return variant?.sanityValue || 'Default';
};