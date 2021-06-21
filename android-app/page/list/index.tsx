import React from 'react';
import { Text, View } from 'react-native';


interface TestProps {
  myref: React.ForwardedRef<unknown>
}
const TestScreen = (props: TestProps) => {
  const { myref } = props
  return (<View></View>)
}

const RefTest = React.forwardRef((props, ref) => {
  return (<TestScreen myref={ref}></TestScreen>)
})
export const ListScreen = () => {
  const inputRef = React.createRef()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text>列表</Text>
      {/* <TextScreen ref={inputRef}></TextScreen> */}
    </View>
  );
};
