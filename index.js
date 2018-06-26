const express=require('express');
const cors =require('cors');
const mysql=require('mysql');
const app = express();
const selectall="select * from matkul";
const con= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crudmern'
});
con.connect(err=>{
    if(err){
        return err;
    }
});
app.use(cors());
app.get('/',(req, res)=>{
    res.send('go to /matakuliah to see data')
});
app.get('/matakuliah',(req, res)=>{
con.query(selectall,(err, result)=>{
    if(err){
        return res.send(err)
    }else{
        return res.json({
            data:result
        })
    }
});
});
app.get('/matakuliah/add',(req, res)=>{
            const {kd_matkul, matkul, sks, prodi, status, semester}=req.query;
            console.log(req.query);
            const insertmhs="insert into matkul set ?";
            con.query(insertmhs,{kd_matkul, matkul,sks, prodi, status, semester},(err, results)=> {
                if(err){
                    return res.send(err)
                }else{
                    return res.send('matakuliah ditambahkan')
                }
            }); 
});
app.get('/matakuliah/edit',(req, res)=>{   
    const id=req.query.id;
    const {kd_matkul, matkul, sks, prodi, status, semester}=req.query;
    const updatemhs="UPDATE matkul set ? WHERE id=?";
    con.query(updatemhs,[{kd_matkul, matkul,sks, prodi, status, semester}, id],(err, results)=> {
        if(err){
            return res.send(err)
        }else{
            return res.send('matakuliah telah diubah')
        }
    }); 
    });
app.get('/matakuliah/delete',(req, res)=>{
    const id=req.query.id;
    const deletemhs="DELETE FROM matkul WHERE id = ?";
    con.query(deletemhs,[id],(err, results)=> {
        if(err){
            return res.send(err)
        }else{
            return res.send('matakuliah dihapus')
        }
    }); 
    });
app.listen(4000,()=>{
    console.log('Matakuliah server listening on port 4000')
});
