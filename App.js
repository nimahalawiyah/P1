import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super()
  this.state={
    matakuliah:[],
    title:"RESTful API MERN",
    act:0,
      index:'',
      showupdate:false,
      showsubmit:true
  
}
  }
  componentDidMount(){
    this.getMatakuliah();
  }
  getMatakuliah= _ =>{
    fetch('http://localhost:4000/matakuliah')
    .then(response=>response.json())
    .then(response=>this.setState({matakuliah:response.data}))
    .catch(err=>console.error(err))
  }
  insertmatakuliah=(e)=>{
    e.preventDefault();
    let kd_matkul=this.refs.kd_matkul.value;
let matkul=this.refs.matkul.value;
let sks=this.refs.sks.value;
let prodi=this.refs.prodi.value;
let semester=this.refs.semester.value;
    fetch('http://localhost:4000/matakuliah/add?kd_matkul='+kd_matkul+'&matkul='+matkul+'&sks='+sks+'&prodi='+prodi+'&status=1&semester='+semester+'')
    .then(this.getMatakuliah)
    .then(this.refs.myform.reset())
    .then(this.refs.kd_matkul.focus())
    .catch(err=>console.error(err))
  }
  uploadfile=(e)=>{
    e.preventDefault();
let fileupload=this.refs.fileupload.value;
    fetch('http://localhost:4000/matakuliah/file?fileupload='+fileupload+'')
    .then(this.refs.myform.reset())
    .catch(err=>console.error(err))
  }
  updatematakuliah=(e)=>{
    e.preventDefault();
    let kd_matkul=this.refs.ekd_matkul.value;
let matkul=this.refs.ematkul.value;
let sks=this.refs.esks.value;
let prodi=this.refs.eprodi.value;
let semester=this.refs.esemester.value;
let id=this.refs.eidmatkul.value;
    fetch('http://localhost:4000/matakuliah/edit?kd_matkul='+kd_matkul+'&matkul='+matkul+'&sks='+sks+'&prodi='+prodi+'&status=1&semester='+semester+'&id='+id+'')
    .then(this.getMatakuliah)
    // .then(this.refs.emyform.reset())
    .catch(err=>console.error(err))
    this.setState({
      showupdate:false,
      showsubmit:true
    })
    
  }
  fEdit=(i)=>{
    let data=this.state.matakuliah[i-1];
    this.refs.ekd_matkul.value=data.kd_matkul;
    this.refs.ematkul.value=data.matkul;
    this.refs.esks.value=data.sks;
    this.refs.eprodi.value=data.prodi;
    this.refs.esemester.value=data.semester;
    this.refs.eidmatkul.value=data.id;
    this.setState({
      act:1,
      index:i,
      showsubmit:false,
      showupdate:true
    });
  }
  fRemove=(i)=>{
    fetch('http://localhost:4000/matakuliah/delete?id='+i+'')
    .then(this.getMatakuliah)
    .catch(err=>console.error(err))
  }
  renderMatakuliah=({id,matkul})=><div key={id}>{matkul}</div>
  render() {
    const{matakuliah}=this.state;
    return (
      <div className="container">
       <h2>{this.state.title}</h2>
      <form ref="myform" encType="multipart/form-data">
        <input type="hidden" ref="idmatkul" className="formfield"/>
            <div className="form-group">
              <label>Kode Matkul:</label>
              <input type="text" ref="kd_matkul" placeholder="Kode Mata Kuliah" className="form-control" id="kd_matkul" name="kd_matkul"/>
            </div>
            <div className="form-group">
              <label>Mata Kuliah:</label>
              <input type="text" ref="matkul" placeholder="Mata Kuliah" className="form-control" id="matkul" name="matkul"/>
            </div>
            <div className="form-group">
              <label>SKS:</label>
              <input type="text" ref="sks" placeholder="SKS" className="form-control" id="sks" name="sks"/>
            </div>
            <div className="form-group">
              <label>Prodi:</label>
              <input type="text" ref="prodi" placeholder="Program Studi" className="form-control" id="prodi" name="prodi"/>
            </div>
            <div className="form-group">
              <label>Semester:</label>
              <input type="text" ref="semester" placeholder="Semester" className="form-control" id="semester" name="semester"/>
            </div>
        <button onClick={this.insertmatakuliah} className="btn btn-danger">Submit</button>
        </form><br/>
        <div className="table-responsive">
      <table className="table table-dark table-striped">
      <thead>
      <tr>
        <td>No</td>
        <td>Kode</td>
        <td>Matkul</td>
        <td>SKS</td>
        <td>Prodi</td>
        <td>Semester</td>
        <td>Aksi</td>
        </tr>
        </thead>
        <tbody>
      {matakuliah.map((matkul, id)=>
          <tr key={id}>
          <td>{id+1}</td>
          <td>{matkul.kd_matkul}</td>
          <td>{matkul.matkul}</td>
          <td>{matkul.sks}</td>
          <td>{matkul.prodi}</td>
          <td>{matkul.semester}</td>
          <td>
          <button onClick={()=>this.fRemove(matkul.id)} className="btn btn-warning">Remove</button>
          <button data-toggle="modal" data-target="#myModal" onClick={()=>this.fEdit(matkul.id)} className="btn btn-primary">Edit</button></td>
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
        <input type="hidden" ref="eidmatkul" className="formfield"/>
        <div className="form-group">
              <label>Kode Matkul:</label>
              <input type="text" ref="ekd_matkul" placeholder="Kode Mata Kuliah" className="form-control" id="ekd_matkul" name="ekd_matkul"/>
            </div>
            <div className="form-group">
              <label>Mata Kuliah:</label>
              <input type="text" ref="ematkul" placeholder="Mata Kuliah" className="form-control" id="ematkul" name="ematkul"/>
            </div>
            <div className="form-group">
              <label>SKS:</label>
              <input type="text" ref="esks" placeholder="SKS" className="form-control" id="esks" name="esks"/>
            </div>
            <div className="form-group">
              <label>Prodi:</label>
              <input type="text" ref="eprodi" placeholder="Program Studi" className="form-control" id="eprodi" name="eprodi"/>
            </div>
            <div className="form-group">
              <label>Semester:</label>
              <input type="text" ref="esemester" placeholder="Semester" className="form-control" id="esemester" name="esemester"/>
            </div>
          <button onClick={this.updatematakuliah} className="btn btn-danger">Update</button>
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
