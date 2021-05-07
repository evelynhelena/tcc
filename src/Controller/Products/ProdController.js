import moment from 'moment';
import conexao from '../../Configs/bd'

import * as Yup from 'yup'

const date = moment().utc().format("yyyy-MM-DD hh:mm:ss");

class Products {
    async insert (req, res)  {
        try {
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

            connection.query('insert into tbl_products values(?,?,?,?,?,?)',values,
             (error, result) => {
                if(error) res.status(400).json({
                    erro: 'Error ao inserir dados'
                })

                if(!error) console.log('Insert ok')

                res.json({ result })
            })


        } catch (error) {
            console.log("erro" + error)
        }
    }

    async update (req, res) {

    }

    async delete (req, res) {

    }

    async findAll (req, res) {

    }

    async findOne (req, res) {

    }
}

export default new Products