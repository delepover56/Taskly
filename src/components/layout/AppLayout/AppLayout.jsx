import { useCallback, useState } from 'react'
import { Outlet } from 'react-router'
import MobileDrawer from '@/components/layout/MobileDrawer'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

const AppLayout = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const closeMobileDrawer = useCallback(() => {
        setMobileDrawerOpen(false)
    }, [])

    const toggleTheme = useCallback(() => {
        document.documentElement.classList.toggle('dark')
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <Sidebar
                className="fixed inset-y-0 left-0 z-30 hidden lg:flex"
                onToggleTheme={toggleTheme}
            />

            <div className="min-h-screen lg:pl-64">
                <Topbar
                    className="sticky top-0 z-20"
                    searchValue={searchValue}
                    onSearchChange={(event) =>
                        setSearchValue(event.target.value)
                    }
                    onMenuOpen={() => setMobileDrawerOpen(true)}
                />

                <main>
                    <Outlet context={{ searchValue }} />
                </main>
            </div>

            <MobileDrawer
                open={mobileDrawerOpen}
                onClose={closeMobileDrawer}
                onToggleTheme={toggleTheme}
            />
        </div>
    )
}

export default AppLayout