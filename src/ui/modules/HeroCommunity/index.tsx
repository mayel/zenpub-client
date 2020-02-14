import { Trans } from '@lingui/react';
import { clearFix } from 'polished';
import React, { ComponentType, SFC } from 'react';
import { Settings, MoreVertical, Flag } from 'react-feather';
import { Box, Flex, Text } from 'rebass/styled-components';
import media from 'styled-media-query';
import styled from 'ui/themes/styled';
import Modal from 'ui/modules/Modal';
import Button from 'ui/elements/Button';
import { Dropdown, DropdownItem } from 'ui/modules/Dropdown';
export enum Status {
  Loading,
  Loaded
}

export interface CommunityLoaded {
  status: Status.Loaded;
  icon: string;
  name: string;
  summary: string;
  fullName: string;
  totalMembers: number;
  following: boolean;
  canModify: boolean;
  toggleJoin: {
    toggle(): any;
    isSubmitting: boolean;
  };
  EditCommunityPanel: ComponentType<{ done(): any }>;
}

export interface CommunityLoading {
  status: Status.Loading;
}

export interface Props {
  community: CommunityLoaded | CommunityLoading;
}

export const HeroCommunity: SFC<Props> = ({ community: c }) => {
  const [, setOpenMembers] = React.useState(false);
  const [isOpenSettings, setOpenSettings] = React.useState(false);
  const [isOpenDropdown, setOpenDropdown] = React.useState(false);

  return c.status === Status.Loading ? (
    <Text>Loading...</Text>
  ) : (
    <>
      <Hero p={1}>
        <Background
          id="header"
          style={{
            backgroundImage: `url(${c.icon})`
          }}
        />
        <HeroInfo>
          <Title variant="heading" mt={0}>
            {c.name}
          </Title>
          <Username fontSize={1}>@{c.fullName}</Username>
          {c.summary && (
            <Summary variant="text" mt={2}>
              {c.summary}
            </Summary>
          )}
          <Info mt={3}>
            <MembersTot onClick={() => setOpenMembers(true)}>
              <Text variant="suptitle">
                <Total mr={2}>{c.totalMembers}</Total> <Trans>Members</Trans>
              </Text>
            </MembersTot>
            <Actions>
              <Button
                mr={2}
                variant={c.following ? 'danger' : 'primary'}
                isSubmitting={c.toggleJoin.isSubmitting}
                isDisabled={c.toggleJoin.isSubmitting}
                onClick={c.toggleJoin.toggle}
              >
                {c.following ? <Trans>Leave</Trans> : <Trans>Join</Trans>}
              </Button>
              <More>
                <MoreVertical size={20} onClick={() => setOpenDropdown(true)} />
                {isOpenDropdown && (
                  <Dropdown orientation={'bottom'} cb={setOpenDropdown}>
                    {c.canModify && (
                      <DropdownItem onClick={() => setOpenSettings(true)}>
                        <Settings size={20} color={'rgb(101, 119, 134)'} />
                        <Text sx={{ flex: 1 }} ml={2}>
                          Edit the community
                        </Text>
                      </DropdownItem>
                    )}
                    <DropdownItem>
                      <Flag size={20} color={'rgb(101, 119, 134)'} />
                      <Text sx={{ flex: 1 }} ml={2}>
                        Flag this community
                      </Text>
                    </DropdownItem>
                  </Dropdown>
                )}
              </More>
            </Actions>
          </Info>
        </HeroInfo>
      </Hero>
      {isOpenSettings && (
        <Modal closeModal={() => setOpenSettings(false)}>
          <c.EditCommunityPanel done={() => setOpenSettings(false)} />
        </Modal>
      )}
    </>
  );
};

const More = styled(Box)`
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.lightgray};
  border-radius: 4px;
  svg {
    stroke: ${props => props.theme.colors.gray};
  }
`;

const Info = styled(Flex)`
  align-items: center;
`;
const Total = styled(Text)`
  color: ${props => props.theme.colors.orange};
`;

const Title = styled(Text)`
  ${media.lessThan('medium')`
font-size: 20px !important;
`};
`;

const Summary = styled(Text)`
  ${media.lessThan('medium')`
    display: none;
`};
`;
const Actions = styled(Flex)`
  align-items: center;
`;

const Username = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
  text-transform: lowercase;
`;

const MembersTot = styled(Flex)`
  margin-top: 0px;
  cursor: pointer;
  cursor: pointer;
  flex: 1;
  > div {
    display: flex;
  }
  ${clearFix()} & span {
    margin-right: 4px;
    float: left;
    height: 32px;
    line-height: 32px;
    & svg {
      vertical-align: middle;
    }
    .--rtl & {
      float: right;
      margin-right: 0px;
      margin-left: 8px;
    }
  }
`;

const Hero = styled(Box)`
  width: 100%;
  position: relative;
  background: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Background = styled.div`
  margin-top: 24px;
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${props => props.theme.colors.gray};
  position: relative;
  margin: 0 auto;
  border-radius: 4px;
  background-position: center center;
  ${media.lessThan('medium')`
    display: none;
`};
`;

const HeroInfo = styled.div`
  padding: 16px;
  ${media.lessThan('medium')`
   padding: 8px;
`} & button {
    span {
      vertical-align: sub;
      display: inline-block;
      height: 30px;
      margin-right: 4px;
    }
  }
`;

// const SettingsButton = styled.div`
//   margin-right: 16px;

//   .--rtl & {
//     margin-right: 0px;
//     margin-left: 16px;
//   }
// `;

export default HeroCommunity;
