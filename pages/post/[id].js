import { useRouter } from "next/router"

const Post = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <>
            id: {id}
        </>
    )
}

export default Post