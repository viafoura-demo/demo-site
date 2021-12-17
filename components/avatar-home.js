import { BiCommentDetail } from "react-icons/bi";

export default function AvatarHome({
  authorName,
  postId,
  postSlug,
  vfConversationId,
}) {
  return (
    <div className="w-50">
      <div className="flex text-base font-semibold text-gray-800">
        {authorName}
        {vfConversationId && (
          <a
            className="flex mr-3 hover:underline"
            href={`/posts/${postSlug}#vf-conversations-container`}
            alt="Join the Conversation"
            title="Join the Conversation"
          >
            <BiCommentDetail className="w-5 h-5 mx-1 mt-[3px]" />{" "}
            <vf-conversations-count vf-container-id={postId} />
          </a>
        )}
      </div>
    </div>
  );
}
