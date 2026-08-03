import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Input from '@/components/ui/Input'

const PasswordInput = (props) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="relative">
            <Input className="pr-10" type={isVisible ? 'text' : 'password'} {...props} />
            <button
                className="absolute inset-y-0 right-0 grid w-10 place-items-center rounded-r-lg text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                type="button"
                aria-label={isVisible ? 'Hide password' : 'Show password'}
                aria-pressed={isVisible}
                onClick={() => setIsVisible((current) => !current)}
            >
                {isVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
        </div>
    )
}

export default PasswordInput