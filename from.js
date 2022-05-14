var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
	event.preventDefault();


	var form = document.querySelector("#form-adiciona");

	// extrai informacoes do paciente
    var paciente = obtemPacienteDoFormulario(form);
	
	var erros = validaPaciente(paciente);

	if(erros.length > 0 ){
		exibiMensagensDeErro(erros)

		return
	}
	 // aciciona o paciente na tabela
	adicionaPacienteNaTabela(paciente)

	 form.reset();
	 var mensagensDeErro = document.querySelector("#mensagens-erro");
	 mensagensDeErro.innerHTML = "";

});

function adicionaPacienteNaTabela(paciente){
	var pacienteTr = montaTr(paciente);
	var tabela = document.querySelector("#tabela-pacientes");
	tabela.appendChild(pacienteTr);

}

function obtemPacienteDoFormulario(form){
	var paciente = {
		nome: form.nome.value,
		altura: form.altura.value,
		peso: form.peso.value,
		gordura: form.gordura.value,
		imc: calculaImc(form.peso.value, form.altura.value)
	}

	return paciente;
}

function montaTr(paciente){

	var pacienteTr = document.createElement("tr");
	pacienteTr.classList.add("paciente");
    
	pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
	pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
	pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
	pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
	pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));


	return pacienteTr
}

function montaTd(dado,classe) {

	var Td = document.createElement("td");
	Td.textContent = dado;
	Td.classList.add(classe);

	return Td;
}

function validaPaciente(paciente){

	var erros = [] 
	if(paciente.nome == 0 ) erros.push("o nome não pode ser em branco");
	if(paciente.gordura == 0 ) erros.push("a gordura não pode ser em banco");
	if(paciente.altura == 0 ) erros.push("a altura não pode ser em branco");
	if(paciente.peso == 0 ) erros.push("o peso não pode ser em branco");
	if(!validaPeso(paciente.peso)) erros.push("Peso é inválido");
	if(!validaAltura(paciente.altura)) erros.push("Altura é inválido");
	return erros
}

function exibiMensagensDeErro(erros){
	var ul = document.querySelector("#mensagens-erro")
	ul.innerHTML = "";

	erros.forEach(function(erro) {

		var li = document.createElement("li")
		li.textContent = erro;
		ul.appendChild(li);
	});
}