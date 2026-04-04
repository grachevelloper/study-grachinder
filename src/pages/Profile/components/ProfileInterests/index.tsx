import {Flex, message, Tag, Typography} from 'antd';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import styles from '../../profile.module.css';
import {SectionHeader} from '../SectionHeader';

import type {User} from '~shared/typings/user';

import {useUpdateInterests} from '~pages/Onboarding/api';

const {Text} = Typography;

interface ProfileInterestsProps {
  user: User | undefined;
  notSpecified: string;
  interestsMap: Record<number, string>;
  isEditing: boolean;
  onEditStart: () => void;
  onEditEnd: () => void;
}

export const ProfileInterests = ({
  user,
  notSpecified,
  interestsMap,
  isEditing,
  onEditStart,
  onEditEnd,
}: ProfileInterestsProps) => {
  const {t} = useTranslation(['auth', 'common']);
  const [selected, setSelected] = useState<number[]>([]);
  const updateInterests = useUpdateInterests();

  useEffect(() => {
    if (isEditing) setSelected(user?.interest_ids ?? []);
  }, [isEditing]);

  const toggle = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const handleSave = async () => {
    try {
      await updateInterests.mutateAsync({interest_ids: selected});
      message.success(t('common:saved'));
      onEditEnd();
    } catch {
      // no inline validation here
    }
  };

  return (
    <div className={styles.section}>
      <SectionHeader
        label={t('auth.preview.interests_label')}
        isEditing={isEditing}
        onEdit={onEditStart}
        onSave={handleSave}
        onCancel={onEditEnd}
        loading={updateInterests.isPending}
      />
      <Flex gap={8} wrap='wrap'>
        {isEditing ? (
          Object.entries(interestsMap).map(([id, name]) => {
            const numId = Number(id);
            const isSelected = selected.includes(numId);
            return (
              <Tag
                key={id}
                className={classNames(styles.interestTag, {
                  [styles.interestSelected]: isSelected,
                })}
                color={isSelected ? 'processing' : undefined}
                onClick={() => toggle(numId)}
              >
                {name}
              </Tag>
            );
          })
        ) : user?.interest_ids?.length ? (
          user.interest_ids.map((id) => (
            <Tag key={id} className={styles.interestTag}>
              {interestsMap[id] ?? id}
            </Tag>
          ))
        ) : (
          <Text className={styles.empty}>{notSpecified}</Text>
        )}
      </Flex>
    </div>
  );
};
