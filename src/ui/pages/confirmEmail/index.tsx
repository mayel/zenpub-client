import * as React from 'react';
import { Box } from 'rebass/styled-components';
import styled from '../../themes/styled';
import { logo_large_url } from 'mn-constants';

const LoginWrapper = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: 1fr;
  grid-template-areas: 'form';
`;

const Container = styled.div`
  margin: 0 auto;
  width: 432px;
  margin-top: 60px;
  padding: 16px;
  & button {
    margin-top: 16px;
    width: 100%;
    color: #fff !important;
    text-transform: uppercase
      &:hover {
      background: #d67218 !important;
    }
  }
`;

const Logo = styled.div`
  background: url(${logo_large_url});
  width: 159px;
  display: block;
  height: 30px;
  background-size: cover;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const FormWrapper = styled.div`
  grid-area: form;
`;

export interface Props {
  result:
    | null
    | {
        error: null;
        username: string;
      }
    | {
        error: string;
      };
}

/**
 * @param Component
 * @param data {Object} the user object from local cache
 * @param rest
 * @constructor
 */

const ConfirmEmail: React.FC<Props> = ({ result }) => {
  return (
    <Container>
      <LoginWrapper>
        <FormWrapper>
          <Logo />
          <Box>
            {!result ? (
              <div>Checking ...</div>
            ) : result.error === null ? (
              <div>Email confirmed, Welcome: {result.username}</div>
            ) : (
              <div>Error in email confirmation: {result.error}</div>
            )}
          </Box>
        </FormWrapper>
      </LoginWrapper>
    </Container>
  );
};

export default ConfirmEmail;