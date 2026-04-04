import {Divider, theme} from 'antd';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {ProfileBio} from './components/ProfileBio';
import {ProfileChurch} from './components/ProfileChurch';
import {ProfileContacts} from './components/ProfileContacts';
import {ProfileHero} from './components/ProfileHero';
import {ProfileInterests} from './components/ProfileInterests';
import {ProfileSkeleton} from './components/ProfileSkeleton';

import styles from './profile.module.css';

import {ErrorBoundary} from '~components/ErrorBoundary';
import {useCities, useGetMe, useInterests} from '~shared/api';
import {useAuth} from '~shared/providers/Auth';

type Section = 'main' | 'bio' | 'interests' | 'church' | 'contacts' | null;

const ProfilePage = () => {
  const {t} = useTranslation('auth');
  const {user: authUser} = useAuth();
  const {data: me, isLoading} = useGetMe();
  const {token: {colorBgBase}} = theme.useToken();

  const {data: interestsMap = {}} = useInterests();
  const {data: citiesMap = {}} = useCities();

  const [editing, setEditing] = useState<Section>(null);

  const user = me ?? authUser;
  const notSpecified = t('auth.profile.not_specified');

  const editStart = (section: Section) => () => setEditing(section);
  const editEnd = () => setEditing(null);

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className={styles.page} style={{backgroundColor: colorBgBase}}>
      <ProfileHero
        user={user}
        citiesMap={citiesMap}
        isEditing={editing === 'main'}
        onEditStart={editStart('main')}
        onEditEnd={editEnd}
      />

      <div className={styles.content}>
        <ProfileBio
          user={user}
          isEditing={editing === 'bio'}
          onEditStart={editStart('bio')}
          onEditEnd={editEnd}
        />

        <Divider className={styles.divider} />

        <ProfileInterests
          user={user}
          notSpecified={notSpecified}
          interestsMap={interestsMap}
          isEditing={editing === 'interests'}
          onEditStart={editStart('interests')}
          onEditEnd={editEnd}
        />

        <Divider className={styles.divider} />

        <ProfileChurch
          user={user}
          notSpecified={notSpecified}
          citiesMap={citiesMap}
          isEditing={editing === 'church'}
          onEditStart={editStart('church')}
          onEditEnd={editEnd}
        />

        <Divider className={styles.divider} />

        <ProfileContacts
          user={user}
          notSpecified={notSpecified}
          isEditing={editing === 'contacts'}
          onEditStart={editStart('contacts')}
          onEditEnd={editEnd}
        />

        <div className={styles.bottomSpacer} />
      </div>
    </div>
  );
};

const ProfilePageWithBoundary = () => (
  <ErrorBoundary scope='profile'>
    <ProfilePage />
  </ErrorBoundary>
);

export default ProfilePageWithBoundary;
