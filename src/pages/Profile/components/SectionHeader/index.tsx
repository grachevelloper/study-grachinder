import {CheckOutlined, CloseOutlined, EditOutlined} from '@ant-design/icons';
import {Button, Flex, Typography} from 'antd';

import styles from '../../profile.module.css';

const {Text} = Typography;

interface SectionHeaderProps {
  label: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export const SectionHeader = ({
  label,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  loading,
}: SectionHeaderProps) => (
  <Flex justify='space-between' align='center' className={styles.sectionHeader}>
    <Text className={styles.sectionLabel}>{label}</Text>
    {isEditing ? (
      <Flex gap={6}>
        <Button
          size='small'
          color='default'
          variant='filled'
          icon={<CloseOutlined />}
          onClick={onCancel}
        />
        <Button
          size='small'
          color='primary'
          variant='filled'
          icon={<CheckOutlined />}
          onClick={onSave}
          loading={loading}
        />
      </Flex>
    ) : (
      <Button
        size='small'
        color='primary'
        variant='filled'
        icon={<EditOutlined />}
        onClick={onEdit}
        className={styles.editBtn}
      />
    )}
  </Flex>
);
