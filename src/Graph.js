import React, { Component } from 'react';
import './Graph.css'
class Graph extends Component {
    componentDidMount(){
        
        var data = this.props.data;
        var pointss='';
        var point='';
        var y;
        var min = data.reduce((min,p)=>min>p.y?p.y:min,data[0].y);
        var max = data.reduce((max,p)=>max<p.y?p.y:max,data[0].y);
        for(var i=0;i<data.length;i++){
            point+=(data[i].x+30*i)+',';
            y=(data[i].y-min)/(max-min)*100;
            y=100-y;
            y=3*y;
            point+=y+' ';
            
            pointss+=point;
            point='';
        }
        this.setState({cod:pointss});
        console.log(pointss);
        
    }
    constructor(props) {
        super(props);
        this.state = {
            cod:null,
            day:null,
            price:null,
            pointx:null
        }
        this.getPoints = this.getPoints.bind(this);
    }
    getPoints(){
        // var data = this.props.data;
        // var pointss='';
        // var point='';
        // var y;
        // var min = data.reduce((min,p)=>min>p.y?p.y:min,data[0].y);
        // var max = data.reduce((max,p)=>max<p.y?p.y:max,data[0].y);
        // for(var i=0;i<data.length;i++){
        //     point+=(data[i].x+30*i)+',';
        //     y=(data[i].y-min)/(max-min)*100;
        //     y=100-y;
        //     y=300*y;
        //     point+=y+' ';
            
        //     pointss+=point;
        //     point='';
        // }
        this.setState({cod:'ss'});
        console.log(this.state.cod);

    }
    //  Find closest point to Mouse
    getCoords(e){
        const {svgWidth,data} = this.props;
        const svgLocation = document.getElementsByClassName("graph")[0].getBoundingClientRect();
        var relativeLoc = e.clientX - svgLocation.left;

        var pointx = Math.round(relativeLoc/30);
        this.props.onChartHover(relativeLoc,pointx);
        this.setState({pointx:relativeLoc});
    }
    stopHover(){
        this.props.onChartHover(null,null);
    }
    
    render() {
        return (
            <div>
                {this.state.cod?<div>

                    <svg className="graph" height="300px" width="930px"
                     onMouseMove={(e)=>{this.getCoords(e)}}
                     onMouseLeave={()=>{this.stopHover()}}>
  <polyline points={this.state.cod} />
  <polygon points={'0,300 '+this.state.cod+'930,300 0,300'} />
  {this.state.pointx?<line x1={this.state.pointx} y1={'0'} x2={this.state.pointx} y2={'300'} className="graph-line" />:
  <line x1={'0'} y1={'0'} x2={'0'} y2={'0'} className="graph-line" /> }
</svg>
                
                
                
                </div>:<h1> Loading...</h1>}
                <div>
                    {this.state.day?<div><h2>{this.state.day} </h2>
                    <h2>{this.state.price}</h2></div> : <div></div>}
                </div>
            </div>
        );
    }
}

Graph.defaultProps = {
    svgWidth:930,
    svgHeight:300,
    pointRadius:5
}

export default Graph;