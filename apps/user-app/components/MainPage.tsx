import React from 'react'
import Home from './Home'
import Transfer from './Transfer'
import Transactions from './Transactions'
import { navType } from './SideBar'

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

  return (
    <>
    <div></div>
    </>
  )
}

export default MainPage