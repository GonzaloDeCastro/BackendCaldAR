/* const fs = require('fs');

exports.getAllUsers = async (req, res) => {
    try {
        let userJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
        let users = JSON.parse(userJSON);
        if (!users) {
            return res.status(400).json('Archivo Json Inexistente.');
        } else {
            return res.status(200).json(users);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error Interno del Servidor.');
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('Valor', userId);
        let userJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
        let users = JSON.parse(userJSON);

        let user = users.filter((user) => Number(user.id) === Number(userId));

        if (user.length === 0) {
            return res.status(400).json('No se encontro el Id de usuario.');
        } else {
            return res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error Interno del Servidor.');
    }
}

exports.getUserByDepartment = async (req, res) => {
    try {
        const department = req.params.department;
        console.log('Valor', department);
        let userJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
        let users = JSON.parse(userJSON);

        let userDepartment = users.filter((user) => String(user.department) === String(department));

        if (userDepartment.length === 0) {
            return res.status(400).json('No se encontro el Departamento.');
        } else {
            return res.status(200).json(userDepartment);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error Interno del Servidor.');
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        let userJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
        let users = JSON.parse(userJSON);

        let userIndex = users.findIndex((user) => Number(user.id) === Number(userId))
        
        if (userIndex === -1) {
            return res.status(400).send({ error: `No existe el Id: ${userId}` });
        }
        users.splice(userIndex, 1);
        fs.writeFileSync('datos/tenicos.json', JSON.stringify(users), {
            encoding: 'utf8',
            flag: 'w',
        });

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error Interno del Servidor.');
    }
}

exports.addNewUser = async (req, res) => {
    try {
        const {nombre, dni, telefono, correo, tipo} = req.body;
        console.log(req.body);
        let usersJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
        let users = JSON.parse(userJSON);

        if (!nombre) {
            return res.status(400).send({ error: 'No existe el nombre.'});
        }
        if (!dni) {
            return res.status(400).send({ error: 'No existe el dni.'});
        }
        if (!telefono) {
            return res.status(400).send({ error: 'No existe el telefono.'});
        }
        if (!correo) {
            return res.status(400).send({ error: 'No existe el correo.'});
        }
        if (!tipo) {
            return res.status(400).send({ error: 'No existe el tipo.'});
        }

        const userId = Number(users[users.length - 1].id) + 1;
        const newUser = {id: userId, nombre, dni, telefono, correo, tipo};
        users.push(newUser);

        fs.writeFileSync('datos/tecnicos.json', JSON.stringify(users), {
            encoding: 'utf8',
            flag: 'w',
        });
        
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error interno del servidor');
    }
}

exports.updateUser = async (req, res) => {
    try {
        const {nombre, dni, telefono, correo, tipo} = req.body;
        console.log(req.body);
        let usersJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
        let users = JSON.parse(userJSON);
        let userIndex = users.findIndex((user) => Number(user.id) === Number(userId));

        if (userIndex === -1) {
            return res.status(400).send({ error: `No existe el Id: ${userId}`});
        }
        if (!nombre) {
            return res.status(400).send({ error: 'No existe el nombre.'});
        }
        if (!dni) {
            return res.status(400).send({ error: 'No existe el dni.'});
        }
        if (!telefono) {
            return res.status(400).send({ error: 'No existe el telefono.'});
        }
        if (!correo) {
            return res.status(400).send({ error: 'No existe el correo.'});
        }
        if (!tipo) {
            return res.status(400).send({ error: 'No existe el tipo.'});
        }

        const updateUser = {
            id: Number(userId),
            nombre,
            dni,
            telefono,
            correo,
            tipo
        };

        users[userIndex] = updateUser;

        fs.writeFileSync('datos/tecnicos.json', JSON.stringify(users), {
            encoding: 'utf8',
            flag: 'w',
        });

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error interno del servidor.');
    }
}
 */

const fs = require('fs');

// Crear una Nuevo Tecnico
exports.addNewTecnico = async (req, res) => {
  try {
    
    const { nombre, dni, telefono, correo, direccion, tipo } = req.body; //data from POSTMAN

    let tecnicoJSON = fs.readFileSync('datos/tecnicos.json', 'utf8'); //data from JSON file
    let tecnicos = JSON.parse(calderaJSON);

    if (!tecnicos) return res.status(400).json('Json inexistente.');  //error no JSON file

    if (!nombre) {
        return res.status(400).send({ error: 'No ingreso el nombre del Técnico.' });
    }   
    if (!dni) {
        return res.status(400).send({ error: 'No ingreso el dni del Técnico.' });
    }
    if (!telefono) {
        return res.status(400).send({ error: 'No ingreso el telefono del Técnico.' });
    } 
    if (!correo) {
        return res.status(400).send({ error: 'No ingreso el correo del Técnico.' });
    } 
    if (!direccion) {
        return res.status(400).send({ error: 'No ingreso la dirección del Técnico.' });
    }    
    if (!tipo) {
        return res.status(400).send({ error: 'No ingreso el tipo de Técnico.' });
    }

    const tecnicoId = Number(calderas[calderas.length - 1].id) + 1;
    const newTecnico = { id: tecnicoId, nombre, dni, telefono, correo, direccion, tipo };
    calderas.push(newTecnico);

    fs.writeFileSync('datos/tecnicos.json', JSON.stringify(tecnicos), {
        encoding: 'utf8',
        flag: 'w',
    });

    return res.status(200).json(tecnicos);

    } catch (error) {
        console.error(error);
        return res.status(404).json('Error Interno del Servidor.');
    }
};


