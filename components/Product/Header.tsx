import Link from 'next/link'
import style from './Header.module.css'

const Header = () => {
    return <div className={style.template}>
        <div className={style.leftHeader}>
            <Link href="/">
                <img className={style.logo} src="/img/tree-logo-black.png" />
            </Link>
        </div>
    </div>
}

export default Header