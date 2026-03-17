let geral = document.getElementsByTagName("edu-lesson-plan-edit")[0].getElementsByTagName("mat-accordion")[0];
let paineis = geral.getElementsByTagName("mat-expansion-panel");

let bt_salvar = document.getElementsByTagName("edu-lesson-plan-edit")[0].getElementsByTagName("button")[1];

function simulateTextEntry(inputField, textToEnter) {
    inputField.focus();
    inputField.value = ""; 

    for (let i = 0; i < textToEnter.length; i++) {
        var charCode = textToEnter.charCodeAt(i);

        let keydownEvent = new Event('keydown', { keyCode: charCode });
        inputField.dispatchEvent(keydownEvent);

        let keypressEvent = new Event('keypress', { keyCode: charCode });
        inputField.dispatchEvent(keypressEvent);

        inputField.value = inputField.value + textToEnter[i];

        let inputEvent = new Event('input', { bubbles: true });
        inputField.dispatchEvent(inputEvent);

        let keyupEvent = new Event('keyup', { keyCode: charCode });
        inputField.dispatchEvent(keyupEvent);
    }
}


async function inserir_plano_de_aula(aula,inserir_realizado) {
    let colunas = aula.split("\t")
    let data = colunas[0].slice(0,5);
    let conteudo = colunas[1];

    for (let painel of paineis){
        const texto_data = painel.getElementsByTagName("mat-expansion-panel-header")[0]
                        .getElementsByTagName("label")[0].innerText;
        const data_aula = texto_data.match(/\d{2}\/\d{2}/)[0];
        
        if(data_aula == data){

            let campos_texto = painel.getElementsByTagName("textarea");
            let campo_previsto = campos_texto[0];
            let campo_realizado = campos_texto[1];
        
            campo_previsto.value = "";
            simulateTextEntry(campo_previsto, conteudo);
            if (inserir_realizado){
                campo_realizado.value = "";
                simulateTextEntry(campo_realizado, conteudo);
            }
        }
    }
}

let plano_ensino =  prompt("Cole aqui o seu plano de ensino direto do Excel");
let aulas = plano_ensino.split("\r\n");

for(let aula of aulas){
    let inserir_realizado = false;
    console.log(aula);
    await inserir_plano_de_aula(aula, inserir_realizado);
}

bt_salvar.click()
