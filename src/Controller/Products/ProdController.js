import moment from 'moment';
import conexao from '../../Configs/bd'

import * as Yup from 'yup'
const date = moment().utc().format("yyyy-MM-DD hh:mm:ss");

class Products {
    async insert (req, res)  {
        try {
            let response
            const connection = await conexao()

            const { name, value, quantidade } = req.body

            const validation = Yup.object().shape({
                name: Yup.string().required(),
                value: Yup.number().required(),
                quantidade: Yup.number().required()
            })

            if(!(await validation.isValid(req.body))) return res.status(400).json({
                erro: 'Dados Incorretos'
            })

            const values = [
                null,
                name,
                value,
                quantidade,
                date,
                0
            ]

            // VERIFICANDO SE O PRODUTO JA EXISTE NO BANCO DE DADOS
            connection.query(`select name from tbl_products where name= "${name}" `,
             (error, result) => {
                if(error) return res.status(400).json({
                    erro: 'Erro ao buscar dados do produto'
                })

                // PERCORRENDO QUERY DO BANCO
                result.forEach(element => {
                    if(element.name == name) return response = true
                });

                if(response) return res.status(400).json({
                    erro: 'Dados duplicados'
                })

                if(!response) return connection.query('insert into tbl_products values(?,?,?,?,?,?)',values,
                 (error, result) => {
                    if(error) res.status(400).json({
                        erro: 'Error ao inserir dados'
                    })
    
                    if(!error) console.log('Insert ok')
    
                    res.json({ result })
                })
            })

        } catch (error) {
            console.log("erro" + error)
        }
        
    }

    async update (req, res) {
        try {
            const { id } = req.params

            const connection = await conexao()
            
            const { name, value, quantidade } = req.body

            const validation = Yup.object().shape({
                name: Yup.string().required(),
                value: Yup.number().required(),
                quantidade: Yup.number().required()
            })

            if(!validation.isValid(req.body)) return res.status(400).json({
                erro: 'Dados incorretos'
            })

            const values = [
                name,
                value,
                quantidade,
            ]

            connection.query(`SELECT * FROM tbl_products where name = "${name}" and 
            id = "${id}" `, (error, result) => {

                if(error) return res.status(400).json({
                    erro: 'Dados não encontrados'
                })

                if(result.length == 0){
                    
                    connection.query(`update tbl_products set name = ?, value = ? ,
                        quantity = ? where id = "${id}" `, values,
                            (error, result) => {

                                if(error) return res.status(400).json({
                                    erro: 'Dados não atualizados'
                                })

                                res.json({
                                    result, id
                                })
                            })
                }
            })

        } catch (error) {
            res.status(400).json({
                erro: 'Erro ao atualizar'
            })
        }
    }

    async delete (req, res) {

    }

    async findAll (req, res) {
        try {
            const connection = await conexao()

            connection.query('SELECT * FROM tbl_products',
             (error, result) => {
                if(error) res.status(400).json({
                    erro: 'Error ao buscar os dados'
                })

                if(!error) console.log('Busca ok')

                res.json({ result })
            })


        } catch (error) {
            console.log("erro" + error)
        }
    }

    async findOne (req, res) {
        const { id } = req.params

        try {
            const connection = await conexao()

            if(id <= 0) return res.status(400).json({
                erro: 'Erro na busca'
            })

            connection.query(`SELECT * FROM tbl_products where id = ${id}`,
             (error, result) => {
                if(error) res.status(400).json({
                    erro: 'Error ao buscar os dados'
                })

                if(!error) console.log('Busca ok')

                res.json({ result })
            })


        } catch (error) {
            console.log("erro" + error)
        }
    }
}

export default new Products