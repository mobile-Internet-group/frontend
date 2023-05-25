import { TabBar } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import { PlusCircleFilled } from '@ant-design/icons'
import './Bottom.css'

interface IProps {
  activeKey: string
}

function Bottom (props: IProps) {
  const {activeKey} = props;
  
  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/nearby',
      title: '附近',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/create',
      icon: <PlusCircleFilled style={{color: '#1677FF', fontSize: '45px', marginTop: '-10px', }}/>,
    },
    {
      key: '/message',
      title: '消息',
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  const navigate = useNavigate()
  
  return (
    <div className='bottom'>
        <TabBar onChange={value => navigate(value)} activeKey={activeKey}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
    </div>
  )
};

export default Bottom;