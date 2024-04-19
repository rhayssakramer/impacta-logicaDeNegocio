//Método Readline
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

//JSON
const fs = require('fs');

//Classe Paciente
class Paciente {
    constructor(nome, idade, dataNascimento, telefone) {
        this.nome = nome;
        this.idade = idade;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
    }
}

//Classe Consulta
class Consulta {
    constructor(medico, data, horario) {
        this.medico = medico;
        this.data = data;
        this.horario = horario;
    }
}

//Classe Agendamento
class Agendamento {
    constructor() {
        this.pacientes = [];
        this.consultas = [];
    }

    // CRUD Pacientes
    cadastrarPaciente(paciente) {
        this.pacientes.push(paciente);
    }

    obterPacientes() {
        return this.pacientes;
    }

    atualizarPaciente(index, pacienteAtualizado) {
        if (index < this.pacientes.length && index >= 0) {
            this.pacientes[index] = pacienteAtualizado;
        }
    }

    removerPaciente(index) {
        this.pacientes.splice(index, 1);
    }

    // CRUD Consultas
    agendarConsulta(consulta) {
        this.consultas.push(consulta);
    }

    obterConsultas() {
        return this.consultas;
    }

    atualizarConsulta(index, consultaAtualizada) {
        if (index < this.consultas.length && index >= 0) {
            this.consultas[index] = consultaAtualizada;
        }
    }

    removerConsulta(index) {
        this.consultas.splice(index, 1);
    }
}

//Função de entrada
function getUserInput(question) {
    return new Promise((resolve, reject) => {
        readline.question(`${question}: `, answer => {
            resolve(answer);
        });
    });
}

//Função assíncrona que cria nova Especialidade
async function main() {
    let agendamento = new Agendamento();

    //Menu Principal
    while (true) {
        try {
            console.log('Bem-Vindo(a) a CMA!')
            let opcao = await getUserInput('Escolha uma opção: \n1. Cadastro de Pacientes\n2. Agendamento de Consultas\n3. Salvar e Sair\n');
            
            switch(opcao) {
                case '1':
                    //Menu do Paciente
                    console.log('Você está no Menu Paciente!')
                    let opcaoPaciente = await getUserInput('Escolha uma opção: \n1. Cadastrar Paciente\n2. Ver Pacientes\n3. Atualizar Paciente\n4. Remover Paciente\n5. Voltar\n');
                    
                    switch(opcaoPaciente) {
                        case '1':
                            let nome = await getUserInput('Nome do paciente');
                            let idade = await getUserInput('Idade do paciente');
                            let dataNascimento = await getUserInput('Data de nascimento do paciente');
                            let telefone = await getUserInput('Telefone do paciente');

                            let paciente = new Paciente(nome, idade, dataNascimento, telefone);

                            agendamento.cadastrarPaciente(paciente);
                            console.log(agendamento.obterPacientes());
                            break;
                        case '2':
                            console.log(agendamento.obterPacientes());
                            break;
                        case '3':
                            let indexAtualizarPaciente = await getUserInput('Código do paciente para atualizar');
                            let nomeAtualizado = await getUserInput('Nome do paciente');
                            let idadeAtualizada = await getUserInput('Idade do paciente');
                            let dataNascimentoAtualizada = await getUserInput('Data de nascimento do paciente');
                            let telefoneAtualizado = await getUserInput('Telefone do paciente');

                            let pacienteAtualizado = new Paciente(nomeAtualizado, idadeAtualizada, dataNascimentoAtualizada, telefoneAtualizado);
                            agendamento.atualizarPaciente(indexAtualizarPaciente, pacienteAtualizado);
                            console.log(agendamento.obterPacientes());
                            break;
                        case '4':
                            let indexRemoverPaciente = await getUserInput('Código do paciente para remover');
                            agendamento.removerPaciente(indexRemoverPaciente);
                            console.log(agendamento.obterPacientes());
                            break;
                        case '5':
                            break;
                        default:
                            console.log('Opção inválida');
                    }
                    break;
                case '2':
                    //Menu do Agendamento
                    console.log('Você está no Menu Agendamento de Consultas!')
                    let opcaoConsulta = await getUserInput('Escolha uma opção: \n1. Agendar consulta\n2. Ver consultas\n3. Atualizar consulta\n4. Remover consulta\n5. Voltar\n');
                    
                    switch(opcaoConsulta) {
                        case '1':
                            let medico = await getUserInput('Nome do médico');
                            let data = await getUserInput('Data da consulta');
                            let horario = await getUserInput('Horário da consulta');

                            let consulta = new Consulta(medico, data, horario);

                            agendamento.agendarConsulta(consulta);
                            console.log(agendamento.obterConsultas());
                            break;
                        case '2':
                            console.log(agendamento.obterConsultas());
                            break;
                        case '3':
                            let indexAtualizarConsulta = await getUserInput('Código da consulta para atualizar');
                            let medicoAtualizado = await getUserInput('Nome do médico');
                            let dataAtualizada = await getUserInput('Data da consulta');
                            let horarioAtualizado = await getUserInput('Horário da consulta');

                            let consultaAtualizada = new Consulta(medicoAtualizado, dataAtualizada, horarioAtualizado);
                            agendamento.atualizarConsulta(indexAtualizarConsulta, consultaAtualizada);
                            console.log(agendamento.obterConsultas());
                            break;
                        case '4':
                            let indexRemoverConsulta = await getUserInput('Código da consulta para remover');
                            agendamento.removerConsulta(indexRemoverConsulta);
                            console.log(agendamento.obterConsultas());
                            break;
                        case '5':
                            break;
                        default:
                            console.log('Opção inválida');
                    }
                    break;
                case '3':
                    console.log('Cadastro e Agendamento realizado com sucesso.');
                    console.log('A CMA agradece a preferência. Volte Sempre!')
                    //Criação do arquivo JSON com os dados do Paciente/Consultas
                    fs.writeFileSync('especialidade.json', JSON.stringify(agendamento, null, 2));
                    readline.close();
                    return;
                default:
                    console.log('Opção inválida');
            }
        } catch (error) {
            console.error(error);
        }
    }
}

main();