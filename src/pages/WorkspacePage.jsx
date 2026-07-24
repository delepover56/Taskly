import { useOutletContext } from 'react-router'
import Card from '@/components/ui/Card'
import PageContainer from '@/components/layout/PageContainer'

const WorkspacePage = ({ title, description }) => {
    const { searchValue } = useOutletContext()

    return (
        <PageContainer>
            <header className="mb-6">
                <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
                    {title}
                </h1>

                <p className="mt-2 text-sm text-muted">
                    {description}
                </p>
            </header>

            <Card className="p-6">
                <p className="text-sm text-body">
                    {searchValue
                        ? `Searching for: ${searchValue}`
                        : `${title} content will appear here.`}
                </p>
            </Card>
        </PageContainer>
    )
}

export default WorkspacePage