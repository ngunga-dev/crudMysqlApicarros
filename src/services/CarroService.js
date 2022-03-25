const db=require('../db')

module.exports={
    buscarTodos:()=>{
        return new Promise((aceito,rejeitado)=>{
            db.query(`SELECT * FROM carros`,(error,result)=>{
                if(error) {rejeitado(error); return}
                aceito(result);
                
            })
        })
    },
    buscarUm:(codigo)=>{
        return new Promise((aceito,rejeitado)=>{
            db.query(`SELECT * FROM carros WHERE codigo=?`,[codigo],(error,result)=>{
                if(error) {rejeitado(error); return}
                if(result.length > 0) {aceito(result[0])}
                else{aceito(false)}
            })
        })
    },
    inserirCarro:(modelo, placa) =>{
        return  new Promise((aceito,rejeitado)=>{
            
            db.query("INSERT INTO carros (modelo,placa) VALUES(?,?)",
            [modelo,placa],
            (error,result)=>{
                if (error){rejeitado(error); return;}
                aceito(result.insertCodigo);
            }
            )
        })
    },

    alterarCarro:(codigo,modelo,placa)=>{
        return new Promise((aceito,rejeitado)=>{
            db.query(`UPDATE carros SET modelo = ?,placa = ? WHERE codigo = ?`,
            [modelo,placa,codigo],
            (error,result)=>{
                if (error) {rejeitado(error); return}
                aceito(result)
            }
            )
        })
    },
    excluirCarro:(codigo)=>{
        return new Promise((aceito,rejeitado)=>{
            db.query("DELETE FROM carros WHERE codigo = ?",[codigo],
            (error,result)=>{
                if(error) {rejeitado(error); return;}
                aceito(result)
            })
        })
    }

}