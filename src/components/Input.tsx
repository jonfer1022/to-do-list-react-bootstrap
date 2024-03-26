import React from 'react';

interface CheckboxProps {
  id: string;
  value?: boolean;
  onChange: (value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, value = false, onChange, label }) => {
  return (
      <div className="red">
        <input
          id={id}
          type="checkbox"
          onChange={e => onChange(!value, e)}
          checked={value ? true : false}
        />
        <label htmlFor={id}>{label ? <span>{label}</span> : null}</label>
      </div>
  );
};

export { Checkbox }