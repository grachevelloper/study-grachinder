import {Skeleton, theme} from 'antd';

import styles from '../../profile.module.css';

export const ProfileSkeleton = () => {
  const {
    token: {colorBgBase, colorBgContainer, colorBorder},
  } = theme.useToken();

  return (
    <div className={styles.page} style={{backgroundColor: colorBgBase}}>
      <div
        className={styles.hero}
        style={{backgroundColor: colorBgContainer, borderColor: colorBorder}}
      >
        <Skeleton.Avatar active size={72} shape='circle' />
        <div className={styles.heroInfo}>
          <Skeleton active title={{width: 160}} paragraph={{rows: 1, width: 200}} />
        </div>
      </div>
      <div className={styles.content}>
        <Skeleton active paragraph={{rows: 8}} />
      </div>
    </div>
  );
};
