import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super()
  this.state={
    dataapi:[],
    title:"RESTful API MERN",
    index:''
}
  }
  componentDidMount(){
    this.getData();
  }
  getData= _ =>{
    fetch('/data')
    .then(response=>response.json())
    .then(response=>this.setState({dataapi:response.data}))
    .catch(err=>console.error(err))
  }
  insertdata=(e)=>{
    e.preventDefault();
let field1=this.refs.field1.value;
let field2=this.refs.field2.value;
let field3=this.refs.field3.value;
let field4=this.refs.field4.value;
let field5=this.refs.field5.value;
    fetch('/data/add?field1='+field1+'&field2='+field2+'&field3='+field3+'&field4='+field4+'&field6=1&field5='+field5+'')
    .then(this.getData)
    .then(this.refs.myform.reset())
    .then(this.refs.field1.focus())
    .catch(err=>console.error(err))
  }
  updatedata=(e)=>{
    e.preventDefault();    
let field=this.refs.efield.value;
let field1=this.refs.efield1.value;
let field2=this.refs.efield2.value;
let field3=this.refs.efield3.value;
let field4=this.refs.efield4.value;
let field5=this.refs.efield5.value;
    fetch('/data/edit?field1='+field1+'&field2='+field2+'&field3='+field3+'&field4='+field4+'&field6=1&field5='+field5+'&field='+field+'')
    .then(this.getData)
    .catch(err=>console.error(err))   
  }
  fEdit=(i)=>{
    let data=this.state.dataapi[i];
    this.refs.efield1.value=data.field1;
    this.refs.efield2.value=data.field2;
    this.refs.efield3.value=data.field3;
    this.refs.efiel4.value=data.field4;
    this.refs.efield5.value=data.field5;
    this.refs.field.value=data.field;
    this.setState({
      index:i
    });
  }
  fRemove=(i)=>{
    fetch('/data/delete?field='+i+'')
    .then(this.getData)
    .catch(err=>console.error(err))
  }
  renderData=({key,value})=><div key={key}>{value}</div>
  render() {
    const{dataapi}=this.state;
    return (
      <div className="container">
       <h2>{this.state.title}</h2>
      <form ref="myform" encType="multipart/form-data">
        <input type="hidden" ref="field" className="formfield"/>
            <div className="form-group">
              <label>Field 1:</label>
              <input type="text" ref="field1" placeholder="Isi Field ini" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Field 2:</label>
              <input type="text" ref="field2" placeholder="Isi Field ini" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Field 3:</label>
              <input type="text" ref="field3" placeholder="Isi Field ini" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Field 4:</label>
              <input type="text" ref="field4" placeholder="Isi Field ini" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Field 5:</label>
              <input type="text" ref="field5" placeholder="Isi Field ini" className="form-control"/>
            </div>
        <button onClick={this.insertdata} className="btn btn-danger">Submit</button>
        </form><br/>
        <div className="table-responsive">
      <table className="table table-dark table-striped">
      <thead>
      <tr>
        <td>No</td>
        <td>Field 1</td>
        <td>Field 2</td>
        <td>Field 3</td>
        <td>Field 4</td>
        <td>Field 5</td>
        <td>Aksi</td>
        </tr>
        </thead>
        <tbody>
      {dataapi.map((value, key)=>
          <tr key={key}>
          <td>{key+1}</td>
          <td>{value.field1}</td>
          <td>{value.field2}</td>
          <td>{value.field3}</td>
          <td>{value.field4}</td>
          <td>{value.field5}</td>
          <td>
          <button onClick={()=>this.fRemove(value.field)} className="btn btn-warning">Remove</button>
          <button data-toggle="modal" data-target="#myModal" onClick={()=>this.fEdit(key)} className="btn btn-primary">Edit</button></td>
          </tr>
          )}
          </tbody>
          </table>
          </div>
          <div className="modal fade" id="myModal" ref="myModal">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Edit Data</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">
        <form ref="emyform">
        <input type="hidden" ref="efield" className="formfield"/>
        <div className="form-group">
              <label>Field 1:</label>
              <input type="text" ref="efield1" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Field 2:</label>
              <input type="text" ref="efield2" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Field 3:</label>
              <input type="text" ref="efield3" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Field 4:</label>
              <input type="text" ref="efield4" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Field 5:</label>
              <input type="text" ref="efield5" className="form-control"/>
            </div>
          <button onClick={this.updatedata} className="btn btn-danger">Update</button>
        </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
        </div>      
    );
  }
}

export default App;
