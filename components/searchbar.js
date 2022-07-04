import {
    Input,
    InputRightAddon, InputRightElement,
    InputGroup,
    Button
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useRouter } from 'next/router'

const SearchInput = ({ value }) => {
    const [searchValue, setSearchValue] = useState('')
    const Router = useRouter()

    const onSubmit = (e) => {
        if (searchValue !== '') Router.push(`/search?q=${searchValue.trim()}`)
        e.preventDefault()
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <InputGroup mt={10} maxW='90%' size={{ base: 'sm', md: 'md' }} m={0}>
                <Input
                    onChange={e => setSearchValue(e.target.value)}
                    type="text"
                    name='q'
                    bg={'white'}
                    defaultValue={value && value}
                    size={{ base: 'sm', md: 'md' }}
                    placeholder="Search for knowlage..." />
                <InputRightElement p={0}>
                    <Button type="submit" isDisabled={searchValue === ''} size={{ base: 'sm', md: 'md' }}>
                        <SearchIcon />
                    </Button>
                </InputRightElement>
            </InputGroup>
        </form >
    )
}

export default SearchInput
