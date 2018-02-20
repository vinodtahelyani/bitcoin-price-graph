import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import Graph from './Graph';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData : true,
      data: null,
      hoverLoc:null,
      activePoint:null
    }
  }

  handleChartHover(hoverLoc,activePoint){
    this.setState({
      hoverLoc:hoverLoc,
      activePoint:activePoint
    });
    console.log(this.state.activePoint);
  }

  componentDidMount(){
    const getData = ()=>{
      const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';
      fetch(url).then(r=>r.json())
      .then((data)=>{
        const storedData = [];
        let count = 0;
        for(let date in data.bpi){
          storedData.push({
            day : moment(date).format('MMM DD'),
            price : data.bpi[date],
            x:count,
            y: data.bpi[date]
          })
          count++;
        }
        this.setState({
          data:storedData,
          fetchingData:false
        })
      }).catch((e)=>{
        console.log(e);
      })
    };
    getData();
  }

  render() {
    return (
      <div className="container">
      <div className="row">
      <h1>Bitcoin price chart</h1>
      </div>
      <div className="row">
        {!this.state.fetchingData ? 
        <Graph data={this.state.data} onChartHover={(a,b)=>this.handleChartHover(a,b)}/>
        : <h1> Loading...</h1> }
      </div>
      {this.state.activePoint ?
      <div>
        <p>Date : {this.state.data[this.state.activePoint%31].day}</p>
        <p>Price : {'US$'+this.state.data[this.state.activePoint%31].price}</p>
      </div>
      :null
      }
      </div>
    );
  }
}

export default App;
