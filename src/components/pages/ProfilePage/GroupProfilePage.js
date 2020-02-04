import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';

import { Page, Zabos } from './Profile.styled';
import Header from '../../templates/Header';
import ZaboList from '../../templates/ZaboList';
import ProfileStats from '../../organisms/ProfileStats';

import { GroupType } from '../../../lib/propTypes';

import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import { setCurrentGroup } from '../../../store/reducers/auth';
import { getLabeledTimeDiff, isElementOverflown } from '../../../lib/utils';

const GroupProfile = ({ profile }) => {
  const {
    name, profilePhoto, members, zabosCount, followersCount, recentUpload, description = '', subtitle = '', myRole,
  } = profile;
  const dispatch = useDispatch ();
  const descRef = useRef (null);
  const [showTooltip, setShowTooltip] = useState (false);
  useEffect (() => { setShowTooltip (isElementOverflown (descRef.current)); }, [descRef]);

  const toUpload = useCallback (() => {
    dispatch (setCurrentGroup (name));
  }, [name, dispatch]);

  const timePast = recentUpload ? getLabeledTimeDiff (recentUpload, true, true, true, true, true, true) : '없음';
  const stats = [{
    name: '자보',
    value: zabosCount,
  }, {
    name: '팔로워',
    value: followersCount,
  }, {
    name: '최근 업로드',
    value: timePast,
  }];

  const rightGroup = myRole
    ? <Link to="/settings/profile"><SettingsIcon /></Link>
    : <Header.AuthButton />;

  // TODO: add short, long description <- need to implement server (change schema)

  return (
    <Page>
      <Header rightGroup={rightGroup} scrollHeader />
      <Page.Header>
        <Page.Header.Left>
          <Page.Header.Left.ProfilePhoto>
            {
              profilePhoto
                ? <img src={profilePhoto} alt="profile photo" />
                : <img src={groupDefaultProfile} alt="default profile img" />
            }
          </Page.Header.Left.ProfilePhoto>
          <Page.Header.Left.UserInfo>
            <h1>{name}</h1>
            {
              showTooltip
                ? (
                  <Tooltip title={description}>
                    <p ref={descRef}>{description || '아직 소개가 없습니다.'}</p>
                  </Tooltip>
                )
                : <p ref={descRef}>{description || '아직 소개가 없습니다.'}</p>
            }
            {
              myRole
                ? (
                  <section>
                    <Link to={`/settings/group/${name}/profile`}>
                      <button className="edit" type="button">프로필 편집</button>
                    </Link>
                    {myRole === 'admin' && (
                    <Link to={`/settings/group/${name}/members`}>
                      <button className="edit" type="button">멤버 관리</button>
                    </Link>
                    )}
                    <Link to="/zabo/upload">
                      <button onClick={toUpload} type="button">업로드</button>
                    </Link>
                  </section>
                ) : (
                  ''
                )
            }
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
        <Page.Header.Right>
          <ProfileStats stats={stats} />
        </Page.Header.Right>
      </Page.Header>
      <Zabos>
        <h1>업로드한 자보 <small>{zabosCount}</small></h1>
        <ZaboList type="group" query={name} />
      </Zabos>
    </Page>
  );
};

GroupProfile.propTypes = {
  profile: GroupType.isRequired,
};

export default GroupProfile;
