import {Tag, Tooltip} from 'antd';

interface InterestTagProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

const parseInterestName = (name: string): {label: string; tooltip?: string} => {
  const match = name.match(/^([^(]+)\(([^)]+)\)/);
  if (match) {
    return {label: match[1].trim(), tooltip: match[2].trim()};
  }
  return {label: name};
};

export const InterestTag = ({name, className, onClick}: InterestTagProps) => {
  const {label, tooltip} = parseInterestName(name);

  const tag = (
    <Tag className={className} onClick={onClick} style={{overflow: 'hidden'}}>
      {label}
    </Tag>
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{tag}</Tooltip>;
  }

  return tag;
};
