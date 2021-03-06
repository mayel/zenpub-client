import { Collection } from 'graphql/types.generated';
import React, { FC, useMemo } from 'react';
import {
  Collection as CollectionPreviewUI,
  Props as CollectionPreviewProps
} from 'ui/modules/Previews/Collection';
import { useCollectionPreview } from 'fe/collection/preview/useCollectionPreview';
import { useFormik } from 'formik';

export interface Props {
  collectionId: Collection['id'];
}

export const CollectionPreviewHOC: FC<Props> = ({ collectionId }) => {
  const { collection, toggleFollow } = useCollectionPreview(collectionId);
  const toggleFollowFormik = useFormik({
    initialValues: {},
    onSubmit: toggleFollow
  });

  const collectionPreviewProps = useMemo<CollectionPreviewProps | null>(() => {
    if (!collection) {
      return null;
    }
    const {
      icon,
      isLocal,
      canonicalUrl,
      name,
      summary,
      resourceCount,
      displayUsername,
      myFollow
    } = collection;

    const props: CollectionPreviewProps = {
      displayUsername,
      icon: icon?.url || '',
      isFollowing: !!myFollow,
      link: {
        url: isLocal ? `/collections/${collectionId}` : canonicalUrl || '',
        external: !isLocal
      },
      name,
      summary: summary || '',
      totalResources: resourceCount || null,
      toggleFollowFormik
    };
    return props;
  }, [collection, toggleFollowFormik]);

  return (
    collectionPreviewProps && (
      <CollectionPreviewUI {...collectionPreviewProps} />
    )
  );
};
