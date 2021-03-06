import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { media } from 'lib/utils/style';

const colMixin = css`
  display: flex;
  flex-direction: column;
  flex: ${props => props.flex} 0 0;
  min-width: 0;
  ${media.tablet (css`
    flex: ${props => props.flex};
  `)};
`;

const Left = styled.section`
  ${colMixin};
`;
Left.propTypes = {
  flex: PropTypes.number,
};
Left.defaultProps = {
  flex: 1,
};


const Right = styled.section`
  ${colMixin};
`;
Right.propTypes = {
  flex: PropTypes.number,
};
Right.defaultProps = {
  flex: 1,
};


const TwoCol = styled.section`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  ${props => (props.mobileWrap ? css`
    flex-direction: column;
  ` : css`
  `)};
 
  ${media.tablet (css`
    flex-direction: row;
    flex-wrap: nowrap;
    ${props => (props.divider ? css`
      ${Left} {
        padding-right: 24px;
        border-right: 1px solid ${props => props.theme.gray10};
      }
      ${Right} {
        padding-left: 24px;
      }
    ` : '')};
  `)};
`;

TwoCol.propTypes = {
  mobileWrap: PropTypes.bool,
};
TwoCol.defaultProps = {
  mobileWrap: true,
};

TwoCol.Left = Left;
TwoCol.Right = Right;

export default TwoCol;
