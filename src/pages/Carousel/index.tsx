import {Flex} from 'antd';
import {Dnd} from './components/Dnd';

import styles from './carousel.module.css';

export default () => {
  return (
    <Flex vertical className={styles.carousel}>
      <Dnd />
    </Flex>
  );
};
