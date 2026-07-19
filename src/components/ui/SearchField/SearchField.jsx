import { Search } from 'lucide-react'

const SearchField = ({ type = "search", className, placeholder = "Search Tasks", ...SearchProps }) => {
    return (
        <div className='flex items-center gap-2 border p-2'>
            <Search />
            <input className={cn('flex-1 outline-none', className)} type={type} placeholder={placeholder} {...SearchProps} />
        </div>
    )
}

export default SearchField
