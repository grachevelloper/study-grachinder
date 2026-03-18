import {Flex} from 'antd';
import {Draggable} from './components/Draggable';
import {Droppable} from './components/Droppable';
import styles from './dnd.module.css';
import {DragDropProvider} from '@dnd-kit/react';
import {useState} from 'react';

interface DndProps {
  onClick: VoidFunction;
}

export const Dnd = ({onClick}: DndProps) => {
  const [parent, setParent] = useState(undefined);
  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;
        setParent(event.operation.target?.id as undefined);
      }}
    >
      <Flex vertical className={styles.root} onClick={onClick}>
        <Droppable id='like-droppable'>
          {parent === 'like-droppable' ? <Draggable /> : null}
        </Droppable>
        {parent == null ? <Draggable /> : null}
        <Droppable id='dislike-droppable'>
          {parent === 'dislike-droppable' ? <Draggable /> : null}{' '}
        </Droppable>
      </Flex>
    </DragDropProvider>
  );
};
