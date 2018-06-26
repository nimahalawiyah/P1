const express=require('express');
const cors =require('cors');
const mysql=require('mysql');
const app = express();
const selectall="select * from table";
const con= mysql.createConnection({
    host:'localhost',
    user:'username',
    password:'password',
    database:'database_name'
});
con.connect(err=>{
    if(err){
        return err;
    }
});
app.use(cors());
app.get('/',(req, res)=>{
    res.send('go to /data to see data')
});
app.get('/data',(req, res)=>{
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
app.get('/data/add',(req, res)=>{
            const {field1, field2, field3, field4, field5, field6}=req.query;
            console.log(req.query);
            const insertdata="insert into table set ?";
            con.query(insertdata,{field1, field2,field3, field4, field5, field6},(err, results)=> {
                if(err){
                    return res.send(err)
                }else{
                    return res.send('Data ditambahkan')
                }
            }); 
});
app.get('/data/edit',(req, res)=>{   
    const field=req.query.field;
    const {field1, field2, field3, field4, field5, field6}=req.query;
    const updatedatafield="UPDATE table set ? WHERE field=?";
    con.query(updatedatafield,[{field1, field2, field3, field4, field5, field6}, field],(err, results)=> {
        if(err){
            return res.send(err)
        }else{
            return res.send('Data telah diubah')
        }
    }); 
    });
app.get('/data/delete',(req, res)=>{
    const field=req.query.field;
    const deletedata="DELETE FROM table WHERE field = ?";
    con.query(deletedata,[field],(err, results)=> {
        if(err){
            return res.send(err)
        }else{
            return res.send('Data dihapus')
        }
    }); 
    });
app.listen(4000,()=>{
    console.log('Data server listening on port 4000')
});
