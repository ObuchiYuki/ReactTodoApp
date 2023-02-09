import styled, { css } from 'styled-components'
import checkIcon from "@material-icons/svg/svg/check/outline.svg";
import { Colors, Size } from "../Const"

export const Input = styled.input`
  background: ${Colors.controlBackground};
  border-radius: ${Size.corner};
  color: ${Colors.text};
  font-size: 12px;
  height: 36px;
  padding: 0.25em 1em;
  flex-grow: 100;
`

export const Button = styled.button`
  background: ${Colors.primary};
  border-radius: 3px;
  color: white;
  height: 36px;
  padding: 0.25em 1em;

  :disabled {
    opacity: 0.2;
  }
`

const CheckBoxWrap = styled.input.attrs({ type: "checkbox" })<{ ghost: boolean }>`
  width: 16px;
  height: 16px;
  background: ${Colors.controlBackground};
  border-radius: ${Size.corner};
  position: relative;

  :checked {
    ::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      mask-image: url(${checkIcon});
      mask-size: 12px;
      mask-repeat: no-repeat;
      mask-position: center;
      background: white;
    }
    background: ${Colors.primary};
  }

  ${ p => p.ghost && css`opacity: 0.5` }
`;

export const CheckBox = ({ ghost, value, onChange }: { ghost?: boolean, value?: boolean; onChange?: (value: boolean) => void; }) => {
    return (
      <CheckBoxWrap
        checked={value}
        ghost={ghost || false}
        onChange={onChange && ((e) => onChange(e.currentTarget.checked))}
      />
    );
  };