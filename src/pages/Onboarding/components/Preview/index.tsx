import {Empty, Flex} from 'antd';
import {useTranslation} from 'react-i18next';

import {useUserStorage} from '../../hooks/useUserStorage';

import styles from './preview.module.css';

import {UserCard} from '~components/UserCard';

export const Preview = () => {
  const {user} = useUserStorage();
  const {t} = useTranslation('common');

  const hasBasicInfo = user?.name || (user?.interest_ids?.length ?? 0) > 0 || (user?.avatar_urls?.length ?? 0) > 0;

  if (!hasBasicInfo) {
    return (
      <Flex vertical align='center' justify='center' className={styles.empty}>
        <Empty
          description={t('preview.empty')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Flex>
    );
  }

  return (
    <div className={styles.container}>
      <UserCard user={user} />
    </div>
  );
};
