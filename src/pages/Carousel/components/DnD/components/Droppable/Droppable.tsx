import {useDroppable} from '@dnd-kit/react';

import styles from './droppable.module.css';
import type {PropsWithChildren} from 'react';

interface DroppableProps {
  id: string;
}

export const Droppable = ({
  children,
  id,
}: PropsWithChildren<DroppableProps>) => {
  const {ref} = useDroppable({
    id,
  });
  return (
    <div ref={ref} className={styles.root}>
      {children}
    </div>
  );
};
