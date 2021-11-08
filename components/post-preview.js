import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";

export default function PostPreview({
  id,
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <CoverImage
        slug={slug}
        title={title}
        responsiveImage={coverImage.responsiveImage}
      />
      <h3 className="mb-3">
        <a href={`/posts/${slug}`} className="hover:underline">
          {title}
        </a>
      </h3>
      <p className="text-gray-700 antialiased text-base mb-4">{excerpt}</p>
      <Avatar
        name={author.name}
        picture={author.picture}
        date={date}
        postId={id}
      />
    </div>
  );
}
