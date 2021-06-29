
import { useAuth } from "../../context/auth-context"
import { MenuProps } from "../../types/menu"
import * as RootNavigation from '../../RootNavigation'

export const useMenu = () => {
    const { setOpen, logout, isOpen } = useAuth()

    const goRecycle = () => {
        // close drawer first
        setOpen(!isOpen)
        // delay time and user can see it
        setTimeout(() => {
            RootNavigation.navigate('RecycleFileScreen')
        }, 500);

    }

    const list: MenuProps[] = [{
        title: '回收站',
        icon: 'delete',
        iconType: 'ant-design',
        iconColor: 'yellow',
        size: 20,
        handler: goRecycle,
    },
    {
        title: '退出',
        icon: 'logout',
        iconType: 'ant-design',
        iconColor: 'blue',
        size: 20,
        handler: logout
    }]
    // useEffect(() => {
    //     setOpen(false)
    // }, [])
    return { list, setOpen, isOpen }
}