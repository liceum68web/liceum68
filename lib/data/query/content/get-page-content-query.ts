export const GET_PAGE_CONTENT = `
  query Pages($slug: String) {
    Pages(where: { slug: { equals: $slug } }) {
      docs {
        associated_tags {
          tag_label
        }
        updatedAt
        child_components {
          item {
            relationTo
            value {
              ... on Responsive_image {
                slug
                associated_tags {
                  tag_label
                }
                image_source {
                  associated_tags {
                    tag_label
                  }
                  url
                }
                alt_text
              }
            }
          }
        }
      }
    }
  }
`;
