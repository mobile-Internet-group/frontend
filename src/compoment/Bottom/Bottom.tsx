import React, { useState } from 'react'
import { Badge, TabBar } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
  AddCircleOutline,
} from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import styles from './TabBar.less'

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
      icon: <AddCircleOutline />
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
    <div className={styles.bottom}>
        <TabBar onChange={value => navigate(value)} activeKey={activeKey}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
    </div>
  )
};

export default Bottom;