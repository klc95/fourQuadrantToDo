import './index.less'

export default function MobliePreview() {


    return (
        <div className='mobilePreview_wrap'>
            <div className='mobilePreview_header'>
                <div className='mobilePreview_activityProfile'>
                    <div className='mobilePreview_activityTitle'>新建投票活动</div>
                    <div className='mobilePreview_votingRules'>投票规则：<span className='mobilePreview_ruleContent'>每天可投十票</span></div>
                    <div className='mobilePreview_votingTime'>投票时间：<span className='mobilePreview_time'>2021-08-23 00:00 至 2021-08-30 00:00</span></div>
                </div>
                <div className='mobilePreview_activityStatus'>活动暂停中</div>
                <div className='mobilePreview_activityData'>
                    <div className='mobilePreview_competitorData'>
                        <div className='mobilePreview_num'>0</div>
                        <div className='mobilePreview_tip'>参与选手</div>
                    </div>
                    <div className='mobilePreview_competitorData'>
                        <div className='mobilePreview_num'>0</div>
                        <div className='mobilePreview_tip'>累计投票</div>
                    </div>   
                </div>
                <div className='mobilePreview_ranking'>查看榜单</div>
            </div>
            <div className='mobilePreview_searchingWrap'>
                <input className='mobilePreview_searchingInput' 
                       type='text' 
                       placeholder='请输入投票编号或名称'
                />
                <div className='mobilePreview_votingItems'>暂无投票项</div>
            </div>
        </div>
    )
}