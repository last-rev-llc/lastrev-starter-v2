import dynamic from 'next/dynamic';

const Accordion = dynamic(() => import('./Accordion'));
const Block = dynamic(() => import('./Block'));
const Blog = dynamic(() => import('./Blog'));
const Breadcrumbs = dynamic(() => import('./Breadcrumbs'));
const Card = dynamic(() => import('./Card'));
const Carousel = dynamic(() => import('./Carousel'));
const Collection = dynamic(() => import('./Collection'));
const Footer = dynamic(() => import('./Footer'));
const FooterNavigationItem = dynamic(() => import('./Footer/FooterNavigationItem'));
const FooterNavigationItemGroup = dynamic(() => import('./Footer/FooterNavigationItemGroup'));
const Form = dynamic(() => import('./Form'));
const Header = dynamic(() => import('./Header'));
const HeaderNavGroup = dynamic(() => import('./Header/HeaderNavGroup/HeaderNavGroup'));
const HeaderNavLink = dynamic(() => import('./Header/HeaderNavLink/HeaderNavLink'));
const HeaderNavLinkNested = dynamic(
  () => import('./Header/HeaderNavLinkNested/HeaderNavLinkNested')
);
const Hero = dynamic(() => import('./Hero'));
const IFrame = dynamic(() => import('./IFrame'));
const Link = dynamic(() => import('./Link'));
const Media = dynamic(() => import('./Media'));
const NavigationItem = dynamic(() => import('./NavigationItem'));
const Page = dynamic(() => import('./Page'));
const Person = dynamic(() => import('./Person'));
const RichText = dynamic(() => import('./RichText'));
const Section = dynamic(() => import('./Section'));
const SiteMessage = dynamic(() => import('./SiteMessage'));
const Tabs = dynamic(() => import('./Tabs'));
const Text = dynamic(() => import('./Text'));

export const contentMapping: {
  [key: string]: any;
} = {
  'Collection:.*Carousel': Carousel,
  'CollectionExpandable:Accordion': Accordion,
  'CollectionExpandable:Tabs': Tabs,
  'CollectionExpandable': Tabs,
  'ElementForm': Form,
  'ModuleIntegration:iFrame': IFrame,
  'NavigationItem:group': HeaderNavGroup,
  'NavigationItem:groupFooter': FooterNavigationItemGroup,
  'NavigationItem:link': HeaderNavLink,
  'NavigationItem:linkBoldedFooter': FooterNavigationItem,
  'NavigationItem:linkFooter': FooterNavigationItem,
  'NavigationItem:linkNested': HeaderNavLinkNested,
  Accordion,
  Block,
  Blog,
  Breadcrumbs,
  Card,
  Carousel,
  Collection,
  Footer,
  FooterNavigationItem,
  FooterNavigationItemGroup,
  Header,
  Hero,
  Link,
  Media,
  NavigationItem,
  Page,
  Person,
  RichText,
  Section,
  SiteMessage,
  Tabs,
  Text
};

export default contentMapping;
