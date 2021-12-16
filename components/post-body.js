import { Image, StructuredText } from "react-datocms";

import AuthorFollow from "@/components/author-follow";
import TopicFollow from "@/components/topic-follow";

export default function PostBody({ content, author, topics }) {
  return (
    <div className="max-w-4xl prose prose-sky">
      <StructuredText
        data={content}
        renderBlock={({ record }) => {
          if (record.__typename === "ImageBlockRecord") {
            return (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image
                data={{ ...record.image.responsiveImage, alt: "Content Image" }}
              />
            );
          }
          if (record.__typename === "ContentRecirculationRecord") {
            return (
              <div
                id="vf-content-recirculation-container"
                dangerouslySetInnerHTML={{
                  __html: record.contentRecirculation,
                }}
              />
            );
          }
          if (record.__typename === "ConversationRecord") {
            return (
              <>
                <div id="vf-conversations-container" className="scroll-mt-20">
                  <AuthorFollow picture={author.picture} name={author.name} />
                  <TopicFollow topics={topics} />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: record.conversation,
                    }}
                  />
                </div>
              </>
            );
          }
          if (record.__typename === "LiveChatRecord") {
            return (
              <div
                dangerouslySetInnerHTML={{
                  __html: record.liveChat,
                }}
              />
            );
          }
          if (record.__typename === "LiveStoryRecord") {
            return (
              <div
                dangerouslySetInnerHTML={{
                  __html: record.liveStory,
                }}
              />
            );
          }
          if (record.__typename === "ConversationStarterRecord") {
            return (
              <div
                id="vf-conversation-starter-container"
                dangerouslySetInnerHTML={{
                  __html: record.conversationStarter,
                }}
              />
            );
          }

          return (
            <>
              <p>Don&apos;t know how to render a block!</p>
              <pre>{JSON.stringify(record, null, 2)}</pre>
            </>
          );
        }}
      />
    </div>
  );
}
