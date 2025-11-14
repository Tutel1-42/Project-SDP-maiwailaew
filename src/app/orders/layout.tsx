import styles from './orders.module.css'

export default function OrderLayout ( {children}: {children:React.ReactNode} ) {
    return (
        <div className={styles.sectionlayout}>
            {children}
        </div>
    );
}