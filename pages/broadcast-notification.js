import { useEffect, useRef, useState } from "react";
import { useQuerySubscription } from "react-datocms";
import toast, { Toaster } from "react-hot-toast";

import Container from "@/components/container";
import SuccessToast from "@/components/toasts/success-toast";
import VfBroadcastForm from "@/components/vf-broadcast-form";
import { broadcastPosts } from "@/graphql/broadcastPosts";
import { fetchGraphQL } from "@/graphql/fetchGraphQL";

export async function getStaticProps() {
  return {
    props: {
      subscription: {
        enabled: false,
        initialData: await fetchGraphQL({
          query: broadcastPosts,
        }),
      },
    },
  };
}

export default function BroadcastNotification({ subscription }) {
  const {
    data: { allPosts },
  } = useQuerySubscription(subscription);

  const [userPrivilege, setUserPrivilege] = useState("guest");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [selectedPost, setSelectedPost] = useState({ ...allPosts[0] });
  const [broadcastType, setBroadcastType] = useState("site");
  const [imageUrl, setImageUrl] = useState(selectedPost.coverImage.url);

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await fetch(
        `https://api.viafoura.co/v2/${process.env.vfSiteId}/users/current`,
        { credentials: "include" }
      );
      const data = await response.json();
      setUserPrivilege(data.result.user_privilege);
      if (userPrivilege === "administrator") setIsSubmitDisabled(false);
    };
    getCurrentUser();
  }, [userPrivilege]);

  const onPostIdChange = (event) => {
    const selectedIndex = event.target.options.selectedIndex;
    const postId = event.target.options[selectedIndex].getAttribute("post-id");
    setSelectedPost(...allPosts.filter((post) => post.id === postId));
    setImageUrl(selectedPost.coverImage.url);
  };

  const broadcastFormRef = useRef(null);
  const onBroadcastSubmit = async (event) => {
    event.preventDefault();
    const { status } = await fetch(
      `https://notifications.viafoura.co/v5/notifications/${process.env.vfSiteUUID}/broadcast/form`,
      {
        method: "POST",
        body: new URLSearchParams(new FormData(broadcastFormRef.current)),
        credentials: "include",
      }
    );
    if (status === 204) {
      toast.custom((toast) => (
        <SuccessToast toast={toast} message="Broadcast notification sent" />
      ));
    }
  };

  return (
    <Container>
      <Toaster
        toastOptions={{ custom: { duration: 2000, position: "top-center" } }}
      />
      <VfBroadcastForm
        broadcastFormRef={broadcastFormRef}
        onPostIdChange={onPostIdChange}
        allPosts={allPosts}
        selectedPost={selectedPost}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        broadcastType={broadcastType}
        setBroadcastType={setBroadcastType}
        isSubmitDisabled={isSubmitDisabled}
        onBroadcastSubmit={onBroadcastSubmit}
      />
    </Container>
  );
}
