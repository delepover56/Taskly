import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router'
import AppLayout from '@/components/layout/AppLayout'
import PlaygroundPage from '@/pages/PlaygroundPage'
import WorkspacePage from '@/pages/WorkspacePage'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route
                        index
                        element={
                            <WorkspacePage
                                title="Dashboard"
                                description="An overview of your tasks and productivity."
                            />
                        }
                    />

                    <Route
                        path="today"
                        element={
                            <WorkspacePage
                                title="Today"
                                description="Tasks that need your attention today."
                            />
                        }
                    />

                    <Route
                        path="upcoming"
                        element={
                            <WorkspacePage
                                title="Upcoming"
                                description="Plan for tasks due after today."
                            />
                        }
                    />

                    <Route
                        path="important"
                        element={
                            <WorkspacePage
                                title="Important"
                                description="Your unfinished High-priority tasks."
                            />
                        }
                    />

                    <Route
                        path="completed"
                        element={
                            <WorkspacePage
                                title="Completed"
                                description="Review the tasks you have finished."
                            />
                        }
                    />

                    <Route
                        path="archived"
                        element={
                            <WorkspacePage
                                title="Archived"
                                description="Tasks removed from your active workspace."
                            />
                        }
                    />

                    <Route
                        path="*"
                        element={
                            <WorkspacePage
                                title="Page not found"
                                description="The requested Taskly page does not exist."
                            />
                        }
                    />
                </Route>

                <Route
                    path="playground"
                    element={<PlaygroundPage />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App