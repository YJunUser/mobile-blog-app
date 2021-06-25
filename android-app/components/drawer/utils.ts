import { useEffect } from "react"
import { useAuth } from "../../context/auth-context"
import { MenuProps } from "../../types/menu"


export const useMenu = () => {
    const { setOpen, logout } = useAuth()
    const list: MenuProps[] = [{
        title: '回收站',
        icon: 'delete',
        iconType: 'ant-design',
        iconColor: 'yellow',
        size: 20
    },
    {
        title: '设置',
        icon: 'setting',
        iconType: 'ant-design',
        iconColor: 'gray',
        size: 20
    }, {
        title: '退出',
        icon: 'logout',
        iconType: 'ant-design',
        iconColor: 'blue',
        size: 20,
        handler: logout
    }]
    useEffect(() => {
        setOpen({ open: false })
    }, [])
    return { list, setOpen }
}