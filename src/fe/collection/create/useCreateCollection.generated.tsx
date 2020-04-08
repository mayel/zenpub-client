import * as Types from '../../../graphql/types.generated';

import { CollectionPageDataFragment } from '../../../HOC/pages/collection/CollectionPage.generated';
import gql from 'graphql-tag';
import { CollectionPageDataFragmentDoc } from '../../../HOC/pages/collection/CollectionPage.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type CreateCollectionMutationVariables = {
  collection: Types.CollectionInput,
  communityId: Types.Scalars['String'],
  icon?: Types.Maybe<Types.UploadInput>
};


export type CreateCollectionMutation = (
  { __typename: 'RootMutationType' }
  & { createCollection: Types.Maybe<(
    { __typename: 'Collection' }
    & CollectionPageDataFragment
  )> }
);


export const CreateCollectionDocument = gql`
    mutation createCollection($collection: CollectionInput!, $communityId: String!, $icon: UploadInput) {
  createCollection(collection: $collection, communityId: $communityId, icon: $icon) {
    ...CollectionPageData
  }
}
    ${CollectionPageDataFragmentDoc}`;
export type CreateCollectionMutationFn = ApolloReactCommon.MutationFunction<CreateCollectionMutation, CreateCollectionMutationVariables>;
export type CreateCollectionComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateCollectionMutation, CreateCollectionMutationVariables>, 'mutation'>;

    export const CreateCollectionComponent = (props: CreateCollectionComponentProps) => (
      <ApolloReactComponents.Mutation<CreateCollectionMutation, CreateCollectionMutationVariables> mutation={CreateCollectionDocument} {...props} />
    );
    
export type CreateCollectionProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateCollectionMutation, CreateCollectionMutationVariables> & TChildProps;
export function withCreateCollection<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateCollectionMutation,
  CreateCollectionMutationVariables,
  CreateCollectionProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateCollectionMutation, CreateCollectionMutationVariables, CreateCollectionProps<TChildProps>>(CreateCollectionDocument, {
      alias: 'createCollection',
      ...operationOptions
    });
};

/**
 * __useCreateCollectionMutation__
 *
 * To run a mutation, you first call `useCreateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionMutation, { data, loading, error }] = useCreateCollectionMutation({
 *   variables: {
 *      collection: // value for 'collection'
 *      communityId: // value for 'communityId'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useCreateCollectionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCollectionMutation, CreateCollectionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCollectionMutation, CreateCollectionMutationVariables>(CreateCollectionDocument, baseOptions);
      }
export type CreateCollectionMutationHookResult = ReturnType<typeof useCreateCollectionMutation>;
export type CreateCollectionMutationResult = ApolloReactCommon.MutationResult<CreateCollectionMutation>;
export type CreateCollectionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCollectionMutation, CreateCollectionMutationVariables>;


export interface CreateCollectionMutationOperation {
  operationName: 'createCollection'
  result: CreateCollectionMutation
  variables: CreateCollectionMutationVariables
  type: 'mutation'
}
