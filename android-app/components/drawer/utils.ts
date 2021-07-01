
import { useAuth } from "../../context/auth-context"
import { MenuProps } from "../../types/menu"
import * as RootNavigation from '../../RootNavigation'

export const useMenu = () => {
    const { setOpen, logout, isOpen } = useAuth()

    const confirmOut = () => {
        setOpen(!isOpen)
        // delay time and user can see it
        setTimeout(() => {
            logout()
        }, 500);

    }
    const goRecycle = () => {
        // close drawer first
        setOpen(!isOpen)
        // delay time and user can see it
        setTimeout(() => {
            RootNavigation.navigate('RecycleFileScreen')
        }, 500);

    }

    const goAbout = () => {
        // close drawer first
        setOpen(!isOpen)
        // delay time and user can see it
        setTimeout(() => {
            RootNavigation.navigate('AboutScreen')
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
        title: '关于我们',
        icon: 'smileo',
        iconType: 'ant-design',
        iconColor: '#ff6347',
        size: 20,
        handler: goAbout,
    },
    {
        title: '退出',
        icon: 'logout',
        iconType: 'ant-design',
        iconColor: 'blue',
        size: 20,
        handler: confirmOut
    }]
    return { list, setOpen, isOpen }
}