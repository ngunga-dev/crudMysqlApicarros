const CarroService=require('../services/CarroService')

module.exports={
    buscarTodos: async(req,res)=>{
        let json={error:"",result:[]};

        let carros= await CarroService.buscarTodos();

        for(let i in carros){
            json.result.push({
                codigo: carros[i].codigo,
                descricao: carros[i].modelo
            })
        }
        res.json(json);

    },
    buscarUm: async(req, res) => {
        let json = await{error:"",result:{}};

        let codigo = req.params.codigo;
        let carro=await CarroService.buscarUm(codigo);

        if(carro){
            json.result=carro;
        }
        res.json(json);
    },
    inserirCarro:async (req, res) =>{
        let json ={error:"",result:{}}

        let modelo=req.body.modelo;
        let placa=req.body.placa;
        
        if(modelo && placa){
            let carroCodigo=await CarroService.inserirCarro(modelo, placa);
            json.result={
                codigo: carroCodigo,
                modelo,
                placa
            };
        }else{
            json.error="Campos não enviados"
        }
        res.json(json);
    },
    alterarCarro:async (req, res)=>{
        let json={error:"",result:{}}

        let codigo=req.params.codigo;
        let modelo=req.body.modelo;
        let placa=req.body.placa;

        if(codigo && modelo && placa){
            await CarroService.alterarCarro(codigo, modelo, placa);

            json.result={
                codigo,
                modelo,
                placa
            };
        }else{
            json.error="Campos não enviados"
        }

        res.json(json);
    },
    excluirCarro:async (req, res) =>{
        let json = {error:"",result:{}}
        await CarroService.excluirCarro(req.params.codigo)
        res.json(json);
    }

}