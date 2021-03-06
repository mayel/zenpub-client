import {
  SearchHostIndexAndMyFollowingsQuery,
  SearchFollowedCollectionFragment,
  SearchFollowedCommunityFragment,
  useSearchFollowMutation,
  useSearchUnfollowMutation,
  SearchHostIndexAndMyFollowingsDocument
} from './SearchData.generated';
import { Hit } from './Hits';
import { useMemo, useCallback } from 'react';
// import { GetSidebarQueryDocument } from 'graphql/getSidebar.generated';

type Q = SearchHostIndexAndMyFollowingsQuery;
export const useHit = (info: Q, hit: Hit) => {
  const moodleLMSURL = useMemo(() => getLMSURL(info), [info]);

  const [followHit, followHitResult] = useSearchFollowMutation();
  const [unfollowHit, unfollowResult] = useSearchUnfollowMutation();

  const mutating = followHitResult.loading || unfollowResult.loading;
  const collectionFollows = useMemo(() => getCollectionFollows(info), [info]);
  const communityFollows = useMemo(() => getCommunityFollows(info), [info]);

  const followContextId = hitFollowContextId(hit);
  const isFollowable = !!followContextId;

  const followingId = useMemo(
    () => hitFollowingId(hit, communityFollows, collectionFollows),
    [collectionFollows, communityFollows, hit]
  );
  const isFollowing = !!followingId;

  const follow = useCallback(() => {
    const canonicalUrl = hit.canonicalUrl;
    if (mutating || !canonicalUrl) {
      return;
    }
    return followHit({
      variables: { url: canonicalUrl },
      refetchQueries: [
        // { query: GetSidebarQueryDocument },
        { query: SearchHostIndexAndMyFollowingsDocument }
      ]
    });
  }, [followHit, hit, followContextId]);

  const unfollow = useCallback(() => {
    if (mutating || !followingId) {
      return;
    }
    unfollowHit({
      variables: { contextId: followingId },
      refetchQueries: [
        // { query: GetSidebarQueryDocument },
        { query: SearchHostIndexAndMyFollowingsDocument }
      ]
    });
  }, [followHit, hit, followingId]);

  return useMemo(() => {
    return {
      isFollowing,
      isFollowable,
      follow,
      unfollow,
      mutating,
      moodleLMSURL
    };
  }, [isFollowing, isFollowable, follow, unfollow, mutating, moodleLMSURL]);
};

// export const isHitLocal = (hit: Hit, info: Q) => {
//   if (!info.instance) {
//     return null;
//   }
//   return hit.index_instance === info.instance.hostname;
// };

export const hitFollowContextId = (hit: Hit) => {
  if (hit.index_type !== 'Community' && hit.index_type !== 'Collection') {
    return null;
  }
  return hit.canonicalUrl;
};

export const hitFollowingId = (
  hit: Hit,
  communityFollows: SearchFollowedCommunityFragment[],
  collectionFollows: SearchFollowedCollectionFragment[]
) => {
  if (hit.index_type === 'Community') {
    const actor = communityFollows.find(sfc => {
      return (
        sfc.canonicalUrl &&
        hit.canonicalUrl &&
        sfc.canonicalUrl === hit.canonicalUrl
      );
    });
    return actor?.myFollow?.id;
  } else if (hit.index_type === 'Collection') {
    const actor = collectionFollows.find(sfc => {
      return (
        sfc.canonicalUrl &&
        hit.canonicalUrl &&
        sfc.canonicalUrl === hit.canonicalUrl
      );
    });
    return actor?.myFollow?.id;
  } else {
    return undefined;
  }
};
export const getCollectionFollows = (
  info: Q
): SearchFollowedCollectionFragment[] => {
  const collectionFollowsEdges =
    info.me &&
    info.me.user.collectionFollows &&
    info.me.user.collectionFollows.edges;
  if (!collectionFollowsEdges) {
    return [];
  }
  const collectionFollows = collectionFollowsEdges
    .map(collectionFollow => collectionFollow.context)
    .filter(
      (context): context is SearchFollowedCollectionFragment =>
        context.__typename === 'Collection'
    );
  return collectionFollows;
};

export const getCommunityFollows = (
  info: Q
): SearchFollowedCommunityFragment[] => {
  const communityFollowsEdges =
    info.me &&
    info.me.user.communityFollows &&
    info.me.user.communityFollows.edges;
  if (!communityFollowsEdges) {
    return [];
  }
  const communityFollows = communityFollowsEdges
    .map(communityFollow => communityFollow.context)
    .filter(
      (context): context is SearchFollowedCommunityFragment =>
        context.__typename === 'Community'
    );
  return communityFollows;
};

export const getLMSURL = (info: Q): any => {
  const url =
    info.me &&
    info.me.user &&
    info.me.user.extraInfo &&
    info.me.user.extraInfo.preferred_moodle_lms_url;
  if (!url) {
    return null;
  }
  return url;
};
