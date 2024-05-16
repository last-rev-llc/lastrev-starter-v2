import dynamic from 'next/dynamic';
const Block = dynamic(() => import('./Block'));
const Hero = dynamic(() => import('./Hero'));
const Link = dynamic(() => import('./Link'));
const Media = dynamic(() => import('./Media'));
const Page = dynamic(() => import('./Page'));
const Text = dynamic(() => import('./Text'));
const RichText = dynamic(() => import('./RichText'));
const Carousel = dynamic(() => import('./Carousel'));
const Collection = dynamic(() => import('./Collection'));
const Tabs = dynamic(() => import('./Tabs'));
const Card = dynamic(() => import('./Card'));
const Person = dynamic(() => import('./Person'));
const Quote = dynamic(() => import('./Quote'));
const Blog = dynamic(() => import('./Blog'));
const Accordion = dynamic(() => import('./Accordion'));
const Form = dynamic(() => import('./Form'));
const Section = dynamic(() => import('./Section'));
const NavigationItem = dynamic(() => import('./NavigationItem'));
const Header = dynamic(() => import('./Header'));
const Footer = dynamic(() => import('./Footer'));
const HeaderNavLink = dynamic(() => import('./Header/HeaderNavLink/HeaderNavLink'));
const HeaderNavGroup = dynamic(() => import('./Header/HeaderNavGroup/HeaderNavGroup'));
const HeaderNavLinkNested = dynamic(
  () => import('./Header/HeaderNavLinkNested/HeaderNavLinkNested')
);
const FooterNavigationItem = dynamic(() => import('./Footer/FooterNavigationItem'));
const FooterNavigationItemGroup = dynamic(() => import('./Footer/FooterNavigationItemGroup'));
const SiteMessage = dynamic(() => import('./SiteMessage'));
const Breadcrumbs = dynamic(() => import('./Breadcrumbs'));

export const contentMapping: {
  [key: string]: any;
} = {
  'Collection:.*Carousel': Carousel,
  'CollectionExpandable:Accordion': Accordion,
  'CollectionExpandable:Tabs': Tabs,
  'CollectionExpandable': Tabs,
  'ElementForm': Form,
  'ElementVideo': Media,
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
  'Card:linkList': Link,
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
  Quote,
  RichText,
  Section,
  SiteMessage,
  Tabs,
  Text
};

export default contentMapping;
