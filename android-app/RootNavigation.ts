
import * as React from 'react';
import { StackActions } from '@react-navigation/native';
export const navigationRef = React.createRef<any>();

export function navigate(name, params?) {
  navigationRef.current?.navigate(name, params);
}



export function StackPush(params: any) {
  navigationRef.current?.dispatch(StackActions.push(params.name, params.data));
}