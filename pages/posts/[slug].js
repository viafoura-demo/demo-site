import Head from "next/head";
import { useRouter } from "next/router";
import { renderMetaTags, useQuerySubscription } from "react-datocms";

import Container from "@/components/container";
import PostBody from "@/components/post-body";
import PostHeader from "@/components/post-header";
import Sidebar from "@/components/sidebar";
import { fetchGraphQL } from "@/graphql/fetchGraphQL";
import { postBySlug } from "@/graphql/postBySlug";

export async function getStaticPaths() {
  const data = await fetchGraphQL({ query: `{ allPosts { slug } }` });

  return {
    paths: data.allPosts.map((post) => `/posts/${post.slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: postBySlug,
    preview,
    variables: {
      slug: params.slug,
    },
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await fetchGraphQL(graphqlRequest),
            token: process.env.GRAPHQL_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await fetchGraphQL(graphqlRequest),
          },
    },
  };
}

export default function Post({ subscription }) {
  const {
    data: { site, post },
  } = useQuerySubscription(subscription);

  const metaTags = post.seo.concat(site.favicon);

  const router = useRouter();
  const { adfree } = router.query;

  const vfConversation = post.content.blocks.find(
    (block) => block.__typename === "ConversationRecord"
  );

  return (
    <>
      <Head>
        {renderMetaTags(metaTags)}
        <meta name="vf:container_id" content={post.id} />
        <meta property="vf:author" content="viafoura-id:6157500021214" />
        <meta property="vf:author" content="viafoura-id:8892700021086" />
        <meta property="vf:author" content="viafoura-id:1472900021555" />
        <meta property="vf:author" content="viafoura-id:9063500021199" />
        {adfree && <meta property="vf:ads-disabled" />}
      </Head>
      <Container>
        <div className="flex">
          <article className="relative min-w-0">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              postId={post.id}
              topics={post.topic}
              vfConversation={vfConversation}
            />
            <PostBody
              content={post.content}
              author={post.author}
              topics={post.topic}
            />
          </article>
          <Sidebar
            showLiveChat={post.showLivechat}
            topicId={post.topic[0].id}
            topicName={post.topic[0].name}
          />
        </div>
      </Container>
    </>
  );
}
