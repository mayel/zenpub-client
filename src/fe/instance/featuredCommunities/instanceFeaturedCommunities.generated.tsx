import * as Types from '../../../graphql/types.generated';

import { DiscoverPageFeaturedCommunityInfoFragment } from '../../../HOC/pages/discover/DiscoverPage.generated';
import { FullPageInfoFragment } from '../../../@fragments/misc.generated';
import gql from 'graphql-tag';
import { FullPageInfoFragmentDoc } from '../../../@fragments/misc.generated';
import { DiscoverPageFeaturedCommunityInfoFragmentDoc } from '../../../HOC/pages/discover/DiscoverPage.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';



export type InstanceFeaturedCommunitiesQueryVariables = {};


export type InstanceFeaturedCommunitiesQuery = (
  { __typename: 'RootQueryType' }
  & { instance: Types.Maybe<(
    { __typename: 'Instance' }
    & { featuredCommunities: Types.Maybe<(
      { __typename: 'FeaturesPage' }
      & Pick<Types.FeaturesPage, 'totalCount'>
      & { pageInfo: (
        { __typename: 'PageInfo' }
        & FullPageInfoFragment
      ), edges: Array<(
        { __typename: 'Feature' }
        & Pick<Types.Feature, 'id'>
        & { context: Types.Maybe<{ __typename: 'Collection' } | (
          { __typename: 'Community' }
          & DiscoverPageFeaturedCommunityInfoFragment
        )> }
      )> }
    )> }
  )> }
);


export const InstanceFeaturedCommunitiesDocument = gql`
    query instanceFeaturedCommunities {
  instance @connection(key: "instanceFeaturedCommunities") {
    featuredCommunities {
      totalCount
      pageInfo {
        ...FullPageInfo
      }
      edges {
        id
        context {
          ...DiscoverPageFeaturedCommunityInfo
        }
      }
    }
  }
}
    ${FullPageInfoFragmentDoc}
${DiscoverPageFeaturedCommunityInfoFragmentDoc}`;

/**
 * __useInstanceFeaturedCommunitiesQuery__
 *
 * To run a query within a React component, call `useInstanceFeaturedCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstanceFeaturedCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstanceFeaturedCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInstanceFeaturedCommunitiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InstanceFeaturedCommunitiesQuery, InstanceFeaturedCommunitiesQueryVariables>) {
        return ApolloReactHooks.useQuery<InstanceFeaturedCommunitiesQuery, InstanceFeaturedCommunitiesQueryVariables>(InstanceFeaturedCommunitiesDocument, baseOptions);
      }
export function useInstanceFeaturedCommunitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InstanceFeaturedCommunitiesQuery, InstanceFeaturedCommunitiesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InstanceFeaturedCommunitiesQuery, InstanceFeaturedCommunitiesQueryVariables>(InstanceFeaturedCommunitiesDocument, baseOptions);
        }
export type InstanceFeaturedCommunitiesQueryHookResult = ReturnType<typeof useInstanceFeaturedCommunitiesQuery>;
export type InstanceFeaturedCommunitiesLazyQueryHookResult = ReturnType<typeof useInstanceFeaturedCommunitiesLazyQuery>;
export type InstanceFeaturedCommunitiesQueryResult = ApolloReactCommon.QueryResult<InstanceFeaturedCommunitiesQuery, InstanceFeaturedCommunitiesQueryVariables>;


export interface InstanceFeaturedCommunitiesQueryOperation {
  operationName: 'instanceFeaturedCommunities'
  result: InstanceFeaturedCommunitiesQuery
  variables: InstanceFeaturedCommunitiesQueryVariables
  type: 'query'
}
export const InstanceFeaturedCommunitiesQueryName:InstanceFeaturedCommunitiesQueryOperation['operationName'] = 'instanceFeaturedCommunities'

export const InstanceFeaturedCommunitiesQueryRefetch = (
  variables:InstanceFeaturedCommunitiesQueryVariables, 
  context?:any
)=>({
  query:InstanceFeaturedCommunitiesDocument,
  variables,
  context
})
      
