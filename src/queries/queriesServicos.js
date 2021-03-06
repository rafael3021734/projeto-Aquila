const Pool = require('pg').Pool
const pool = new Pool({
    user: "uojyssgxeojarp",
    host: "ec2-23-20-224-166.compute-1.amazonaws.com",
    database: "d4ahtk0vtsf17a",
    password: "5ff488f69681ea28e682bd6e499c8b67c803493fee3f05a5ea746ef44a00d545",
    port: 5432,
    ssl: { rejectUnauthorized: false }
})

//require('dotenv').config()

const getServicos= (request, response) => {
  pool.query('SELECT * FROM servicos ORDER BY ID_Servico ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getServicosById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM servicos WHERE id_servico = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createServicos = (request, response) => {
  const { id_servico ,  id_prestador, nome_servico } = request.body

  pool.query('INSERT INTO servicos (id_servico, id_prestador, nome_servico ) VALUES ($1, $2, $3) RETURNING *', [ id_servico ,  id_prestador, nome_servico ], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id_servico}`)
  })
}

const updateServicos = (request, response) => {
  const id = parseInt(request.params.id)
  const { id_servico ,  id_prestador, nome_servico } = request.body

  pool.query(
    'UPDATE servicos SET id_prestador = $2, nome_servico = $3 WHERE id_servico = $1 RETURNING *',
    [id_servico,  id_prestador, nome_servico],
    (error, results) => {
      if (error) {
        throw error
      } 
      if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`User not found`);
      } else {
  	 	  response.status(200).send(`User modified with ID: ${results.rows[0].id_servico}`)         	
      }
      
    }
  )
}

const deleteServicos = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM servicos WHERE id_servico = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getServicos,
  getServicosById,
  createServicos,
  updateServicos,
  deleteServicos,
}
