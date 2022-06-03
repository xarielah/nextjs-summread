import { useRouter } from "next/router"

const Author = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <>
            id: {id}
        </>
    )
}

export default Author