/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, isNil, isUndefined, omitBy } from "lodash";

import { ILogoProps } from "@/lib/components/base";
import {
  IGlobalFooterProps,
  IGlobalHeaderProps,
} from "@/lib/components/layout";
import {
  AppRoutes,
  ContactInfoType,
  ILayoutContentDto,
  NavigationLink,
  RelationTo,
} from "@/lib/types";

import { buildMediaUrl } from "./media";

interface TopicItem {
  id: string;
  label: string;
  description: string;
  icon: string | undefined;
  href: string;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  icon?: { name: string };
  category: { id: string };
}

interface Page {
  topic?: { id: string };
  route: string;
}

// TODO: Revise carefully the implementation it surely
// has some issues and incomplete parts

export const LayoutMappers = (layoutContent: ILayoutContentDto) => {
  const lookupLayoutContent = (path: string) => get(layoutContent, path);

  const mapContentToLogoProps = () =>
    omitBy(
      {
        href: AppRoutes.HOME,
        imgSrc: buildMediaUrl(lookupLayoutContent("data.appLogo.media.url")),
        altText: lookupLayoutContent("data.appLogo.name"),
        width: lookupLayoutContent("data.appLogo.media.width"),
        height: lookupLayoutContent("data.appLogo.media.height"),
      },
      isUndefined,
    ) as ILogoProps;

  const mapContentToFaviconUrl = () => {
    const faviconUrl = lookupLayoutContent("data.layout.favicon[0].media.url");

    if (!faviconUrl) {
      return "";
    }

    return buildMediaUrl(faviconUrl);
  };

  const mapContentToHeaderProps = (): IGlobalHeaderProps => {
    let navbarItems: IGlobalHeaderProps["navbarItems"] | null = null;
    let navmenuGroups: IGlobalHeaderProps["navmenuGroups"] | null = null;

    const logo = mapContentToLogoProps();
    const ctaButtonLabel = lookupLayoutContent("data.layout.action.name");
    const ctaButtonIcon = lookupLayoutContent("data.layout.action.icon.name");
    const ctaActionType = lookupLayoutContent("data.layout.action.actionType");
    const ctaActionParams = lookupLayoutContent(
      "data.layout.action.actionParams",
    );

    const navbarItemsContent = lookupLayoutContent(
      "data.layout.navbar[0].navigationItems",
    );

    if (Array.isArray(navbarItemsContent)) {
      navbarItems = navbarItemsContent.map(
        ({ relationTo, value: { id, name, route } }: any) => ({
          relationTo,
          id,
          label: name,
          route,
        }),
      );

      const topicsContent = lookupLayoutContent("data.topics.docs");
      const pagesContent = lookupLayoutContent("data.pages.docs");

      if (Array.isArray(topicsContent)) {
        navmenuGroups = navbarItemsContent.reduce(
          (acc, { relationTo, value: { name, id } }) => {
            if (relationTo !== RelationTo.CATEGORIES) {
              return acc;
            }

            const topicsInCategory = topicsContent.reduce(
              (acc: TopicItem[], topic: Topic) => {
                if (topic.category.id !== id) {
                  return acc;
                }
                const topicId = topic.id;

                const topicRoute =
                  pagesContent.find((page: Page) => page.topic?.id === topicId)
                    ?.route ?? "";

                acc.push({
                  id: topicId,
                  label: topic.name,
                  description: topic.description,
                  icon: topic.icon?.name,
                  href: topicRoute,
                });

                return acc;
              },
              [] as TopicItem[],
            );

            if (topicsInCategory.length > 0) {
              acc[id] = { id, title: name, items: topicsInCategory };
            }

            return acc;
          },
          {} as IGlobalHeaderProps["navmenuGroups"],
        );
      }
    }

    return omitBy(
      {
        navbarItems,
        ctaButtonLabel,
        ctaButtonIcon,
        ctaActionType,
        ctaActionParams,
        navmenuGroups,
        logo,
      },
      isNil,
    ) as IGlobalHeaderProps;
  };

  const mapContentToMetadata = () => {
    const title = lookupLayoutContent("data.layout.siteMeta[0].title");
    const description = lookupLayoutContent(
      "data.layout.siteMeta[0].description",
    );

    return {
      title,
      description,
    };
  };

  const mapContentToUtilityBarProps = () => {
    let shortcuts: NavigationLink[] | null = null;
    let quickContact: [ContactInfoType, string] | null = null;

    const utilityBarShortcuts = lookupLayoutContent(
      "data.layout.utilityBarShortcuts[0].page",
    );

    if (Array.isArray(utilityBarShortcuts)) {
      shortcuts = utilityBarShortcuts.map(
        (page: { name: string; route: string }) => ({
          label: page.name,
          href: page.route,
        }),
      );
    }

    const contactType = lookupLayoutContent("data.layout.contactType");
    const contacts = lookupLayoutContent("data.contact.contactItems");

    if (contactType && Array.isArray(contacts)) {
      const contactString = contacts?.find(
        (contact) => contact.contactType === contactType,
      )?.textValue;
      quickContact = [contactType as ContactInfoType, contactString];
    }

    return omitBy(
      {
        shortcuts,
        quickContact,
      },
      isNil,
    );
  };

  const mapContentToFooterProps = () => {
    let socialButtons: IGlobalFooterProps["socialButtons"] | null = null;
    let quickLinks: IGlobalFooterProps["quickLinks"] | null = null;
    let quickLinksTitle: IGlobalFooterProps["quickLinksTitle"] | null = null;
    let resourcesLinks: IGlobalFooterProps["resourcesLinks"] | null = null;
    let resourcesLinksTitle: IGlobalFooterProps["resourcesLinksTitle"] | null =
      null;
    let contacts: IGlobalFooterProps["contacts"] | null = null;

    const logo = mapContentToLogoProps();

    const socialButtonsContent = lookupLayoutContent("data.social.socialLink");

    if (Array.isArray(socialButtonsContent)) {
      socialButtons = socialButtonsContent.map(
        ({ socialNetworkName, url }: any) => ({
          type: socialNetworkName,
          href: url,
        }),
      );
    }

    const quickLinksAndResourcesContent = lookupLayoutContent(
      "data.layout.quickLinks",
    );

    if (Array.isArray(quickLinksAndResourcesContent)) {
      const [quickLinksContent, resourcesContent] =
        quickLinksAndResourcesContent;

      quickLinks = quickLinksContent.page.map(({ route, name }: any) => ({
        label: name,
        href: route,
      }));

      resourcesLinks = resourcesContent.page.map(({ route, name }: any) => ({
        label: name,
        href: route,
      }));

      quickLinksTitle = quickLinksContent.name;
      resourcesLinksTitle = resourcesContent.name;
    }

    const contactsContent = lookupLayoutContent("data.contact.contactItems");

    if (Array.isArray(contactsContent)) {
      contacts = contactsContent.reduce(
        (acc, contact) => {
          acc[contact.contactType] = contact.textValue;
          return acc;
        },
        {} as Record<ContactInfoType, string>,
      );
    }

    return {
      logo,
      socialButtons,
      quickLinksTitle,
      quickLinks,
      resourcesLinksTitle,
      resourcesLinks,
      contacts,
    } as unknown as IGlobalFooterProps;
  };

  return {
    mapContentToHeaderProps,
    mapContentToMetadata,
    mapContentToFaviconUrl,
    mapContentToUtilityBarProps,
    mapContentToFooterProps,
  };
};
