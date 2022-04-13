import React from 'react'
import style from './Header.module.css'
import Link from 'next/link'


const Header = () => {
    return (<div className={style.template}>
        <div className={style.leftHeader}>
            <img className={style.logo} src="/img/tree-logo.jpg"></img>
        </div>
        <div className={style.rightHeader}>
            <span>100,000 TRE</span>
            <Link href="/store">
                <span style={{cursor: "pointer"}}>내 매장</span>
            </Link>
        </div>
    </div>)
}

export default Header