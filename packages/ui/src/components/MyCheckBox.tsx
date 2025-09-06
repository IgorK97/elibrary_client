import type { ComponentProps } from 'react';
import { CheckBox } from 'react-native-web';

type ChackBoxProps = ComponentProps<typeof CheckBox>;
const MyCheckBox = (props: ChackBoxProps) => {
  return <CheckBox {...props} />;
};

export default MyCheckBox;
