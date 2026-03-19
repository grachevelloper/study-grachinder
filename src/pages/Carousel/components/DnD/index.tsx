import {Flex} from 'antd';
import {Draggable} from './components/Draggable';
import {Droppable} from './components/Droppable';
import styles from './dnd.module.css';
import {DragDropProvider} from '@dnd-kit/react';
import {useState} from 'react';

interface DndProps {
  onClick: VoidFunction;
}

const MOCK_USER = {
  name: 'Добрыня Никитич',
  bio: 'Богатырь земли русской. Ищу спутницу жизни, с которой можно и в поход, и за стол праздничный. Люблю коней, баню и былины сказывать.',
  interests: ['interests.faith', 'interests.nature', 'interests.history'],
};
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
          {parent === 'like-droppable' ? <Draggable {...MOCK_USER} /> : null}
        </Droppable>
        {parent == null ? <Draggable {...MOCK_USER} /> : null}
        <Droppable id='dislike-droppable'>
          {parent === 'dislike-droppable' ? (
            <Draggable {...MOCK_USER} />
          ) : null}{' '}
        </Droppable>
      </Flex>
    </DragDropProvider>
  );
};
