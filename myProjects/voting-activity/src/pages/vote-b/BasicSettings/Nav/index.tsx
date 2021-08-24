export default function Nav() {
    return (
        <div className='nav'>
            <div className='nav_logo'>
                <a href='https://www.kuaizhan.com/'>
                    <img src="//cdn.kuaizhan.com/res/homepage/images/logo-kuaizhan-new.png?v=5.0"  /></a>
            </div>
            <div className='nav_voteForm'>
                <span>投票</span>
                <i>x</i>
            </div>
            <div className='nav_rightPart'>
                <div className='nav_rightContent'>
                    <div className='nav_Item'>工作台</div>
                    <div className='nav_Item'>投票列表</div>
                    <div className='nav_Item'>升级套餐</div>
                    <div className='nav_Item'>开放平台</div>
                    <div className='nav_Item'>快站大学</div>
                </div>
                <div className='nav_User'>使用者</div>
            </div>
        </div>
    );
}

