import { pool } from '../db.js'

// Obtener datos plural
export const getEmployes = async (req, res) => {
    try {
        /*   throw new Error('DB Error') */
        const [rows] = await pool.query('SELECT * FROM employee');
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        });
    }
};

// Obtener datos singular
export const getEmploye = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])
        console.log(rows);

        if (rows.length <= 0) return res.status(404).json({
            message: "employee not found"
        })

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        });
    }
};

// crear datos
export const createEmployes = async (req, res) => {
    const { name, salary } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary])
        res.send({
            id: rows.insertId,
            name,
            salary
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        });
    }
};

// elimar datos
export const deleteEmployes = async (req, res) => {

    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id]);
        //si no afecto a nunguna fila 
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Employe not found'
        });

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        });
    }
};

// editar datos
export const updateEmployes = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;

    try {
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id])

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Employee not found'
        })

        //devuelve el rows editado
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        });
    }
};


/* https://www.youtube.com/watch?v=3dSkc-DIM74&list=RDCMUCX9NJ471o7Wie1DQe94RVIg&start_radio=1&t=101s */