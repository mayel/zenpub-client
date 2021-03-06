import React from 'react';
import styled from 'ui/themes/styled';
import { Box, Text, Flex } from 'rebass/styled-components';
import { DateTime } from 'luxon';
import { Trans } from '@lingui/react';
import { NavLink } from 'react-router-dom';

export interface CommentProps {
  content: string;
  // title: string;
  createdAt: string;
  totalReplies: string;
  totalLikes: string;
  members: string[];
  link: string;
}

export const Thread: React.SFC<CommentProps> = ({
  content,
  // title,
  createdAt,
  totalReplies,
  totalLikes,
  members,
  link
}) => {
  return (
    <Wrapper p={2}>
      {/* <Text variant="heading" sx={{ fontSize: '16px' }}>
        {title || 'no title'}
      </Text> */}
      <NavLink to={link}>
        <Text variant="text">{content}</Text>
        <Flex sx={{ marginTop: '2px' }} alignItems="center">
          <Flex flex={1}>
            <Date>{DateTime.fromSQL(createdAt).toRelative()}</Date>
            <Spacer mx={1}>·</Spacer>
            <Meta>
              {totalReplies + ' '}
              <Trans>Replies</Trans>
            </Meta>
            <Spacer mx={1}>·</Spacer>
            <Meta>
              {totalLikes + ' '}
              <Trans>Likes</Trans>
            </Meta>
          </Flex>
          <Flex>
            {members.map((m, i) => (
              <Member ml={1} src={m} />
            ))}
          </Flex>
        </Flex>
      </NavLink>
    </Wrapper>
  );
};

const Member = styled(Box)<{ src: string }>`
  max-width: 28px !important;
  max-height: 28px !important;
  border-radius: 28px !important;
  background: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: cover;
  width: 28px;
  height: 28px;
  background-size: cover;
`;

const Meta = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
  font-size: 13px;
`;

const Spacer = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
`;

const Date = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
  font-size: 13px;
`;

const Wrapper = styled(Box)`
  border: 1px solid ${props => props.theme.colors.lightgray};
  border-radius: 4px;
  background: white;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.lighter};
  }
  a {
    text-decoration: none;
    * {
      text-decoration: none;
    }
  }
`;
