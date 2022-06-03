import {
    Input,
    InputRightAddon,
    InputGroup,
    Button
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'

const SearchInput = ({ value }) => {
    const [searchValue, setSearchValue] = useState('')

    const onSubmit = (e) => {
        if (searchValue !== '') window.location = `/search?q=${searchValue.trim()}`
        e.preventDefault()
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <InputGroup mt={10} maxW='90%' margin={'0 auto'}>
                <Input
                    onChange={e => setSearchValue(e.target.value)}
                    type="text"
                    name='q'
                    bg={'white'}
                    defaultValue={value && value}
                    placeholder="Search for knowlage..." />
                <InputRightAddon p={0}>
                    <Button type="submit" isDisabled={searchValue === ''} px={25}>
                        <SearchIcon />
                    </Button>
                </InputRightAddon>
            </InputGroup>
        </form >
    )
}

export default SearchInput
