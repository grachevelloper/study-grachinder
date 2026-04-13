import {Tag, Tooltip} from 'antd';
import type React from 'react';

interface InterestTagProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const parseInterestName = (name: string): {label: string; tooltip?: string} => {
  const match = name?.match(/^([^(]+)\(([^)]+)\)/);
  if (match) {
    return {label: match[1].trim(), tooltip: match[2].trim()};
  }
  return {label: name};
};

export const InterestTag = ({name, className, style, onClick}: InterestTagProps) => {
  const {label, tooltip} = parseInterestName(name);

  const tag = (
    <Tag className={className} onClick={onClick} style={{overflow: 'hidden', ...style}}>
      {label}
    </Tag>
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{tag}</Tooltip>;
  }

  return tag;
};
