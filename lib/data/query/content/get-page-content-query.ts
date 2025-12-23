export const GET_PAGE_LAYOUT_CONTENT = `
    query Layout {
        Layout {
            quickLinks {
                ... on QuickLinks {
                    name
                    page {
                        route
                        name
                        id
                    }
                }
            }
            navbar {
                ... on Navbar {
                    name
                    navigationItems {
                        relationTo
                        value {
                            ... on Category {
                                id
                                name
                                slug
                            }
                            ... on Page {
                                id
                                name
                                route
                            }
                        }
                    }
                }
            }
            contactType
            utilityBarShortcuts {
                ... on QuickLinks {
                    page {
                        name
                        route
                        id
                    }
                }
            }
            siteMeta {
                ... on SiteMeta {
                    title
                    description
                }
            }
            favicon {
                ... on Favicon {
                    media {
                        url
                    }
                }
            }
            action {
                actionType
                actionParams {
                    ... on ActionParams {
                        page {
                            route
                        }
                    }
                }
                name
                icon
            }
        }
        Topics {
            docs {
                category {
                    id
                }
                id
                name
                icon
                description
            }
        }
        Pages(where: { isMainPage: { equals: true } }) {
            docs {
                id
                route
                topic {
                    id
                }
            }
        }
        AppLogo {
            name
            media {
                width
                height
                url
            }
        }
        Social {
            socialLink {
                ... on SocialLink {
                    id
                    socialNetworkName
                    url
                }
            }
        }
        Contact {
            contactItems {
                ... on ContactItem {
                    contactType
                    textValue
                }
            }
        }
    }
`;
