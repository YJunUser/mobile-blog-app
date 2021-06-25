import React, { useState } from 'react';
import { RefreshControl } from 'react-native';

type RefreshControlProps = React.ComponentProps<typeof RefreshControl>

interface RefreshProps extends Omit<RefreshControlProps, 'loadData' | 'refreshing' | 'color'> {
  loadData?: () => Promise<void>,
  color?: string
}


export const useRefresh = (props?: RefreshProps) => {
  const [isRefresh, setRefresh] = useState<boolean>(false)
  const { loadData, color = '#666' } = props

  const onPageRefresh = async () => {
    if (isRefresh) return
    setRefresh(true)

    await loadData()
      setTimeout(() => {
        setRefresh(false)
      }, 1000);
  }

  const renderRefreshControl = () => {
    return <RefreshControl
      refreshing={isRefresh}
      onRefresh={onPageRefresh}
      colors={[color]}>
    </RefreshControl>
  }

  return { renderRefreshControl }
}