// GET All Tecnicos
exports.getAlltecnicos = async (req, res) => {
    try {
        let tecnicoJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
        let tecnicos = JSON.parse(tecnicoJSON);
        if (!tecnicos) return res.status(400).json('Json inexistente.');
        return res.status(200).json(tecnicos);
    } catch (error) {
        console.error(error);
        return res.status(404).json('Error Interno del Servidor.');
    }
};


// Obtener Tecnico por ID
exports.getTecnicoById = async (req, res) => {
    try {
        const tecnicoId = req.params.tecnicoId;
        let tecnicoJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
        let tecnicos = JSON.parse(tecnicoJSON);

        let tecnico = tecnicos.filter(
            (tecnico) => Number(tecnico.id) === Number(tecnicoId)
        );

        if (tecnico.length === 0)
            return res.status(400).json('No se encontro un Técnico con ese Id.'); 

        return res.status(200).json(tecnico);
    } catch (error) {
        console.error(error);
        return res.status(404).json('Error Interno del Servidor.');
    }
};


// Obtener Tecnico por tipo (A, B, C o D)
exports.getTecnicoByTipo = async (req, res) => {
    try {
        const tecnicoTipo = req.params.calderaTipo;
        let tenicoJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
        let tecnicos = JSON.parse(tenicoJSON);

        let tecnico = tecnicos.filter(
            (tecnico) => tecnico.tipo === tecnicoTipo
        );

        if (tecnico.length === 0)
            return res.status(400).json(`No se encontraron Técnicos del tipo ${tecnicoTipo}`);

        return res.status(200).json(tecnico);
    } catch (error) {
        console.error(error);
        return res.status(404).json('Error Interno del Servidor.');
    }
};


// UPDATE Or MODIFY A Tecnico By ID
exports.updateTecnico = async (req, res) => {
    try {
    
        const { id, nombre, dni, telefono, correo, direccion, tipo } = req.body;
    
        let tecnicoJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');

        let tecnicos = JSON.parse(tecnicoJSON);
        if (!tecnicos) return res.status(400).json('Json Inexistente.');
    
        let tecnicoIndex = tecnicos.findIndex(
            (tecnico) => Number(tecnico.id) === Number(id)
        );
    
        if (tecnicoIndex === -1) {
            return res.status(400).send({ error: `No existe el Técnico con id: ${tecnicoId}.` });
        }
        if (!nombre) {
            return res.status(400).send({ error: 'No ingreso el nombre del Técnico.' });
        }
        if (!dni) {
            return res.status(400).send({ error: 'No ingreso el dni del Técnico.' });
        }
        if (!telefono) {
            return res.status(400).send({ error: 'No ingreso el telefono del Técnico.' });
        }
        if (!correo) {
            return res.status(400).send({ error: 'No ingreso el correo del Técnico.' });
        }
        if (!direccion) {
            return res.status(400).send({ error: 'No ingreso la dirección del Técnico.' });
        }
        if (!tipo) {
            return res.status(400).send({ error: 'No especifico el tipo de Técnico.' });
        }

        const updatedTecnico = {
            id: Number(id),
            nombre,
            dni,
            telefono,
            correo,
            direccion,
            tipo,
        };
        tecnicos[tecnicoIndex] = updatedTecnico;

        fs.writeFileSync('datos/tecnicos.json', JSON.stringify(tecnicos), {
            encoding: 'utf8',
            flag: 'w',
        });

        return res.status(200).json(tecnicos);
    } catch (error) {
        console.error(error);
        return res.status(404).json('Error Interno del Servidor.');
    }
};


// DELETE A tecnico By ID
exports.deleteTecnico = async (req, res) => {
    try {
        const tecnicoId = req.params.tecnicoId;
        let tecnicoJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
        let tecnicos = JSON.parse(tecnicoJSON);

        if (!tecnicos) return res.status(400).json('Json Inexistente.');

        let tecnicoIndex = tecnicos.findIndex(
            (tecnico) => Number(tecnico.id) === Number(tecnicoId)
        );

        if (tecnicoIndex === -1) {
            return res.status(400).send({ error: `No existe el tecnico con id: ${tecnicoId} .` });
        }

        tecnicos.splice(tecnicoIndex, 1);

        fs.writeFileSync('datos/tecnicos.json', JSON.stringify(tecnicos), {
            encoding: 'utf8',
            flag: 'w',
        });

        return res.status(200).json(tecnicos);
    } catch (error) {
        console.error(error);
        return res.status(404).json('Error Interno del Servidor.');
    }
};
