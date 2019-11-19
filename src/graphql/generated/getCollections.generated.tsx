import * as Types from '../types.d';

import { BasicCollectionFragment } from '../fragments/generated/basicCollection.generated';
import gql from 'graphql-tag';
import { BasicCollectionFragmentDoc } from '../fragments/generated/basicCollection.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type GetCollectionsQueryQueryVariables = {
  limit?: Types.Maybe<Types.Scalars['Int']>;
  end?: Types.Maybe<Types.Scalars['String']>;
};

export type GetCollectionsQueryQuery = { __typename?: 'RootQueryType' } & {
  collections: { __typename?: 'CollectionsNodes' } & {
    pageInfo: Types.Maybe<
      { __typename?: 'PageInfo' } & Pick<
        Types.PageInfo,
        'startCursor' | 'endCursor'
      >
    >;
    nodes: Array<
      Types.Maybe<{ __typename?: 'Collection' } & BasicCollectionFragment>
    >;
  };
};

export const GetCollectionsQueryDocument = gql`
  query getCollectionsQuery($limit: Int, $end: String) {
    collections(limit: $limit, after: $end) {
      pageInfo {
        startCursor
        endCursor
      }
      nodes {
        ...BasicCollection
      }
    }
  }
  ${BasicCollectionFragmentDoc}
`;
export type GetCollectionsQueryComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetCollectionsQueryQuery,
    GetCollectionsQueryQueryVariables
  >,
  'query'
>;

export const GetCollectionsQueryComponent = (
  props: GetCollectionsQueryComponentProps
) => (
  <ApolloReactComponents.Query<
    GetCollectionsQueryQuery,
    GetCollectionsQueryQueryVariables
  >
    query={GetCollectionsQueryDocument}
    {...props}
  />
);

export type GetCollectionsQueryProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  GetCollectionsQueryQuery,
  GetCollectionsQueryQueryVariables
> &
  TChildProps;
export function withGetCollectionsQuery<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetCollectionsQueryQuery,
    GetCollectionsQueryQueryVariables,
    GetCollectionsQueryProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetCollectionsQueryQuery,
    GetCollectionsQueryQueryVariables,
    GetCollectionsQueryProps<TChildProps>
  >(GetCollectionsQueryDocument, {
    alias: 'getCollectionsQuery',
    ...operationOptions
  });
}

/**
 * __useGetCollectionsQueryQuery__
 *
 * To run a query within a React component, call `useGetCollectionsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionsQueryQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetCollectionsQueryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCollectionsQueryQuery,
    GetCollectionsQueryQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetCollectionsQueryQuery,
    GetCollectionsQueryQueryVariables
  >(GetCollectionsQueryDocument, baseOptions);
}
export function useGetCollectionsQueryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCollectionsQueryQuery,
    GetCollectionsQueryQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetCollectionsQueryQuery,
    GetCollectionsQueryQueryVariables
  >(GetCollectionsQueryDocument, baseOptions);
}
export type GetCollectionsQueryQueryHookResult = ReturnType<
  typeof useGetCollectionsQueryQuery
>;
export type GetCollectionsQueryLazyQueryHookResult = ReturnType<
  typeof useGetCollectionsQueryLazyQuery
>;
export type GetCollectionsQueryQueryResult = ApolloReactCommon.QueryResult<
  GetCollectionsQueryQuery,
  GetCollectionsQueryQueryVariables
>;

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: 'ActivityContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Community'
          },
          {
            name: 'Resource'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'FlagContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Community'
          },
          {
            name: 'Resource'
          },
          {
            name: 'User'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'LikeContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Resource'
          },
          {
            name: 'User'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'ThreadContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Community'
          },
          {
            name: 'Flag'
          },
          {
            name: 'Resource'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'FollowContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Community'
          },
          {
            name: 'Thread'
          },
          {
            name: 'User'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'DeleteContext',
        possibleTypes: [
          {
            name: 'Activity'
          },
          {
            name: 'Collection'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Community'
          },
          {
            name: 'Flag'
          },
          {
            name: 'Follow'
          },
          {
            name: 'Like'
          },
          {
            name: 'Resource'
          },
          {
            name: 'Thread'
          },
          {
            name: 'User'
          }
        ]
      }
    ]
  }
};

export default result;
