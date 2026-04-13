import {Flex, message, theme, Typography} from 'antd';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import styles from '../../profile.module.css';
import {SectionHeader} from '../SectionHeader';

import type {User} from '~shared/typings/user';

import {InterestTag} from '~components/InterestTag';
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
  const {token: {colorPrimary, colorPrimaryBg, colorPrimaryBorder}} = theme.useToken();
  const [selected, setSelected] = useState<number[]>([]);
  const updateInterests = useUpdateInterests();

  useEffect(() => {
    if (!isEditing) return;
    if (user?.interest_ids?.length) {
      setSelected(user.interest_ids);
    } else if (user?.interests?.length) {
      // Server returned interest names — resolve back to IDs
      const nameToId = Object.fromEntries(
        Object.entries(interestsMap).map(([id, name]) => [name, Number(id)])
      );
      setSelected(user.interests.map((name) => nameToId[name]).filter(Boolean));
    } else {
      setSelected([]);
    }
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
              <InterestTag
                key={id}
                name={name}
                className={styles.interestTag}
                style={isSelected ? {
                  backgroundColor: colorPrimaryBg,
                  borderColor: colorPrimaryBorder,
                  color: colorPrimary,
                  fontWeight: 600,
                } : undefined}
                onClick={() => toggle(numId)}
              />
            );
          })
        ) : user?.interest_ids?.length ? (
          user.interest_ids.map((id) => (
            <InterestTag
              key={id}
              name={String(interestsMap[id] ?? id)}
              className={styles.interestTag}
            />
          ))
        ) : user?.interests?.length ? (
          user.interests.map((name) => (
            <InterestTag key={name} name={name} className={styles.interestTag} />
          ))
        ) : (
          <Text className={styles.empty}>{notSpecified}</Text>
        )}
      </Flex>
    </div>
  );
};
