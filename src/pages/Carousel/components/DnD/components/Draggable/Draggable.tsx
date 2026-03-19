import {useDraggable} from '@dnd-kit/react';
import {Flex, Tag, Typography} from 'antd';
import type {User} from '~shared/typings/user';

import styles from './draggable.module.css';

const {Title, Paragraph} = Typography;

interface DragableProps extends Pick<User, 'name' | 'interests' | 'bio'> {}

export const Draggable = ({
  name,
  interests,
  // birth_date,
  bio,
}: DragableProps) => {
  const {ref} = useDraggable({
    id: 'draggable',
  });
  return (
    <Flex
      ref={ref}
      vertical
      justify='flex-end'
      align='flex-start'
      className={styles.draggable}
    >
      <Title level={2}>{name}</Title>
      <Flex gap='14px' wrap>
        {interests.map((interest) => (
          <Tag key={interest} className={styles.interestTag}>
            {interest}
          </Tag>
        ))}
      </Flex>
      <Paragraph ellipsis={{rows: 2, expandable: false}}>{bio}</Paragraph>
    </Flex>
  );
};
