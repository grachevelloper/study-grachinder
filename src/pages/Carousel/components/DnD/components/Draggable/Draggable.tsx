import {useDraggable} from '@dnd-kit/react';
import {Flex} from 'antd';

import styles from './draggable.module.css';
interface DragableProps {}

export const Draggable = ({}: DragableProps) => {
  const {ref} = useDraggable({
    id: 'draggable',
  });
  return (
    <Flex
      ref={ref}
      vertical
      justify='center'
      align='center'
      className={styles.draggable}
    >
      али бабаали бабаали бабаали бабаали бабаали бабаали бабаали баба
    </Flex>
  );
};
