import { metaTagsFragment, responsiveImageFragment } from "@/graphql/fragments";

const gql = String.raw;

export const postsByTopic = gql`
  query PostsByTopic($topicId: [ItemId]) {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    blog {
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
    allPosts(filter: { topic: { allIn: $topicId } }) {
      id
      slug
      title
      excerpt
      coverImage {
        responsiveImage(imgixParams: { fm: jpg, fit: crop, w: 856, h: 428 }) {
          ...responsiveImageFragment
        }
      }
      author {
        name
      }
    }
  }
  ${responsiveImageFragment}
  ${metaTagsFragment}
`;
