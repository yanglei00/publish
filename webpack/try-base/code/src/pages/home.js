import React, {Component} from 'react'



class Home extends Component {
    render(){
        return (
            <div>
                home2
                <button onClick={()=>{
                    import('./my').then((module)=>{
                        let My= module.default
                        console.log('my',My)
                    })
                }}>懒加载test</button>
            </div>
        )
    }
}

export default Home

