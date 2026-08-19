import React from 'react'
import Home from './Home'
import Transfer from './Transfer'
import Transactions from './Transactions'
import { navType } from './SideBar'
import P2P from './P2P'

const MainPage = ({nav}: {nav: navType}) => {
  if(nav === "home") {
    return <Home />
  }
  if(nav === "transfer") {
    return <Transfer />
  }
  if(nav === "transactions") {
    return <Transactions />
  }
  if(nav === "p2p") {
    return <P2P />
  }

  return (
    <>
    <div></div>
    </>
  )
}

export default MainPage