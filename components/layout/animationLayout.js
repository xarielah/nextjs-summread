import { motion } from 'framer-motion'

const AnimationLayout = ({ children }) => {
    const variants = {
        hidden: { opacity: 0, x: 0, y: 20 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: 20 }
    }

    return (
        <motion.article
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ duration: .4, type: 'easeInOut' }}
            style={{ position: 'relative' }}
        >
            {children}
        </motion.article>
    )
}

export default AnimationLayout