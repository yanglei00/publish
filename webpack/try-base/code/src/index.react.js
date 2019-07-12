import React, {Component} from 'react'
import {render} from 'react-dom'
import Home from './pages/home'
import My from './pages/my'

class App extends Component {
    render(){
        return (
            <div>
                <input placeholder='姓名' type='text'/>
                <Home></Home>
                <My></My>
            </div>
        )
    }
}
// 热更新
if(module.hot){
    module.hot.accept(['./pages/home','./pages/my'], ()=>{
        render(<App/>, window.root)
    })
    module.hot.accept([])
}
render(<App/>, window.root)

