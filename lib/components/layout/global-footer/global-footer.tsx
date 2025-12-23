// TODO: refactor for quick links and resources to be driven
// by the same data structure from CMS, adjust grid layout
// accordingly

import Link from "next/link";

import { contactIconMap } from "@/lib/constants";
import { useLabel } from "@/lib/hooks";
import { ContactInfoType, IBaseProps, NavigationLink } from "@/lib/types";

import { ILogoProps, Logo } from "../../base";
import { ISocialButtonProps, SocialButton } from "../social-button";
import {
  globalFooterClass,
  footerLogoSocialsClass,
  footerQuickLinksClass,
  footerResourcesClass,
  footerContactInfoClass,
  footerLogoClass,
  footerSocialsClass,
  footerSocialButtonClass,
  footerCopyrightClass,
  footerLinkClass,
  footerSectionHeaderClass,
  footerContactItemClass,
  footerContactIconClass,
  footerContentClass,
} from "./global-footer.styles";

const renderSocialButton = ({ type, href }: ISocialButtonProps) => (
  <li key={type}>
    <SocialButton type={type} href={href} className={footerSocialButtonClass} />
  </li>
);

const renderFooterLink = ({ label, href }: NavigationLink) => (
  <li key={href} className={footerLinkClass}>
    <Link href={href}>{label}</Link>
  </li>
);

const renderFooterContacts = (contacts: Record<ContactInfoType, string>) =>
  Object.keys(contacts).map((contactType) => {
    const contactValue = contacts[contactType as ContactInfoType];
    const ContactIcon = contactIconMap[contactType as ContactInfoType];

    return (
      <li key={contactType} className={footerContactItemClass}>
        {ContactIcon && <ContactIcon className={footerContactIconClass} />}
        {contactValue}
      </li>
    );
  });
export interface IGlobalFooterProps extends IBaseProps {
  logo?: ILogoProps;
  socialButtons?: ISocialButtonProps[];
  quickLinksTitle?: string;
  quickLinks?: NavigationLink[];
  resourcesLinksTitle?: string;
  resourcesLinks?: NavigationLink[];
  contacts?: Record<ContactInfoType, string>;
}

export const GlobalFooter = ({
  logo,
  socialButtons,
  quickLinksTitle,
  quickLinks,
  resourcesLinksTitle,
  resourcesLinks,
  contacts,
  className = globalFooterClass,
}: IGlobalFooterProps) => {
  const { getLabelByKey } = useLabel();
  const copyrightNotice = getLabelByKey("copyrightNotice");
  const contactsTitle = getLabelByKey("contactsLabel");

  return (
    <footer className={className} data-test-id="global-footer">
      <div className={footerContentClass}>
        <section
          className={footerLogoSocialsClass}
          data-testid="footer-logo-socials"
        >
          {logo && <Logo {...logo} className={footerLogoClass} />}
          {!!socialButtons?.length && (
            <ul data-testid="footer-socials" className={footerSocialsClass}>
              {socialButtons.map(renderSocialButton)}
            </ul>
          )}
        </section>
        {!!quickLinks?.length && (
          <section
            className={footerQuickLinksClass}
            data-testid="footer-quick-links"
          >
            <h3 className={footerSectionHeaderClass}>{quickLinksTitle}</h3>
            <ul>{quickLinks.map(renderFooterLink)}</ul>
          </section>
        )}
        {!!resourcesLinks?.length && (
          <section
            className={footerResourcesClass}
            data-testid="footer-resources"
          >
            <h3 className={footerSectionHeaderClass}>{resourcesLinksTitle}</h3>
            <ul>{resourcesLinks.map(renderFooterLink)}</ul>
          </section>
        )}
        {!!contacts && (
          <section
            className={footerContactInfoClass}
            data-testid="footer-contact-info"
          >
            <h3 className={footerSectionHeaderClass}>{contactsTitle}</h3>
            <ul>{renderFooterContacts(contacts)}</ul>
          </section>
        )}
        <div data-testid="footer-copyright" className={footerCopyrightClass}>
          {copyrightNotice}
        </div>
      </div>
    </footer>
  );
};
